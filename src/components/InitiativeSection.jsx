import { motion } from 'framer-motion';
import TypewriterHeading from './TypewriterHeading';
import MagicCard from './MagicCard';

const initiatives = [
    {
        icon: "/ours/Growth Chart.gif",
        title: "Helping small business grow",
        highlight: "through Social Media",
        description: "Focus on sustainable growth and digital transformation for local businesses.",
        glow: "68, 215, 158" // Green
    },
    {
        icon: "/ours/Dollar Bills Animation.gif",
        title: "Expert services for SMEs",
        highlight: "at affordable prices",
        description: "Top-tier marketing strategies that fit the budget of small and medium enterprises.",
        glow: "59, 130, 246" // Blue
    },
    {
        icon: "/ours/Target Animation.gif",
        title: "Empowering every business to",
        highlight: "succeed and make its mark.",
        description: "Providing the tools and expertise needed for every brand to stand out.",
        glow: "239, 68, 68" // Red
    },
    {
        icon: "/ours/Marketing Promotion.gif",
        title: "Making essential marketing",
        highlight: "services accessible to all.",
        description: "Democratizing high-end marketing techniques for every entrepreneur.",
        glow: "139, 92, 246" // Purple
    }
];

const InitiativeSection = () => {
    return (
        <section className="relative py-32 bg-[#040A15] overflow-hidden">
            {/* Background Layers */}
            <div className="absolute inset-0 z-0">
                {/* Central Radial Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(68,215,158,0.03)_0%,transparent_70%)]" />

                {/* SVG Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.05]" style={{
                    backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                    backgroundSize: '30px 30px',
                    maskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)'
                }} />

                {/* Lighting Accents */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[140px] -translate-y-1/3 translate-x-1/3 opacity-50" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#44D79E]/10 rounded-full blur-[140px] translate-y-1/3 -translate-x-1/3 opacity-50" />

                {/* Top Transition Gradient */}
                <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black to-transparent opacity-60" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-20">
                    <TypewriterHeading
                        text="Our"
                        highlightText="Initiative"
                        className="text-4xl md:text-5xl font-display font-black tracking-tight mb-4"
                    />
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-[#44D79E] font-black tracking-[0.3em] uppercase text-[10px] md:text-xs"
                    >
                        Helping Small Business Grow Through Social Media
                    </motion.p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {initiatives.map((item, index) => (
                        <MagicCard
                            key={index}
                            glowColor={item.glow}
                            className="bg-[#0a0a0a]/40 backdrop-blur-3xl border border-white/5 p-8 rounded-[2rem] flex flex-col items-center text-center h-auto min-h-[400px]"
                        >
                            {/* Icon Container */}
                            <div className="mb-8 p-0 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-500 overflow-hidden shadow-2xl relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <img
                                    src={item.icon}
                                    alt={item.title}
                                    className="w-40 h-40 object-contain filter brightness-110 relative z-10"
                                />
                            </div>

                            {/* Content */}
                            <h3 className="text-white text-lg md:text-xl font-bold leading-tight mb-4 group-hover:text-[#44D79E] transition-colors">
                                {item.title} {" "}
                                <span className="text-[#44D79E]">{item.highlight}</span>
                            </h3>

                            <p className="text-gray-500 text-sm leading-relaxed mt-auto opacity-60 group-hover:opacity-100 transition-all duration-500">
                                {item.description}
                            </p>
                        </MagicCard>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default InitiativeSection;
