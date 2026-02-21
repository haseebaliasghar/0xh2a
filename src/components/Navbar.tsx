'use client';

import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';
import { Monitor, FileText, Volume2, VolumeX } from 'lucide-react';
import { useState, useCallback, useEffect } from 'react';
import { soundEngine } from '@/utils/soundEngine';

export default function Navbar() {
    const { isTerminal, toggleMode } = useTheme();
    const [soundEnabled, setSoundEnabled] = useState(false);
    const [isToggling, setIsToggling] = useState(false);

    // Sync sound engine with state
    useEffect(() => {
        soundEngine.setEnabled(soundEnabled);
    }, [soundEnabled]);

    // Toggle sound and play feedback
    const handleSoundToggle = useCallback(() => {
        const newState = !soundEnabled;
        setSoundEnabled(newState);
        // Brief delay then play a sound to confirm it's working
        if (newState) {
            setTimeout(() => {
                soundEngine.setEnabled(true);
                soundEngine.playSuccess();
            }, 50);
        }
    }, [soundEnabled]);

    const handleToggle = useCallback(() => {
        if (isToggling) return;

        setIsToggling(true);
        soundEngine.playModeSwitch();
        window.scrollTo({ top: 0, behavior: 'instant' });

        // Small delay for animation
        setTimeout(() => {
            toggleMode();
            setIsToggling(false);
        }, 150);
    }, [isToggling, toggleMode]);

    return (
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 flex justify-between items-center transition-all duration-300 ${isTerminal
                ? 'border-b border-[#30363d] bg-[#0d1117]/95 backdrop-blur-md'
                : 'border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-sm'
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            {/* Left: Brand */}
            <div className="flex items-center">
                {isTerminal ? (
                    <motion.div
                        key="terminal-brand"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex items-center gap-2"
                    >
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                        <span className="text-[#00ff41] font-mono text-sm sm:text-base glitch-text">
                            <span className="text-[#0ea5e9]">root</span>
                            <span className="text-[#30363d]">@</span>
                            <span className="text-[#00ff41]">0xH2A</span>
                            <span className="text-white">:~#</span>
                        </span>
                    </motion.div>
                ) : (
                    <motion.div
                        key="recruiter-brand"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex items-center gap-3"
                    >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-md">
                            <span className="text-white font-bold text-sm">H<sub className="text-[10px]">2</sub>A</span>
                        </div>
                        <div>
                            <span className="text-slate-900 font-sans font-bold text-lg">
                                Haseeb Ali Asghar
                            </span>
                            <p className="text-slate-500 text-xs hidden sm:block">Cybersecurity Analyst</p>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Right: Controls */}
            <div className="flex items-center gap-2 sm:gap-4">
                {/* Sound Toggle */}
                <motion.button
                    onClick={handleSoundToggle}
                    className={`p-2 rounded-lg transition-all ${isTerminal
                        ? soundEnabled
                            ? 'text-[#00ff41] bg-[#00ff41]/10'
                            : 'text-[#30363d] hover:text-[#00ff41] hover:bg-[#161b22]'
                        : soundEnabled
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                        }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
                >
                    {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                </motion.button>

                {/* Mode Toggle */}
                <motion.button
                    onClick={handleToggle}
                    disabled={isToggling}
                    className={`relative flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-200 overflow-hidden ${isTerminal
                        ? 'bg-transparent border border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-[#0d1117] rounded-none'
                        : 'bg-gradient-to-r from-slate-800 to-slate-700 text-white hover:from-slate-700 hover:to-slate-600 rounded-lg shadow-md'
                        } ${isToggling ? 'scale-95' : ''}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {/* Glitch overlay on toggle */}
                    {isToggling && (
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-green-500/20 to-blue-500/20"
                            initial={{ x: '-100%' }}
                            animate={{ x: '100%' }}
                            transition={{ duration: 0.15 }}
                        />
                    )}

                    {isTerminal ? (
                        <>
                            <FileText size={16} />
                            <span className="hidden sm:inline">RECRUITER MODE</span>
                            <span className="sm:hidden">HR</span>
                        </>
                    ) : (
                        <>
                            <Monitor size={16} />
                            <span className="hidden sm:inline">TERMINAL MODE</span>
                            <span className="sm:hidden">CLI</span>
                        </>
                    )}
                </motion.button>
            </div>
        </motion.nav>
    );
}
