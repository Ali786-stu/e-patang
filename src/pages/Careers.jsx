import React, { useMemo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TeamSection from '../components/TeamSection';
import IntegrationOrbit from '../components/IntegrationOrbit';

const FallingClouds = ({ progress }) => {
    const clouds = useMemo(() => [
        { id: 1, top: '5%', left: '-10%', scale: 2.5, url: 'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?auto=format&fit=crop&w=1000&q=80' },
        { id: 2, top: '20%', left: '60%', scale: 3, url: 'https://images.unsplash.com/photo-1499346030926-9a72daac6c63?auto=format&fit=crop&w=1000&q=80' },
        { id: 3, top: '40%', left: '5%', scale: 2.8, url: 'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?auto=format&fit=crop&w=1000&q=80' },
        { id: 4, top: '60%', left: '55%', scale: 3.2, url: 'https://images.unsplash.com/photo-1499346030926-9a72daac6c63?auto=format&fit=crop&w=1000&q=80' },
        { id: 5, top: '75%', left: '15%', scale: 2.6, url: 'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?auto=format&fit=crop&w=1000&q=80' },
    ], []);

    const opacity = useTransform(progress, [0.4, 0.6, 0.95], [0, 0.6, 0]);
    const yTransform = useTransform(progress, [0.3, 0.95], ["-120vh", "40vh"]);

    return (
        <motion.div style={{ opacity, y: yTransform }} className="absolute inset-0 pointer-events-none z-10">
            {clouds.map((c) => (
                <motion.div
                    key={c.id}
                    className="absolute"
                    style={{
                        top: c.top,
                        left: c.left,
                        scale: c.scale,
                        filter: 'blur(2px)',
                        pointerEvents: 'none'
                    }}
                >
                    <img
                        src={c.url}
                        alt="Real Cloud"
                        className="w-[500px] h-auto object-contain opacity-70 mix-blend-screen"
                        style={{
                            maskImage: 'radial-gradient(circle, black 30%, transparent 80%)',
                            WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 80%)'
                        }}
                    />
                </motion.div>
            ))}
        </motion.div>
    );
};

