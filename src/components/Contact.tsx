'use client';

import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';
import { Mail, Github, MapPin, Send, Linkedin, ExternalLink, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
    const { isTerminal } = useTheme();
    const [copied, setCopied] = useState(false);

    const copyEmail = () => {
        navigator.clipboard.writeText('haseeb.aliasghar@yahoo.com');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

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
            <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[#30363d]">
                <motion.div
                    className="max-w-4xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                >
                    <motion.div variants={itemVariants} className="mb-6">
                        <span className="text-[#0ea5e9] font-mono text-lg">{'>'} ./initiate_contact.sh</span>
                        <span className="text-white font-mono text-lg"> --secure --encrypt</span>
                    </motion.div>

                    <div className="border border-[#30363d] bg-[#161b22] p-4 sm:p-6 font-mono text-sm">
                        <motion.div variants={itemVariants} className="text-[#00ff41] mb-6 terminal-glow text-lg">
                            {'>'} INITIATE_SECURE_COMMUNICATION
                        </motion.div>

                        <div className="space-y-4">
                            <motion.div
                                variants={itemVariants}
                                className="flex items-center gap-4 p-3 border border-[#30363d] hover:border-[#00ff41] transition-colors group"
                            >
                                <span className="text-[#0ea5e9]">📧 EMAIL:</span>
                                <a
                                    href="mailto:haseeb.aliasghar@yahoo.com"
                                    className="text-[#00ff41] hover:terminal-glow transition-all flex-1"
                                >
                                    haseeb.aliasghar@yahoo.com
                                </a>
                                <button
                                    onClick={copyEmail}
                                    className="text-[#8b949e] hover:text-[#00ff41] transition-colors"
                                    title="Copy email"
                                >
                                    {copied ? <Check size={16} /> : <Copy size={16} />}
                                </button>
                            </motion.div>

                            <motion.div
                                variants={itemVariants}
                                className="flex items-center gap-4 p-3 border border-[#30363d] hover:border-[#00ff41] transition-colors"
                            >
                                <span className="text-[#0ea5e9]">🐙 GITHUB:</span>
                                <a
                                    href="https://github.com/haseebaliasghar"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#00ff41] hover:terminal-glow transition-all flex items-center gap-2"
                                >
                                    github.com/haseebaliasghar
                                    <ExternalLink size={14} className="text-[#8b949e]" />
                                </a>
                            </motion.div>

                            <motion.div
                                variants={itemVariants}
                                className="flex items-center gap-4 p-3 border border-[#30363d] hover:border-[#00ff41] transition-colors"
                            >
                                <span className="text-[#0ea5e9]">🔗 LINKEDIN:</span>
                                <a
                                    href="https://linkedin.com/in/haseebaliasghar"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#00ff41] hover:terminal-glow transition-all flex items-center gap-2"
                                >
                                    linkedin.com/in/haseebaliasghar
                                    <ExternalLink size={14} className="text-[#8b949e]" />
                                </a>
                            </motion.div>

                            <motion.div
                                variants={itemVariants}
                                className="flex items-center gap-4 p-3 border border-[#30363d]"
                            >
                                <span className="text-[#0ea5e9]">📍 LOCATION:</span>
                                <span className="text-[#00ff41]">Rawalpindi, Pakistan</span>
                                <span className="text-[#8b949e] text-xs">| GMT+5</span>
                            </motion.div>

                            <motion.div
                                variants={itemVariants}
                                className="flex items-center gap-4 p-3 border border-[#30363d] bg-[#0d1117]"
                            >
                                <span className="text-[#0ea5e9]">🟢 STATUS:</span>
                                <span className="text-green-400 animate-pulse">AVAILABLE FOR OPPORTUNITIES</span>
                            </motion.div>
                        </div>

                        <motion.div
                            variants={itemVariants}
                            className="mt-8 pt-4 border-t border-[#30363d] text-[#8b949e] text-xs flex justify-between"
                        >
                            <span>{'// '} Connection secured with TLS 1.3</span>
                            <span>Awaiting your transmission...</span>
                        </motion.div>
                    </div>

                    <motion.div
                        variants={itemVariants}
                        className="mt-8 text-center text-[#8b949e] font-mono text-xs"
                    >
                        <div className="mb-2">© 2024 Haseeb Ali Asghar | All systems operational</div>
                        <div className="text-[#30363d]">Built with Next.js • Terminal Mode activated</div>
                    </motion.div>
                </motion.div>
            </section>
        );
    }

    // Recruiter Mode
    return (
        <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white border-t border-slate-200">
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
                    Let&apos;s Connect
                </motion.h2>
                <motion.p
                    variants={itemVariants}
                    className="text-slate-500 text-center mb-12"
                >
                    Open to opportunities in SOC, threat analysis, and cybersecurity roles
                </motion.p>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Contact Card */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-100"
                    >
                        <h3 className="text-xl font-bold text-slate-900 mb-6">Contact Information</h3>

                        <div className="space-y-4">
                            <a
                                href="mailto:haseeb.aliasghar@yahoo.com"
                                className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors group"
                            >
                                <div className="p-3 bg-blue-100 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <Mail size={20} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-slate-400 text-xs uppercase tracking-wide">Email</p>
                                    <p className="text-slate-900 font-medium">haseeb.aliasghar@yahoo.com</p>
                                </div>
                                <button
                                    onClick={(e) => { e.preventDefault(); copyEmail(); }}
                                    className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                                    title="Copy email"
                                >
                                    {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                                </button>
                            </a>

                            <a
                                href="https://github.com/haseebaliasghar"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors group"
                            >
                                <div className="p-3 bg-slate-100 rounded-xl text-slate-600 group-hover:bg-slate-800 group-hover:text-white transition-colors">
                                    <Github size={20} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-slate-400 text-xs uppercase tracking-wide">GitHub</p>
                                    <p className="text-slate-900 font-medium">github.com/haseebaliasghar</p>
                                </div>
                                <ExternalLink size={16} className="text-slate-400" />
                            </a>

                            <a
                                href="https://linkedin.com/in/haseebaliasghar"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors group"
                            >
                                <div className="p-3 bg-blue-100 rounded-xl text-blue-700 group-hover:bg-blue-700 group-hover:text-white transition-colors">
                                    <Linkedin size={20} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-slate-400 text-xs uppercase tracking-wide">LinkedIn</p>
                                    <p className="text-slate-900 font-medium">linkedin.com/in/haseebaliasghar</p>
                                </div>
                                <ExternalLink size={16} className="text-slate-400" />
                            </a>

                            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50">
                                <div className="p-3 bg-green-100 rounded-xl text-green-600">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <p className="text-slate-400 text-xs uppercase tracking-wide">Location</p>
                                    <p className="text-slate-900 font-medium">Rawalpindi, Pakistan</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Quick Message Card */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-6 sm:p-8 shadow-lg text-white"
                    >
                        <h3 className="text-xl font-bold mb-4">Ready to Collaborate?</h3>
                        <p className="text-blue-100 mb-6">
                            I'm actively seeking opportunities in cybersecurity. Whether it's a
                            SOC analyst position, security research, or collaborative projects —
                            I'd love to hear from you.
                        </p>

                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-blue-100">
                                <span className="text-green-300">✓</span>
                                Available for full-time positions
                            </div>
                            <div className="flex items-center gap-2 text-blue-100">
                                <span className="text-green-300">✓</span>
                                Open to remote opportunities
                            </div>
                            <div className="flex items-center gap-2 text-blue-100">
                                <span className="text-green-300">✓</span>
                                Willing to relocate
                            </div>
                        </div>

                        <motion.a
                            href="mailto:haseeb.aliasghar@yahoo.com"
                            className="mt-8 w-full flex items-center justify-center gap-2 px-6 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Send size={18} />
                            Send Me a Message
                        </motion.a>
                    </motion.div>
                </div>

                {/* Footer */}
                <motion.div
                    variants={itemVariants}
                    className="mt-16 pt-8 border-t border-slate-200 text-center"
                >
                    <p className="text-slate-500 text-sm mb-4">
                        © 2024 Haseeb Ali Asghar. All rights reserved.
                    </p>
                    <div className="flex justify-center gap-4">
                        <a href="https://github.com/haseebaliasghar" target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                            <Github size={20} />
                        </a>
                        <a href="https://linkedin.com/in/haseebaliasghar" target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                            <Linkedin size={20} />
                        </a>
                        <a href="mailto:haseeb.aliasghar@yahoo.com" className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                            <Mail size={20} />
                        </a>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
