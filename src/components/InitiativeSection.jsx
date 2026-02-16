import { motion } from 'framer-motion';
import TypewriterHeading from './TypewriterHeading';

const initiatives = [
    {
        icon: "/ours/Growth Chart.gif",
        title: "Helping small business grow",
        highlight: "through Social Media",
        description: "Focus on sustainable growth and digital transformation for local businesses."
    },
    {
        icon: "/ours/Dollar Bills Animation.gif",
        title: "Expert services for SMEs",
        highlight: "at affordable prices",
        description: "Top-tier marketing strategies that fit the budget of small and medium enterprises."
    },
    {
        icon: "/ours/Target Animation.gif",
        title: "Empowering every business to",
        highlight: "succeed and make its mark.",
        description: "Providing the tools and expertise needed for every brand to stand out."
    },
    {
        icon: "/ours/Marketing Promotion.gif",
        title: "Making essential marketing",
        highlight: "services accessible to all.",
        description: "Democratizing high-end marketing techniques for every entrepreneur."
    }
];

const InitiativeSection = () => {
    return (
        <section className="relative py-32 bg-[#050505] overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#44D79E]/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-20">
                    <TypewriterHeading
                        text="Our"
                        highlightText="Initiative"
                        className="text-4xl md:text-7xl font-display font-bold mb-6"
                    />
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-[#44D79E] font-bold tracking-[0.2em] uppercase text-sm md:text-base"
                    >
                        Helping Small Business Grow Through Social Media
                    </motion.p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {initiatives.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{
                                opacity: 0,
                                x: index < 2 ? -100 : 100
                            }}
                            whileInView={{
                                opacity: 1,
                                x: 0
                            }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{
                                duration: 1.5,
                                delay: (index % 2) * 0.2,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                            whileHover={{ y: -10 }}
                            className="group relative p-1 rounded-3xl"
                        >
                            {/* Card Background & Border */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl opacity-50 group-hover:opacity-100 transition-opacity" />

                            {/* Inner Content (Glass) */}
                            <div className="relative h-full bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5 p-8 rounded-[22px] flex flex-col items-center text-center">
                                {/* Icon Container */}
                                <div className="mb-8 p-0 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-500 overflow-hidden">
                                    <img
                                        src={item.icon}
                                        alt={item.title}
                                        className="w-40 h-40 object-contain filter brightness-110"
                                    />
                                </div>

                                {/* Content */}
                                <h3 className="text-white text-lg md:text-xl font-bold leading-tight mb-4">
                                    {item.title} {" "}
                                    <span className="text-[#44D79E]">{item.highlight}</span>
                                </h3>

                                <p className="text-gray-500 text-sm leading-relaxed mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    {item.description}
                                </p>

                                {/* Hover Glow */}
                                <div className="absolute inset-0 bg-[#44D79E]/5 opacity-0 group-hover:opacity-100 rounded-[22px] transition-opacity blur-2xl pointer-events-none" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default InitiativeSection;
