import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Testimonial', href: '#testimonial' },
    { name: 'Contact Us', href: '#contact' },
];

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleClick = (e, href) => {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-4 bg-background/80 backdrop-blur-md border-b border-white/10' : 'py-6 bg-transparent'
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <a href="#home" onClick={(e) => handleClick(e, '#home')} className="flex items-center gap-2 group">
                    <img
                        src="/images/logo.png"
                        alt="ePatang Logo"
                        className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                </a>

                {/* Nav Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            onClick={(e) => handleClick(e, item.href)}
                            className="relative text-sm font-medium uppercase tracking-widest text-white/70 hover:text-[#44D79E] transition-colors duration-300"
                        >
                            {item.name}
                            <motion.span
                                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#44D79E]"
                                whileHover={{ width: '100%' }}
                                transition={{ duration: 0.3 }}
                            />
                        </a>
                    ))}
                </div>

                {/* Mobile Menu Button - Placeholder */}
                <div className="md:hidden">
                    <button className="text-white hover:text-[#44D79E] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
