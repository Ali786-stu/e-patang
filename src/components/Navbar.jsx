import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { useNavigate, useLocation } from 'react-router-dom';

const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Newsletter', href: '#newsletter' },
    { name: 'Careers', href: '#careers' },
    { name: 'Contact Us', href: '#contact' },
];

const Navbar = () => {
    const lenis = useLenis();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
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
        setIsMenuOpen(false);

        if (href.startsWith('#')) {
            if (pathname !== '/') {
                navigate('/' + href);
            } else if (lenis) {
                lenis.scrollTo(href, {
                    offset: 0,
                    immediate: true // Jump immediately
                });
            } else {
                const element = document.querySelector(href);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        } else {
            navigate(href);
        }
    };

    const menuVariants = {
        closed: {
            opacity: 0,
            y: "-100%",
            transition: {
                duration: 0.5,
                ease: [0.76, 0, 0.24, 1]
            }
        },
        open: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.76, 0, 0.24, 1]
            }
        }
    };

    const linkVariants = {
        initial: { x: 80, opacity: 0 },
        enter: (i) => ({
            x: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i }
        }),
        exit: (i) => ({
            x: 80,
            opacity: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i }
        })
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${isScrolled || isMenuOpen ? 'py-4 bg-[#040A15]/80 backdrop-blur-md border-b border-white/10' : 'py-6 bg-transparent'
                    }`}
            >
                <div className="container mx-auto px-6 flex items-center justify-between">
                    {/* Logo */}
                    <a href="#home" onClick={(e) => handleClick(e, '#home')} className="flex items-center gap-2 group relative z-10">
                        <img
                            src="/images/logo.png"
                            alt="ePatang Logo"
                            className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                        />
                    </a>

                    {/* Nav Links - Desktop */}
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

                    {/* Mobile Menu Button */}
                    <div className="md:hidden relative z-10">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-white hover:text-[#44D79E] transition-colors"
                        >
                            <div className="w-8 flex flex-col items-end gap-1.5">
                                <motion.span
                                    animate={isMenuOpen ? { rotate: 45, y: 8, width: "100%" } : { rotate: 0, y: 0, width: "100%" }}
                                    className="h-0.5 bg-current rounded-full"
                                />
                                <motion.span
                                    animate={isMenuOpen ? { opacity: 0, width: "0%" } : { opacity: 1, width: "70%" }}
                                    className="h-0.5 bg-current rounded-full"
                                />
                                <motion.span
                                    animate={isMenuOpen ? { rotate: -45, y: -8, width: "100%" } : { rotate: 0, y: 0, width: "100%" }}
                                    className="h-0.5 bg-current rounded-full"
                                />
                            </div>
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        variants={menuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="fixed inset-0 w-full h-screen bg-[#040A15] z-[90] flex flex-col justify-center px-10 md:hidden"
                    >
                        <div className="flex flex-col gap-6">
                            <p className="text-gray-500 text-xs tracking-[0.3em] uppercase mb-4">Navigation</p>
                            {navItems.map((item, i) => (
                                <motion.a
                                    key={item.name}
                                    variants={linkVariants}
                                    custom={i}
                                    initial="initial"
                                    animate="enter"
                                    exit="exit"
                                    href={item.href}
                                    onClick={(e) => handleClick(e, item.href)}
                                    className="text-4xl font-display font-medium text-white hover:text-[#44D79E] transition-colors"
                                >
                                    {item.name}
                                </motion.a>
                            ))}
                        </div>

                        <div className="mt-20 flex flex-col gap-4 border-t border-white/10 pt-10">
                            <p className="text-gray-500 text-xs tracking-[0.2em] uppercase">Connect with us</p>
                            <div className="flex gap-6">
                                <a href="#" className="text-white hover:text-[#44D79E] transition-colors">Instagram</a>
                                <a href="#" className="text-white hover:text-[#44D79E] transition-colors">WhatsApp</a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
