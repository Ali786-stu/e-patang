import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uPullStrength;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Distance from vertex to mouse
    float dist = distance(uv, uMouse);
    
    // Stretch effect toward mouse
    float pull = smoothstep(0.6, 0.0, dist);
    vec2 dir = normalize(uMouse - uv);
    
    // Displace vertices toward mouse
    pos.xy += dir * pull * uPullStrength;

    // Ambient organic wobble
    pos.x += sin(pos.y * 2.0 + uTime) * 0.05;
    pos.y += cos(pos.x * 2.0 + uTime) * 0.05;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform vec3 uColor;
  uniform float uOpacity;

  void main() {
    // Create organic circular boundary
    float dist = distance(vUv, vec2(0.5));
    float alpha = smoothstep(0.5, 0.4, dist);
    
    gl_FragColor = vec4(uColor, alpha * uOpacity);
  }
`;

const BlobMesh = ({ color, pullStrength = 0.4, opacity = 1 }) => {
    const meshRef = useRef();
    const { viewport } = useThree();

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uPullStrength: { value: pullStrength },
        uColor: { value: new THREE.Color(color) },
        uOpacity: { value: opacity }
    }), [color, pullStrength, opacity]);

    useFrame((state) => {
        if (!meshRef.current) return;
        const { x, y } = state.mouse;

        // Map mouse -1,1 to 0,1 UV space
        uniforms.uMouse.value.x = THREE.MathUtils.lerp(uniforms.uMouse.value.x, (x + 1) / 2, 0.1);
        uniforms.uMouse.value.y = THREE.MathUtils.lerp(uniforms.uMouse.value.y, (y + 1) / 2, 0.1);
        uniforms.uTime.value = state.clock.getElapsedTime();
    });

    return (
        <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1, 64, 64]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent={true}
                depthWrite={false}
            />
        </mesh>
    );
};

const LiquidBlobBackground = ({
    color = "#2ECC71",
    pullStrength = 0.5,
    opacity = 0.8,
    className = ""
}) => {
    return (
        <div className={`absolute inset-0 z-0 pointer-events-none ${className}`}>
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <BlobMesh color={color} pullStrength={pullStrength} opacity={opacity} />
            </Canvas>
        </div>
    );
};

export default LiquidBlobBackground;
