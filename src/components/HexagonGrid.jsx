import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';

const HEX_RADIUS = 0.8;
const HEX_HEIGHT = 2.5; // Increased height for better side visibility
const GAP = 0.05;
const ROWS = 18;
const COLS = 22;

const Hexagon = ({ position, delay }) => {
    const meshRef = useRef();

    // Initial random height for terrain look
    const initialHeightOffset = useMemo(() => Math.random() * 0.4, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        // Base subtle undulation
        const wave = Math.sin(time * 0.4 + delay) * 0.15;

        // Mouse interaction (World Space)
        const { x, y } = state.mouse;
        const targetX = x * 15;
        const targetZ = -y * 10; // Invert Y for Z space

        const dist = Math.sqrt(
            Math.pow(position[0] - targetX, 2) +
            Math.pow(position[1] - targetZ, 2)
        );

        // Influence calculation for mouse ripple
        const influence = Math.max(0, 1 - dist / 6);
        const targetPosY = initialHeightOffset + wave - (influence * 1.2);

        // Smoothly animate the Y position (Up/Down)
        meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetPosY, 0.08);
    });

    return (
        <mesh
            ref={meshRef}
            // Position on X and Z (Ground plane)
            position={[position[0], 0, position[1]]}
            rotation={[0, 0, 0]} // Stand upright!
        >
            <cylinderGeometry args={[HEX_RADIUS, HEX_RADIUS, HEX_HEIGHT, 6]} />
            <meshStandardMaterial
                color="#080808" // Deep Matte Charcoal
                roughness={0.9}
                metalness={0.05}
            />
        </mesh>
    );
};

const HexGrid = () => {
    const hexData = useMemo(() => {
        const data = [];
        const xStep = (HEX_RADIUS * 2 + GAP) * 0.75;
        const zStep = (HEX_RADIUS * Math.sqrt(3) + GAP);

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                const x = (c - COLS / 2) * xStep;
                let z = (r - ROWS / 2) * zStep;

                // Stagger every other column
                if (c % 2 !== 0) {
                    z += zStep / 2;
                }

                data.push({
                    pos: [x, z], // X and Z coordinates
                    delay: (r * 0.15) + (c * 0.1)
                });
            }
        }
        return data;
    }, []);

    return (
        <group>
            {hexData.map((d, i) => (
                <Hexagon key={i} position={d.pos} delay={d.delay} />
            ))}
        </group>
    );
};

const HexagonGrid = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-black">
            <Canvas camera={{ position: [0, 12, 18], fov: 40, near: 0.1, far: 1000 }} dpr={[1, 2]}>
                <color attach="background" args={['#000000']} />

                {/* AMBIENT: Keeps shadows from being pitch black */}
                <ambientLight intensity={0.1} />

                {/* DIRECTIONAL: Main light for chunky side shadows */}
                <directionalLight
                    position={[15, 25, 10]}
                    intensity={2.5}
                    color="#ffffff"
                />

                {/* ACCENT: Subtle color light for depth */}
                <pointLight position={[-10, 10, 5]} intensity={0.8} color="#44D79E" />

                <HexGrid />

                <Environment preset="night" />

                {/* FOG: Blends edges into black screen */}
                <fog attach="fog" args={['#000000', 15, 35]} />
            </Canvas>
        </div>
    );
};

export default HexagonGrid;
