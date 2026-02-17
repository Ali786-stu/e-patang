import React from 'react';
import { motion } from 'framer-motion';

/**
 * Premium Button with cinematic glassmorphism, glowing borders, and shimmer effects.
 */
const PremiumButton = ({
    children,
    onClick,
    variant = "primary", // primary, outline
    className = "",
    icon: Icon
}) => {
    const isPrimary = variant === "primary";

    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
                group/pbtn relative px-8 py-4 rounded-2xl overflow-hidden
                transition-all duration-300 font-black text-xs tracking-[0.2em] uppercase
                flex items-center justify-center w-full
                ${isPrimary
                    ? "bg-white/5 border border-white/10 hover:border-[#44D79E]/50 text-white shadow-2xl"
                    : "border border-white/10 hover:border-white/30 text-white/70 hover:text-white"
                }
                ${className}
            `}
        >
            {/* Background Fill-up Effect */}
            <div className={`
                absolute inset-0 translate-y-full group-hover/pbtn:translate-y-0 
                transition-transform duration-500 ease-[0.22,1,0.36,1] -z-10
                ${isPrimary ? "bg-[#44D79E]" : "bg-white"}
            `} />

            {/* Shimmer Glint Effect */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/pbtn:animate-shimmer pointer-events-none z-20" />

            {/* Content Container (Rolling Effect) */}
            <div className="relative h-5 overflow-hidden flex flex-col items-center justify-center">
                {/* Layer 1: Original */}
                <div className="flex items-center justify-center gap-3 transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover/pbtn:-translate-y-full">
                    <span className="relative z-10 flex items-center justify-center gap-3">
                        {children}
                        {Icon && <Icon className="w-4 h-4 transition-transform duration-300" />}
                    </span>
                </div>
                {/* Layer 2: Hover State */}
                <div className="absolute top-full flex items-center justify-center gap-3 transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover/pbtn:-translate-y-full">
                    <span className={`relative z-10 flex items-center justify-center gap-3 ${isPrimary ? "text-black" : "text-black"}`}>
                        {children}
                        {Icon && <Icon className="w-4 h-4 transition-transform duration-300" />}
                    </span>
                </div>
            </div>

            {/* Subtle Inner Glow (Primary Only) */}
            {isPrimary && (
                <div className="absolute inset-0 bg-[#44D79E]/5 opacity-0 group-hover/pbtn:opacity-100 transition-opacity pointer-events-none" />
            )}

            {/* Hover Border Glow */}
            <div className={`
                absolute inset-0 rounded-2xl opacity-0 group-hover/pbtn:opacity-100 transition-opacity pointer-events-none
                ${isPrimary ? "shadow-[inset_0_0_20px_rgba(68,215,158,0.2)]" : "shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]"}
            `} />
        </motion.button>
    );
};

export default PremiumButton;
