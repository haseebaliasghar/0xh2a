'use client';

import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';
import InteractiveTerminal from './InteractiveTerminal';
import TextScramble from './TextScramble';

export default function Hero() {
    const { isTerminal } = useTheme();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    if (isTerminal) {
        return (
            <section className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex items-center relative">
                <motion.div
                    className="max-w-6xl mx-auto w-full"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* System Status Header */}
                    <motion.div
                        variants={itemVariants}
                        className="mb-8 text-center"
                    >
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-mono text-[#00ff41] terminal-glow mb-2">
                            <span className="text-[#8b949e]">{'>'}</span>{' '}
                            <TextScramble text="SYSTEM STATUS: OPERATIONAL" className="text-[#00ff41]" />
                        </h1>
                        <p className="text-[#8b949e] font-mono text-xs sm:text-sm">
                            Interactive Terminal — Type <span className="text-[#0ea5e9]">help</span> | Press <span className="text-[#ffd700]">TAB</span> to autocomplete
                        </p>
                    </motion.div>

                    {/* Interactive Terminal */}
                    <motion.div variants={itemVariants}>
                        <InteractiveTerminal />
                    </motion.div>

                    {/* Quick Stats */}
                    <motion.div
                        variants={itemVariants}
                        className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto"
                    >
                        {[
                            { value: 'CEH', label: 'CERTIFIED', color: 'text-[#00ff41]' },
                            { value: '5+', label: 'YEARS FIELD', color: 'text-[#0ea5e9]' },
                            { value: '3', label: 'CERTS', color: 'text-[#ffd700]' },
                            { value: '🟢', label: 'AVAILABLE', color: 'text-green-400' },
                        ].map((stat) => (
                            <motion.div
                                key={stat.label}
                                className="border border-[#30363d] bg-[#161b22]/80 backdrop-blur-sm p-3 sm:p-4 text-center hover:border-[#00ff41] transition-colors group"
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className={`${stat.color} text-xl sm:text-2xl font-mono terminal-glow group-hover:animate-pulse`}>
                                    {stat.value}
                                </div>
                                <div className="text-[#8b949e] text-[10px] sm:text-xs mt-1">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Scroll indicator */}
                    <motion.div
                        variants={itemVariants}
                        className="mt-12 text-center"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        <span className="text-[#30363d] text-xs sm:text-sm font-mono">
                            [ scroll to explore more ]
                        </span>
                    </motion.div>
                </motion.div>
            </section>
        );
    }

    // Recruiter Mode
    return (
        <section className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 flex items-center bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
            <div className="absolute bottom-20 left-10 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }} />

            <motion.div
                className="max-w-4xl mx-auto w-full text-center relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Profile Photo Placeholder */}
                <motion.div
                    variants={itemVariants}
                    className="w-28 h-28 sm:w-32 sm:h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-2xl ring-4 ring-white"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                >
                    <span className="text-white text-3xl sm:text-4xl font-bold">H<sub className="text-xl sm:text-2xl">2</sub>A</span>
                </motion.div>

                <motion.h1
                    variants={itemVariants}
                    className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 mb-4"
                >
                    <TextScramble text="Haseeb Ali Asghar" scrambleOnHover={false} />
                </motion.h1>

                <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-2 mb-6">
                    {['Cybersecurity Student', 'CEH Certified', 'IT Support Specialist'].map((badge, i) => (
                        <motion.span
                            key={badge}
                            className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${i === 0 ? 'bg-blue-100 text-blue-700' :
                                i === 1 ? 'bg-green-100 text-green-700' :
                                    'bg-purple-100 text-purple-700'
                                }`}
                            whileHover={{ scale: 1.05 }}
                        >
                            {badge}
                        </motion.span>
                    ))}
                </motion.div>

                <motion.p
                    variants={itemVariants}
                    className="text-base sm:text-lg lg:text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed"
                >
                    CEH-Certified cybersecurity professional specializing in threat detection & SecOps.
                    <br />
                    <span className="text-slate-500 text-sm sm:text-base">5 years of hands-on network & IT support experience.</span>
                </motion.p>

                <motion.div
                    variants={itemVariants}
                    className="flex flex-wrap justify-center gap-3 sm:gap-4"
                >
                    <motion.a
                        href="#contact"
                        className="group px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 text-sm sm:text-base"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span>Contact Me</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </motion.a>
                    <motion.a
                        href="/resume.pdf"
                        download="Haseeb_Ali_Asghar_Resume.pdf"
                        className="group px-6 sm:px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 text-sm sm:text-base"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>Download Resume</span>
                    </motion.a>
                    <motion.a
                        href="#experience"
                        className="px-6 sm:px-8 py-3 border-2 border-slate-300 text-slate-700 rounded-full hover:border-blue-500 hover:text-blue-600 transition-all text-sm sm:text-base"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        View Experience
                    </motion.a>
                </motion.div>

                {/* Stats Cards */}
                <motion.div
                    variants={itemVariants}
                    className="mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
                >
                    {[
                        { value: 'CEH', label: 'Certified', color: 'text-blue-600' },
                        { value: '5+', label: 'Years Technical', color: 'text-green-600' },
                        { value: '3', label: 'Certifications', color: 'text-purple-600' },
                        { value: '99.8%', label: 'NIDS Accuracy', color: 'text-amber-500' },
                    ].map((stat) => (
                        <motion.div
                            key={stat.label}
                            className="bg-white/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-md border border-slate-100"
                            whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                        >
                            <div className={`text-2xl sm:text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                            <div className="text-slate-500 text-xs sm:text-sm mt-1">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}
