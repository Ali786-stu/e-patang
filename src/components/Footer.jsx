import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Facebook,
    Youtube,
    Instagram,
    Linkedin,
    Mail,
    MapPin,
    Phone,
    ArrowUpRight,
    Send
} from 'lucide-react';

const Footer = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        company: [
            { name: "About Us", href: "#about" },
            { name: "Our Process", href: "#services" },
            { name: "Influencer Marketing", href: "/influencer-marketing" },
            { name: "UGC Creators", href: "/ugc-creators" },
            { name: "Initiatives", href: "#initiative" },
            { name: "Testimonials", href: "#testimonial" }
        ],
        services: [
            { name: "Web Development", href: "#services" },
            { name: "Social Marketing", href: "#services" },
            { name: "SEO Optimization", href: "#services" },
            { name: "Lead Generation", href: "#services" }
        ],
        social: [
            { icon: Facebook, href: "https://www.facebook.com/epatangindia", name: "Facebook" },
            { icon: Youtube, href: "https://www.youtube.com/@ePatang", name: "Youtube" },
            { icon: Instagram, href: "https://www.instagram.com/e_patang/", name: "Instagram" },
            { icon: Linkedin, href: "https://www.linkedin.com/company/e-patang/posts/?feedView=all", name: "Linkedin" }
        ]
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const handleScroll = (e, href) => {
        e.preventDefault();
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
                    window.scrollTo({
                        top: element.offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        } else {
            navigate(href);
        }
    };

    return (
        <footer className="relative bg-[#040A15] pt-24 pb-12 overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#44D79E]/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20"
                >
                    {/* Brand Section */}
                    <motion.div variants={itemVariants} className="space-y-8">
                        <div>
                            <a href="#home" onClick={(e) => handleScroll(e, '#home')} className="inline-block group">
                                <img
                                    src="/images/logo.png"
                                    alt="ePatang Logo"
                                    className="h-12 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                                />
                            </a>
                            <p className="mt-4 text-gray-500 leading-relaxed max-w-xs text-sm md:text-base">
                                Crafting high-performance digital experiences that turn clicks into customers and chaos into clarity.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <a
                                href="https://www.google.com/maps/search/Parking+1,+Pincode+226012,+Uttar+Pradesh/@26.7738722,80.8875853,15z"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-gray-400 hover:text-[#44D79E] transition-colors group"
                            >
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#44D79E]/10 transition-all duration-300">
                                    <MapPin size={18} />
                                </div>
                                <span className="text-sm">Parking 1, Pincode 226012, Uttar Pradesh</span>
                            </a>
                            <a
                                href="tel:+919429691504"
                                className="flex items-center gap-3 text-gray-400 hover:text-[#44D79E] transition-colors group"
                            >
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#44D79E]/10 transition-all duration-300">
                                    <Phone size={18} />
                                </div>
                                <span className="text-sm">+91 94296 91504</span>
                            </a>
                        </div>
                    </motion.div>

                    {/* Navigation */}
                    <motion.div variants={itemVariants} className="space-y-8">
                        <h4 className="text-white font-bold uppercase tracking-widest text-xs md:text-sm">Navigation</h4>
                        <ul className="space-y-4">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        onClick={(e) => handleScroll(e, link.href)}
                                        className="text-gray-500 hover:text-white transition-all flex items-center group gap-2 text-sm md:text-base"
                                    >
                                        <span className="w-0 group-hover:w-4 h-[1px] bg-[#44D79E] transition-all duration-300 overflow-hidden" />
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Services */}
                    <motion.div variants={itemVariants} className="space-y-8">
                        <h4 className="text-white font-bold uppercase tracking-widest text-xs md:text-sm">Expertise</h4>
                        <ul className="space-y-4">
                            {footerLinks.services.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        onClick={(e) => handleScroll(e, link.href)}
                                        className="text-gray-500 hover:text-white transition-all flex items-center group gap-2 text-sm md:text-base"
                                    >
                                        <span className="w-0 group-hover:w-4 h-[1px] bg-[#44D79E] transition-all duration-300 overflow-hidden" />
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Newsletter */}
                    <motion.div variants={itemVariants} className="space-y-8">
                        <div>
                            <h4 className="text-white font-bold uppercase tracking-widest text-xs md:text-sm mb-4">Newsletter</h4>
                            <p className="text-gray-500 text-sm mb-6">
                                Stay updated with the latest in digital excellence and marketing strategies.
                            </p>
                            <form className="relative group">
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#44D79E]/50 transition-all placeholder:text-gray-600"
                                />
                                <button className="absolute right-2 top-2 w-10 h-10 bg-[#44D79E] rounded-xl flex items-center justify-center text-black hover:scale-110 active:scale-95 transition-all">
                                    <Send size={18} />
                                </button>
                            </form>
                        </div>

                        {/* Social Links */}
                        <div className="pt-4">
                            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-4">Follow Us</h4>
                            <div className="flex gap-4">
                                {footerLinks.social.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:bg-[#44D79E] hover:text-black hover:scale-110 active:scale-95 transition-all duration-300 group"
                                    >
                                        <social.icon size={18} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6"
                >
                    <div className="text-gray-500 text-xs md:text-sm tracking-widest uppercase font-medium">
                        © {currentYear} e-PATANG AGENCY. ALL RIGHTS RESERVED.
                    </div>

                    <div className="flex items-center gap-8">
                        <a href="#" className="text-gray-600 hover:text-[#44D79E] text-[10px] md:text-xs tracking-[0.2em] uppercase transition-colors">Privacy Policy</a>
                        <a href="#" className="text-gray-600 hover:text-[#44D79E] text-[10px] md:text-xs tracking-[0.2em] uppercase transition-colors">Terms of Service</a>
                    </div>

                    <div className="flex items-center gap-2 text-[#44D79E]/40 text-[10px] md:text-xs tracking-[0.4em] uppercase">
                        Digital Excellence <ArrowUpRight size={12} />
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
