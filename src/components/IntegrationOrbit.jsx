import React from 'react';
import { motion } from 'framer-motion';

const icons = [
    { name: 'WhatsApp', icon: 'https://cdn-icons-png.flaticon.com/512/3670/3670051.png' },
    { name: 'LinkedIn', icon: 'https://cdn-icons-png.flaticon.com/512/174/174857.png' },
    { name: 'Naukri', icon: 'https://www.google.com/s2/favicons?domain=naukri.com&sz=128' },
    { name: 'Indeed', icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968844.png' },
    { name: 'Twitter', icon: 'https://cdn-icons-png.flaticon.com/512/3256/3256013.png' },
    { name: 'Instagram', icon: 'https://cdn-icons-png.flaticon.com/512/174/174855.png' },
    { name: 'Facebook', icon: 'https://cdn-icons-png.flaticon.com/512/124/124010.png' },
    { name: 'Google', icon: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png' },
];

const IntegrationOrbit = ({ isCompact = false }) => {

    return (
        <section className={`relative w-full ${isCompact ? 'bg-transparent py-10' : 'bg-black pt-24 pb-0'} text-white overflow-hidden flex flex-col items-center`}>

            {/* Header Text - At the top */}
            <div className="relative z-20 text-center mb-8 px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-6xl font-display font-medium mb-6"
                >
                    Tools You <span className="text-[#44D79E]">Use Daily</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl"
                >
                    Effortlessly integrate with your favorite platforms with all-in-one <br className="hidden md:block" /> unified experience.
                </motion.p>
            </div>

            {/* Arc Container */}
            <div className={`relative w-full ${isCompact ? 'h-[400px] md:h-[600px]' : 'h-[280px] md:h-[450px]'} overflow-hidden flex justify-center`}>

                {/* The Rotating Circle */}
                <div className={`absolute ${isCompact ? 'top-10 scale-90 md:scale-100' : 'top-10'} w-[400px] h-[400px] md:w-[700px] md:h-[700px]`}>

                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        className="absolute top-[26%] left-[42%] -translate-x-1/2 -translate-y-1/2 z-30 w-20 h-20 md:w-32 md:h-32 bg-[#0a0a0a] border border-white/10 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(68,215,158,0.2)] group overflow-hidden"
                    >
                        {/* Shine Effect */}
                        <motion.div
                            animate={{
                                left: ['-100%', '200%'],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                repeatDelay: 2,
                                ease: "easeInOut"
                            }}
                            className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[25deg] pointer-events-none"
                        />

                        <img
                            src="/images/logo.png"
                            alt="ePatang"
                            className="w-14 h-14 md:w-24 md:h-24 object-contain relative z-10 opacity-90"
                        />

                        <div className="absolute inset-0 rounded-full border border-[#44D79E]/20" />

                        {/* Inner Pulsing Glow */}
                        <motion.div
                            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute inset-0 bg-[#44D79E]/10 rounded-full blur-xl"
                        />
                    </motion.div>

                    {/* Apply Now Button - Just below the logo */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="absolute top-[52%] left-[42%] -translate-x-1/2 z-40"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative px-4 py-2 bg-[#111] border border-[#44D79E]/30 rounded-full text-[#44D79E] font-medium text-sm md:text-base overflow-hidden group transition-all duration-300 hover:border-[#44D79E] hover:shadow-[0_0_20px_rgba(68,215,158,0.3)] flex items-center gap-2"
                        >
                            {/* Glowing Background Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-[#44D79E]/0 via-[#44D79E]/5 to-[#44D79E]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Glint Effect */}
                            <motion.div
                                animate={{
                                    left: ['-100%', '200%'],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatDelay: 3
                                }}
                                className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[25deg] pointer-events-none"
                            />

                            <span>Apply Now</span>
                            <motion.span
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                →
                            </motion.span>

                            <div className="absolute inset-0 rounded-full border border-[#44D79E]/20 scale-110 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500" />
                        </motion.button>
                    </motion.div>

                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-dashed border border-white/25 rounded-full"
                    >
                        {icons.map((item, index) => {
                            const angle = (index / icons.length) * 360;
                            const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 160 : 300;

                            return (
                                <div
                                    key={item.name}
                                    className="absolute top-1/2 left-1/2"
                                    style={{
                                        transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}px)`
                                    }}
                                >
                                    {/* Trailing Bubbles Effect - Matching the reference image style */}
                                    <div className="absolute inset-0 -z-10 flex items-center justify-center">
                                        {[...Array(6)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                animate={{
                                                    x: [0, (i % 2 === 0 ? 30 : -30), (i % 2 === 0 ? 50 : -50)],
                                                    y: [0, (i < 3 ? 30 : -30), (i < 3 ? 50 : -50)],
                                                    scale: [0, 1.2, 0.5, 0],
                                                    opacity: [0, 0.6, 0.2, 0]
                                                }}
                                                transition={{
                                                    duration: 4 + i,
                                                    repeat: Infinity,
                                                    delay: i * 0.5,
                                                    ease: "easeOut"
                                                }}
                                                className="absolute w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#44D79E] blur-[1px] shadow-[0_0_10px_#44D79E]"
                                            />
                                        ))}
                                    </div>

                                    {/* Counter-Rotation */}
                                    <motion.div
                                        animate={{ rotate: -360 }}
                                        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                                        className="w-12 h-12 md:w-16 md:h-16 bg-[#0d0d0d] border border-white/10 rounded-full flex items-center justify-center p-2 shadow-2xl hover:border-[#44D79E]/40 transition-all duration-300 cursor-pointer group backdrop-blur-xl hover:scale-110 relative"
                                    >
                                        <img
                                            src={item.icon}
                                            alt={item.name}
                                            className="w-full h-full object-contain transition-all duration-500 rounded-lg"
                                        />

                                        {/* Subtle Inner Glow */}
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#44D79E]/5 to-transparent opacity-50 pointer-events-none" />
                                    </motion.div>
                                </div>
                            );
                        })}
                    </motion.div>

                    {/* Background decoration rings */}
                    <div className="absolute inset-[15%] border border-white/10 rounded-full pointer-events-none" />

                </div>
            </div>

        </section>
    );
};

export default IntegrationOrbit;
