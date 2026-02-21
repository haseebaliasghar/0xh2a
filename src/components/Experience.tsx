'use client';

import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';
import { Building2, GraduationCap, Calendar, MapPin } from 'lucide-react';

// Terminal mode data (combined)
const experiences = [
    {
        id: 1,
        terminalDate: '[2015-2020]',
        terminalModule: '[RDX_INFRASTRUCTURE]',
        terminalAction: '[INIT]',
        terminalUser: '0xH2A (IT Support Specialist)',
        terminalTask: 'Managed & Optimized 20+ Node LAN',
        terminalStatus: 'MAINTAINED 100% network uptime via optimized router configs.',
        terminalLogs: [
            '> Managed 20+ node LAN – 100% network uptime maintained',
            '> Automated system update protocols – reduced maintenance time by 30%',
            '> Resolved hardware/software issues for 50+ customers daily (95% satisfaction)',
            '> Implemented custom firewall rules & monitored server logs for unauthorized access',
        ],
    },
    {
        id: 2,
        terminalDate: '[2023-PRESENT]',
        terminalModule: '[ACADEMIC_TRAINING]',
        terminalAction: '[PROCESS]',
        terminalUser: '0xH2A (BS-CYS Student)',
        terminalTask: 'BS Cyber Security — Sir Syed CASE IT',
        terminalStatus: 'Expected Graduation: 2027 | Location: Islamabad.',
        terminalLogs: [
            '> Enrolled in BS-CYS program — Expected 2027',
            '> Security Core: Network Security (A), Info Security (A), Intro to CyS (A), VA & RE (A-)',
            '> Applied Security: Digital Forensics, Security for IoT, Secure Software Design',
            '> Previously: ICS (Computer Science) — Global College of Sciences, Islamabad',
        ],
    },
];

// Recruiter mode — Work Experience
const workExperiences = [
    {
        id: 1,
        role: 'IT Support & Network Operations Specialist',
        company: 'RDX Cyber Cafe',
        location: 'Rawalpindi, Pakistan',
        period: '5 Years',
        description:
            'Managed and optimized a 20+ node LAN achieving 100% network uptime. Automated system update protocols reducing manual maintenance time by 30%. Resolved complex hardware/software issues for 50+ customers daily while maintaining a 95% satisfaction rate. Fortified network security with custom firewall rules.',
        achievements: ['100% Network Uptime', '30% Maintenance Reduction', '50+ Customers Daily', 'Firewall Hardening'],
        icon: Building2,
    },
];

// Recruiter mode — Education
const educationItems = [
    {
        id: 1,
        role: 'BS-CYS — Cyber Security',
        company: 'Sir Syed CASE IT',
        location: 'Islamabad, Pakistan',
        period: 'Expected 2027',
        description:
            'Security Core: Network Security (A), Information Security (A), Intro to Cyber Security (A), Vulnerability Assessment & Reverse Engineering (A-). Applied tracks: Digital Forensics, Security for IoT, Secure Software Design.',
        achievements: ['Network Security (A)', 'Info Security (A)', 'VA & RE (A-)', 'Digital Forensics'],
        icon: GraduationCap,
    },
    {
        id: 2,
        role: 'ICS — Computer Science',
        company: 'Global College of Sciences',
        location: 'Islamabad, Pakistan',
        period: '2 Years',
        description:
            'Intermediate in Computer Science — built foundational knowledge in computing, programming, and mathematics before transitioning to a specialized Cyber Security degree.',
        achievements: ['Computer Science', 'Mathematics', 'Islamabad'],
        icon: GraduationCap,
    },
];

