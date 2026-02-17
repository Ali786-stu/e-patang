import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Typewriter from './Typewriter';
import MagneticButton from './MagneticButton';
import PremiumButton from './PremiumButton';

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
                    end: "+=200%", // Pin for exactly 2 full scrolls (200% of viewport height)
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

    // Interactive Ripple Loop - Optimized for smoothness (Smoothing out jitter)
    useEffect(() => {
        const moveHandler = (e) => {
            if (!mainWrapperRef.current) return;
            const { left, top, width, height } = mainWrapperRef.current.getBoundingClientRect();
            // Normalize mouse position relative to image
            mouseX.current = e.clientX - left;
            mouseY.current = e.clientY - top;
        };

        const wrapper = mainWrapperRef.current;
        wrapper.addEventListener('mousemove', moveHandler);

        let lastDist = 0;
        const updateRipple = () => {
            // Smoothly follow mouse with lerping (0.05 for high inertia)
            followX.current += (mouseX.current - followX.current) * 0.05;
            followY.current += (mouseY.current - followY.current) * 0.05;

            const dx = mouseX.current - followX.current;
            const dy = mouseY.current - followY.current;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Lerp the distance/scale to prevent "jhiljhila pan" (shaking)
            lastDist += (dist - lastDist) * 0.1;

            // Subtler Scale: Max 12 instead of 30 for premium feel
            const rippleScale = gsap.utils.clamp(0, 12, lastDist * 0.4);

            // Subtler Frequency: 0.005 base for organic waves
            const baseFreq = 0.005 + rippleScale * 0.0002;

            gsap.set("#ripple-displacement", { attr: { scale: rippleScale } });
            gsap.set("#ripple-turbulence", { attr: { baseFrequency: baseFreq } });

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
                                    <div className="w-full sm:w-auto">
                                        <MagneticButton distance={0.4}>
                                            <PremiumButton
                                                className="!bg-[#44D79E] !text-black shadow-[0_0_30px_rgba(68,215,158,0.3)]"
                                                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                            >
                                                START A PROJECT
                                            </PremiumButton>
                                        </MagneticButton>
                                    </div>
                                    <div className="w-full sm:w-auto">
                                        <MagneticButton distance={0.4}>
                                            <PremiumButton
                                                variant="outline"
                                                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                                            >
                                                OUR WORK
                                            </PremiumButton>
                                        </MagneticButton>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN: LIQUID REVEAL ANIMATION */}
                    <div ref={liquidContainerRef} className="relative w-full h-[35vh] lg:h-[85vh] flex items-end pb-6 lg:pb-10 justify-center lg:justify-end lg:pr-10 mt-16 lg:mt-0">
                        {/* Shadow Wrapper: Adds depth to the masked image */}
                        <div className="relative w-full max-w-[220px] lg:max-w-[330px] drop-shadow-[0_10px_50px_rgba(80,215,158,0.4)]">
                            <div
                                ref={mainWrapperRef}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                className="relative overflow-hidden group w-full h-auto"
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
                                    maskPosition: 'bottom center',
                                    WebkitMaskPosition: 'bottom center'
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
            </div>
        </section>
    );
};

export default Hero;
