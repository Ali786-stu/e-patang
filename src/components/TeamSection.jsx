import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Dummy Data ---
const teamMembers = Array.from({ length: 24 }).map((_, i) => ({
    id: i,
    name: `Team Member ${i + 1}`,
    role: ['Engineer', 'Designer', 'Product Manager', 'Marketing', 'Founder'][i % 5],
    description: "Passionate about building extraordinary digital experiences. Loves coffee and code.",
    image: `https://i.pravatar.cc/300?img=${i + 1 + 10}`
}));

// --- Animation Config ---
const transition = { type: 'spring', damping: 20, stiffness: 80 };

const TeamSection = ({ isEmbedded = false }) => {
    const [selectedId, setSelectedId] = useState(null);

    const handleMouseEnter = (id) => {
        if (selectedId !== id) {
            setSelectedId(id);
        }
    };

    const handleMouseLeave = () => {
        setSelectedId(null);
    };

    return (
        <section className={`relative w-full ${isEmbedded ? '' : 'min-h-screen bg-black'} ${isEmbedded ? 'text-white' : 'text-white'} py-20 px-4 md:px-10 flex flex-col items-center`}>

            {/* Bubble Ascension Heading */}
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", damping: 12, stiffness: 100 }}
                className="mb-16 text-center"
            >
                <h2 className="text-3xl md:text-5xl font-display font-medium mb-4">The <span className="text-[#44D79E]">Dream Team</span> Ascension</h2>
                <p className="text-gray-400 max-w-lg mx-auto">Floating bubbles of creativity and technical excellence.</p>
            </motion.div>

            {/* Scattered Grid Wrapper */}
            <div className={`w-full max-w-[1400px] min-h-[60rem] md:min-h-screen mb-20 flex flex-wrap justify-center content-start gap-8 md:gap-12 relative z-10`}>
                {teamMembers.map((member, i) => (
                    <TeamMemberBubble
                        key={member.id}
                        member={member}
                        isSelected={selectedId === member.id}
                        onMouseEnter={() => handleMouseEnter(member.id)}
                        onMouseLeave={handleMouseLeave}
                        index={i}
                    />
                ))}
            </div>
        </section>
    );
};

const TeamMemberBubble = ({ member, isSelected, onMouseEnter, onMouseLeave, index }) => {
    const floatDuration = 3 + Math.random() * 2;
    const isEven = index % 2 === 0;
    const bubbleRef = React.useRef(null);
    const [popupSide, setPopupSide] = React.useState('right');

    // Use LayoutEffect to calculate side before paint to avoid flicker
    React.useLayoutEffect(() => {
        if (isSelected && bubbleRef.current) {
            const rect = bubbleRef.current.getBoundingClientRect();
            const screenWidth = window.innerWidth;
            const popupWidth = window.innerWidth < 768 ? 260 : 300; // Estimated widths

            // Check if there is space on the right
            const hasSpaceRight = rect.right + popupWidth < screenWidth;
            // Check if there is space on the left
            const hasSpaceLeft = rect.left - popupWidth > 0;

            if (!hasSpaceRight && hasSpaceLeft) {
                setPopupSide('left');
            } else if (!hasSpaceLeft && hasSpaceRight) {
                setPopupSide('right');
            } else {
                // Default based on screen half
                setPopupSide(rect.left > screenWidth / 2 ? 'left' : 'right');
            }
        }
    }, [isSelected]);

    const popupPositionClass = popupSide === 'right' ? "left-[110%]" : "right-[110%]";
    const xOffset = popupSide === 'right' ? -20 : 20;

    return (
        <div
            ref={bubbleRef}
            className="relative"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.2, y: 100 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                    type: "spring",
                    damping: 12,
                    stiffness: 100,
                    delay: (index % 8) * 0.1
                }}
            >
                <motion.div
                    animate={{
                        y: [0, -15, 0],
                        x: [0, index % 2 === 0 ? 10 : -10, 0]
                    }}
                    transition={{
                        duration: floatDuration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: Math.random() * 2
                    }}
                    className="relative z-10"
                >
                    <div className="rounded-full">
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: isEven ? 3 : -3 }}
                            className={`w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 shadow-lg transition-all duration-300 relative bg-[#111] ${isSelected ? 'border-[#44D79E] shadow-[0_0_20px_rgba(68,215,158,0.4)]' : 'border-[#44D79E]/20'}`}
                        >
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-full h-full object-cover transition-all duration-500 opacity-100" // Fully opaque
                            />
                            {/* Glass Bubble Shine Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/20 pointer-events-none" />
                            <motion.div
                                animate={{
                                    opacity: [0.1, 0.3, 0.1],
                                    scale: [1, 1.2, 1]
                                }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="absolute -top-1/2 -left-1/2 w-full h-full bg-white/10 blur-xl rounded-full"
                            />
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Contextual Popup */}
            <AnimatePresence>
                {isSelected && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, x: xOffset }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8, x: xOffset }}
                        transition={{ duration: 0.2 }}
                        className={`absolute top-1/2 -translate-y-1/2 z-50 w-64 md:w-72 p-[1px] rounded-2xl overflow-hidden shadow-2xl pointer-events-none ${popupPositionClass}`}
                    >
                        {/* Running Border Color Effect */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_150deg,#44D79E_180deg,transparent_210deg,transparent_360deg)] opacity-40"
                        />

                        {/* Glassmorphism Content Card */}
                        <div className="relative w-full h-full bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden p-5">
                            {/* Shine Effect */}
                            <motion.div
                                animate={{
                                    left: ['-100%', '200%'],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    repeatDelay: 2,
                                    ease: "easeInOut"
                                }}
                                className="absolute top-0 bottom-0 w-16 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[25deg] pointer-events-none"
                            />

                            <div className="relative z-10">
                                <h3 className="text-lg font-bold mb-1 truncate text-white">{member.name}</h3>
                                <p className="text-[#44D79E] text-xs font-semibold uppercase tracking-widest mb-3">{member.role}</p>
                                <p className="text-gray-300 text-sm leading-relaxed mb-2 font-light">
                                    {member.description}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TeamSection;
