import React, { useLayoutEffect, useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LiquidImageSection = () => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);
    const mainWrapperRef = useRef(null);
    const liquidOverlayRef = useRef(null);
    const wavePathRef = useRef(null);
    const waveHighlightRef = useRef(null);

    // Mouse Tracking Refs for Ripple
    const mouseX = useRef(0);
    const mouseY = useRef(0);
    const followX = useRef(0);
    const followY = useRef(0);
    const [isHovered, setIsHovered] = useState(false);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=400%",
                    pin: true,
                    scrub: 1,
                }
            });

            // Internal animation state for wobbly growth
            const state = { turb: 0.05, disp: 100, waveY: 0, waveMorph: 0 };

            // 1. Initial State: Small blob, fully covered
            tl.set(mainWrapperRef.current, {
                scale: 0.1,
                opacity: 0,
                borderRadius: "50%",
                width: "500px",
                height: "500px"
            });

            // Initial path: straight line at top (fully covered)
            // Initial path: complex flat line (fully covered)
            // Using a path with many points to allow smooth morphing to complex shapes
            const initialPath = "M0,0 C200,0 400,0 500,0 C600,0 800,0 1000,0 V1000 H0 Z";

            // "Splashy" Wave Path 1 - Multi-peak organic wave
            const wavyPath = "M0,50 C150,150 250,0 500,50 C700,100 850,0 1000,50 V1000 H0 Z";

            // "Splashy" Wave Path 2 - Alternate state for sloshing (peaks become troughs)
            // const wavyPath2 = "M0,50 C150,0 250,100 500,50 C700,0 850,100 1000,50 V1000 H0 Z"; // Not used directly in this simplified logic but good for reference

            tl.set(wavePathRef.current, { attr: { d: initialPath } });

            // 2. Wavy Growth Phase
            tl.to(mainWrapperRef.current, {
                scale: 1,
                opacity: 1,
                duration: 2,
                ease: "power2.out"
            });

            // Wobbly growth effect
            tl.to(state, {
                turb: 0.01,
                disp: 10,
                duration: 2,
                onUpdate: () => {
                    gsap.set("#reveal-turbulence", { attr: { baseFrequency: state.turb } });
                    gsap.set("#reveal-displacement", { attr: { scale: state.disp } });
                }
            }, 0);

            // 3. Wavy Reveal Phase (Sloshing Reveal)
            tl.to(liquidOverlayRef.current, {
                yPercent: 100, // Moves the entire SVG down
                duration: 3,
                ease: "none"
            });

            // Animate both paths for sloshing
            tl.to([wavePathRef.current, waveHighlightRef.current], {
                attr: { d: wavyPath },
                duration: 0.5,
                repeat: 5,
                yoyo: true,
                ease: "sine.inOut"
            }, "-=3");

            // 4. Morph Phase: To Rectangle (Full Screen)
            tl.to(mainWrapperRef.current, {
                borderRadius: "0px",
                width: "100%",
                height: "100%",
                duration: 1.5,
                ease: "power3.inOut"
            }, "-=1.5");

            // Final settle
            tl.to(state, {
                turb: 0,
                disp: 0,
                duration: 0.5,
                onUpdate: () => {
                    gsap.set("#reveal-turbulence", { attr: { baseFrequency: 0 } });
                    gsap.set("#reveal-displacement", { attr: { scale: 0 } });
                }
            });

            // Constant "Seed" animation for water vibe
            gsap.to("#ripple-turbulence", {
                attr: { seed: 1000 },
                duration: 60,
                repeat: -1,
                ease: "none"
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Interactive Ripple Loop
    useEffect(() => {
        const moveHandler = (e) => {
            if (!mainWrapperRef.current) return;
            const { left, top } = mainWrapperRef.current.getBoundingClientRect();
            mouseX.current = e.clientX - left;
            mouseY.current = e.clientY - top;
        };

        const wrapper = mainWrapperRef.current;
        wrapper.addEventListener('mousemove', moveHandler);

        const updateRipple = () => {
            followX.current += (mouseX.current - followX.current) * 0.1;
            followY.current += (mouseY.current - followY.current) * 0.1;
            const dist = Math.sqrt(Math.pow(mouseX.current - followX.current, 2) + Math.pow(mouseY.current - followY.current, 2));
            const rippleScale = gsap.utils.clamp(0, 30, dist * 0.6);
            gsap.set("#ripple-displacement", { attr: { scale: rippleScale } });
            gsap.set("#ripple-turbulence", { attr: { baseFrequency: 0.01 + rippleScale * 0.0004 } });
            requestAnimationFrame(updateRipple);
        };
        const animFrame = requestAnimationFrame(updateRipple);
        return () => {
            wrapper.removeEventListener('mousemove', moveHandler);
            cancelAnimationFrame(animFrame);
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen bg-[#050505] overflow-hidden flex items-center justify-center py-12"
        >
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <filter id="reveal-liquid">
                    <feTurbulence id="reveal-turbulence" type="fractalNoise" baseFrequency="0.05" numOctaves="2" />
                    <feDisplacementMap id="reveal-displacement" in="SourceGraphic" scale="100" />
                </filter>
                <filter id="interactive-ripple">
                    <feTurbulence id="ripple-turbulence" type="turbulence" baseFrequency="0.01" numOctaves="2" seed="1" result="wave" />
                    <feDisplacementMap id="ripple-displacement" in="SourceGraphic" in2="wave" scale="0" xChannelSelector="R" yChannelSelector="G" />
                </filter>
            </svg>

            <div ref={containerRef} className="relative w-full h-[90vh] flex items-center justify-center max-w-7xl">

                <div
                    ref={mainWrapperRef}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="relative overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.5)] bg-black group"
                    style={{
                        filter: isHovered ? 'url(#interactive-ripple)' : 'url(#reveal-liquid)',
                        transformOrigin: 'center center',
                        willChange: 'filter'
                    }}
                >
                    {/* The Full Image */}
                    <img
                        src="/images/img1.png"
                        alt="Success Impact"
                        className="w-full h-full object-contain bg-black pointer-events-none transition-transform duration-700 group-hover:scale-[1.12] scale-[1.1]"
                    />

                    {/* WAVY LIQUID REVEAL OVERLAY */}
                    <svg
                        ref={liquidOverlayRef}
                        className="absolute inset-x-0 -top-full w-full h-[200%] z-10 pointer-events-none"
                        viewBox="0 0 1000 1000"
                        preserveAspectRatio="none"
                        style={{ filter: 'url(#reveal-liquid)' }} // Applying the liquid displacement to the wave itself!
                    >
                        <path
                            ref={wavePathRef}
                            fill="#44D79E"
                            fillOpacity="0.6"
                            d="M0,0 Q500,0 1000,0 V1000 H0 Z"
                        />
                        {/* Surface Highlight Line */}
                        <path
                            ref={waveHighlightRef}
                            fill="none"
                            stroke="white"
                            strokeOpacity="0.3"
                            strokeWidth="2"
                            d="M0,0 Q500,0 1000,0"
                        />
                    </svg>
                </div>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#44D79E]/5 rounded-full blur-[120px] pointer-events-none z-0" />
        </section>
    );
};

export default LiquidImageSection;
