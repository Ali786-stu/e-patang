import React from 'react';
import { motion } from 'framer-motion';
import MagicCard from './MagicCard';

const GetNoticedCards = () => {
    return (
        <div className="w-full relative z-20 mb-20 px-4 md:px-0">
            {/* Header */}
            <div className="text-center mb-12">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight"
                >
                    We help you <span className="text-[#44D79E]">Get Noticed</span>
                </motion.h2>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">

                {/* Card 1: Revenue & Leads (Refined Graph) */}
                <MagicCard
                    className="relative bg-[#121212]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 h-[400px] flex flex-col items-center justify-between group overflow-hidden"
                    glowColor="68, 215, 158"
                    particleCount={8}
                    enableTilt={false}
                    enableMagnetism={false}
                >
                    <div className="text-center z-10 w-full mb-4">
                        <h3 className="text-xl font-bold text-white mb-1">We will</h3>
                        <h4 className="text-2xl font-bold text-[#44D79E] uppercase tracking-wider">Generate Leads</h4>
                    </div>

                    {/* Animated Graph Container - Matching Reference */}
                    <div className="relative w-full flex-grow bg-black rounded-2xl border border-white/10 p-5 flex flex-col justify-start overflow-hidden group-hover:border-[#44D79E]/30 transition-colors duration-500 shadow-inner">

                        {/* Simulation UI - Time Tabs */}
                        <div className="flex justify-between items-center mb-6 z-10 relative">
                            <div className="bg-[#44D79E] text-black text-[10px] font-bold px-3 py-1 rounded-full shadow-[0_0_10px_rgba(68,215,158,0.4)] cursor-default">
                                This Week
                            </div>
                            <div className="flex gap-2">
                                <span className="text-[10px] text-gray-500 font-medium px-2 py-1 rounded-full bg-white/5 cursor-default">Month</span>
                                <span className="text-[10px] text-gray-600 font-medium px-2 py-1 rounded-full bg-white/5 opacity-50 cursor-default">1Y</span>
                                <span className="text-[10px] text-gray-600 font-medium px-2 py-1 rounded-full bg-white/5 opacity-50 cursor-default">2Y</span>
                            </div>
                        </div>

                        {/* Stats Content */}
                        <div className="flex flex-col gap-4 relative z-10">
                            <div>
                                <p className="text-[10px] text-gray-400 font-medium mb-0">Leads this week</p>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-2xl font-bold text-white flex items-center gap-1.5"
                                >
                                    87% <span className="text-[#44D79E] text-lg font-black">+</span>
                                </motion.div>
                            </div>

                            <div>
                                <p className="text-[10px] text-gray-400 font-medium mb-0">Profile Visits</p>
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-base font-bold text-[#44D79E] flex items-center gap-2"
                                >
                                    Increased by 141%
                                </motion.div>
                            </div>
                        </div>

                        {/* Animated SVG Graph - Background Layer */}
                        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-0">
                            <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40" preserveAspectRatio="none">
                                {/* Defs for Gradients */}
                                <defs>
                                    <linearGradient id="graphGradient" x1="0" x2="0" y1="0" y2="1">
                                        <stop offset="0%" stopColor="#44D79E" stopOpacity="0.3" />
                                        <stop offset="100%" stopColor="#44D79E" stopOpacity="0" />
                                    </linearGradient>
                                </defs>

                                {/* Area fill (Animated Loop) */}
                                <motion.path
                                    d="M0,40 L0,35 Q10,32 20,35 T40,20 T60,25 T80,5 T100,15 V40 H0 Z"
                                    fill="url(#graphGradient)"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: [0, 1, 1, 0] }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        times: [0, 0.1, 0.9, 1]
                                    }}
                                />

                                {/* Stroke Line (Animated Loop) */}
                                <motion.path
                                    d="M0,35 Q10,32 20,35 T40,20 T60,25 T80,5 T100,15"
                                    fill="none"
                                    stroke="#44D79E"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: [0, 1, 1] }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        times: [0, 0.6, 1]
                                    }}
                                    className="drop-shadow-[0_0_8px_rgba(68,215,158,0.5)]"
                                />
                            </svg>
                        </div>
                    </div>
                </MagicCard>

                {/* Card 2: Build Brand (Top Voice Badge) */}
                <MagicCard
                    className="relative bg-[#121212]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-4 h-[400px] flex flex-col items-center justify-start group overflow-hidden"
                    glowColor="234, 179, 8" // Gold/Yellow for Brand
                    particleCount={8}
                    enableTilt={false}
                    enableMagnetism={false}
                >
                    <div className="text-center z-10 w-full mb-2">
                        <h3 className="text-lg font-bold text-white mb-0">Build Your</h3>
                        <h4 className="text-xl font-bold text-yellow-400 uppercase tracking-wider">BRAND</h4>
                    </div>

                    {/* Animated Profile Container - Realistic Feel */}
                    <div className="relative w-full flex-grow bg-black/40 rounded-2xl border border-white/10 flex items-center justify-center p-2 overflow-hidden group-hover:border-yellow-400/30 transition-colors duration-500">
                        {/* Shimmering glass card */}
                        <motion.div
                            className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-full max-w-[240px] relative border border-white/10 scale-[0.9]"
                        >
                            <div className="relative flex flex-col items-center">
                                {/* Profile Pic */}
                                <div className="w-14 h-14 bg-gradient-to-tr from-white/10 to-white/5 rounded-full mb-2 border-2 border-white/10 shadow-sm flex items-center justify-center overflow-hidden">
                                    <svg className="w-8 h-8 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                    </svg>
                                </div>

                                {/* Name & Headline */}
                                <div className="text-center mb-3">
                                    <h5 className="text-white font-bold text-sm leading-tight">Christina Garnett, EMBA</h5>
                                    <div className="mt-1 inline-flex items-center gap-1 bg-yellow-400/10 border border-yellow-400/20 px-2 py-0.5 rounded-full mb-1">
                                        <span className="text-[10px]">💡</span>
                                        <span className="text-yellow-400 font-bold text-[8px] uppercase tracking-tighter">Top Marketing Voice</span>
                                    </div>
                                    <p className="text-gray-500 text-[8px] leading-tight px-1 mt-1">
                                        People on LinkedIn find Christina an insightful contributor in 4 skills.
                                    </p>
                                </div>

                                {/* Skills List from Image */}
                                <div className="w-full flex flex-col gap-1.5 mt-1 border-t border-white/5 pt-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3.5 h-3.5 bg-yellow-400/10 rounded-full flex items-center justify-center text-[8px]">💡</div>
                                        <span className="text-gray-300 text-[9px] font-medium">Marketing</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3.5 h-3.5 bg-yellow-400/10 rounded-full flex items-center justify-center text-[8px]">💡</div>
                                        <span className="text-gray-300 text-[9px] font-medium">Influencer Marketing</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3.5 h-3.5 bg-yellow-400/10 rounded-full flex items-center justify-center text-[8px]">💡</div>
                                        <span className="text-gray-300 text-[9px] font-medium">Brand Strategy</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3.5 h-3.5 bg-yellow-400/10 rounded-full flex items-center justify-center text-[8px]">💡</div>
                                        <span className="text-gray-300 text-[9px] font-medium">Creative Strategy</span>
                                    </div>
                                </div>

                                <div className="mt-3 w-full">
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        className="w-full bg-blue-600/80 hover:bg-blue-600 backdrop-blur-sm text-white rounded-full py-1.5 text-[10px] font-bold shadow-lg transition-colors"
                                    >
                                        Follow +
                                    </motion.button>
                                </div>
                            </div>

                            {/* Animated Highlight Shimmer */}
                            <motion.div
                                animate={{ x: [-200, 400] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 pointer-events-none"
                            />
                        </motion.div>

                        {/* Background Floating Icons */}
                        <div className="absolute top-4 left-4 opacity-20"><svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" /></svg></div>
                        <div className="absolute bottom-10 right-10 opacity-20"><svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" /></svg></div>
                    </div>
                </MagicCard>

                {/* Card 3: SEO Ranking (Google Search) */}
                <MagicCard
                    className="relative bg-[#121212]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 h-[400px] flex flex-col items-center justify-between group overflow-hidden"
                    glowColor="59, 130, 246" // Blue for Google/Search
                    particleCount={8}
                    enableTilt={false}
                    enableMagnetism={false}
                >
                    <div className="text-center z-10 w-full mb-4">
                        <h3 className="text-xl font-bold text-white mb-1">Rank on</h3>
                        <h4 className="text-2xl font-bold text-blue-400 uppercase tracking-wider">Top of Google</h4>
                    </div>

                    {/* Animated Search Container - Browser Feel */}
                    <div className="relative w-full flex-grow bg-black/40 rounded-2xl border border-white/10 p-4 flex flex-col gap-4 overflow-hidden group-hover:border-blue-400/30 transition-colors duration-500">

                        {/* Browser Top Bar */}
                        <div className="flex gap-1 mb-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
                        </div>

                        {/* Search Bar */}
                        <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2.5 flex items-center gap-3 border border-white/20 shadow-[0_5px_15px_rgba(0,0,0,0.3)]">
                            <span className="text-gray-400 text-sm">🔍</span>
                            <motion.div
                                className="text-[11px] text-white/90 font-medium flex items-center"
                            >
                                <motion.span
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "auto" }}
                                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                    className="whitespace-nowrap overflow-hidden border-r border-blue-500 pr-0.5"
                                >
                                    best ugc agency near me
                                </motion.span>
                            </motion.div>
                        </div>

                        {/* Search Results - Slides Up */}
                        <motion.div
                            initial={{ y: 100, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1, duration: 0.8 }}
                            className="bg-white/5 backdrop-blur-xl rounded-xl p-3 shadow-xl mt-1 flex flex-col gap-2 h-full overflow-hidden border border-white/10"
                        >
                            {/* Result 1 (Organic) */}
                            <div className="flex flex-col gap-1.5">
                                <div className="flex items-center gap-1">
                                    <div className="w-3 h-3 bg-white/10 rounded-full" />
                                    <span className="text-[8px] text-gray-400">www.e-patang.com</span>
                                </div>
                                <h6 className="text-blue-400 text-[11px] font-bold leading-tight">#1 UGC Marketing Agency - Skyrocket Your Brand</h6>

                                <div className="flex gap-2 items-center">
                                    <div className="flex gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className="text-yellow-400 text-[8px]">★</span>
                                        ))}
                                    </div>
                                    <span className="text-[8px] text-gray-500">4.9 (240+ reviews)</span>
                                </div>

                                <p className="text-[9px] text-gray-400 line-clamp-2">Scale your revenue with high-converting UGC creators and data-driven marketing strategies...</p>
                            </div>

                            {/* Rich Snippet - Map/Location */}
                            <div className="mt-2 pt-2 border-t border-white/5">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-[9px] font-bold text-white/80">People also visited</span>
                                    <span className="text-[8px] text-blue-400">More ✨</span>
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center border border-blue-500/20">
                                        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    </div>
                                    <div className="flex-grow">
                                        <div className="h-2 w-20 bg-white/10 rounded mb-1" />
                                        <div className="h-2 w-16 bg-white/5 rounded" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </MagicCard>

            </div>
        </div>
    );
};

export default GetNoticedCards;
