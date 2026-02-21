'use client';

import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';
import { Folder, ExternalLink, Code, Shield, Network } from 'lucide-react';
import { useState } from 'react';

const projects = [
    {
        id: 1,
        terminalName: 'case_file_001',
        terminalTitle: 'NETRYX_NIDS',
        terminalDesc: 'AI-based Network Intrusion Detection System using ensemble ML models trained on CICIDS-2017 dataset.',
        terminalCommands: ['python', 'scikit-learn', 'streamlit', 'random-forest'],

        title: 'NETRYX – Intelligent Network Intrusion Detection System (NIDS)',
        description: 'Designed an AI-based NIDS using ensemble ML models (Random Forest, Decision Tree, Logistic Regression) trained on the CICIDS-2017 dataset. Achieved 99.8% detection accuracy with a Streamlit-based security dashboard.',
        tags: ['Python', 'Scikit-learn', 'Random Forest', 'Streamlit', 'CICIDS-2017'],
        icon: Shield,
        color: 'from-red-500 to-orange-500',
        githubUrl: 'https://github.com/haseebaliasghar/IDS',
    },
    {
        id: 2,
        terminalName: 'case_file_002',
        terminalTitle: 'Secure_Steganography_System',
        terminalDesc: 'Secure data-hiding system using AES encryption and LSB steganography with PBKDF2-HMAC-SHA256 key derivation.',
        terminalCommands: ['python', 'aes-256', 'lsb-steg', 'tkinter'],

        title: 'Secure Information System using Encryption & Steganography',
        description: 'Developed a secure data-hiding system using AES encryption and LSB steganography with PBKDF2-HMAC-SHA256 key derivation. Built a Tkinter-based GUI for secure message embedding, extraction, and decryption.',
        tags: ['Python', 'AES Encryption', 'Steganography', 'Tkinter', 'PBKDF2'],
        icon: Code,
        color: 'from-purple-500 to-pink-500',
        githubUrl: 'https://github.com/haseebaliasghar/secure-steganography-system',
    },
    {
        id: 3,
        terminalName: 'case_file_003',
        terminalTitle: 'ML_Model_Training_Analysis',
        terminalDesc: 'Hands-on ML classification and linear model training with data preprocessing and performance evaluation.',
        terminalCommands: ['python', 'scikit-learn', 'pandas', 'numpy'],

        title: 'Machine Learning Model Training & Analysis (Academic Projects)',
        description: 'Gained hands-on experience training and evaluating machine learning classification and linear models using Python. Worked on data preprocessing, model training, prediction, and performance evaluation with applications in security-related datasets.',
        tags: ['Python', 'Scikit-learn', 'Feature Engineering', 'Data Preprocessing'],
        icon: Network,
        color: 'from-blue-500 to-cyan-500',
        githubUrl: '',
    },
];

export default function Projects() {
    const { isTerminal } = useTheme();
    const [expandedProject, setExpandedProject] = useState<number | null>(null);

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
                        <span className="text-[#0ea5e9] font-mono text-lg">{'>'} ls -la</span>
                        <span className="text-white font-mono text-lg"> ~/case_files/</span>
                    </motion.div>

                    <div className="border border-[#30363d] bg-[#161b22] p-4 sm:p-6 font-mono text-sm">
                        <div className="text-[#8b949e] mb-4 flex justify-between">
                            <span>total {projects.length} | drwxr-xr-x 0xH2A</span>
                            <span className="text-[#00ff41]">🔒 CLASSIFIED</span>
                        </div>

                        <div className="space-y-4">
                            {projects.map((project) => (
                                <motion.div
                                    key={project.id}
                                    variants={itemVariants}
                                    className={`border transition-all cursor-pointer ${expandedProject === project.id
                                        ? 'border-[#00ff41] bg-[#0d1117]'
                                        : 'border-[#30363d] hover:border-[#00ff41]'
                                        }`}
                                    onClick={() => setExpandedProject(
                                        expandedProject === project.id ? null : project.id
                                    )}
                                >
                                    <div className="p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-[#ffd700]">📁</span>
                                            <span className="text-[#0ea5e9]">{project.terminalName}/</span>
                                            <span className="text-[#8b949e] text-xs ml-auto">
                                                [CLICK TO EXPAND]
                                            </span>
                                        </div>
                                        <div className="pl-6">
                                            <div className="text-[#00ff41] terminal-glow">
                                                {'>'} {project.terminalTitle}
                                            </div>
                                            <div className="text-[#8b949e] mt-1 text-xs">
                                                {project.terminalDesc}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Expanded content */}
                                    <motion.div
                                        initial={false}
                                        animate={{
                                            height: expandedProject === project.id ? 'auto' : 0,
                                            opacity: expandedProject === project.id ? 1 : 0,
                                        }}
                                        className="overflow-hidden border-t border-[#30363d]"
                                    >
                                        <div className="p-4 bg-[#0d1117]">
                                            <div className="text-[#8b949e] mb-2">{'// '} TOOLS UTILIZED:</div>
                                            <div className="flex flex-wrap gap-2">
                                                {project.terminalCommands.map((cmd) => (
                                                    <span
                                                        key={cmd}
                                                        className="px-2 py-1 bg-[#161b22] border border-[#30363d] text-[#00ff41] text-xs"
                                                    >
                                                        $ {cmd}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div variants={itemVariants} className="mt-6 text-[#8b949e]">
                            {'// '} Additional case files are classified. Access level: RESTRICTED
                        </motion.div>
                    </div>
                </motion.div>
            </section>
        );
    }

    // Recruiter Mode
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50">
            <motion.div
                className="max-w-5xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
            >
                <motion.h2
                    variants={itemVariants}
                    className="text-3xl font-bold text-slate-900 mb-4 text-center"
                >
                    Projects
                </motion.h2>
                <motion.p
                    variants={itemVariants}
                    className="text-slate-500 text-center mb-12"
                >
                    Hands-on security projects and lab environments
                </motion.p>

                <div className="grid gap-6 md:grid-cols-3">
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            variants={itemVariants}
                            className="group relative bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-300"
                            whileHover={{ y: -8 }}
                        >
                            {/* Gradient header */}
                            <div className={`h-32 bg-gradient-to-br ${project.color} p-6 flex items-end`}>
                                <div className="flex items-center justify-between w-full">
                                    <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white">
                                        <project.icon size={24} />
                                    </div>
                                    <ExternalLink
                                        size={18}
                                        className="text-white/70 group-hover:text-white transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium hover:bg-blue-100 hover:text-blue-600 transition-colors"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
