import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import TypewriterHeading from './TypewriterHeading';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
    {
        id: 1,
        image: "/testmonial/1.png",
        name: "Classic marimonial",
        rating: 5,
        designation: "Event Management",
        text: "I would like to take a moment to express my heartfelt appreciation to Akshita The dedication and integrity displayed by your team are truly commendable. I want to applaud you for the incredible work you do in helping businesses grow through social media marketing. Hats off to your relentless pursuit of excellence and your ability to deliver outstanding results."
    },
    {
        id: 2,
        image: "/testmonial/2.jpg",
        name: "Nikhil Agarwal",
        rating: 5,
        designation: "Local Guide",
        text: "Exceptional Service By Akshita, Anaya and Vaishnavi.\n#Recommended."
    },
    {
        id: 3,
        image: "/testmonial/3.avif",
        name: "Shamsher Singh Dhüarwal",
        rating: 5,
        designation: "Business Owner",
        text: "Effective, enthusiastic and dedicated team leader."
    },
    {
        id: 4,
        image: "/testmonial/4.jpeg",
        name: "Junaid Ahmed",
        rating: 5,
        designation: "Business Owner",
        text: "Extremely professional. Doing gr8 work Extremely satisfied with the services. Highly recommended team."
    },
    {
        id: 5,
        image: "/testmonial/5.jpg",
        name: "Dr Teena",
        rating: 5,
        designation: "Gaenocologist",
        text: "Akshita is a highly dynamic professional consultant and an expert in LinkedIn profiling. Her structured approach, result-oriented mindset, and impressive work plan make her the go-to person for LinkedIn Profile Optimization and Personal Branding."
    },
    {
        id: 6,
        image: "/testmonial/6.jpg",
        name: "Dr Prajwith",
        rating: 5,
        designation: "Bone Specailist",
        text: "Akshita is the pto person for your social media marketing! She has perfected that art. If you want to increase the reach of your social profiles, especially Linkedin and Twitter, you wont find anyone better than Vedika. Her skills and talent in this domain place her in the Premium category."
    }
];

const TestimonialSection = () => {
    const containerRef = useRef(null);
    const sectionRef = useRef(null);

    useEffect(() => {
        const cards = gsap.utils.toArray('.testimonial-card');

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: `+=${cards.length * 40}%`, // Further reduced to minimize dead space on mobile
                pin: true,
                scrub: 1,
                // markers: true,
            }
        });

        cards.forEach((card, index) => {
            if (index === cards.length - 1) return; // Don't animate the last card out

            tl.to(card, {
                yPercent: -150,
                scale: 0.8,
                opacity: 0,
                rotate: -10,
                duration: 1,
                ease: "power1.inOut"
            }, index === 0 ? 0 : ">-0.1"); // Small overlap
        });

        return () => {
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, []);

    const StarRating = ({ rating }) => {
        return (
            <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                ))}
            </div>
        );
    };

    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen bg-[#050505] overflow-hidden flex flex-col items-center justify-start lg:justify-center pt-24 pb-12 md:py-24"
        >
            {/* Background Light */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#44D79E]/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="text-center mb-12 relative z-10 px-6">
                <TypewriterHeading
                    text="What Our"
                    highlightText="Clients Say"
                    className="text-3xl md:text-6xl font-display font-bold mb-4"
                />
                <p className="text-gray-500 max-w-2xl mx-auto uppercase tracking-widest text-sm">
                    LOVED BY FOUNDERS, DOCTORS, AND PROFESSIONALS WORLDWIDE
                </p>
            </div>

            <div
                ref={containerRef}
                className="relative w-full max-w-4xl h-[600px] md:h-[500px] px-6 mx-auto"
            >
                {testimonials.map((item, index) => (
                    <div
                        key={item.id}
                        onMouseMove={handleMouseMove}
                        className="testimonial-card group absolute inset-x-0 top-0 bg-[#111111]/80 backdrop-blur-2xl border border-white/5 p-6 md:p-12 rounded-[40px] shadow-2xl flex flex-col justify-center min-h-[400px] overflow-hidden"
                        style={{
                            zIndex: testimonials.length - index,
                            transform: `translateY(${index * 15}px) scale(${1 - index * 0.05})`,
                            // opacity: 1 - index * 0.2
                        }}
                    >
                        {/* Interactive Glow Overlay */}
                        <div
                            className="pointer-events-none absolute inset-0 z-[1] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{
                                background: `radial-gradient(800px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(68, 215, 158, 0.15), transparent 40%)`
                            }}
                        />

                        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start mb-8">
                            {/* Avatar */}
                            <div className="relative group/avatar shrink-0">
                                <div className="absolute inset-0 bg-[#44D79E] rounded-3xl blur-md opacity-20 group-hover/avatar:opacity-40 transition-opacity" />
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="relative w-20 h-20 md:w-32 md:h-32 object-cover rounded-3xl border-2 border-white/10"
                                />
                            </div>

                            {/* Info */}
                            <div className="flex-1">
                                <h3 className="text-white text-xl md:text-3xl font-bold mb-1">{item.name}</h3>
                                <StarRating rating={item.rating} />
                                <p className="text-[#44D79E] font-medium tracking-wide uppercase text-sm">{item.designation}</p>
                            </div>
                        </div>

                        {/* Quote Text */}
                        <div className="relative z-10">
                            <span className="absolute -top-6 -left-4 text-6xl text-white/5 font-serif select-none">"</span>
                            <p className="relative text-gray-300 text-base md:text-2xl leading-relaxed font-light whitespace-pre-line">
                                {item.text}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TestimonialSection;
