import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import GetNoticedCards from './GetNoticedCards';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function RoadmapBeam() {
    const greenPathRef = useRef(null);
    const badgeRef = useRef(null);
    const wrapperRef = useRef(null);

    // Concentric Curved Paths
    // const cyanPath = "M 940 0 L 940 100 Q 940 160 880 160 L 200 160 Q 500 160 500 220";
    // const greenPath = "M 900 0 L 900 50 Q 900 80 880 80 L -450 80 L -450 150";
    const greenPath = "M 900 0 L 900 50 Q 900 80 880 80 L -420 80 Q -450 80 -450 110 L -450 2000";


    useEffect(() => {
        let ctx = gsap.context(() => {
            // 1. Basic Path Setup
            const paths = [greenPathRef.current];
            paths.forEach(path => {
                if (!path) return;
                const length = path.getTotalLength();
                gsap.set(path, {
                    strokeDasharray: length,
                    strokeDashoffset: length,
                });
            });

            // 2. Initial Badge State
            if (badgeRef.current) {
                gsap.set(badgeRef.current, {
                    opacity: 0,
                    xPercent: -50,
                    yPercent: -50,
                    transformOrigin: "center center"
                });
            }

            // 3. Master Scroll Animation - Long Journey Entry
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: wrapperRef.current,
                    start: "top 80%",
                    end: "+=1700",
                    scrub: 3,
                }
            });

            // Sync Path Drawing
            tl.to(greenPathRef.current, {
                strokeDashoffset: 0,
                ease: "none"
            }, 0);

            // Sync Badge Motion
            if (badgeRef.current && greenPathRef.current) {
                // Reveal badge
                tl.fromTo(badgeRef.current, {
                    scale: 0,
                    opacity: 0
                }, {
                    scale: 1,
                    opacity: 1,
                    duration: 0.1
                }, 0);

                tl.to(badgeRef.current, {
                    motionPath: {
                        path: greenPathRef.current,
                        align: greenPathRef.current,
                        alignOrigin: [0.5, 0.5],
                        autoRotate: 90, // Makes the kite tip lead the way
                    },
                    ease: "none"
                }, 0);

                // 4. Kite-Specific Floating Logic (Pure Side-to-Side & Tail Wag)
                gsap.to("#kite-group", {
                    y: 8, // Moves left-right relative to the kite's heading (Horizontal on vertical stretches)
                    duration: 1.8,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });

                gsap.to("#kite-tail", {
                    skewX: 20,
                    scaleY: 0.8,
                    duration: 1.5,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });
            }
        }, wrapperRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={wrapperRef}
            className="relative w-full min-h-screen bg-gradient-to-b from-black to-[#040A15] overflow-visible flex flex-col items-center justify-start pt-10 pb-32"
        >
            {/* Beam Animation Container - With Bottom Fade Mask for 'Entry' effect */}
            <div
                className="w-full h-[2000px] pointer-events-none pr-0 flex justify-end absolute top-0 right-0 z-30"
                style={{
                    maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%)"
                }}
            >
                <svg
                    className="w-full h-full overflow-visible"
                    viewBox="-500 0 1500 2000"
                    preserveAspectRatio="xMaxYMin meet"
                >
                    <defs>
                        <radialGradient id="badge-glow-final">
                            <stop offset="0%" stopColor="#00E0FF" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                        </radialGradient>
                    </defs>

                    {/* Tracks (Shadows) */}
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

                    {/* Realistic Animated Kite Rider */}
                    <g ref={badgeRef} style={{ willChange: "transform" }}>
                        {/* Glow and Blue Glassmorphism Circle */}
                        <circle r="48" fill="url(#badge-glow-final)" />
                        <circle
                            r="34"
                            fill="url(#blue-glass-gradient)"
                            stroke="rgba(0, 224, 255, 0.4)"
                            strokeWidth="1"
                            className="drop-shadow-[0_0_20px_rgba(0,224,255,0.3)]"
                        />

                        {/* Animated Kite Group - Scaled up for 3D effect */}
                        <g id="kite-group" transform="scale(1.4) translate(0, -2)">
                            {/* Kite Tail (Wavy Animation) */}
                            <path
                                id="kite-tail"
                                d="M0,12 L-4,22 L4,22 Z"
                                fill="#4FC593"
                                opacity="0.8"
                            />

                            {/* Kite Body (Diamond) - Stronger shadow for 3D pop */}
                            <path
                                d="M0,-18 L-15,0 L0,18 L15,0 Z"
                                fill="url(#kite-gradient)"
                                className="drop-shadow-[0_8px_15px_rgba(0,0,0,0.6)]"
                            />

                            {/* Bamboo Frame (Internal Sticks) */}
                            <path d="M0,-18 V18 M-15,0 H15" stroke="#1E1B4B" strokeWidth="0.5" opacity="0.4" />
                            <path d="M-15,0 Q0,-15 15,0" stroke="#1E1B4B" strokeWidth="0.5" fill="none" opacity="0.4" />
                        </g>

                        <defs>
                            <linearGradient id="blue-glass-gradient" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0%" stopColor="#00E0FF" stopOpacity="0.2" />
                                <stop offset="100%" stopColor="#040A15" stopOpacity="0.9" />
                            </linearGradient>
                            <linearGradient id="kite-gradient" x1="0" x2="1" y1="0" y2="1">
                                <stop offset="0%" stopColor="#4FC593" />
                                <stop offset="100%" stopColor="#00E0FF" />
                            </linearGradient>
                        </defs>
                    </g>
                </svg>
            </div>

            {/* Get Noticed Cards */}
            <div className="container mx-auto px-4 relative z-20 mt-[100px]">
                <GetNoticedCards />
            </div>
        </section>
    );
}
