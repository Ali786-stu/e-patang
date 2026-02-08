import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import MagneticButton from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
    const sectionRef = useRef(null);
    const scrollContainerRef = useRef(null);
    const progressLineRef = useRef(null);
    const cardsRef = useRef([]);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const cards = cardsRef.current;
            const totalScrollWidth = scrollContainerRef.current.scrollWidth - window.innerWidth;

            // Horizontal Scroll Timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=300%",
                    pin: true,
                    scrub: 1.5,
                    anticipatePin: 1,
                }
            });

            // Animate horizontal scroll
            tl.to(scrollContainerRef.current, {
                x: -totalScrollWidth,
                ease: "none",
                duration: 1
            });

            // Animate progress line
            tl.to(progressLineRef.current, {
                scaleX: 1,
                ease: "none",
                duration: 1
            }, 0);

            // Card scale animations (stagger)
            cards.forEach((card, index) => {
                if (!card) return;

                const startProgress = index / cards.length;
                const endProgress = (index + 1) / cards.length;

                tl.to(card, {
                    scale: 1.05,
                    duration: 0.2,
                    ease: "power2.out"
                }, startProgress);

                tl.to(card, {
                    scale: 1,
                    duration: 0.2,
                    ease: "power2.in"
                }, endProgress);
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
        <section
            ref={sectionRef}
            className="relative h-screen w-full bg-[#050505] overflow-hidden"
        >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#050505] via-[#0a0a0a] to-[#050505] opacity-50" />

            {/* Overflow Wrapper */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Horizontal Scroll Container */}
                <div
                    ref={scrollContainerRef}
                    className="absolute inset-0 flex items-center gap-10 px-12"
                    style={{ width: 'max-content' }}
                >
                    {/* Card 1: Introduction */}
                    <div
                        ref={el => cardsRef.current[0] = el}
                        className="relative flex-shrink-0 w-[85vw] md:w-[65vw] h-[60vh] rounded-3xl overflow-hidden transition-transform duration-300"
                        style={{
                            background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 141, 194, 0.1), transparent 40%)'
                        }}
                        onMouseMove={handleMouseMove}
                    >
                        {/* Glassmorphism Background */}
                        <div className="absolute inset-0 bg-white/5 backdrop-blur-md border border-white/10" />

                        <div className="relative z-10 h-full flex flex-col md:flex-row items-center justify-center p-8 md:p-12 gap-8">
                            {/* Left: Image */}
                            <div className="flex-shrink-0 w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden border-4 border-[#44D79E]/30 shadow-2xl">
                                <img
                                    src="/about-img/Akshita.png"
                                    alt="Akshita"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Right: Content */}
                            <div className="flex-1 text-left max-w-xl">
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className="text-4xl md:text-6xl font-display font-bold text-white mb-6"
                                >
                                    Hello, I am <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#44D79E] to-teal-400">Akshita</span>
                                </motion.h2>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="text-lg md:text-2xl text-gray-300 leading-relaxed"
                                >
                                    I am a creative social media buyer with experience managing campaigns with over <span className="text-[#44D79E] font-bold">120 Crores+</span> budgets.
                                </motion.p>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Mission */}
                    <div
                        ref={el => cardsRef.current[1] = el}
                        className="relative flex-shrink-0 w-[85vw] md:w-[65vw] h-[60vh] rounded-3xl overflow-hidden transition-transform duration-300"
                        style={{
                            background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 141, 194, 0.1), transparent 40%)'
                        }}
                        onMouseMove={handleMouseMove}
                    >
                        {/* Glassmorphism Background */}
                        <div className="absolute inset-0 bg-white/5 backdrop-blur-md border border-white/10" />

                        <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 md:p-16 text-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                                className="max-w-3xl"
                            >
                                <div className="text-[#44D79E] text-sm md:text-base font-bold tracking-[0.3em] uppercase mb-6 opacity-80">
                                    Our Mission
                                </div>
                                <h3 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-8">
                                    On an initiative to empower <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#44D79E] to-teal-400">1 million+</span> small and medium-sized enterprises
                                </h3>
                                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                                    to leverage digital media to achieve business goals.
                                </p>
                            </motion.div>
                        </div>
                    </div>

                    {/* Card 3: CTA */}
                    <div
                        ref={el => cardsRef.current[2] = el}
                        className="relative flex-shrink-0 w-[85vw] md:w-[65vw] h-[60vh] rounded-3xl overflow-hidden transition-transform duration-300"
                        style={{
                            background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 141, 194, 0.1), transparent 40%)'
                        }}
                        onMouseMove={handleMouseMove}
                    >
                        {/* Glassmorphism Background */}
                        <div className="absolute inset-0 bg-white/5 backdrop-blur-md border border-white/10" />

                        <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 md:p-16 text-center gap-8">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <h3 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6">
                                    Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#44D79E] to-teal-400">Transform</span> Your Brand?
                                </h3>
                                <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto">
                                    Let's collaborate and create something extraordinary together.
                                </p>
                            </motion.div>

                            <MagneticButton
                                className="px-12 py-6 bg-[#44D79E] text-black text-xl font-bold hover:shadow-[0_0_50px_rgba(68,215,158,0.6)] transition-all duration-300 border-none"
                            >
                                Let's Work Together
                            </MagneticButton>
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-64 h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                    ref={progressLineRef}
                    className="h-full bg-gradient-to-r from-[#44D79E] to-teal-400 origin-left"
                    style={{ transform: 'scaleX(0)' }}
                />
            </div>

            {/* Scroll Hint */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-xs uppercase tracking-[0.3em] text-gray-500">Scroll to Explore</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-[#44D79E] to-transparent" />
            </motion.div>
        </section>
    );
};

export default AboutSection;
