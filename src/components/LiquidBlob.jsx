import React, { useRef, useMemo, useEffect, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// ============================================================
// CUSTOM GLSL SHADERS — Liquid Distortion Effect
// ============================================================

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform vec2 uMouse;           // Normalized mouse position (0-1)
  uniform vec2 uMouseVelocity;   // Mouse movement speed
  uniform float uTime;           // Time for ambient waves
  uniform float uHover;          // 0 = idle, 1 = hovering
  uniform float uIntensity;      // Overall distortion intensity
  uniform vec2 uResolution;      // Canvas resolution

  varying vec2 vUv;

  // Simplex-style noise for organic waves
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m * m; m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;

    // --- 1. AMBIENT WAVE MOTION (always active, like floating in water) ---
    float wave1 = snoise(uv * 3.0 + uTime * 0.3) * 0.008;
    float wave2 = snoise(uv * 5.0 - uTime * 0.2) * 0.005;
    float wave3 = sin(uv.y * 12.0 + uTime * 1.5) * 0.003;
    vec2 ambientDisp = vec2(wave1 + wave3, wave2);

    // --- 2. MOUSE-BASED LIQUID DISTORTION ---
    vec2 mousePos = uMouse;
    float dist = distance(uv, mousePos);

    // Soft circular falloff
    float radius = 0.35;
    float falloff = smoothstep(radius, 0.0, dist);
    falloff = falloff * falloff; // Quadratic for softer edges

    // Direction from mouse to pixel (stretching away from mouse)
    vec2 dir = normalize(uv - mousePos + 0.001);

    // Mouse velocity creates directional "wake"
    float velMagnitude = length(uMouseVelocity);
    vec2 velDir = uMouseVelocity * 0.15;

    // Ripple rings radiating from mouse
    float ripple = sin(dist * 30.0 - uTime * 4.0) * 0.01 * falloff;

    // Combined mouse displacement
    vec2 mouseDisp = dir * falloff * 0.04 * uIntensity; // Push away
    mouseDisp += velDir * falloff * 0.5;                  // Velocity wake
    mouseDisp += vec2(ripple);                             // Ripple rings

    // --- 3. FACE FOLLOW (subtle shift toward mouse) ---
    vec2 faceFollow = (mousePos - 0.5) * 0.02 * uHover;

    // --- COMBINE ALL DISPLACEMENTS ---
    vec2 finalUv = uv + ambientDisp + mouseDisp * uHover + faceFollow;

    // Clamp UV to prevent edge artifacts
    finalUv = clamp(finalUv, 0.001, 0.999);

    // --- CHROMATIC ABERRATION (subtle, on distortion) ---
    float aberration = falloff * 0.003 * uHover;
    float r = texture2D(uTexture, finalUv + vec2(aberration, 0.0)).r;
    float g = texture2D(uTexture, finalUv).g;
    float b = texture2D(uTexture, finalUv - vec2(aberration, 0.0)).b;

    gl_FragColor = vec4(r, g, b, texture2D(uTexture, finalUv).a);
  }
`;

// ============================================================
// LIQUID MESH — The actual Three.js plane with shader material
// ============================================================
const LiquidMesh = ({ texture, tintColor }) => {
    const meshRef = useRef();
    const { viewport } = useThree();

    const mouseTarget = useRef({ x: 0.5, y: 0.5 });
    const mouseSmooth = useRef({ x: 0.5, y: 0.5 });
    const prevMouse = useRef({ x: 0.5, y: 0.5 });
    const hoverTarget = useRef(0);

    const uniforms = useMemo(() => ({
        uTexture: { value: texture },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uMouseVelocity: { value: new THREE.Vector2(0, 0) },
        uTime: { value: 0 },
        uHover: { value: 0 },
        uIntensity: { value: 1.0 },
        uResolution: { value: new THREE.Vector2(1, 1) },
    }), [texture]);

    // Mouse tracking
    const handlePointerMove = useCallback((e) => {
        if (!meshRef.current) return;
        // Convert to 0-1 UV space
        const x = (e.uv?.x ?? 0.5);
        const y = (e.uv?.y ?? 0.5);
        mouseTarget.current = { x, y };
        hoverTarget.current = 1;
    }, []);

    const handlePointerLeave = useCallback(() => {
        hoverTarget.current = 0;
        mouseTarget.current = { x: 0.5, y: 0.5 };
    }, []);

    // Animation loop
    useFrame((state, delta) => {
        if (!meshRef.current) return;
        const mat = meshRef.current.material;

        // Smooth mouse interpolation
        const lerpSpeed = 0.08;
        mouseSmooth.current.x += (mouseTarget.current.x - mouseSmooth.current.x) * lerpSpeed;
        mouseSmooth.current.y += (mouseTarget.current.y - mouseSmooth.current.y) * lerpSpeed;

        // Mouse velocity
        const velX = mouseSmooth.current.x - prevMouse.current.x;
        const velY = mouseSmooth.current.y - prevMouse.current.y;
        prevMouse.current = { ...mouseSmooth.current };

        // Update uniforms
        mat.uniforms.uMouse.value.set(mouseSmooth.current.x, mouseSmooth.current.y);
        mat.uniforms.uMouseVelocity.value.set(velX, velY);
        mat.uniforms.uTime.value = state.clock.elapsedTime;

        // Smooth hover transition
        const currentHover = mat.uniforms.uHover.value;
        mat.uniforms.uHover.value += (hoverTarget.current - currentHover) * 0.05;
    });

    return (
        <mesh
            ref={meshRef}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            scale={[viewport.width, viewport.height, 1]}
        >
            <planeGeometry args={[1, 1, 32, 32]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent={true}
            />
        </mesh>
    );
};

// ============================================================
// LIQUID BLOB — Public component wrapping Canvas + Mesh
// ============================================================
const LiquidBlob = ({ imageSrc, tintColor = '#2ECC71', className = '', style = {} }) => {
    const textureRef = useRef(null);
    const [textureLoaded, setTextureLoaded] = React.useState(false);

    useEffect(() => {
        const loader = new THREE.TextureLoader();
        loader.load(imageSrc, (tex) => {
            tex.minFilter = THREE.LinearFilter;
            tex.magFilter = THREE.LinearFilter;
            tex.format = THREE.RGBAFormat;
            textureRef.current = tex;
            setTextureLoaded(true);
        });
    }, [imageSrc]);

    if (!textureLoaded) {
        return (
            <div className={className} style={{ ...style, background: tintColor, opacity: 0.3, borderRadius: '50%' }} />
        );
    }

    return (
        <div className={className} style={style}>
            <Canvas
                gl={{
                    alpha: true,
                    antialias: true,
                    powerPreference: 'high-performance',
                }}
                camera={{ position: [0, 0, 1], fov: 75 }}
                style={{ width: '100%', height: '100%' }}
                dpr={Math.min(window.devicePixelRatio, 2)} // Cap DPR for performance
            >
                <LiquidMesh texture={textureRef.current} tintColor={tintColor} />
            </Canvas>
        </div>
    );
};

export default LiquidBlob;
