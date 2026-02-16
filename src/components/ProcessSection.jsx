import React, { useRef } from 'react';
import TypewriterHeading from './TypewriterHeading';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import MagicCard from './MagicCard';

import clarityData from '../assets/clarity.json';
import mobileData from '../assets/mobile.json';
import pillarsData from '../assets/pillars.json';
import calendarData from '../assets/Calendar.json';
import graphicData from '../assets/graphic.json';
import reportData from '../assets/report.json';

const ProcessSection = () => {
    const sectionRef = useRef(null);

    const processSteps = [
        {
            number: "01",
            title: "Onboarding Call",
            description: "We dive deep into your brand with 50-60 tailored questions to understand your story, voice, and goals.",
            animationData: clarityData,
        },
        {
            number: "02",
            title: "Profile Optimization",
            description: "Within 24 hours, we revamp your bio, headline, and banner to ensure your profile converts visitors into followers.",
            animationData: mobileData,
        },
        {
            number: "03",
            title: "Content Pillars",
            description: "We craft a strategic mix of TOFU, MOFU, and BOFU content pillars to target every stage of your audience's journey.",
            animationData: pillarsData,
        },
        {
            number: "04",
            title: "Content Calendar",
            description: "Receive a full Notion board every Monday. No chasing, just 15 minutes of your time to review and approve.",
            animationData: calendarData,
        },
        {
            number: "05",
            title: "Graphics Approval",
            description: "Real-time collaboration via WhatsApp or Slack ensures rapid feedback loops and designs that hit the mark.",
            animationData: graphicData,
        },
        {
            number: "06",
            title: "Progress Report",
            description: "Weekly tracking and deep-dive monthly analysis to show you exactly what's working and how we're growing.",
            animationData: reportData,
        }
    ];

    return (
        <section
            ref={sectionRef}
            className="relative w-full bg-[#040A15] overflow-hidden pt-0 pb-20 -mt-20 md:-mt-32 z-20"
        >


            {/* Header */}
            <div className="text-center mb-16 relative z-10 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-[#44D79E] text-sm md:text-base font-bold tracking-[0.3em] uppercase mb-4"
                >
                    How We Work
                </motion.div>
                <TypewriterHeading
                    text="Our Proven"
                    highlightText="Process"
                    className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white"
                />
            </div>

            {/* Main Content Container with Grid */}
            <div className="container mx-auto px-4 relative max-w-7xl">

                {/* Steps Grid */}
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
                    {processSteps.map((step, index) => (
                        <MagicCard
                            key={index}
                            className="group relative bg-[#121212]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 transition-colors duration-500 flex flex-col h-full"
                            glowColor="68, 215, 158" // #44D79E
                            particleCount={12}
                            enableTilt={false}
                            enableMagnetism={false}
                        >

                            {/* Glass Glow Effect (Subtle) */}
                            <div className="absolute inset-0 bg-white/[0.02] pointer-events-none" />

                            <div className="relative flex flex-col gap-4 flex-grow z-10 pointer-events-none">
                                <div className="flex justify-between items-start">
                                    <span className="text-4xl font-display font-bold text-white/5 group-hover:text-[#44D79E]/20 transition-colors duration-500">
                                        {step.number}
                                    </span>
                                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-[#44D79E] group-hover:text-black transition-all duration-300">
                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#44D79E] transition-colors duration-300">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>

                                {/* Lottie Animation */}
                                <div className="w-full h-48 md:h-64 mt-auto rounded-xl overflow-hidden relative bg-white/5 flex items-center justify-center p-2 group-hover:bg-white/10 transition-colors duration-500">
                                    <Lottie
                                        animationData={step.animationData}
                                        loop={true}
                                        autoplay={true}
                                        className="w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                                    />
                                    {/* Subtle Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                                </div>
                            </div>
                        </MagicCard>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default ProcessSection;
