import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TypewriterHeading from './TypewriterHeading';
import MagneticButton from './MagneticButton';
import PremiumButton from './PremiumButton';

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <section className="relative min-h-screen bg-[#040A15] py-8 md:py-24 px-6 overflow-hidden flex flex-col items-center">
            {/* Background Glows */}
            <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-[#44D79E]/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

            {/* Header */}
            <div className="mb-6 md:mb-16 text-center">
                <TypewriterHeading
                    text="Get In"
                    highlightText="Touch"
                    className="text-3xl md:text-5xl font-display font-black tracking-tight"
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
                className="w-full max-w-4xl relative z-10"
            >
                <div className="bg-[#111111]/40 backdrop-blur-2xl border border-white/5 p-6 md:p-12 rounded-[30px] md:rounded-[40px] shadow-2xl relative overflow-hidden">
                    {/* Inner Content */}
                    <form className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                            {/* Left Column: Name & WhatsApp */}
                            <div className="space-y-8 flex flex-col">
                                {/* Name Field */}
                                <div className="space-y-2">
                                    <label className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] ml-2">Name</label>
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Full Name"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-gray-600 outline-none focus:border-[#44D79E]/50 transition-all duration-300 text-sm"
                                        />
                                        <div className="absolute inset-0 rounded-xl bg-[#44D79E]/5 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none blur-xl" />
                                    </div>
                                </div>

                                {/* WhatsApp Field */}
                                <div className="space-y-2">
                                    <label className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] ml-2">WhatsApp</label>
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            name="whatsapp"
                                            value={formData.whatsapp}
                                            onChange={handleChange}
                                            placeholder="+91 00000 00000"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-gray-600 outline-none focus:border-[#44D79E]/50 transition-all duration-300 text-sm"
                                        />
                                        <div className="absolute inset-0 rounded-xl bg-[#44D79E]/5 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none blur-xl" />
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Email & Message */}
                            <div className="space-y-8 flex flex-col">
                                {/* Email Field */}
                                <div className="space-y-2">
                                    <label className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] ml-2">Email</label>
                                    <div className="relative group">
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="hello@example.com"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-gray-600 outline-none focus:border-[#44D79E]/50 transition-all duration-300 text-sm"
                                        />
                                        <div className="absolute inset-0 rounded-xl bg-[#44D79E]/5 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none blur-xl" />
                                    </div>
                                </div>

                                {/* Message Field */}
                                <div className="space-y-2 flex-1 flex flex-col">
                                    <label className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] ml-2">Message</label>
                                    <div className="relative group flex-1">
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Briefly describe your project..."
                                            className="w-full h-full min-h-[140px] bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-gray-600 outline-none focus:border-[#44D79E]/50 transition-all duration-300 resize-none text-sm"
                                        />
                                        <div className="absolute inset-0 rounded-xl bg-[#44D79E]/5 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none blur-xl" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-6 flex justify-center">
                            <div className="w-full sm:w-auto">
                                <MagneticButton distance={0.4}>
                                    <PremiumButton
                                        className="!bg-[#44D79E] !text-black shadow-[0_0_40px_rgba(68,215,158,0.4)]"
                                        onClick={() => console.log("Form submitted")}
                                    >
                                        SEND MESSAGE
                                    </PremiumButton>
                                </MagneticButton>
                            </div>
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
