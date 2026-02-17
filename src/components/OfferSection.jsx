import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Search, Share2, TrendingUp, Globe, ArrowRight } from 'lucide-react';
import MagicCard from './MagicCard';
import MagneticButton from './MagneticButton';
import PremiumButton from './PremiumButton';

const OfferSection = () => {
    const sectionRef = useRef(null);
    const seoGraphRef = useRef(null);
    const smmFeedRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // 1. SEO Card Graph Animation (Rising Trend)
            if (seoGraphRef.current) {
                gsap.fromTo(seoGraphRef.current,
                    { strokeDashoffset: 500 },
                    {
                        strokeDashoffset: 0,
                        duration: 3,
                        repeat: -1,
                        ease: "power2.inOut",
                        yoyo: true
                    }
                );
            }

            // 2. SMM Feed Floating Animation
            if (smmFeedRef.current) {
                gsap.to(smmFeedRef.current, {
                    y: -120,
                    duration: 12,
                    repeat: -1,
                    ease: "none"
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const services = [
        {
            title: "SEO",
            category: "Optimum Visibility",
            icon: <Search className="w-6 h-6 text-[#44D79E]" />,
            glow: "68, 215, 158",
            content: (
                <div className="relative w-full h-[160px] bg-black/60 rounded-xl border border-white/5 overflow-hidden p-4 flex flex-col justify-between shadow-inner">
                    <div className="flex justify-between items-start relative z-10">
                        <div>
                            <p className="text-[8px] text-gray-500 uppercase font-black tracking-widest mb-1">Target Keywords</p>
                            <h4 className="text-xl font-black text-[#44D79E] drop-shadow-[0_0_10px_rgba(68,215,158,0.3)]">Top 3 Rank</h4>
                        </div>
                        <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#44D79E] animate-pulse" />
                            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                        </div>
                    </div>
                    {/* High-Fidelity SEO Graph */}
                    <div className="absolute inset-0 pt-12 overflow-hidden pointer-events-none">
                        <svg className="w-full h-full opacity-60" viewBox="0 0 100 40" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="seoGradient" x1="0" x2="0" y1="0" y2="1">
                                    <stop offset="0%" stopColor="#44D79E" stopOpacity="0.3" />
                                    <stop offset="100%" stopColor="#44D79E" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            {/* Grid lines */}
                            <line x1="0" y1="10" x2="100" y2="10" stroke="white/5" strokeWidth="0.1" />
                            <line x1="0" y1="20" x2="100" y2="20" stroke="white/5" strokeWidth="0.1" />
                            <line x1="0" y1="30" x2="100" y2="30" stroke="white/5" strokeWidth="0.1" />

                            {/* Fill Area */}
                            <path
                                d="M0,40 L0,32 Q10,35 20,25 T40,28 T60,15 T80,18 T100,8 V40 Z"
                                fill="url(#seoGradient)"
                            />
                            {/* Actual Data Line */}
                            <path
                                ref={seoGraphRef}
                                d="M0,32 Q10,35 20,25 T40,28 T60,15 T80,18 T100,8"
                                fill="none"
                                stroke="#44D79E"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeDasharray="500"
                            />
                            {/* Projection Line (Dashed) */}
                            <path
                                d="M60,15 T80,10 T100,2"
                                fill="none"
                                stroke="white"
                                strokeWidth="0.5"
                                strokeDasharray="2,2"
                                opacity="0.3"
                            />
                            {/* Data Points */}
                            <circle cx="20" cy="25" r="1.5" fill="#44D79E" />
                            <circle cx="60" cy="15" r="1.5" fill="#44D79E" />
                            <circle cx="100" cy="8" r="1.5" fill="#44D79E" className="animate-ping" />
                        </svg>
                    </div>
                </div>
            ),
            description: "Crush the competition with high-velocity SEO strategies that put you on page #1."
        },
        {
            title: "SMM",
            category: "Social Dominance",
            icon: <Share2 className="w-6 h-6 text-[#00A3DA]" />,
            glow: "0, 163, 218",
            content: (
                <div className="relative w-full h-[160px] bg-black/60 rounded-xl border border-white/5 overflow-hidden flex flex-col pt-4 items-center">
                    <div className="w-[100px] h-[140px] bg-[#0c0c0c] rounded-t-xl border-x border-t border-white/10 relative shadow-2xl overflow-hidden">
                        {/* Insta-style header */}
                        <div className="w-full h-8 border-b border-white/5 flex items-center px-2 gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-white/5" />
                            <div className="w-10 h-1.5 bg-white/10 rounded-full" />
                        </div>
                        {/* Feed items */}
                        <div ref={smmFeedRef} className="flex flex-col">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="w-full flex flex-col p-2 gap-1.5 border-b border-white/5 last:border-0">
                                    <div className="flex gap-1.5 items-center">
                                        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#00A3DA] to-[#44D79E]/20" />
                                        <div className="w-8 h-1 bg-white/10 rounded-full" />
                                    </div>
                                    <div className="w-full h-12 bg-white/5 rounded flex items-center justify-center">
                                        <Share2 className="w-4 h-4 text-white/5" />
                                    </div>
                                    <div className="w-3/4 h-1 bg-white/5 rounded-full" />
                                </div>
                            ))}
                        </div>
                        {/* Top Notch UI overlay */}
                        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#0c0c0c] to-transparent z-10" />
                    </div>
                </div>
            ),
            description: "Building magnetic social presence that turns followers into loyal brand advocates."
        },
        {
            title: "ADD/PPC",
            category: "Paid Velocity",
            icon: <TrendingUp className="w-6 h-6 text-purple-400" />,
            glow: "139, 92, 246",
            content: (
                <div className="relative w-full h-[160px] bg-black/60 rounded-xl border border-white/5 overflow-hidden p-4 flex flex-col gap-3">
                    <div className="grid grid-cols-2 gap-2">
                        <div className="bg-white/5 rounded-lg border border-white/10 p-2 text-center">
                            <p className="text-[7px] text-gray-500 uppercase font-black mb-1">ROAS</p>
                            <span className="text-sm font-black text-purple-400">8.4x</span>
                        </div>
                        <div className="bg-white/5 rounded-lg border border-white/10 p-2 text-center">
                            <p className="text-[7px] text-gray-500 uppercase font-black mb-1">CPA</p>
                            <span className="text-sm font-black text-blue-400">$2.1</span>
                        </div>
                    </div>
                    {/* Performance Bar Chart SVG */}
                    <div className="flex-1 bg-white/5 rounded-lg border border-white/10 p-3 flex flex-col justify-center">
                        <div className="flex items-end justify-between h-12 gap-1 px-1">
                            {[40, 70, 45, 90, 60, 85, 55].map((h, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    whileInView={{ height: `${h}%` }}
                                    transition={{ duration: 1, delay: i * 0.1 }}
                                    className={`w-full rounded-t-[2px] ${i === 3 ? 'bg-purple-500 shadow-[0_0_10px_rgba(139,92,246,0.5)]' : 'bg-white/10'}`}
                                />
                            ))}
                        </div>
                        <div className="flex justify-between px-1 mt-2">
                            <span className="text-[6px] text-gray-600 font-black">MON</span>
                            <span className="text-[6px] text-gray-600 font-black">SUN</span>
                        </div>
                    </div>
                </div>
            ),
            description: "High-precision ad campaigns designed for maximum ROI and instant traffic velocity."
        },
        {
            title: "Website",
            category: "Digital Core",
            icon: <Globe className="w-6 h-6 text-white" />,
            glow: "255, 255, 255",
            content: (
                <div className="relative w-full h-[160px] bg-black/60 rounded-xl border border-white/5 overflow-hidden flex flex-col items-center pt-6">
                    <div className="w-[130px] h-full bg-[#080808] rounded-t-xl border-x border-t border-white/20 p-1.5 relative shadow-2xl flex">
                        {/* Sidebar Mock */}
                        <div className="w-5 h-full border-r border-white/5 flex flex-col gap-2 pt-4">
                            {[...Array(3)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-white/5 mx-auto" />)}
                        </div>
                        {/* Content Mock */}
                        <div className="flex-1 flex flex-col p-2 gap-2 pt-3">
                            <div className="flex gap-1">
                                <div className="w-1 h-1 rounded-full bg-red-500/20" />
                                <div className="w-1 h-1 rounded-full bg-yellow-500/20" />
                                <div className="w-1 h-1 rounded-full bg-green-500/20" />
                            </div>
                            <div className="w-full h-8 bg-gradient-to-br from-white/5 to-transparent rounded shadow-inner" />
                            <div className="grid grid-cols-2 gap-1.5">
                                <div className="w-full h-4 bg-white/5 rounded" />
                                <div className="w-full h-4 bg-white/5 rounded" />
                            </div>
                            <div className="w-full h-12 bg-white/5 rounded" />
                        </div>
                    </div>
                </div>
            ),
            description: "Ultra-fast, responsive, and breathtaking websites that define digital excellence."
        }
    ];

    return (
        <section
            ref={sectionRef}
            className="w-full bg-[#040A15] py-32 px-4 md:px-0 relative overflow-hidden"
        >
            {/* Background Decorative Blobs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#44D79E]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-28 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-8 tracking-tight">
                            What all do we <span className="text-[#44D79E] italic">offer</span>
                        </h2>
                        <div className="h-1 w-32 bg-[#44D79E] mx-auto mb-8 rounded-full shadow-[0_0_20px_rgba(68,215,158,0.5)]" />
                        <p className="text-gray-400 text-lg md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed">
                            We're a digital marketing & advertising agency... <br className="hidden md:block" />
                            focused on <span className="text-white font-black italic">people's growth.</span>
                        </p>
                    </motion.div>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                    {services.map((service, index) => (
                        <MagicCard
                            key={index}
                            className="bg-[#121212]/30 backdrop-blur-3xl border border-white/5 rounded-[2rem] p-6 flex flex-col justify-between h-auto group min-h-[460px] shadow-2xl overflow-hidden"
                            glowColor={service.glow}
                            particleCount={12}
                        >
                            <div className="flex flex-col gap-6 relative">
                                {/* Category Tag */}
                                <div
                                    className="absolute -top-3 right-0 px-3 py-1 rounded-full border shadow-[0_0_15px_rgba(var(--glow-color),0.1)] transition-colors duration-500"
                                    style={{
                                        backgroundColor: `rgba(${service.glow}, 0.05)`,
                                        borderColor: `rgba(${service.glow}, 0.2)`
                                    }}
                                >
                                    <span
                                        className="text-[8px] font-black uppercase tracking-[0.2em] block leading-none"
                                        style={{ color: `rgb(${service.glow})` }}
                                    >
                                        {service.category}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-3 pt-2">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-all duration-700 border border-white/10 group-hover:border-white/20 shadow-lg relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {service.icon}
                                    </div>
                                    <h3 className="text-2xl font-black text-white tracking-tighter leading-none">{service.title}</h3>
                                </div>
                                <div className="group-hover:translate-y-[-4px] transition-all duration-700 ease-out-expo scale-95 group-hover:scale-100 opacity-90 group-hover:opacity-100">
                                    {service.content}
                                </div>
                                <p className="text-xs text-gray-400 leading-relaxed font-semibold pr-2">
                                    {service.description}
                                </p>
                            </div>

                            {/* Magnetic Button Wrapper */}
                            <div className="mt-10 pt-8 border-t border-white/5">
                                <MagneticButton distance={0.3}>
                                    <PremiumButton
                                        icon={ArrowRight}
                                        onClick={() => console.log(`Navigating to ${service.title}`)}
                                    >
                                        Explore Service
                                    </PremiumButton>
                                </MagneticButton>
                            </div>
                        </MagicCard>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OfferSection;
