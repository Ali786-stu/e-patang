import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Typewriter from './Typewriter';
import MagneticButton from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const containerRef = useRef(null);
    const contentRef = useRef(null);

    // --- Liquid Animation Refs ---
    const liquidSectionRef = useRef(null);
    const liquidContainerRef = useRef(null);
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

    const titleText = "The Best Marketing Minds Behind Your Brand's Success";
    const words = titleText.split(" ");

    const wordVariants = {
        hidden: { y: "100%", opacity: 0, rotate: 2 },
        visible: {
            y: 0,
            opacity: 1,
            rotate: 0,
            transition: {
                duration: 0.8,
                ease: [0.2, 0.65, 0.3, 0.9], // Elegant Apple-style ease
            },
        },
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.3,
            },
        },
    };

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Master Timeline for Pinned Section
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=300%", // Pin for 300% of viewport height
                    pin: true,
                    scrub: 1,
                }
            });

            // --- ANIMATION SEQUENCE ---

            // Internal animation state for wobbly growth
            const state = { turb: 0.05, disp: 100, waveY: 0, waveMorph: 0 };

            // 1. Initial State
            tl.set(mainWrapperRef.current, {
                scale: 0.95,
                opacity: 0,
                borderRadius: "0%",
                width: "100%",
                height: "100%",
                y: 0,
                x: 0
            });

            const initialPath = "M0,0 C200,0 400,0 500,0 C600,0 800,0 1000,0 V1000 H0 Z";
            const wavyPath = "M0,50 C150,150 250,0 500,50 C700,100 850,0 1000,50 V1000 H0 Z";

            tl.set(wavePathRef.current, { attr: { d: initialPath } });

            // 2. Wavy Growth Phase
            tl.to(mainWrapperRef.current, {
                scale: 1.4,
                opacity: 1,
                duration: 1.5,
                ease: "power2.out"
            });

            tl.to(state, {
                turb: 0,
                disp: 0,
                duration: 2,
                onUpdate: () => {
                    gsap.set("#reveal-turbulence", { attr: { baseFrequency: state.turb } });
                    gsap.set("#reveal-displacement", { attr: { scale: state.disp } });
                }
            }, 0);

            // 3. Wavy Reveal Phase (Sloshing Reveal) — THIS IS THE "LAYER"
            tl.to(liquidOverlayRef.current, {
                yPercent: 100,
                duration: 3,
                ease: "none"
            });

            tl.to([wavePathRef.current, waveHighlightRef.current], {
                attr: { d: wavyPath },
                duration: 0.5,
                repeat: 5,
                yoyo: true,
                ease: "sine.inOut"
            }, "-=3");

            // 4. Morph Phase: To Rectangle
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

            gsap.to("#ripple-turbulence", {
                attr: { seed: 1000 },
                duration: 60,
                repeat: -1,
                ease: "none"
            });

        }, containerRef);

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
            id="home"
            ref={containerRef}
            className="relative min-h-screen bg-[#040A15] overflow-hidden flex items-start pt-16 md:pt-20"
        >
            {/* SVG FILTERS */}
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

            <div className="container mx-auto px-6 lg:px-12 relative z-10 h-auto pt-0">
                <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-8 items-center">

                    {/* LEFT COLUMN: TEXT CONTENT */}
                    <div className="relative z-20 flex flex-col justify-center items-center text-center lg:items-start lg:text-left lg:pl-10 mt-8 lg:mt-0">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="max-w-xl lg:max-w-2xl w-full"
                        >
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium tracking-tight leading-tight mb-8 text-white/90 min-h-[3.5em] md:min-h-[3em] break-words mx-auto lg:mx-0">
                                <Typewriter text="The Best Marketing Minds Behind Your Brand's Success" />
                            </h1>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.5, duration: 0.8 }}
                                className="space-y-8 flex flex-col items-center lg:items-start"
                            >
                                <p className="text-lg md:text-xl text-gray-400 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
                                    We deliver the best-in-class marketing solutions tailored to elevate your brand.
                                    Trust us to turn bold ideas into measurable results.
                                </p>

                                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 w-full">
                                    <MagneticButton className="bg-[#44D79E] text-black font-bold hover:shadow-[0_0_30px_rgba(68,215,158,0.4)] transition-shadow duration-300 border-none px-6 py-3 lg:px-8 lg:py-4">
                                        START A PROJECT
                                    </MagneticButton>
                                    <MagneticButton className="border border-white/20 text-white font-bold hover:bg-white/10 transition-colors duration-300 px-6 py-3 lg:px-8 lg:py-4">
                                        OUR WORK
                                    </MagneticButton>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN: LIQUID REVEAL ANIMATION */}
                    <div ref={liquidContainerRef} className="relative w-full h-[35vh] lg:h-[85vh] flex items-center justify-center lg:justify-end lg:pr-10 mt-16 lg:mt-0">
                        <div
                            ref={mainWrapperRef}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            className="relative overflow-hidden group w-full max-w-[220px] lg:max-w-[330px] h-auto"
                            style={{
                                filter: isHovered ? 'url(#interactive-ripple)' : 'url(#reveal-liquid)',
                                transformOrigin: 'center center',
                                willChange: 'filter',
                                maskImage: 'url(/images/img.png)',
                                WebkitMaskImage: 'url(/images/img.png)',
                                maskSize: 'contain',
                                WebkitMaskSize: 'contain',
                                maskRepeat: 'no-repeat',
                                WebkitMaskRepeat: 'no-repeat',
                                maskPosition: 'center',
                                WebkitMaskPosition: 'center'
                            }}
                        >
                            <img
                                src="/images/img.png"
                                alt="Success Impact"
                                className="w-full h-full object-contain pointer-events-none"
                            />

                            <svg
                                ref={liquidOverlayRef}
                                className="absolute inset-x-0 -top-full w-full h-[200%] z-10 pointer-events-none"
                                viewBox="0 0 1000 1000"
                                preserveAspectRatio="none"
                                style={{ filter: 'url(#reveal-liquid)' }}
                            >
                                <path
                                    ref={wavePathRef}
                                    fill="#44D79E"
                                    fillOpacity="0.6"
                                    d="M0,0 Q500,0 1000,0 V1000 H0 Z"
                                />
                            </svg>
                        </div>
                    </div>

                </div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30"
            >
                <span className="text-xs uppercase tracking-[0.3em] text-gray-500">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-[#44D79E] to-transparent" />
            </motion.div>
        </section>
    );
};

export default Hero;
