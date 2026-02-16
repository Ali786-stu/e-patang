import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TypewriterHeading from './TypewriterHeading';
import MagneticButton from './MagneticButton';

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
        service: 'Website Development',
        message: ''
    });

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const services = [
        "Website Development",
        "Social Media Marketing",
        "SEO",
        "Lead Generation"
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleServiceSelect = (service) => {
        setFormData(prev => ({ ...prev, service }));
        setIsDropdownOpen(false);
    };

    return (
        <section className="relative min-h-screen bg-[#050505] py-8 md:py-24 px-6 overflow-hidden flex flex-col items-center">
            {/* Background Glows */}
            <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-[#44D79E]/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

            {/* Header */}
            <div className="mb-6 md:mb-16 text-center">
                <TypewriterHeading
                    text="Get In"
                    highlightText="Touch"
                    className="text-3xl md:text-8xl font-display font-bold"
                />
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="text-gray-500 uppercase tracking-widest text-xs md:text-sm mt-4 font-medium"
                >
                    Let's Build Something Extraordinary Together
                </motion.p>
            </div>

            {/* Form Container */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full max-w-2xl relative z-10"
            >
                <div className="bg-[#111111]/40 backdrop-blur-2xl border border-white/5 p-5 md:p-12 rounded-[30px] md:rounded-[40px] shadow-2xl relative">
                    {/* Inner Content */}
                    <form className="space-y-6 md:space-y-8">
                        {/* Name Field */}
                        <div className="space-y-2">
                            <label className="text-gray-400 text-sm font-bold uppercase tracking-wider ml-2">Name</label>
                            <div className="relative group">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your Name"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-gray-600 outline-none focus:border-[#44D79E]/50 transition-all duration-300"
                                />
                                <div className="absolute inset-0 rounded-2xl bg-[#44D79E]/5 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none blur-xl" />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="text-gray-400 text-sm font-bold uppercase tracking-wider ml-2">Email</label>
                            <div className="relative group">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Your Email"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-gray-600 outline-none focus:border-[#44D79E]/50 transition-all duration-300"
                                />
                                <div className="absolute inset-0 rounded-2xl bg-[#44D79E]/5 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none blur-xl" />
                            </div>
                        </div>

                        {/* Whatsapp Field */}
                        <div className="space-y-2">
                            <label className="text-gray-400 text-sm font-bold uppercase tracking-wider ml-2">Whatsapp</label>
                            <div className="relative group">
                                <input
                                    type="text"
                                    name="whatsapp"
                                    value={formData.whatsapp}
                                    onChange={handleChange}
                                    placeholder="Your Whatsapp Number"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-gray-600 outline-none focus:border-[#44D79E]/50 transition-all duration-300"
                                />
                                <div className="absolute inset-0 rounded-2xl bg-[#44D79E]/5 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none blur-xl" />
                            </div>
                        </div>

                        {/* Services Dropdown */}
                        <div className="space-y-2">
                            <label className="text-gray-400 text-sm font-bold uppercase tracking-wider ml-2">Services</label>
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-left text-white flex justify-between items-center outline-none hover:border-white/20 transition-all duration-300"
                                >
                                    <span>{formData.service}</span>
                                    <motion.svg
                                        animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                                        className="w-5 h-5 text-[#44D79E]"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </motion.svg>
                                </button>

                                <AnimatePresence>
                                    {isDropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a1a] border border-white/10 rounded-2xl overflow-hidden z-20 shadow-2xl backdrop-blur-xl"
                                        >
                                            {services.map((service, idx) => (
                                                <button
                                                    key={idx}
                                                    type="button"
                                                    onClick={() => handleServiceSelect(service)}
                                                    className="w-full px-6 py-4 text-left text-gray-300 hover:bg-[#44D79E] hover:text-black transition-colors duration-200"
                                                >
                                                    {service}
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Message Field */}
                        <div className="space-y-2">
                            <label className="text-gray-400 text-sm font-bold uppercase tracking-wider ml-2">Message</label>
                            <div className="relative group">
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Write your message here..."
                                    rows={4}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-gray-600 outline-none focus:border-[#44D79E]/50 transition-all duration-300 resize-none"
                                />
                                <div className="absolute inset-0 rounded-2xl bg-[#44D79E]/5 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none blur-xl" />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4 flex justify-center">
                            <MagneticButton className="w-full bg-[#44D79E] text-black font-bold py-5 rounded-2xl text-lg hover:shadow-[0_0_30px_rgba(68,215,158,0.4)] transition-shadow duration-300 border-none">
                                Send Message
                            </MagneticButton>
                        </div>
                    </form>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#44D79E]/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            </motion.div>
        </section>
    );
};

export default ContactSection;
