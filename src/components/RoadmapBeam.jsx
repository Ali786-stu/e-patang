import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import GetNoticedCards from './GetNoticedCards';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function RoadmapBeam() {
    const cyanPathRef = useRef(null);
    const greenPathRef = useRef(null);
    const badgeRef = useRef(null);
    const wrapperRef = useRef(null);

    // Concentric Curved Paths
    // const cyanPath = "M 940 0 L 940 100 Q 940 160 880 160 L 200 160 Q 500 160 500 220";
    // const greenPath = "M 900 0 L 900 50 Q 900 80 880 80 L -450 80 L -450 150";
    const greenPath = "M 900 0 L 900 50 Q 900 80 880 80 L -420 80 Q -450 80 -450 110 L -450 150";

    const cyanPath = ` M 940 0 L 940 100 C 940 160 880 160 880 160 L 250 160 C 220 160 200 180 220 220 L 400 350`;




    useEffect(() => {
        let ctx = gsap.context(() => {
            // 1. Basic Path Setup
            const paths = [cyanPathRef.current, greenPathRef.current];
            paths.forEach(path => {
                if (!path) return;
                const length = path.getTotalLength();
                gsap.set(path, {
                    strokeDasharray: length,
                    strokeDashoffset: length,
                });
            });

            // 2. Initial Badge State: Hidden and centered on path origin
            if (badgeRef.current) {
                gsap.set(badgeRef.current, {
                    opacity: 0,
                    xPercent: -50,
                    yPercent: -50,
                    transformOrigin: "center center"
                });
            }

            // 3. Master Scroll Animation (Accelerated Speed)
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: wrapperRef.current,
                    start: "top 95%",
                    end: "top 20%", // Complete much earlier
                    scrub: 1,
                }
            });

            // Sync Path Drawing
            tl.to([cyanPathRef.current, greenPathRef.current], {
                strokeDashoffset: 0,
                ease: "none"
            }, 0);

            // Sync Badge Motion
            if (badgeRef.current && greenPathRef.current) {
                // Reveal badge immediately on scroll start
                tl.set(badgeRef.current, { opacity: 1 }, 0.001);

                tl.to(badgeRef.current, {
                    motionPath: {
                        path: greenPathRef.current,
                        align: greenPathRef.current,
                        alignOrigin: [0.5, 0.5],
                        autoRotate: false,
                    },
                    ease: "none"
                }, 0);
            }

            // Section Pinning (Reduced distance for faster unpinning)
            ScrollTrigger.create({
                trigger: wrapperRef.current,
                start: "top top",
                end: "+=80%",
                pin: true,
                scrub: 1,
            });
        }, wrapperRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={wrapperRef}
            className="relative w-full min-h-screen bg-gradient-to-b from-black to-[#040A15] overflow-hidden flex flex-col items-center justify-start pt-20 pb-32"
        >
            {/* Beam Animation Container */}
            <div className="w-full h-[200px] pointer-events-none pr-0 flex justify-end absolute top-0 right-0 z-10">
                <svg
                    className="w-full h-full"
                    viewBox="0 0 1000 200"
                    preserveAspectRatio="xMaxYMin meet"
                >
                    <defs>
                        <radialGradient id="badge-glow-final">
                            <stop offset="0%" stopColor="#00E0FF" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                        </radialGradient>
                    </defs>

                    {/* Tracks (Shadows) */}
                    <path d={cyanPath} stroke="#1A1A1A" strokeWidth="16" fill="none" strokeLinecap="round" />
                    <path d={greenPath} stroke="#1A1A1A" strokeWidth="16" fill="none" strokeLinecap="round" />

                    {/* Green Beam (Inner) */}
                    <path
                        ref={greenPathRef}
                        d={greenPath}
                        stroke="#4FC593"
                        strokeWidth="15"
                        fill="none"
                        strokeLinecap="round"
                        className="drop-shadow-[0_0_15px_rgba(79,197,147,1)]"
                    />

                    {/* Cyan Beam (Outer) */}
                    <path
                        ref={cyanPathRef}
                        d={cyanPath}
                        stroke="#00A3DA"
                        strokeWidth="15"
                        fill="none"
                        strokeLinecap="round"
                        className="drop-shadow-[0_0_15px_rgba(0,163,218,1)]"
                    />

                    {/* Perfect Sync Badge Rider */}
                    <g ref={badgeRef} style={{ willChange: "transform" }}>
                        <circle r="40" fill="url(#badge-glow-final)" />
                        <circle r="26" fill="white" className="drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />

                        <path
                            d="M-15,5 Q-20,0 -15,-5 T-15,-15 M15,5 Q20,0 15,-5 T 15,-15"
                            stroke="#1E1B4B" strokeWidth="1.2" fill="none" opacity="0.4"
                        />

                        <text
                            y="8" textAnchor="middle" fill="#1E1B4B"
                            fontSize="40" fontWeight="900" fontFamily="serif"
                        >e</text>
                    </g>
                </svg>
            </div>

            {/* Get Noticed Cards - Placed below the beam area */}
            <div className="container mx-auto px-4 relative z-20 mt-[150px]">
                <GetNoticedCards />
            </div>
        </section>
    );
}
