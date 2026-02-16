import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

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

const StarRating = ({ rating }) => (
    <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
            <svg
                key={i}
                className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? 'text-[#FFD700] fill-[#FFD700]' : 'text-gray-600'}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
            >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
        ))}
    </div>
);

const TestimonialCard = ({ item }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative flex-none group pt-4"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* The Badge (Compact State) */}
            <motion.div
                className="relative z-30 flex items-center gap-4 bg-[#141414] border border-white/5 px-6 py-3 rounded-full cursor-pointer hover:border-[#FFD700]/30 transition-all duration-300 shadow-xl"
                animate={{
                    scale: isHovered ? 1.05 : 1,
                    borderColor: isHovered ? "rgba(1, 142, 197, 0.3)" : "rgba(255, 255, 255, 0.05)"
                }}
            >
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover border border-white/10"
                />
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <span className="text-white text-sm font-bold whitespace-nowrap">{item.name}</span>
                        <StarRating rating={item.rating} />
                    </div>
                    <span className="text-gray-500 text-[10px] uppercase tracking-wider font-medium">{item.designation}</span>
                </div>
            </motion.div>

            {/* The Unfold (Expanded State) */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ height: 0, opacity: 0, scaleY: 0 }}
                        animate={{
                            height: "auto",
                            opacity: 1,
                            scaleY: 1,
                        }}
                        exit={{
                            height: 0,
                            opacity: 0,
                            scaleY: 0,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                            mass: 1
                        }}
                        className="absolute top-[60%] left-4 right-4 z-20 overflow-hidden bg-[#181818] border border-white/10 rounded-b-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] origin-top backdrop-blur-xl"
                    >
                        <div className="p-6 pt-10">
                            <span className="text-4xl text-[#FFD700]/10 font-serif absolute top-4 left-4">"</span>
                            <p className="text-gray-300 text-sm leading-relaxed relative z-10 italic lg:whitespace-normal">
                                {item.text}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const TestimonialTicker = () => {
    const [isPaused, setIsPaused] = useState(false);

    // Multiplied array for infinite loop
    const tickerTestimonials = [...testimonials, ...testimonials, ...testimonials, ...testimonials];

    return (
        <section className="relative w-full bg-[#050505] py-4 overflow-x-clip overflow-y-visible border-b border-white/5 z-[100]">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[300px] bg-[#FFD700]/5 rounded-full blur-[120px] pointer-events-none" />

            <div
                className="relative flex overflow-visible"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <motion.div
                    className="flex gap-12 px-12"
                    animate={{
                        x: isPaused ? undefined : ["0%", "-50%"],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 60,
                            ease: "linear",
                        },
                    }}
                    style={{
                        width: "max-content"
                    }}
                >
                    {tickerTestimonials.map((item, idx) => (
                        <TestimonialCard key={`${item.id}-${idx}`} item={item} />
                    ))}
                </motion.div>

                {/* Left/Right Overlays */}
                <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-[#050505] to-transparent z-40 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-[#050505] to-transparent z-40 pointer-events-none" />
            </div>
        </section>
    );
};

export default TestimonialTicker;
