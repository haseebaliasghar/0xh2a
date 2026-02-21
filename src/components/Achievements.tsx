'use client';

import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';
import { Award, Trophy, GraduationCap, Shield, Star, CheckCircle } from 'lucide-react';

const achievements = [
    {
        id: 1,
        terminalPrefix: '> CERTIFICATION_ACQUIRED:',
        terminalText: 'CEH (Certified Ethical Hacker) — EC-Council [2024]',

        title: 'Certified Ethical Hacker (CEH)',
        issuer: 'EC-Council',
        year: '2024',
        icon: Shield,
        type: 'certification',
        color: 'from-green-500 to-emerald-600',
        highlight: true,
    },
    {
        id: 2,
        terminalPrefix: '> CERTIFICATION_ACQUIRED:',
        terminalText: 'CNSS (Certified Network Security Specialist) — ICSI [2020]',

        title: 'Certified Network Security Specialist (CNSS)',
        issuer: 'ICSI',
        year: '2020',
        icon: Award,
        type: 'certification',
        color: 'from-blue-500 to-indigo-600',
        highlight: false,
    },
    {
        id: 3,
        terminalPrefix: '> CERTIFICATION_ACQUIRED:',
        terminalText: 'Digital Forensics Certification — Autopsy / Basis Technology [2020]',

        title: 'Digital Forensics Certification',
        issuer: 'Autopsy / Basis Technology',
        year: '2020',
        icon: Trophy,
        type: 'certification',
        color: 'from-purple-500 to-violet-600',
        highlight: false,
    },
];

export default function Achievements() {
    const { isTerminal } = useTheme();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
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
                        <span className="text-white font-mono text-lg"> ~/achievements/</span>
                        <span className="text-[#00ff41] font-mono text-lg">badges.log</span>
                    </motion.div>

                    <div className="border border-[#30363d] bg-[#161b22] p-4 sm:p-6 font-mono text-sm">
                        <div className="flex items-center justify-between text-[#8b949e] mb-4">
                            <span>{'// '} SYSTEM_BADGES - Verified credentials loaded</span>
                            <span className="text-[#27ca40] flex items-center gap-1">
                                <CheckCircle size={14} />
                                AUTHENTICATED
                            </span>
                        </div>

                        <div className="space-y-3">
                            {achievements.map((achievement, index) => (
                                <motion.div
                                    key={achievement.id}
                                    variants={itemVariants}
                                    className={`py-3 px-3 transition-all hover:bg-[#0d1117] ${achievement.highlight ? 'border-l-2 border-[#ffd700]' : ''
                                        }`}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="flex items-start gap-2">
                                        <span className="text-[#ffd700]">
                                            {achievement.type === 'certification' && '🔐'}
                                            {achievement.type === 'award' && '🏆'}
                                            {achievement.type === 'academic' && '📚'}
                                        </span>
                                        <div>
                                            <span className="text-[#0ea5e9]">{achievement.terminalPrefix}</span>
                                            <div className="text-[#00ff41] mt-1">
                                                {achievement.terminalText}
                                                {achievement.highlight && (
                                                    <span className="ml-2 text-[#ffd700] animate-pulse">★</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div variants={itemVariants} className="mt-6 pt-4 border-t border-[#30363d]">
                            <div className="flex items-center gap-2">
                                <span className="text-[#27ca40]">{'>'} All credentials verified.</span>
                                <span className="text-[#8b949e]">|</span>
                                <span className="text-[#8b949e]">Badges: {achievements.length}</span>
                                <span className="text-[#8b949e]">|</span>
                                <span className="text-[#ffd700]">★ Featured: CEH</span>
                            </div>
                        </motion.div>
                    </div>
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
                <motion.h2
                    variants={itemVariants}
                    className="text-3xl font-bold text-slate-900 mb-4 text-center"
                >
                    Achievements & Certifications
                </motion.h2>
                <motion.p
                    variants={itemVariants}
                    className="text-slate-500 text-center mb-12"
                >
                    Professional credentials and academic recognition
                </motion.p>

                <div className="grid gap-4 sm:grid-cols-2">
                    {achievements.map((achievement, index) => (
                        <motion.div
                            key={achievement.id}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            className={`relative overflow-hidden rounded-2xl ${achievement.highlight ? 'sm:col-span-2' : ''
                                }`}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-10`}></div>
                            <div className={`relative flex items-center gap-4 p-5 border rounded-2xl transition-all ${achievement.highlight
                                ? 'border-yellow-300 bg-gradient-to-r from-yellow-50 to-amber-50'
                                : 'border-slate-200 bg-white hover:border-blue-300'
                                }`}>
                                {/* Icon */}
                                <div className={`p-3 rounded-xl bg-gradient-to-br ${achievement.color} text-white shadow-lg`}>
                                    <achievement.icon size={achievement.highlight ? 28 : 24} />
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className={`font-bold text-slate-900 ${achievement.highlight ? 'text-lg' : ''}`}>
                                            {achievement.title}
                                        </h3>
                                        {achievement.highlight && (
                                            <Star size={16} className="text-yellow-500 fill-yellow-500" />
                                        )}
                                    </div>
                                    <p className="text-slate-600 text-sm">{achievement.issuer}</p>
                                    <p className="text-slate-400 text-xs mt-1">{achievement.year}</p>
                                </div>

                                {/* Badge */}
                                <div className={`px-3 py-1 rounded-full text-xs font-medium ${achievement.type === 'certification'
                                    ? 'bg-green-100 text-green-700'
                                    : achievement.type === 'award'
                                        ? 'bg-yellow-100 text-yellow-700'
                                        : 'bg-blue-100 text-blue-700'
                                    }`}>
                                    {achievement.type === 'certification' && 'Certified'}
                                    {achievement.type === 'award' && 'Award'}
                                    {achievement.type === 'academic' && 'Academic'}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
