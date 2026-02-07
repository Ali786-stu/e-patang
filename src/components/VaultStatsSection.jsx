import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GravitySection from './GravitySection';

gsap.registerPlugin(ScrollTrigger);

const VaultStatsSection = () => {
    const sectionRef = useRef(null);
    const pinContainerRef = useRef(null);
    const stackContainerRef = useRef(null);
    const statsRefs = useRef([]);
    const scrambleTextRef = useRef(null);

    const [startGravity, setStartGravity] = useState(false);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {

            // --- Helper Functions ---
            const animateStats = () => {
                statsRefs.current.forEach((el) => {
                    if (!el) return;
                    const targetValue = parseInt(el.dataset.value, 10);
                    const suffix = el.dataset.suffix || "";
                    let obj = { val: 0 };
                    gsap.to(obj, {
                        val: targetValue,
                        duration: 2.5,
                        ease: "power4.out",
                        onUpdate: () => {
                            el.innerText = Math.floor(obj.val) + suffix;
                        }
                    });
                });
            };

            const scrambleText = () => {
                const target = scrambleTextRef.current;
                if (!target) return;
                const finalText = "Noise";
                const chars = "!@#$%^&*()_+{}|:<>?qwertyuiopasdfghjklzxcvbnm";
                const duration = 2000;
                const steps = 30;
                const stepDuration = duration / steps;
                let currentStep = 0;
                const interval = setInterval(() => {
                    let text = "";
                    for (let i = 0; i < finalText.length; i++) {
                        if (i < Math.floor(currentStep / steps * finalText.length)) {
                            text += finalText[i];
                        } else {
                            text += chars[Math.floor(Math.random() * chars.length)];
                        }
                    }
                    target.innerText = text;
                    currentStep++;
                    if (currentStep > steps) {
                        clearInterval(interval);
                        target.innerText = finalText;
                    }
                }, stepDuration);
            };

            // --- Master Timeline ---
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=300%", // Reduced scroll distance since we removed door opening
                    pin: true,
                    scrub: 1.5,
                }
            });

            // PHASE 1: SHOW STATS IMMEDIATELY (Simpler Entrance)
            tl.to(stackContainerRef.current, { opacity: 1, duration: 1 });
            tl.call(() => {
                animateStats();
                scrambleText();
            }, null, "<");

            // PHASE 2: PAUSE & SLIDE TO GRAVITY
            tl.to({}, { duration: 2 }); // Viewing Stats

            tl.to(stackContainerRef.current, {
                yPercent: -50,
                duration: 4,
                ease: "power1.inOut"
            }, "slideUp");

            tl.call(() => {
                setStartGravity(true);
            }, null, "slideUp+=2");

            tl.to({}, { duration: 3 }); // Viewing Gravity

            // FINAL EXIT: Slide up to next section
            tl.to(pinContainerRef.current, {
                yPercent: -100,
                duration: 3,
                ease: "power2.inOut"
            }, "+=0.5");

            // Cleanup gravity at the end
            tl.call(() => {
                setStartGravity(false);
            }, null, "+=0.1");

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative h-screen w-full bg-[#050505] overflow-hidden">

            {/* PINNED CONTAINER */}
            <div ref={pinContainerRef} className="absolute inset-0 w-full h-full flex items-start justify-center">

                {/* STACKED CONTENT: wrapper height = 200vh to hold two sections */}
                <div
                    ref={stackContainerRef}
                    className="flex flex-col w-full relative opacity-0"
                    style={{ height: '200vh', transform: 'translateY(0)' }}
                >

                    {/* SECTION 1: STATS (Height 100vh) */}
                    <div className="h-[100vh] w-full flex flex-col items-center justify-center text-center px-6 relative shrink-0">
                        <div className="w-full max-w-7xl flex flex-col items-center">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#44D79E]/5 rounded-full blur-[120px] pointer-events-none" />

                            <h3 className="text-[#44D79E] text-sm md:text-base font-bold tracking-[0.3em] uppercase mb-4 opacity-80">
                                All Organic
                            </h3>
                            <h2 className="text-5xl md:text-8xl font-display font-medium text-white mb-8 md:mb-12 tracking-tighter">
                                Cut through the <span ref={scrambleTextRef} className="text-transparent bg-clip-text bg-gradient-to-r from-[#44D79E] to-teal-500">Noise</span>
                            </h2>
                            <p className="text-gray-400 text-lg md:text-2xl max-w-3xl mx-auto mb-12 md:mb-16 leading-relaxed font-light">
                                Our team helps you stand out and become a thought leader in your industry which will help you <span className="text-white font-medium">hire better</span>, <span className="text-white font-medium">get leads</span>, and <span className="text-white font-medium">investment</span>.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative w-full">
                                <div className="hidden md:block absolute left-1/3 top-10 bottom-10 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                                <div className="hidden md:block absolute right-1/3 top-10 bottom-10 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

                                <div className="group cursor-default p-6 md:p-8 rounded-2xl hover:bg-white/5 transition-colors duration-500">
                                    <div className="text-6xl md:text-8xl font-display font-semibold text-transparent bg-clip-text bg-gradient-to-b from-[#44D79E] to-[#2E8B66] mb-4">
                                        <span ref={el => statsRefs.current[0] = el} data-value="50" data-suffix="M+">0</span>
                                    </div>
                                    <div className="text-white/60 text-sm md:text-base font-medium tracking-widest uppercase">Views On Linkedin</div>
                                </div>
                                <div className="group cursor-default p-6 md:p-8 rounded-2xl hover:bg-white/5 transition-colors duration-500">
                                    <span className="text-6xl md:text-8xl font-display font-semibold text-transparent bg-clip-text bg-gradient-to-b from-[#44D79E] to-[#2E8B66] mb-4">
                                        <span ref={el => statsRefs.current[1] = el} data-value="20" data-suffix="+">0</span>
                                    </span>
                                    <div className="text-white/60 text-sm md:text-base font-medium tracking-widest uppercase">Countries</div>
                                </div>
                                <div className="group cursor-default p-6 md:p-8 rounded-2xl hover:bg-white/5 transition-colors duration-500">
                                    <span className="text-6xl md:text-8xl font-display font-semibold text-transparent bg-clip-text bg-gradient-to-b from-[#44D79E] to-[#2E8B66] mb-4">
                                        <span ref={el => statsRefs.current[2] = el} data-value="500" data-suffix="+">0</span>
                                    </span>
                                    <div className="text-white/60 text-sm md:text-base font-medium tracking-widest uppercase">Happy Clients</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 2: GRAVITY (Height 100vh) */}
                    <div className="h-[100vh] w-full flex flex-col items-center justify-center relative shrink-0">
                        <div className="w-full flex-1 flex items-center justify-center">
                            <GravitySection start={startGravity} />
                        </div>
                    </div>

                </div>

            </div>



        </section>
    );
};

export default VaultStatsSection;
