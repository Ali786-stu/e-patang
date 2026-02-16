import React from 'react';
import { motion } from 'framer-motion';

const TypewriterHeading = ({ text, highlightText, className = "" }) => {
    // Split combined text into characters
    const fullText = highlightText ? `${text} ${highlightText}` : text;
    const characters = Array.from(fullText);

    // Calculate where highlight starts
    const highlightStart = text.length + 1;

    const containerVariants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.2,
            },
        },
    };

    const characterVariants = {
        hidden: { opacity: 0, display: 'none' },
        visible: {
            opacity: 1,
            display: 'inline-block'
        },
    };

    // Split text into words, then words into characters
    const words = fullText.split(' ');
    let globalCharIndex = 0;

    return (
        <motion.h2
            className={`flex flex-wrap justify-center items-center gap-x-[0.3em] gap-y-2 ${className}`}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
        >
            {words.map((word, wordIdx) => (
                <span key={wordIdx} className="inline-flex whitespace-nowrap">
                    {Array.from(word).map((char, charIdx) => {
                        const isHighlight = highlightText && globalCharIndex >= highlightStart;
                        globalCharIndex++;
                        if (wordIdx < words.length - 1 && charIdx === word.length - 1) globalCharIndex++; // account for space

                        return (
                            <motion.span
                                key={charIdx}
                                variants={characterVariants}
                                className={isHighlight ? "text-transparent bg-clip-text bg-gradient-to-r from-[#44D79E] to-teal-400" : "text-white"}
                            >
                                {char}
                            </motion.span>
                        );
                    })}
                </span>
            ))}

            {/* Blinking Cursor */}
            <motion.span
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                }}
                className="inline-block w-[4px] h-[0.8em] bg-[#44D79E] ml-1 self-center"
                style={{ verticalAlign: 'middle' }}
            />
        </motion.h2>
    );
};

export default TypewriterHeading;