const CelestialParticles = ({ opacity: parentOpacity }) => {
    const particles = useMemo(() => {
        return Array.from({ length: 45 }).map((_, i) => ({
            id: i,
            size: Math.random() * 2 + 0.5,
            x: Math.random() * 100,
            y: Math.random() * 100,
            opacity: Math.random() * 0.5 + 0.2,
            duration: Math.random() * 15 + 10,
            driftX: Math.random() * 20 - 10,
            driftY: Math.random() * 20 - 10,
            color: i % 3 === 0 ? '#00E0FF' : i % 3 === 1 ? '#10B981' : '#FFFFFF'
        }));
    }, []);

    return (
        <motion.div style={{ opacity: parentOpacity }} className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
            >
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        className="absolute rounded-full"
                        style={{
                            width: p.size,
                            height: p.size,
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                            backgroundColor: p.color,
                            opacity: p.opacity,
                            boxShadow: `0 0 10px ${p.color}`
                        }}
                        animate={{
                            x: [0, p.driftX, 0],
                            y: [0, p.driftY, 0],
                            opacity: [p.opacity, p.opacity * 0.5, p.opacity]
                        }}
                        transition={{
                            duration: p.duration,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </motion.div>
        </motion.div>
    );
};

const CareersHero = ({ scrollYProgress }) => {
    // 1. Celestial/Arc Transforms (Space Phase: 0% - 30%)
    const opacityCelestial = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    const opacityArc = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
    // REMOVED yArc move to keep background static at the top phase.

    // 2. Rising Kite Transforms (patang-img.png) (Atmosphere Phase: 35% - 100%)
    const newKiteY = useTransform(scrollYProgress, [0.4, 0.6, 0.65], ["100vh", "0vh", "-120vh"]); // Exits much faster
    const newKiteOpacity = useTransform(scrollYProgress, [0.4, 0.55, 0.6, 0.65], [0, 1, 1, 0]); // Fades out completely early
    const newKiteScale = useTransform(scrollYProgress, [0.4, 0.6, 0.65], [0.4, 1, 0.8]);

    // 3. Background Color Shift
    const bgShift = useTransform(scrollYProgress, [0.25, 0.85], ["#000000", "#080E1A"]);

    return (
        <motion.div
            style={{ backgroundColor: bgShift }}
            className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden px-6"
        >
            {/* 0. Space Particles Layer */}
            <CelestialParticles opacity={opacityCelestial} />

            {/* 0.5 Falling Clouds Layer */}
            <FallingClouds progress={scrollYProgress} />

            {/* 1. Antigravity Signature Atmosphere (Cyan/Emerald/Midnight) - FIXED Position */}
            <motion.div style={{ opacity: opacityArc }} className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                {/* Signature Top Spotlight - Velvet Midnight to Cyan */}
                <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[150%] h-[700px] bg-gradient-to-b from-[#0029FF]/25 via-[#00E0FF]/10 to-transparent blur-[120px]" />

                {/* Emerald & Cyan Horizon Mist */}
                <div className="absolute top-[-100px] left-[-100px] w-[600px] h-[600px] bg-[#10B981]/15 blur-[140px] rounded-full" />
                <div className="absolute top-[-100px] left-[-100px] w-[600px] h-[600px] bg-[#10B981]/15 blur-[140px] rounded-full" />
                <div className="absolute top-[-100px] right-[-100px] w-[600px] h-[600px] bg-[#00E0FF]/15 blur-[140px] rounded-full" />
            </motion.div>

            {/* 2. Wide Cinematic Signature Horizon Arc - FIXED Position */}
            <motion.div style={{ opacity: opacityArc }} className="absolute top-0 left-0 w-full h-full pointer-events-none flex justify-center">
                <motion.svg
                    width="140%"
                    height="800"
                    viewBox="0 0 1400 800"
                    initial={{ y: -600, scale: 0.9, opacity: 0 }}
                    animate={{ y: 0, scale: 1, opacity: 1 }}
                    transition={{ duration: 6, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-[60px] md:top-[120px]"
                >
                    <defs>
                        {/* Signature Premium Glow Gradient */}
                        <linearGradient id="signatureGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#00E0FF" stopOpacity="0" />
                            <stop offset="20%" stopColor="#00E0FF" stopOpacity="0.4" />
                            <stop offset="50%" stopColor="#10B981" stopOpacity="0.8" />
                            <stop offset="80%" stopColor="#00E0FF" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#00E0FF" stopOpacity="0" />
                        </linearGradient>

                        {/* Velvet Shadow Core */}
                        <radialGradient id="velvetShadow" cx="50%" cy="0%" r="100%">
                            <stop offset="0%" stopColor="#0029FF" stopOpacity="0.15" />
                            <stop offset="50%" stopColor="transparent" stopOpacity="0" />
                        </radialGradient>

                        <filter id="ultraHaze" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="25" />
                        </filter>
                    </defs>

                    {/* Wide Circular Horizon Path (Cinematic Framing) */}
                    {/* Layer 1: Ambient Horizon Fill */}
                    <path d="M -100,0 Q 700,750 1500,0" fill="url(#velvetShadow)" opacity="0.6" />

                    {/* Layer 2: Deep Blue Glow Halo */}
                    <path d="M -100,0 Q 700,720 1500,0" stroke="#0029FF" strokeWidth="40" fill="none" opacity="0.2" filter="url(#ultraHaze)" />

                    {/* Layer 3: Cyan/Emerald Signature Glowing Line */}
                    <path d="M -100,0 Q 700,700 1500,0" stroke="url(#signatureGlow)" strokeWidth="6" fill="none" opacity="0.6" filter="blur(4px)" />

                    {/* Layer 4: Sharp Precision Edge */}
                    <path d="M -100,0 Q 700,700 1500,0" stroke="#00E0FF" strokeWidth="1.5" fill="none" opacity="0.9" />

                    {/* Signature "Northern Lights" Flare Point */}
                    <g transform="translate(700, 350)">
                        <circle r="150" fill="url(#velvetShadow)" opacity="0.8" />
                        <motion.circle
                            r="60"
                            fill="#10B981"
                            filter="blur(45px)"
                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        />
                        <circle r="2" fill="white" filter="blur(2px)" />
                    </g>
                </motion.svg>
            </motion.div>

            {/* 3. Rising Cinematic Kite (patang-img.png) */}
            <motion.div
                style={{ y: newKiteY, opacity: newKiteOpacity, scale: newKiteScale }}
                className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none"
            >
                <img
                    src="/video/patang-img.png"
                    alt="Rising Kite"
                    className="w-80 md:w-[450px] h-auto drop-shadow-[0_30px_60px_rgba(0,224,255,0.4)]"
                />
            </motion.div>

            {/* Background Signature Depth Glow */}
            <motion.div style={{ opacity: opacityArc }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#10B981]/5 rounded-full blur-[200px] pointer-events-none" />

            {/* Kite + Ribbon Group: FIXED Position while soaring */}
            <motion.div
                style={{ opacity: opacityArc }}
                initial={{ x: "120vw" }}
                animate={{ x: 0 }}
                transition={{
                    duration: 8, // Smooth cinematic entrance
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.2
                }}
                className="relative z-20 flex items-center"
            >
                {/* Leading Kite (Facing Left) */}
                <motion.div
                    className="relative z-30"
                    animate={{ x: -600, opacity: 0 }}
                    transition={{ duration: 3, delay: 5, ease: "easeInOut" }}
                >
                    <motion.div
                        animate={{
                            y: [0, -3, 0], // Subtle, stable float
                            rotate: [-91, -89, -91] // Minimal wobble
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        {/* Cyan Roadmap Kite Design */}
                        <svg width="140" height="140" viewBox="-35 -35 70 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_20px_40px_rgba(16,185,129,0.4)]">
                            <defs>
                                <linearGradient id="kite-final-simple" x1="0" x2="1" y1="0" y2="1">
                                    <stop offset="0%" stopColor="#4FC593" />
                                    <stop offset="100%" stopColor="#00E0FF" />
                                </linearGradient>
                            </defs>
                            <path d="M0,-18 L-15,0 L0,18 L15,0 Z" fill="url(#kite-final-simple)" stroke="rgba(100,100,100,0.4)" strokeWidth="0.5" />

                            {/* Visible Bamboo/Frame (Gray) */}
                            <path d="M0,-18 V18" stroke="rgba(100,100,100,0.8)" strokeWidth="0.6" />
                            <path d="M-15,0 Q0,-15 15,0" stroke="rgba(100,100,100,0.8)" strokeWidth="0.6" fill="none" />

                            <path d="M0,18 L-4,35 L4,35 Z" fill="#00E0FF" opacity="0.8" />
                        </svg>
                    </motion.div>
                </motion.div>

                {/* Glassmorphism Ribbon (Following) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 2 }}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 px-12 py-5 rounded-r-3xl flex items-center justify-center shadow-[20px_20px_60px_rgba(0,0,0,0.4)] -ml-5 pl-20"
                >
                    <span className="text-white/90 text-xs md:text-sm font-light tracking-[0.4em] uppercase whitespace-nowrap">
                        Shape the Future of Digital Experience
                    </span>
                </motion.div>
            </motion.div>

            {/* Trailing Background Line for Depth */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none -translate-y-1/2" />
        </motion.div>
    );
};

const Careers = () => {
    const containerRef = useRef(null);
    const heroZoneRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroZoneRef,
        offset: ["start start", "end end"]
    });

    // Content Mask: Follow the kite's ascension phase.
    const contentOpacity = useTransform(scrollYProgress, [0.6, 0.7], [0, 1]); // Fades in completely by 0.7
    const contentPointerEvents = useTransform(scrollYProgress, [0.65, 1], ["none", "auto"]); // Interactive by 0.65

    // Content Scroll: Move content up to reveal bottom section (Orbit) - DELAYED to ensure Team is visible first
    const contentScrollY = useTransform(scrollYProgress, [0.85, 1], ["0vh", "-60vh"]); // Only starts moving well AFTER team is visible

    return (
        <div ref={containerRef} className="relative bg-black transition-colors duration-500">
            {/* Scroll Animation Zone (Extended for Content Scroll) */}
            <div ref={heroZoneRef} className="h-[850vh] relative">
                <CareersHero scrollYProgress={scrollYProgress} />

                {/* Sub-sections: Sticky Overhead Layer for In-Place Reveal phase. */}
                <motion.div
                    style={{
                        opacity: contentOpacity,
                        pointerEvents: contentPointerEvents
                    }}
                    className="sticky top-0 h-screen w-full flex flex-col items-center justify-center bg-[#080E1A] overflow-hidden"
                >
                    {/* Scale Wrapper for Bubble Entry Effect phase. */}
                    <motion.div
                        className="w-full flex flex-col items-center"
                        style={{ y: contentScrollY }}
                    >
                        {/* Team Bubbles (Top Cluster) */}
                        <div className="w-full shrink-0">
                            <TeamSection isEmbedded={true} />
                        </div>

                        {/* Orbit Ring (Bottom Cluster) - Visible Universe View */}
                        <div className="w-full shrink-0 mt-24 pb-40">
                            <IntegrationOrbit isCompact={true} />
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default Careers;
