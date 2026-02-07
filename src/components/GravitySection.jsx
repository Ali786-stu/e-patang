import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

const GravitySection = ({ start = false }) => {
    const sceneRef = useRef(null);
    const engineRef = useRef(null);
    const requestRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const prevMouseRef = useRef({ x: 0, y: 0 });
    const [bubbleStates, setBubbleStates] = useState([]);

    // --- Physics Engine Setup ---
    useEffect(() => {
        if (!sceneRef.current) return;

        const { Engine, World, Bodies, Runner } = Matter;
        const engine = Engine.create();
        engineRef.current = engine;
        engine.world.gravity.y = 0.9; // Snappy "pile" gravity

        const width = sceneRef.current.clientWidth;
        const height = sceneRef.current.clientHeight;

        // Walls (Tighten them up)
        const wallOptions = { isStatic: true, friction: 0.2, restitution: 0.3 };
        const ground = Bodies.rectangle(width / 2, height + 50, width, 100, wallOptions);
        const leftWall = Bodies.rectangle(-50, height / 2, 100, height * 2, wallOptions);
        const rightWall = Bodies.rectangle(width + 50, height / 2, 100, height * 2, wallOptions);
        World.add(engine.world, [ground, leftWall, rightWall]);

        const runner = Runner.create();
        Runner.run(runner, engine);

        const handleMouseMove = (e) => {
            const rect = sceneRef.current.getBoundingClientRect();
            prevMouseRef.current = { ...mouseRef.current };
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Animation loop
        const update = () => {
            const bodies = engine.world.bodies.filter(body => !body.isStatic);

            // VELOCITY-BASED INTERACTION:
            // Calculate mouse velocity (displacement)
            const mouseDX = mouseRef.current.x - prevMouseRef.current.x;
            const mouseDY = mouseRef.current.y - prevMouseRef.current.y;
            const mouseSpeed = Math.sqrt(mouseDX * mouseDX + mouseDY * mouseDY);

            bodies.forEach(body => {
                const dx = body.position.x - mouseRef.current.x;
                const dy = body.position.y - mouseRef.current.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // radius: only items VERY close to the mouse react
                const radius = 100;
                if (distance < radius) {
                    // Interaction: If mouse is fast, fling them. If slow, very gentle nudge.
                    // This allows the mouse to "sit" on the logo without it flying away instantly.
                    const forceMagnitude = (1 - distance / radius) * (mouseSpeed * 0.002 + 0.005);

                    Matter.Body.applyForce(body, body.position, {
                        x: (mouseDX * 0.003) + (dx / distance * forceMagnitude),
                        y: (mouseDY * 0.003) + (dy / distance * forceMagnitude)
                    });
                }
            });

            // Update prevMouse to current for next frame velocity calc
            prevMouseRef.current = { ...mouseRef.current };

            setBubbleStates(
                bodies.map(body => ({
                    id: body.id,
                    x: body.position.x,
                    y: body.position.y,
                    angle: body.angle,
                    img: body.userData?.img,
                    color: body.userData?.color,
                    borderColor: body.userData?.borderColor,
                    size: body.userData?.size
                }))
            );
            requestRef.current = requestAnimationFrame(update);
        };
        requestRef.current = requestAnimationFrame(update);

        return () => {
            cancelAnimationFrame(requestRef.current);
            Runner.stop(runner);
            World.clear(engine.world);
            Engine.clear(engine);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    // --- Ball Drop Trigger ---
    useEffect(() => {
        if (start && engineRef.current && bubbleStates.length === 0) {
            const { Bodies, World } = Matter;
            const width = sceneRef.current.clientWidth;

            const logoFiles = [
                '/brand-img/ing1.png', '/brand-img/img2.png', '/brand-img/img3.png', '/brand-img/img4.png', '/brand-img/img5.png'
            ];

            const colorThemes = [
                { bg: '#ffffff', border: '#ffffff' }, // Solid White for clean logo look
            ];

            const bodies = [];
            for (let i = 0; i < 50; i++) {
                const img = logoFiles[i % logoFiles.length];
                const theme = colorThemes[Math.floor(Math.random() * colorThemes.length)];
                const size = 70 + Math.random() * 30; // HUGE impact as requested
                const x = Math.random() * width;
                const y = -Math.random() * 2500 - 200; // Spawning higher to accommodate larger sizes

                const body = Bodies.circle(x, y, size / 2, {
                    restitution: 0.2, // Less bouncy for a stable "pile"
                    friction: 0.1,
                    frictionAir: 0.04, // Enough drag to stop them drifting
                    userData: { img, color: theme.bg, borderColor: theme.border, size }
                });
                bodies.push(body);
            }

            World.add(engineRef.current.world, bodies);
        }
    }, [start, bubbleStates.length]);

    return (
        <div className="relative w-full h-[70vh] mb-5 overflow-hidden bg-transparent">
            {/* Header */}
            <div className="absolute top-0 left-0 w-full text-center pointer-events-none z-10 pt-2">
                <p className="text-[#008EC4] text-lg md:text-2xl tracking-[0.5em] uppercase font-bold opacity-70">
                    Trusted Brands & Media
                </p>
            </div>

            <div ref={sceneRef} className="absolute inset-0 z-0" />

            {bubbleStates.map((b) => (
                <div
                    key={b.id}
                    className="absolute flex items-center justify-center rounded-full overflow-hidden" // Removed backdrop-blur, border
                    style={{
                        width: b.size,
                        height: b.size,
                        left: 0,
                        top: 0,
                        backgroundColor: b.color, // Solid color now
                        // Removed borderColor and boxShadow
                        transform: `translate(${b.x - b.size / 2}px, ${b.y - b.size / 2}px) rotate(${b.angle}rad)`,
                        transition: 'none'
                    }}
                >
                    <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                        <img
                            src={b.img}
                            alt="Logo"
                            className="w-full h-full object-cover" // Fill entire circle
                        />
                        {/* Color Layer Overlay */}
                        <div className="absolute inset-0 bg-[#008EC4] opacity-40 pointer-events-none" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GravitySection;
