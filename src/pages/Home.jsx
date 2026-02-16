import React from 'react';
import Hero from '../components/Hero';
import ImpactChartSection from '../components/ImpactChartSection';
import TestimonialTicker from '../components/TestimonialTicker';
import GravitySection from '../components/GravitySection';
import RoadmapBeam from '../components/RoadmapBeam';
import ProcessSection from '../components/ProcessSection';
import InitiativeSection from '../components/InitiativeSection';
import ContactSection from '../components/ContactSection';

const Home = () => {
    return (
        <>
            <div id="home">
                <Hero />
            </div>
            <ImpactChartSection />

            {/* Unified Social Proof Section */}
            <div className="bg-black pt-8">
                {/* Shared Header */}
                <div className="w-full flex flex-col items-center pointer-events-none mb-6">
                    <div className="relative px-10 py-3 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-full shadow-[0_0_30px_rgba(0,163,218,0.1)] group">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00A3DA]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
                        <p className="text-[#00A3DA] text-xs md:text-sm tracking-[0.8em] uppercase font-black drop-shadow-[0_0_10px_rgba(0,163,218,0.5)]">
                            Trusted Brands & Media
                        </p>
                    </div>
                </div>

                <TestimonialTicker />
                <GravitySection />
            </div>

            <RoadmapBeam />

            {/* Process Section */}
            <div id="services">
                <ProcessSection />
            </div>

            {/* Our Initiative Section */}
            <div id="initiative">
                <InitiativeSection />
            </div>

            {/* Testimonial Section - Now handled by Ticker */}

            {/* Contact Section */}
            <div id="contact">
                <ContactSection />
            </div>
        </>
    );
};

export default Home;
