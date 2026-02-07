import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        id: "01",
        title: "Branding & Identity",
        description: "We craft memorable brands that resonate. From logo design to comprehensive style guides, we define your visual voice.",
        color: "#FF4D4D", // Red accent
        visual: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=2000"
    },
    {
        id: "02",
        title: "Web Design & Dev",
        description: "Building immersive digital experiences. We merge cutting-edge technology with stunning aesthetics for high-performance sites.",
        color: "#44D79E", // Green accent (Brand color)
        visual: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=2000"
    },
    {
        id: "03",
        title: "Digital Marketing",
        description: "Connecting you with your audience. Data-driven strategies, SEO, and social campaigns that drive real growth.",
        color: "#018EC1", // Blue accent
        visual: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000" // Analytics/Data
    },
    {
        id: "04",
        title: "Content Creation",
        description: "Telling your story through compelling visuals. High-end photography, videography, and motion graphics.",
        color: "#F5A623", // Orange/Gold accent
        visual: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=2000"
    }
];

const ServicesSection = () => {
    const componentRef = useRef(null);
    const sliderRef = useRef(null);
    const [activeService, setActiveService] = useState(0);

    useEffect(() => {
        const ctx = gsap.context(() => {

            // Pin the entire section
            const sections = gsap.utils.toArray('.service-panel');

            ScrollTrigger.create({
                trigger: sliderRef.current,
                start: "top top",
                end: () => `+=${sliderRef.current.offsetWidth * (services.length - 1)}`, // Scroll duration based on width? No, vertical scroll for horizontal slide?
                // Actually, let's do vertical scroll stacking for simplicity first, or pinned side-by-side
                // Let's go with Pinned Side-by-Side: Left Scrolls, Right Stays
                pin: true,
                scrub: 1,
                // snap: 1 / (services.length - 1),
                end: `+=${services.length * 100}%`, // 100vh per service
                onUpdate: (self) => {
                    // Update active service based on scroll progress
                    const index = Math.round(self.progress * (services.length - 1));
                    setActiveService(index);
                }
            });

            // Animate text sections sliding up
            services.forEach((service, index) => {
                const textBlock = `.service-text-${index}`;

                // Opacity/Blur transition for text based on scroll
                // This is controlled by the active state mostly, but we can add GSAP polish
            });

        }, componentRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={componentRef} className="relative bg-[#050505] text-white">

            <div ref={sliderRef} className="flex h-screen w-full overflow-hidden">

                {/* LEFT: Content (Scrolls vertically conceptually, but here we just update state) 
                    Wait, for a true pinned scrollytelling, we usually have a long container scroll.
                    Let's adjust: The container is pinned. We use the scroll distance to change the active index.
                */}

                {/* VISUALS (RIGHT) - Sticky/Fixed relative to container */}
                <div className="w-1/2 h-full relative hidden md:block">
                    {services.map((service, index) => (
                        <div
                            key={service.id}
                            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${activeService === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
                                }`}
                        >
                            {/* Image with Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-transparent z-10" />
                            <img
                                src={service.visual}
                                alt={service.title}
                                className="w-full h-full object-cover opacity-60"
                            />

                            {/* Decorative Number */}
                            <div className="absolute bottom-10 right-10 text-[120px] font-bold text-white/5 font-display leading-none z-20">
                                {service.id}
                            </div>
                        </div>
                    ))}
                </div>

                {/* TEXT CONTENT (LEFT) */}
                <div className="w-full md:w-1/2 h-full flex items-center justify-center p-8 md:p-20 relative z-20">
                    <div className="max-w-xl">
                        {services.map((service, index) => (
                            <div
                                key={service.id}
                                className={`transition-all duration-700 ease-in-out absolute md:relative inset-0 flex flex-col justify-center ${activeService === index
                                        ? 'opacity-100 translate-y-0 pointer-events-auto'
                                        : 'opacity-0 translate-y-16 pointer-events-none absolute'
                                    }`}
                                style={{ display: activeService === index ? 'flex' : 'none' }} // Ensure taking up space correctly if relative
                            >
                                <div className="flex items-center space-x-4 mb-6">
                                    <span className="text-sm font-bold tracking-widest uppercase text-slate-500">Service {service.id}</span>
                                    <div className={`h-[1px] w-12 bg-[${service.color}]`} style={{ backgroundColor: service.color }}></div>
                                </div>

                                <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-tight">
                                    {service.title.split(' ').map((word, i) => (
                                        <span key={i} className="block">{word}</span>
                                    ))}
                                </h2>

                                <p className="text-lg md:text-xl text-slate-400 leading-relaxed mb-10">
                                    {service.description}
                                </p>

                                <button className="group flex items-center space-x-3 text-white font-medium hover:text-[#44D79E] transition-colors">
                                    <span>Explore Service</span>
                                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Progress Indicators (Mobile/Desktop) */}
                <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col space-y-4 z-30 hidden md:flex">
                    {services.map((_, index) => (
                        <div
                            key={index}
                            className={`w-1 h-8 rounded-full transition-all duration-300 ${activeService === index ? 'bg-[#44D79E] h-12' : 'bg-white/20'
                                }`}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default ServicesSection;
