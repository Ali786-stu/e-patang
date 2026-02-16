import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import TypewriterHeading from '../components/TypewriterHeading';
import {
    Users,
    Video,
    Zap,
    Star,
    TrendingUp,
    CheckCircle2,
    ArrowRight,
    Camera,
    Heart,
    MessageCircle
} from 'lucide-react';

const UGCCreators = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const categories = [
        {
            title: "Tech & Gadgets",
            icon: Zap,
            description: "Creators who bring the latest tech to life through authentic reviews.",
            count: "150+ Creators"
        },
        {
            title: "Lifestyle & Fashion",
            icon: Heart,
            description: "Elevating brands with aesthetic storytelling and real-world usage.",
            count: "200+ Creators"
        },
        {
            title: "Health & Fitness",
            icon: Star,
            description: "Inspiring action with high-energy content and transformation stories.",
            count: "120+ Creators"
        },
        {
            title: "Food & Beverage",
            icon: Users,
            description: "Crafting mouth-watering content that drives hunger and sales.",
            count: "180+ Creators"
        }
    ];

    const benefits = [
        "Professional Editing Support",
        "Direct Brand Collaborations",
        "Performance-Based Bonuses",
        "Creative Strategy Workshops",
        "Access to Premium Tools",
        "Global Community Access"
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-[#44D79E]/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-40 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-6 relative z-10 text-center mb-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#44D79E] text-xs md:text-sm font-bold tracking-widest uppercase mb-8"
                >
                    <Video size={14} /> Join Our Network
                </motion.div>

                <TypewriterHeading
                    text="The Power of"
                    highlightText="UGC Creators"
                    className="text-4xl md:text-7xl lg:text-8xl font-display font-bold leading-tight"
                />

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-gray-400 text-lg md:text-xl mt-8 max-w-3xl mx-auto leading-relaxed"
                >
                    We connect world-class brands with authentic creators who tell stories that resonate, engage, and convert. Real people, real impact.
                </motion.p>
            </div>

            {/* Showcase Section */}
            <div className="max-w-7xl mx-auto px-6 mb-40">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((cat, index) => (
                        <motion.div
                            key={cat.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-[#44D79E]/30 transition-all duration-500"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-[#44D79E]/10 flex items-center justify-center text-[#44D79E] mb-6 group-hover:scale-110 transition-transform duration-500">
                                <cat.icon size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{cat.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed mb-6">
                                {cat.description}
                            </p>
                            <div className="text-xs font-bold tracking-widest text-[#44D79E] uppercase">
                                {cat.count}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Why Join Us */}
            <div className="max-w-7xl mx-auto px-6 mb-40 relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-3xl md:text-5xl font-display font-bold mb-8 leading-tight"
                        >
                            Why Create with <span className="text-[#44D79E]">e-Patang?</span>
                        </motion.h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {benefits.map((benefit, index) => (
                                <motion.div
                                    key={benefit}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                    className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5"
                                >
                                    <CheckCircle2 size={18} className="text-[#44D79E] flex-shrink-0" />
                                    <span className="text-sm font-medium text-gray-300">{benefit}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative rounded-3xl overflow-hidden aspect-video bg-white/5 border border-white/10 flex items-center justify-center group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#44D79E]/20 to-blue-500/20 opacity-30 group-hover:opacity-50 transition-opacity duration-700" />
                        <div className="relative z-10 flex flex-col items-center text-center p-8">
                            <TrendingUp size={64} className="text-[#44D79E] mb-6 animate-pulse" />
                            <h4 className="text-2xl font-bold mb-4">Scalable Growth</h4>
                            <p className="text-gray-400 max-w-sm">
                                We don't just find you gigs; we build your career. Our data-driven approach ensures your content performs.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="max-w-4xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="p-12 rounded-[2.5rem] bg-gradient-to-br from-[#44D79E]/10 to-transparent border border-[#44D79E]/20 relative overflow-hidden"
                >
                    <div className="relative z-10">
                        <h3 className="text-3xl md:text-5xl font-display font-bold mb-6">Ready to Shine?</h3>
                        <p className="text-gray-400 mb-10 text-lg">
                            Apply now to join our elite network of creators and start working with top brands worldwide.
                        </p>
                        <button className="px-10 py-5 bg-[#44D79E] text-black font-bold rounded-full hover:scale-105 hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 mx-auto active:scale-95">
                            Apply to Network <ArrowRight size={20} />
                        </button>
                    </div>
                    {/* Decorative bits */}
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#44D79E]/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                </motion.div>
            </div>
        </div>
    );
};

export default UGCCreators;
