import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GravitySection = () => {
    const [isInView, setIsInView] = useState(false);
    const sceneRef = useRef(null);
    const engineRef = useRef(null);
    const requestRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const prevMouseRef = useRef({ x: 0, y: 0 });
    const [bubbleStates, setBubbleStates] = useState([]);
    const startedRef = useRef(false);

    // --- Physics Engine Setup ---
    useEffect(() => {
        if (!sceneRef.current) return;

        const { Engine, World, Bodies, Runner } = Matter;
        const engine = Engine.create();
        engineRef.current = engine;
        engine.world.gravity.y = 6; // Higher gravity for high-velocity "pour"

        const width = sceneRef.current.clientWidth;
        const height = sceneRef.current.clientHeight;

        // Walls (Lowered ground to sit at the very bottom edge)
        const wallOptions = { isStatic: true, friction: 0.2, restitution: 0.3 };
        const ground = Bodies.rectangle(width / 2, height + 40, width, 100, wallOptions); // Top edge at height - 10
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

    // --- ScrollTrigger Initialization ---
    useEffect(() => {
        if (!sceneRef.current) return;

        const trigger = ScrollTrigger.create({
            trigger: sceneRef.current,
            start: "top 90%",
            onEnter: () => setIsInView(true),
            onEnterBack: () => setIsInView(true),
            onLeave: () => {
                setIsInView(false);
                startedRef.current = false;
            },
            onLeaveBack: () => {
                setIsInView(false);
                startedRef.current = false;
            }
        });

        return () => trigger.kill();
    }, []);

    // --- Ball Drop Trigger ---
    useEffect(() => {
        if (isInView && engineRef.current && !startedRef.current) {
            startedRef.current = true;
            const { Bodies, World, Body } = Matter;
            const width = sceneRef.current.clientWidth;

            const logoFiles = [
                '/brand-img/ing1.png', '/brand-img/img2.png', '/brand-img/img3.png', '/brand-img/img4.png', '/brand-img/img5.png'
            ];

            const themes = [{ bg: '#87CEEB', border: '#87CEEB' }];
            const isMobile = width < 768;
            const bubbleCount = isMobile ? 30 : 80;
            const minSize = isMobile ? 40 : 50;
            const sizeRange = isMobile ? 15 : 20;

            let spawnedCount = 0;
            const batchSize = isMobile ? 4 : 8;

            const interval = setInterval(() => {
                const batch = [];
                for (let i = 0; i < batchSize && spawnedCount < bubbleCount; i++) {
                    const img = logoFiles[spawnedCount % logoFiles.length];
                    const theme = themes[0];
                    const size = minSize + Math.random() * sizeRange;
                    const x = Math.random() * width;
                    const y = -Math.random() * 100 - 50;

                    const body = Bodies.circle(x, y, size / 2, {
                        restitution: 0.2,
                        friction: 0.1,
                        frictionAir: 0.015,
                        userData: { img, color: theme.bg, borderColor: theme.border, size }
                    });

                    Body.setVelocity(body, {
                        x: (Math.random() - 0.5) * 2,
                        y: 8 + Math.random() * 4
                    });

                    batch.push(body);
                    spawnedCount++;
                }

                if (engineRef.current) {
                    World.add(engineRef.current.world, batch);
                }

                if (spawnedCount >= bubbleCount) {
                    clearInterval(interval);
                }
            }, 50);

            return () => clearInterval(interval);
        } else if (!isInView && engineRef.current) {
            // Clear bubbles when not in view to reset
            const { World } = Matter;
            const bodiesToRemove = engineRef.current.world.bodies.filter(b => !b.isStatic);
            World.remove(engineRef.current.world, bodiesToRemove);
        }
    }, [isInView]);

    return (
        <div className="relative w-full h-[60vh] py-0 overflow-hidden bg-[#040A15]">
            <div ref={sceneRef} className="absolute inset-0 z-0" />

            <div className="relative w-full h-full pointer-events-none">
                {bubbleStates.map((b) => (
                    <div
                        key={b.id}
                        className="absolute flex items-center justify-center rounded-full overflow-hidden shadow-[0_5px_15px_rgba(0,0,0,0.3)]"
                        style={{
                            width: b.size,
                            height: b.size,
                            left: 0,
                            top: 0,
                            backgroundColor: b.color,
                            transform: `translate(${b.x - b.size / 2}px, ${b.y - b.size / 2}px) rotate(${b.angle}rad)`,
                            transition: 'none'
                        }}
                    >
                        <div className="absolute inset-0 w-full h-full flex items-center justify-center p-0">
                            <img
                                src={b.img}
                                alt="Brand Logo"
                                className="w-[95%] h-[95%] object-contain mix-blend-multiply" // Better logo visibility
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GravitySection;
