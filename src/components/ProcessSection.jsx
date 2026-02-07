import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useSpring, useMotionValue } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const ProcessSection = () => {
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);
    const progressLineRef = useRef(null);
    const [currentStep, setCurrentStep] = useState(1);

    const processSteps = [
        {
            number: 1,
            title: "Onboarding Call",
            description: "We ask you 50-60 questions about your personal and professional life to help us get into your shoes and understand your stories.",
            image: "/work-p/img1.png"
        },
        {
            number: 2,
            title: "Profile Optimization",
            description: "Our team will then work on your headline, bio, banner etc and give you, your optimisation in the next 24 hours.",
            image: "/work-p/img-2.png"
        },
        {
            number: 3,
            title: "Content Pillars",
            description: "We will be using our infamous funnel – TOFU, MOFU, BOFU to give you the perfect mix of topics that you will love.",
            image: "/work-p/img-3.png"
        },
        {
            number: 4,
            title: "Content Calendar",
            description: "We share a notion board with you with content every Monday. Which means 0 follow ups. Only 15-20 mins of your time to approve content.",
            image: "/work-p/img-4.jpg"
        },
        {
            number: 5,
            title: "Graphics Approval",
            description: "To communicate with you in real-time & churn content as per your requirements, we create a WhatsApp/slack group to communicate with you faster.",
            image: "/work-p/img-5.png"
        },
        {
            number: 6,
            title: "Progress Report",
            description: "We track your progress weekly to understand what's working & then deep dive every month to give you a detailed analysis.",
            image: "/work-p/img-6.png"
        }
    ];

    const scrollProgress = useMotionValue(0);
    const scaleY = useSpring(scrollProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const cards = cardsRef.current.filter(Boolean);
            const totalSteps = processSteps.length;

            // Set initial states - all cards hidden
            gsap.set(cards, {
                opacity: 0,
                y: 100,
                scale: 0.95,
                zIndex: 0
            });

            // Main timeline with ScrollTrigger
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: `+=${totalSteps * 100}%`,
                    pin: true,
                    scrub: 1.5,
                    onUpdate: (self) => {
                        const step = Math.min(Math.ceil(self.progress * totalSteps), totalSteps);
                        setCurrentStep(step || 1);
                        // Sync MotionValue with GSAP progress
                        scrollProgress.set(self.progress);
                    }
                }
            });

            // Animate each card with proper timing
            cards.forEach((card, index) => {
                // Each card gets 1 unit of time
                const cardStart = index;
                const cardEnd = index + 0.8;

                // Card Enter - fade in and slide up
                tl.to(card, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    zIndex: 10,
                    duration: 0.4,
                    ease: "power2.out"
                }, cardStart);

                // Card Exit - fade out and slide up (except last card)
                if (index < cards.length - 1) {
                    tl.to(card, {
                        opacity: 0,
                        y: -100,
                        scale: 0.95,
                        zIndex: 0,
                        duration: 0.4,
                        ease: "power2.in"
                    }, cardEnd);
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen w-full bg-[#050505] overflow-hidden pt-20"
        >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#050505] via-[#0a0a0a] to-[#050505] opacity-50" />

            {/* Content Container */}
            <div className="relative z-10 h-screen flex items-center justify-center px-6 md:px-12">

                {/* Left: Progress Indicator */}
                <div className="hidden md:flex flex-col items-center absolute left-12 top-1/2 -translate-y-1/2 gap-4">
                    {/* Vertical Text */}
                    <div className="text-xs uppercase tracking-[0.3em] text-gray-500 -rotate-90 origin-center whitespace-nowrap mb-20">
                        Progress
                    </div>

                    {/* Progress Bar Container */}
                    <div className="relative h-64 w-1 bg-white/10 rounded-full overflow-hidden">
                        {/* Active Progress */}
                        <motion.div
                            style={{ scaleY }}
                            className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#008FC3] via-[#008FC3] to-[#00B4D8] origin-top"
                        />
                    </div>

                    {/* Step Counter */}
                    <div className="flex flex-col items-center gap-2 mt-4">
                        <div className="w-10 h-10 rounded-full border-2 border-[#44D79E] flex items-center justify-center">
                            <span className="text-[#44D79E] font-bold text-sm">{currentStep}</span>
                        </div>
                        <span className="text-xs text-gray-500">/ {processSteps.length}</span>
                    </div>
                </div>

                {/* Center: Content */}
                <div className="w-full max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-[#44D79E] text-sm md:text-base font-bold tracking-[0.3em] uppercase mb-4"
                        >
                            How We Work
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white"
                        >
                            Our Proven <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#44D79E] to-teal-400">Process</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-gray-400 text-lg md:text-xl mt-4 max-w-2xl mx-auto"
                        >
                            A streamlined 6-step journey from strategy to measurable results.
                        </motion.p>
                    </div>

                    {/* Cards Stack */}
                    <div className="relative w-full h-[450px] md:h-[480px]">
                        {processSteps.map((step, index) => (
                            <div
                                key={step.number}
                                ref={el => cardsRef.current[index] = el}
                                className="absolute inset-0 w-full"
                                onMouseMove={handleMouseMove}
                                style={{
                                    background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 141, 194, 0.15), transparent 40%)'
                                }}
                            >
                                {/* Card */}
                                <div className="relative w-full h-full rounded-3xl overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md border border-white/10">
                                    <div className="h-full flex flex-col md:flex-row items-center gap-6 p-6 md:p-10">
                                        {/* Left: Image */}
                                        <div className="flex-shrink-0 w-full md:w-1/2 h-52 md:h-80 rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                                            <img
                                                src={step.image}
                                                alt={step.title}
                                                className="w-full h-full object-contain p-2"
                                            />
                                        </div>

                                        {/* Right: Content */}
                                        <div className="flex-1 flex flex-col justify-center text-left">
                                            {/* Step Number */}
                                            <div className="text-[#44D79E] text-sm font-bold tracking-[0.3em] uppercase mb-3">
                                                Step {step.number}
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-2xl md:text-4xl font-display font-bold text-white mb-4">
                                                {step.title}
                                            </h3>

                                            {/* Description */}
                                            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mobile Step Indicator */}
            <div className="md:hidden absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full border-2 border-[#44D79E] flex items-center justify-center">
                    <span className="text-[#44D79E] font-bold">{currentStep}</span>
                </div>
                <span className="text-gray-500">/ {processSteps.length}</span>
            </div>
        </section>
    );
};

export default ProcessSection;
