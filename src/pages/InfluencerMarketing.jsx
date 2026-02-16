import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import TypewriterHeading from '../components/TypewriterHeading';
import {
    Users,
    Rocket,
    Target,
    BarChart3,
    Share2,
    CheckCircle2,
    ArrowRight,
    Search,
    PieChart,
    Play
} from 'lucide-react';

const InfluencerMarketing = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const tiers = [
        {
            title: "Nano Influencers",
            range: "1k - 10k Followers",
            icon: Users,
            description: "High engagement rates and deeply trusted by a niche, tight-knit community.",
            color: "text-blue-400"
        },
        {
            title: "Micro Influencers",
            range: "10k - 100k Followers",
            icon: Target,
            description: "The sweet spot of reach and resonance. Perfect for driving specific actions.",
            color: "text-[#44D79E]"
        },
        {
            title: "Macro Influencers",
            range: "100k - 1M Followers",
            icon: Rocket,
            description: "Broad reach to build mass awareness and establish category authority.",
            color: "text-purple-400"
        }
    ];

    const strategySteps = [
        {
            step: "01",
            title: "Influencer Discovery",
            description: "We use data-driven tools to find creators whose audience perfectly matches your target persona."
        },
        {
            step: "02",
            title: "Creative Briefing",
            description: "Crafting unique angles that align the brand message with the creator's authentic voice."
        },
        {
            step: "03",
            title: "Campaign Management",
            description: "Handling all logistics, contracts, and quality control from launch to wrap-up."
        }
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-[10%] -left-20 w-[600px] h-[600px] bg-[#44D79E]/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-[60%] -right-20 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-6 relative z-10 text-center mb-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-400 text-xs md:text-sm font-bold tracking-widest uppercase mb-8"
                >
                    <Share2 size={14} /> Amplifying Reach
                </motion.div>

                <TypewriterHeading
                    text="The Science of"
                    highlightText="Influencer Marketing"
                    className="text-4xl md:text-7xl lg:text-8xl font-display font-bold leading-tight"
                />

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-gray-400 text-lg md:text-xl mt-8 max-w-3xl mx-auto leading-relaxed"
                >
                    We build bridge between your brand and the world's most influential voices. Drive authentic engagement through strategic partnerships that deliver ROI.
                </motion.p>
            </div>

            {/* Tiers Section */}
            <div className="max-w-7xl mx-auto px-6 mb-40">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Influencer Tiers</h2>
                    <p className="text-gray-500">Choosing the right scale for your campaign goals.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {tiers.map((tier, index) => (
                        <motion.div
                            key={tier.title}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-[2rem] bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-[#44D79E]/20 transition-all group"
                        >
                            <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${tier.color}`}>
                                <tier.icon size={28} />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">{tier.title}</h3>
                            <div className={`text-sm font-bold tracking-widest uppercase mb-4 ${tier.color}`}>
                                {tier.range}
                            </div>
                            <p className="text-gray-500 leading-relaxed">
                                {tier.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Strategy Section */}
            <div className="bg-white/5 border-y border-white/5 py-32 mb-40 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="flex-1">
                            <h2 className="text-3xl md:text-5xl font-display font-bold mb-10 leading-tight">
                                Our Campaign <span className="text-[#44D79E]">Strategy</span>
                            </h2>
                            <div className="space-y-12">
                                {strategySteps.map((s) => (
                                    <div key={s.step} className="flex gap-6">
                                        <div className="text-4xl font-display font-bold text-[#44D79E]/20">{s.step}</div>
                                        <div>
                                            <h4 className="text-xl font-bold mb-2 text-white">{s.title}</h4>
                                            <p className="text-gray-500">{s.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex-1 w-full">
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="relative aspect-square max-w-md mx-auto"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-[#44D79E]/20 to-transparent rounded-full blur-3xl" />
                                <div className="relative grid grid-cols-2 gap-4 h-full p-4">
                                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col justify-center items-center gap-4">
                                        <Search size={32} className="text-blue-400" />
                                        <span className="text-xs font-bold tracking-tighter uppercase whitespace-nowrap">Discovery</span>
                                    </div>
                                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col justify-center items-center gap-4 mt-8">
                                        <PieChart size={32} className="text-[#44D79E]" />
                                        <span className="text-xs font-bold tracking-tighter uppercase whitespace-nowrap">Analytics</span>
                                    </div>
                                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col justify-center items-center gap-4 -mt-8">
                                        <BarChart3 size={32} className="text-purple-400" />
                                        <span className="text-xs font-bold tracking-tighter uppercase whitespace-nowrap">KPI Tracking</span>
                                    </div>
                                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col justify-center items-center gap-4">
                                        <Play size={32} className="text-red-400" />
                                        <span className="text-xs font-bold tracking-tighter uppercase whitespace-nowrap">Execution</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Brand CTA */}
            <div className="max-w-5xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="p-12 md:p-20 rounded-[3rem] bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 text-center relative overflow-hidden"
                >
                    <h3 className="text-3xl md:text-6xl font-display font-bold mb-8">Ready to Go Viral?</h3>
                    <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
                        Whether you are a brand looking for reach or an influencer looking for growth, we have the perfect solution for you.
                    </p>
                    <div className="flex flex-col md:flex-row gap-6 justify-center">
                        <button className="px-10 py-5 bg-[#44D79E] text-black font-bold rounded-full hover:scale-105 transition-all flex items-center justify-center gap-2">
                            I am a Brand <ArrowRight size={20} />
                        </button>
                        <button className="px-10 py-5 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2">
                            I am a Creator <ArrowRight size={20} />
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default InfluencerMarketing;