export default function Experience() {
    const { isTerminal } = useTheme();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    };

    // ─── TERMINAL MODE ────────────────────────────────────────────────
    if (isTerminal) {
        return (
            <section id="experience" className="py-16 px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="max-w-4xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                >
                    <motion.div variants={itemVariants} className="mb-6">
                        <span className="text-[#0ea5e9] font-mono text-lg">{'>'} journalctl</span>
                        <span className="text-white font-mono text-lg"> -u </span>
                        <span className="text-[#00ff41] font-mono text-lg">career.service</span>
                        <span className="text-white font-mono text-lg"> --since=</span>
                        <span className="text-[#ffd700] font-mono text-lg">&quot;2015-01-01&quot;</span>
                    </motion.div>

                    <div className="space-y-6">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={exp.id}
                                variants={itemVariants}
                                className="border border-[#30363d] bg-[#161b22] overflow-hidden group hover:border-[#00ff41] transition-colors"
                            >
                                <div className="flex items-center justify-between px-4 py-2 bg-[#0d1117] border-b border-[#30363d]">
                                    <div className="flex items-center gap-2 font-mono text-sm">
                                        <span className="text-[#0ea5e9]">{exp.terminalDate}</span>
                                        <span className="text-[#ffd700]">{exp.terminalModule}</span>
                                        <span className="text-[#27ca40]">{exp.terminalAction}</span>
                                    </div>
                                    <span className="text-[#8b949e] text-xs">PID: {1000 + index}</span>
                                </div>

                                <div className="p-4 font-mono text-sm">
                                    <div className="text-[#8b949e] mb-2">
                                        <span className="text-white">User:</span> {exp.terminalUser}
                                    </div>
                                    <div className="text-[#00ff41] mb-3 terminal-glow">
                                        <span className="text-[#8b949e]">Task:</span> {exp.terminalTask}
                                    </div>

                                    <div className="space-y-1 border-l-2 border-[#30363d] pl-4 ml-2">
                                        {exp.terminalLogs.map((log, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                viewport={{ once: true }}
                                                className="text-[#8b949e] hover:text-[#00ff41] transition-colors"
                                            >
                                                {log}
                                            </motion.div>
                                        ))}
                                    </div>

                                    <div className="mt-3 pt-3 border-t border-[#30363d]">
                                        <span className="text-[#8b949e]">Status:</span>{' '}
                                        <span className="text-[#27ca40]">✓ {exp.terminalStatus}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>
        );
    }

    // ─── RECRUITER MODE ───────────────────────────────────────────────
    type CardItem = {
        id: number;
        role: string;
        company: string;
        location: string;
        period: string;
        description: string;
        achievements: string[];
        icon: React.ElementType;
    };

    const renderCard = (
        item: CardItem,
        gradient: string,
        dotColor: string,
        tagBg: string,
        tagText: string,
        companyColor: string,
    ) => (
        <motion.div key={item.id} variants={itemVariants} className="relative flex gap-6">
            {/* Timeline dot */}
            <div className={`absolute left-[10px] top-6 w-5 h-5 rounded-full ${dotColor} border-4 border-white shadow-md z-10`} />

            {/* Card */}
            <div className="w-full ml-10">
                <motion.div
                    className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 hover:shadow-xl transition-all"
                    whileHover={{ y: -4 }}
                >
                    <div className="flex items-start gap-4 mb-3">
                        <div className={`p-3 bg-gradient-to-br ${gradient} rounded-xl text-white shadow`}>
                            <item.icon size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-base font-bold text-slate-900 leading-tight">{item.role}</h4>
                            <p className={`font-semibold text-sm ${companyColor}`}>{item.company}</p>
                            <div className="flex flex-wrap gap-3 text-slate-400 text-xs mt-1">
                                <span className="flex items-center gap-1"><Calendar size={11} />{item.period}</span>
                                <span className="flex items-center gap-1"><MapPin size={11} />{item.location}</span>
                            </div>
                        </div>
                    </div>
                    <p className="text-slate-600 text-sm mb-3 leading-relaxed">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                        {item.achievements.map((a) => (
                            <span key={a} className={`px-2 py-1 ${tagBg} ${tagText} rounded-lg text-xs font-medium`}>{a}</span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );

    return (
        <section id="experience" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
            <motion.div
                className="max-w-4xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
            >
                <motion.h2 variants={itemVariants} className="text-3xl font-bold text-slate-900 mb-2 text-center">
                    Experience & Education
                </motion.h2>
                <motion.p variants={itemVariants} className="text-slate-500 text-center mb-14">
                    Professional career and academic background
                </motion.p>

                {/* ── WORK EXPERIENCE ── */}
                <motion.div variants={itemVariants} className="mb-14">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                            <Building2 size={20} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">Work Experience</h3>
                        <div className="flex-1 h-px bg-gradient-to-r from-blue-300 to-transparent rounded-full" />
                    </div>
                    <div className="relative">
                        <div className="absolute left-[18px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-blue-100 rounded-full" />
                        <div className="space-y-8">
                            {workExperiences.map((exp) =>
                                renderCard(exp, 'from-blue-500 to-cyan-500', 'bg-blue-500', 'bg-blue-50', 'text-blue-700', 'text-blue-600')
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* ── EDUCATION ── */}
                <motion.div variants={itemVariants}>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                            <GraduationCap size={20} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">Education</h3>
                        <div className="flex-1 h-px bg-gradient-to-r from-purple-300 to-transparent rounded-full" />
                    </div>
                    <div className="relative">
                        <div className="absolute left-[18px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-purple-100 rounded-full" />
                        <div className="space-y-8">
                            {educationItems.map((edu) =>
                                renderCard(edu, 'from-purple-500 to-indigo-500', 'bg-purple-500', 'bg-purple-50', 'text-purple-700', 'text-purple-600')
                            )}
                        </div>
                    </div>
                </motion.div>

            </motion.div>
        </section>
    );
}
