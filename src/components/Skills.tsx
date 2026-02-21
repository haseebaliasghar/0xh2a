'use client';

import { useTheme } from '@/context/ThemeContext';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const skills = [
    { name: 'Kali Linux', level: 80, note: 'Lab/Field', category: 'Security' },
    { name: 'Metasploit', level: 65, note: 'Lab', category: 'Security' },
    { name: 'Nmap', level: 85, note: 'Practice', category: 'Security' },
    { name: 'BurpSuite', level: 60, note: 'Training', category: 'Security' },
    { name: 'Wireshark', level: 75, note: 'Field', category: 'Security' },
    { name: 'Wazuh (SIEM)', level: 55, note: 'Training', category: 'Security' },
    { name: 'Autopsy', level: 65, note: 'Academic', category: 'Security' },
    { name: 'TCP/IP', level: 95, note: 'Field', category: 'Networking' },
    { name: 'DNS/DHCP', level: 90, note: 'Field', category: 'Networking' },
    { name: 'Firewall Config', level: 85, note: 'Field', category: 'Networking' },
    { name: 'IDS/IPS', level: 70, note: 'Lab', category: 'Networking' },
    { name: 'Python', level: 75, note: 'Projects', category: 'AI & ML' },
    { name: 'Scikit-learn', level: 70, note: 'Projects', category: 'AI & ML' },
    { name: 'Random Forest', level: 72, note: 'NETRYX', category: 'AI & ML' },
    { name: 'Feature Engineering', level: 68, note: 'Academic', category: 'AI & ML' },
];

const categories = ['Security', 'Networking', 'AI & ML'];

// Generate ASCII bar with animation support
function generateBar(level: number, animated: boolean): string {
    const filled = Math.floor(level / 10);
    const empty = 10 - filled;
    if (animated) {
        return '█'.repeat(filled) + '░'.repeat(empty);
    }
    return '░'.repeat(10);
}

export default function Skills() {
    const { isTerminal } = useTheme();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [animatedLevels, setAnimatedLevels] = useState<Record<string, number>>({});

    // Animate skill bars when in view
    useEffect(() => {
        if (isInView && isTerminal) {
            skills.forEach((skill, index) => {
                setTimeout(() => {
                    setAnimatedLevels((prev) => ({ ...prev, [skill.name]: skill.level }));
                }, index * 100);
            });
        }
    }, [isInView, isTerminal]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
    };

    if (isTerminal) {
        return (
            <section ref={ref} className="py-16 px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="max-w-4xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                >
                    <motion.div variants={itemVariants} className="mb-6">
                        <span className="text-[#0ea5e9] font-mono text-lg">{'>'} ./scan_arsenal.sh</span>
                        <span className="text-white font-mono text-lg"> --verbose --animate</span>
                    </motion.div>

                    <div className="border border-[#30363d] bg-[#161b22] p-4 sm:p-6 font-mono text-sm overflow-x-auto">
                        <div className="text-[#8b949e] mb-4">
                            {'// '} SKILL_MATRIX_v2.0 - Loading modules...
                            <span className="ml-2 text-green-400">[OK]</span>
                        </div>

                        <div className="space-y-2 min-w-[400px]">
                            {skills.map((skill) => {
                                const currentLevel = animatedLevels[skill.name] || 0;
                                const filled = Math.floor(currentLevel / 10);
                                const empty = 10 - filled;
                                const bar = '█'.repeat(filled) + '░'.repeat(empty);

                                return (
                                    <motion.div
                                        key={skill.name}
                                        variants={itemVariants}
                                        className="flex items-center gap-2 hover:bg-[#0d1117] px-2 py-1 transition-colors group"
                                    >
                                        <span className="text-[#0ea5e9] w-48 truncate group-hover:text-[#00ff41] transition-colors">
                                            {skill.name}:
                                        </span>
                                        <span className="text-[#00ff41] skill-bar font-mono tracking-tight">
                                            [{bar}]
                                        </span>
                                        <span className="text-[#ffd700] w-12 text-right">
                                            {currentLevel}%
                                        </span>
                                        <span className="text-[#8b949e] text-xs">({skill.note})</span>
                                    </motion.div>
                                );
                            })}
                        </div>

                        <motion.div variants={itemVariants} className="mt-6 flex items-center gap-2">
                            <span className="text-[#27ca40]">{'>'} Arsenal scan complete.</span>
                            <span className="text-[#8b949e]">Loaded {skills.length} modules.</span>
                        </motion.div>
                    </div>
                </motion.div>
            </section>
        );
    }

    // Recruiter Mode
    return (
        <section ref={ref} className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
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
                    Skills & Expertise
                </motion.h2>
                <motion.p
                    variants={itemVariants}
                    className="text-slate-500 text-center mb-10"
                >
                    Technical competencies developed through academic training and hands-on experience
                </motion.p>

                <div className="grid gap-8 md:grid-cols-2">
                    {categories.map((category, catIndex) => (
                        <motion.div
                            key={category}
                            variants={itemVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-50px' }}
                        >
                            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 animate-pulse"></span>
                                {category}
                            </h3>
                            <div className="space-y-4">
                                {skills
                                    .filter((s) => s.category === category)
                                    .map((skill, skillIndex) => (
                                        <motion.div
                                            key={skill.name}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{
                                                delay: catIndex * 0.1 + skillIndex * 0.1,
                                                duration: 0.4
                                            }}
                                        >
                                            <div className="flex justify-between text-sm mb-1.5">
                                                <span className="text-slate-700 font-medium">{skill.name}</span>
                                                <motion.span
                                                    className="text-slate-500 font-mono"
                                                    initial={{ opacity: 0 }}
                                                    whileInView={{ opacity: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: catIndex * 0.1 + skillIndex * 0.1 + 0.5 }}
                                                >
                                                    {skill.level}%
                                                </motion.span>
                                            </div>
                                            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden relative">
                                                <motion.div
                                                    className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 bg-[length:200%_100%] relative"
                                                    initial={{ width: 0 }}
                                                    whileInView={{
                                                        width: `${skill.level}%`,
                                                        backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
                                                    }}
                                                    viewport={{ once: true }}
                                                    transition={{
                                                        width: {
                                                            duration: 1.2,
                                                            ease: 'easeOut',
                                                            delay: catIndex * 0.1 + skillIndex * 0.1,
                                                        },
                                                        backgroundPosition: {
                                                            duration: 2,
                                                            repeat: Infinity,
                                                            ease: 'linear',
                                                        }
                                                    }}
                                                >
                                                    {/* Shimmer effect */}
                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer" />
                                                </motion.div>
                                            </div>
                                        </motion.div>
                                    ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
