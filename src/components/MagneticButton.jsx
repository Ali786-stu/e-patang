import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const MagneticButton = ({ children, onClick, className = "", type = "button" }) => {
    const buttonRef = useRef(null);

    return (
        <motion.button
            ref={buttonRef}
            type={type}
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
                group relative px-8 py-4 rounded-full overflow-hidden 
                transition-all duration-300 ease-out flex items-center justify-center
                ${className}
            `}
        >
            {/* Background Fill Layer (Curtain) */}
            <span
                className="absolute inset-0 w-full h-full bg-[#028CC3] transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out pointer-events-none"
            />

            {/* Content Wrapper for Rolling Text */}
            <span className="relative z-10 block overflow-hidden leading-none">

                {/* Text 1: Visible initially, slides up on hover */}
                <span className="block transform translate-y-0 group-hover:-translate-y-[150%] transition-transform duration-300 ease-out">
                    {children}
                </span>

                {/* Text 2: Hidden initially (below), slides to center on hover */}
                <span className="absolute inset-0 block transform translate-y-[150%] group-hover:translate-y-0 transition-transform duration-300 ease-out text-black">
                    {children}
                </span>

            </span>
        </motion.button>
    );
};

export default MagneticButton;
