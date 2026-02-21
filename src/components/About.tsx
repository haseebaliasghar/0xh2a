'use client';

import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';

export default function About() {
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
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="max-w-4xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                >
                    <motion.div variants={itemVariants} className="mb-6">
                        <span className="text-[#0ea5e9] font-mono text-lg">{'>'} cat</span>
                        <span className="text-white font-mono text-lg"> ~/</span>
                        <span className="text-[#00ff41] font-mono text-lg">SYNOPSIS.md</span>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="border border-[#30363d] bg-[#161b22] p-4 sm:p-6 font-mono text-sm"
                    >
                        <div className="flex items-center justify-between text-[#8b949e] mb-4">
                            <span>{'// '} SYNOPSIS - Last updated: 2024</span>
                            <span className="text-[#27ca40]">✓ VERIFIED</span>
                        </div>

                        <div className="space-y-4 text-[#00ff41]">
                            <motion.p
                                variants={itemVariants}
                                className="leading-relaxed"
                            >
                                <span className="text-[#8b949e]">{'> '}</span>
                                <span className="text-[#ffd700]">CEH-Certified Cybersecurity Professional</span> with{' '}
                                <span className="text-[#ffd700]">5 years of experience</span> in technical support and network operations.
                            </motion.p>

                            <motion.p
                                variants={itemVariants}
                                className="leading-relaxed"
                            >
                                <span className="text-[#8b949e]">{'> '}</span>
                                Specialized in{' '}
                                <span className="text-[#0ea5e9]">threat detection</span>,{' '}
                                <span className="text-[#0ea5e9]">incident response</span>, and{' '}
                                <span className="text-[#0ea5e9]">IAM</span> through{' '}
                                <span className="text-[#ffd700]">Active Directory (AD)</span> hardening.
                            </motion.p>

                            <motion.p
                                variants={itemVariants}
                                className="leading-relaxed"
                            >
                                <span className="text-[#8b949e]">{'> '}</span>
                                Engineered multi-node labs for{' '}
                                <span className="text-[#ffd700]">GPO security</span>, analyzed auth logs for{' '}
                                <span className="text-red-400">IoCs</span>, bridging infrastructure with{' '}
                                <span className="text-[#27ca40]">Security Operations (SecOps)</span>.
                            </motion.p>
                        </div>

                        <motion.div
                            variants={itemVariants}
                            className="mt-6 pt-4 border-t border-[#30363d]"
                        >
                            <div className="flex flex-wrap gap-4 text-xs">
                                <span className="text-[#8b949e]">
                                    <span className="text-[#27ca40]">●</span> Status: Active
                                </span>
                                <span className="text-[#8b949e]">
                                    <span className="text-[#ffd700]">●</span> CEH | CNSS | Digital Forensics
                                </span>
                                <span className="text-[#8b949e]">
                                    <span className="text-[#0ea5e9]">●</span> Focus: SecOps / IAM / Threat Detection
                                </span>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </section>
        );
    }

    // Recruiter Mode
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
            <motion.div
                className="max-w-4xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
            >
                <motion.div variants={itemVariants} className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">About Me</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    <motion.div
                        variants={itemVariants}
                        className="md:col-span-2 bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 sm:p-8"
                    >
                        <p className="text-lg text-slate-700 leading-relaxed mb-4">
                            I am a <strong className="text-blue-600">CEH-Certified Cybersecurity Professional</strong> with{' '}
                            <strong>5 years of experience</strong> in technical support and network operations.
                        </p>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            Specialized in <strong>threat detection</strong>, <strong>incident response</strong>, and{' '}
                            <strong>Identity and Access Management (IAM)</strong> through{' '}
                            <strong className="text-blue-600">Active Directory (AD)</strong> hardening.
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                            Successfully engineered multi-node labs to implement{' '}
                            <strong>Group Policy Object (GPO)</strong> security and analyzed authentication logs
                            for <strong>Indicators of Compromise (IoCs)</strong> to bridge complex network
                            infrastructure with <strong className="text-green-600">Security Operations (SecOps)</strong>.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="space-y-4"
                    >
                        <div className="bg-white rounded-xl p-4 shadow-md border border-slate-100">
                            <div className="text-3xl mb-2">🎓</div>
                            <h3 className="font-bold text-slate-900">Education</h3>
                            <p className="text-slate-600 text-sm">BS-CYS · Cyber Security</p>
                            <p className="text-slate-400 text-xs">Sir Syed CASE IT · Expected 2027</p>
                        </div>

                        <div className="bg-white rounded-xl p-4 shadow-md border border-slate-100">
                            <div className="text-3xl mb-2">💼</div>
                            <h3 className="font-bold text-slate-900">Experience</h3>
                            <p className="text-slate-600 text-sm">5 Years in IT/Networking</p>
                            <p className="text-slate-400 text-xs">RDX Cyber Cafe — Rawalpindi</p>
                        </div>

                        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-4 text-white">
                            <div className="text-3xl mb-2">🛡️</div>
                            <h3 className="font-bold">CEH Certified</h3>
                            <p className="text-green-100 text-sm">EC-Council · 2024</p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
