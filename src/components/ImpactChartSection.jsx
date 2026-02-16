import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ImpactChartSection = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 60%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse",
                }
            });

            // 1. Initial State
            tl.set(".chart-mask", { clipPath: "inset(0 100% 0 0)" });
            tl.set(".milestone-node", { scale: 0, opacity: 0 });
            tl.set(".summary-card--before", { x: -30, opacity: 0 });
            tl.set(".summary-card--after", { x: 30, opacity: 0 });
            tl.set(".divider-line", { scaleY: 0 });
            tl.set(".divider-text span", { opacity: 0, y: 10 });
            tl.set(".node-v-line", { scaleY: 0 });

            // 2. Center Divider & Text
            tl.to(".divider-line", {
                scaleY: 1,
                duration: 0.8,
                ease: "power2.out"
            })
                .to(".divider-text span", {
                    opacity: 0.3,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.2
                }, "-=0.4");

            // 3. SVG Line Sweep (Left to Right)
            tl.to(".chart-mask", {
                clipPath: "inset(0 0% 0 0)",
                duration: 3,
                ease: "none"
            }, "-=0.2");

            // 4. Milestone Nodes & Vertical lines - Wide Spacing (30% and 70%)
            // Left Milestone (30%)
            tl.to(".node-v-line--left", { scaleY: 0.6, duration: 0.4, ease: "power2.out" }, 1.5);
            tl.to(".node--left", { scale: 1, opacity: 1, duration: 0.4, stagger: 0.1, ease: "back.out(2)" }, 1.5);

            // Pop BEFORE Card
            tl.to(".summary-card--before", {
                x: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power3.out"
            }, 1.8);

            // Right Milestone (70%)
            tl.to(".node-v-line--right", { scaleY: 0.6, duration: 0.4, ease: "power2.out" }, 2.8);
            tl.to(".node--right", { scale: 1, opacity: 1, duration: 0.4, stagger: 0.1, ease: "back.out(2)" }, 2.8);

            // Pop AFTER Card
            tl.to(".summary-card--after", {
                x: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power3.out"
            }, 3.2);

            // Infinite Logo Pulse (Separate from TL)
            gsap.to(".logo-pulse-ring", {
                scale: 1.8,
                opacity: 0,
                duration: 2.5,
                repeat: -1,
                stagger: 0.6,
                ease: "sine.out"
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="impact"
            ref={sectionRef}
            className="relative pb-12 bg-[#050505] overflow-hidden border-b border-white/5"
        >
            <div className="w-full relative px-0">

                {/* Main Interaction Area - FULL BLEED DASHBOARD RIBBON */}
                <div className="relative h-[320px] md:h-[500px] w-full bg-gradient-to-b from-[#0a0a0a] to-[#050505] border-y border-white/10 p-4 md:p-8 overflow-hidden shadow-2xl">

                    {/* 1. Background Grid - Dashed */}
                    <div className="absolute inset-x-0 inset-y-8 pointer-events-none opacity-20">
                        <div className="absolute inset-0 grid grid-rows-6">
                            {[...Array(7)].map((_, i) => (
                                <div key={i} className="border-b border-dashed border-white/20 w-full h-full" />
                            ))}
                        </div>
                    </div>

                    {/* 2. Center Divider */}
                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
                        <div className="divider-line w-[1px] h-full bg-indigo-500/30 origin-top" />
                        <div className="divider-text absolute top-10 flex gap-24 text-[11px] font-bold tracking-[0.5em] uppercase whitespace-nowrap">
                            <span className="text-gray-500">Before</span>
                            <span className="text-gray-400">After</span>
                        </div>
                    </div>

                    {/* 3. SVG Chart Layer - EDGE TO EDGE */}
                    <div className="absolute inset-0 z-20">
                        <div className="chart-mask absolute inset-0">
                            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 400">
                                {/* Defs for Fill Gradients */}
                                <defs>
                                    <linearGradient id="fill-purple" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
                                        <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                                    </linearGradient>
                                    <linearGradient id="fill-yellow" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#eab308" stopOpacity="0.8" />
                                        <stop offset="100%" stopColor="#eab308" stopOpacity="0" />
                                    </linearGradient>
                                    <linearGradient id="fill-green" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8" />
                                        <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                                    </linearGradient>
                                </defs>

                                {/* Background Fills */}
                                <path d="M0,180 L150,200 L300,260 L500,300 L700,160 L850,80 L1000,40 V400 H0 Z" fill="url(#fill-purple)" className="opacity-40" />
                                <path d="M0,260 L150,280 L300,320 L500,340 L700,220 L850,180 L1000,140 V400 H0 Z" fill="url(#fill-yellow)" className="opacity-30" />
                                <path d="M0,320 L150,340 L300,360 L500,360 L700,280 L850,260 L1000,220 V400 H0 Z" fill="url(#fill-green)" className="opacity-20" />

                                {/* Main Path Strokes */}
                                <path d="M0,180 L150,200 L300,260 L500,300 L700,160 L850,80 L1000,40" fill="none" stroke="#6366f1" strokeWidth="3" className="drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                                <path d="M0,260 L150,280 L300,320 L500,340 L700,220 L850,180 L1000,140" fill="none" stroke="#eab308" strokeWidth="3" className="drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
                                <path d="M0,320 L150,340 L300,360 L500,360 L700,280 L850,260 L1000,220" fill="none" stroke="#22c55e" strokeWidth="3" className="drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                            </svg>
                        </div>

                        {/* Milestone Reality Nodes & Vertical Indicators (Unified SVG for alignment) */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1000 400">
                            {/* Vertical Indicator Lines - Now inside SVG for 1:1 matching */}
                            <line x1="300" y1="0" x2="300" y2="400" stroke="white" strokeWidth="1" className="node-v-line node-v-line--left opacity-10 origin-bottom" />
                            <line x1="700" y1="0" x2="700" y2="400" stroke="white" strokeWidth="1" className="node-v-line node-v-line--right opacity-10 origin-bottom" />

                            {/* Left Side Nodes */}
                            <circle cx="300" cy="260" r="4" fill="#6366f1" stroke="white" strokeWidth="1.5" className="milestone-node node--left" />
                            <circle cx="300" cy="320" r="4" fill="#eab308" stroke="white" strokeWidth="1.5" className="milestone-node node--left" />
                            <circle cx="300" cy="360" r="4" fill="#22c55e" stroke="white" strokeWidth="1.5" className="milestone-node node--left" />

                            {/* Right Side Nodes */}
                            <circle cx="700" cy="160" r="4" fill="#6366f1" stroke="white" strokeWidth="1.5" className="milestone-node node--right" />
                            <circle cx="700" cy="220" r="4" fill="#eab308" stroke="white" strokeWidth="1.5" className="milestone-node node--right" />
                            <circle cx="700" cy="280" r="4" fill="#22c55e" stroke="white" strokeWidth="1.5" className="milestone-node node--right" />
                        </svg>
                    </div>

                    {/* 4. BEFORE Summary Card - Wide Position */}
                    <div className="summary-card--before absolute left-6 md:left-24 top-10 md:top-14 z-30">
                        <div className="bg-[#121212]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-5 w-[200px] md:w-[240px] shadow-2xl">
                            <div className="space-y-4">
                                {[
                                    { label: "Deliverability", val: "57%", color: "#6366f1" },
                                    { label: "Meetings", val: "49%", color: "#eab308" },
                                    { label: "Revenue", val: "11%", color: "#22c55e" }
                                ].map((m) => (
                                    <div key={m.label} className="flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 rounded-sm" style={{ backgroundColor: m.color }} />
                                            <span className="text-[10px] md:text-xs text-gray-400 font-medium">{m.label}</span>
                                        </div>
                                        <span className="text-[10px] md:text-xs font-bold text-red-500/80 tracking-tighter">↓ {m.val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 5. AFTER Summary Card - Wide Position */}
                    <div className="summary-card--after absolute right-6 md:right-24 top-10 md:top-14 z-30">
                        <div className="bg-white rounded-xl p-4 md:p-5 w-[200px] md:w-[240px] shadow-2xl border border-white">
                            <div className="space-y-4">
                                {[
                                    { label: "Deliverability", val: "64%", color: "#6366f1" },
                                    { label: "Meetings", val: "52%", color: "#eab308" },
                                    { label: "Revenue", val: "26%", color: "#22c55e" }
                                ].map((m) => (
                                    <div key={m.label} className="flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 rounded-sm" style={{ backgroundColor: m.color }} />
                                            <span className="text-[10px] md:text-xs text-gray-900 font-bold">{m.label}</span>
                                        </div>
                                        <span className="text-[10px] md:text-xs font-bold text-[#44D79E]">↑ {m.val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 6. Center Milestone Logo - Simplified Glassmorphism (Single Layer) */}
                    <div className="absolute left-1/2 top-[75%] -translate-x-1/2 -translate-y-1/2 z-50">
                        <div className="relative w-28 h-28 md:w-40 md:h-40 aspect-square flex-none flex items-center justify-center">

                            {/* Outer Pulse Ring (Minimalist) */}
                            <div className="logo-pulse-ring absolute inset-[-5%] rounded-full border border-white/10" />

                            {/* Single Glass Disk Layer */}
                            <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_0_60px_rgba(0,0,0,0.5)]" />

                            {/* Solid Black Core (Logo Container) */}
                            <div className="w-18 h-18 md:w-28 md:h-28 aspect-square flex-none rounded-full bg-black flex items-center justify-center overflow-hidden p-4 shadow-[0_15px_40px_rgba(0,0,0,0.7)] z-10">
                                <img
                                    src="/images/logo.png"
                                    alt="e-Patang"
                                    className="w-full h-full object-contain filter brightness-90 contrast-125 hover:scale-110 transition-transform duration-500"
                                />
                            </div>

                            {/* Lighting Reflex */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-white/15 pointer-events-none" />
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default ImpactChartSection;
