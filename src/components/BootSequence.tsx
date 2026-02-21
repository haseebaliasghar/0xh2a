'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bootSequence = [
    { text: '[BIOS] Initializing system...', delay: 0 },
    { text: '[BIOS] Memory check: 16384 MB OK', delay: 200 },
    { text: '[KERNEL] Loading kernel modules...', delay: 400 },
    { text: '[KERNEL] Mounting filesystem...', delay: 600 },
    { text: '[NETWORK] Configuring eth0...', delay: 800 },
    { text: '[NETWORK] IP: 192.168.1.337', delay: 1000 },
    { text: '[SECURITY] Loading firewall rules...', delay: 1200 },
    { text: '[SECURITY] IDS/IPS: ACTIVE', delay: 1400 },
    { text: '[SERVICE] Starting nginx...', delay: 1600 },
    { text: '[SERVICE] Starting postgresql...', delay: 1800 },
    { text: '[AUTH] Loading credentials...', delay: 2000 },
    { text: '[SYSTEM] All systems operational', delay: 2200 },
    { text: '', delay: 2400 }, // blank line
    { text: '> Establishing secure connection...', delay: 2600, highlight: true },
    { text: '> Connection encrypted (TLS 1.3)', delay: 2900, highlight: true },
    { text: '> Welcome, visitor.', delay: 3200, highlight: true },
];

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
    const [visibleLines, setVisibleLines] = useState<number>(0);
    const [showProgress, setShowProgress] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Check if already seen
        const hasSeen = sessionStorage.getItem('boot-sequence-seen');
        if (hasSeen) {
            onComplete();
            return;
        }

        // Show boot lines progressively
        bootSequence.forEach((_, index) => {
            setTimeout(() => {
                setVisibleLines(index + 1);
                setProgress(((index + 1) / bootSequence.length) * 100);
            }, bootSequence[index].delay);
        });

        // Complete after all lines shown
        setTimeout(() => {
            setShowProgress(false);
            setTimeout(() => {
                sessionStorage.setItem('boot-sequence-seen', 'true');
                onComplete();
            }, 500);
        }, 3800);
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col justify-center items-start p-8 overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
        >
            {/* CRT effect overlay */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)',
                    }}
                />
            </div>

            {/* Boot text */}
            <div className="font-mono text-sm max-w-2xl relative z-10">
                <AnimatePresence>
                    {bootSequence.slice(0, visibleLines).map((line, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.1 }}
                            className={`mb-1 ${line.highlight
                                    ? 'text-[#00ff41] terminal-glow'
                                    : 'text-[#8b949e]'
                                }`}
                        >
                            {line.text}
                            {index === visibleLines - 1 && (
                                <span className="cursor-blink ml-1">▊</span>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Progress bar */}
            {showProgress && (
                <div className="absolute bottom-8 left-8 right-8">
                    <div className="flex items-center justify-between mb-2 font-mono text-xs text-[#8b949e]">
                        <span>SYSTEM INITIALIZATION</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full h-2 bg-[#1a1a1a] border border-[#30363d]">
                        <motion.div
                            className="h-full bg-gradient-to-r from-[#00ff41] to-[#0ea5e9]"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.2 }}
                        />
                    </div>
                </div>
            )}

            {/* ASCII art decoration */}
            <pre className="absolute top-8 right-8 text-[#1a1a1a] text-xs font-mono hidden md:block">
                {`
    ╔══════════════════════╗
    ║   SECURE TERMINAL    ║
    ║   ===============    ║
    ║   STATUS: BOOTING    ║
    ╚══════════════════════╝
`}
            </pre>
        </motion.div>
    );
}
