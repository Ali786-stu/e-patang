import React from 'react';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VaultStatsSection from './components/VaultStatsSection';
import ServicesSection from './components/ServicesSection';

function App() {
    return (
        <SmoothScroll>
            <CustomCursor />
            <Navbar />

            <main className="min-h-screen">
                <Hero />
                <VaultStatsSection />

                {/* About Section */}
                <section id="about" className="h-screen bg-[#050505] flex items-center justify-center border-y border-white/5">
                    <h2 className="text-5xl font-display font-bold text-white">ABOUT US</h2>
                </section>

                {/* Services Section */}
                <ServicesSection />

                {/* Testimonial Section */}
                <section id="testimonial" className="h-screen bg-[#050505] flex items-center justify-center border-y border-white/5">
                    <h2 className="text-5xl font-display font-bold text-white">TESTIMONIALS</h2>
                </section>

                {/* Contact Section */}
                <section id="contact" className="h-screen bg-[#050505] flex items-center justify-center">
                    <h2 className="text-5xl font-display font-bold text-[#44D79E]">CONTACT US</h2>
                </section>
            </main>
        </SmoothScroll>
    );
}

export default App;
