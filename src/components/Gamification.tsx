'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { Trophy, Star, Terminal, Eye, MessageCircle, Folder, Award } from 'lucide-react';
import { soundEngine } from '@/utils/soundEngine';

interface AchievementData {
    id: string;
    title: string;
    description: string;
    xp: number;
    icon: React.ReactNode;
}

const achievements: AchievementData[] = [
    { id: 'terminal_explorer', title: 'Terminal Explorer', description: 'Used the interactive terminal', xp: 50, icon: <Terminal size={16} /> },
    { id: 'mode_switcher', title: 'Mode Switcher', description: 'Toggled between modes', xp: 25, icon: <Eye size={16} /> },
    { id: 'scroll_master', title: 'Scroll Master', description: 'Scrolled through entire page', xp: 100, icon: <Star size={16} /> },
    { id: 'project_viewer', title: 'Project Viewer', description: 'Expanded a project file', xp: 30, icon: <Folder size={16} /> },
    { id: 'konami_master', title: 'Konami Master', description: 'Found the secret code!', xp: 200, icon: <Award size={16} /> },
    { id: 'contact_clicked', title: 'Connection Init', description: 'Clicked a contact link', xp: 40, icon: <MessageCircle size={16} /> },
];

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
const STORAGE_KEY = 'portfolio-gamification';

export default function Gamification() {
    const { isTerminal } = useTheme();
    const [xp, setXp] = useState(0);
    const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
    const [notification, setNotification] = useState<AchievementData | null>(null);
    const [konamiIndex, setKonamiIndex] = useState(0);
    const [showLevelUp, setShowLevelUp] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    // Calculate level from XP
    const level = Math.floor(xp / 100) + 1;
    const xpForCurrentLevel = xp % 100;
    const maxXp = achievements.reduce((sum, a) => sum + a.xp, 0);

    // Load saved progress
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const data = JSON.parse(saved);
            setXp(data.xp || 0);
            setUnlockedAchievements(data.achievements || []);
        }
    }, []);

    // Save progress
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            xp,
            achievements: unlockedAchievements,
        }));
    }, [xp, unlockedAchievements]);

    // Unlock achievement function
    const unlockAchievement = useCallback((id: string) => {
        if (unlockedAchievements.includes(id)) return;

        const achievement = achievements.find(a => a.id === id);
        if (!achievement) return;

        // Play achievement sound
        soundEngine.playAchievement();

        setUnlockedAchievements(prev => [...prev, id]);
        setXp(prev => {
            const newXp = prev + achievement.xp;
            // Check for level up
            if (Math.floor(newXp / 100) > Math.floor(prev / 100)) {
                setShowLevelUp(true);
                setTimeout(() => setShowLevelUp(false), 2000);
            }
            return newXp;
        });
        setNotification(achievement);

        setTimeout(() => setNotification(null), 3000);
    }, [unlockedAchievements]);

    // Konami code listener
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase() === e.key ? e.key : e.key;
            if (key === KONAMI_CODE[konamiIndex] || key.toLowerCase() === KONAMI_CODE[konamiIndex]) {
                const newIndex = konamiIndex + 1;
                if (newIndex === KONAMI_CODE.length) {
                    unlockAchievement('konami_master');
                    setKonamiIndex(0);
                    // Trigger special effect
                    document.body.classList.add('konami-active');
                    setTimeout(() => document.body.classList.remove('konami-active'), 3000);
                } else {
                    setKonamiIndex(newIndex);
                }
            } else {
                setKonamiIndex(0);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [konamiIndex, unlockAchievement]);

    // Scroll progress tracker
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            setScrollProgress(progress);

            // Unlock scroll master at 90%
            if (progress > 90) {
                unlockAchievement('scroll_master');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [unlockAchievement]);

    // Mode switch achievement
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('button')?.textContent?.includes('MODE')) {
                unlockAchievement('mode_switcher');
            }
            if (target.closest('a[href^="mailto:"]') || target.closest('a[href*="github"]') || target.closest('a[href*="linkedin"]')) {
                unlockAchievement('contact_clicked');
            }
        };

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, [unlockAchievement]);

    // Expose unlock function globally for other components
    useEffect(() => {
        (window as unknown as { unlockAchievement: typeof unlockAchievement }).unlockAchievement = unlockAchievement;
    }, [unlockAchievement]);

    return (
        <>
            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 z-[60] origin-left"
                style={{
                    background: isTerminal
                        ? 'linear-gradient(90deg, #00ff41, #0ea5e9)'
                        : 'linear-gradient(90deg, #3b82f6, #06b6d4)',
                    scaleX: scrollProgress / 100,
                }}
            />

            {/* XP Bar (Terminal mode only) */}
            {isTerminal && (
                <motion.div
                    className="fixed bottom-4 left-4 z-50 font-mono text-xs"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                >
                    <div className="bg-[#161b22] border border-[#30363d] p-3 rounded-lg min-w-[200px]">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <Trophy size={14} className="text-[#ffd700]" />
                                <span className="text-[#00ff41]">LVL {level}</span>
                            </div>
                            <span className="text-[#8b949e]">{xp}/{maxXp} XP</span>
                        </div>
                        <div className="w-full bg-[#30363d] h-2 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-[#00ff41] to-[#0ea5e9]"
                                initial={{ width: 0 }}
                                animate={{ width: `${xpForCurrentLevel}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                        <div className="mt-2 text-[#8b949e]">
                            🏆 {unlockedAchievements.length}/{achievements.length} badges
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Achievement Notification */}
            <AnimatePresence>
                {notification && (
                    <motion.div
                        className={`fixed top-20 right-4 z-[60] p-4 rounded-lg shadow-lg ${isTerminal
                            ? 'bg-[#161b22] border border-[#00ff41] text-[#00ff41]'
                            : 'bg-white border border-yellow-300 text-slate-800'
                            }`}
                        initial={{ opacity: 0, x: 100, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 100, scale: 0.8 }}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-full ${isTerminal ? 'bg-[#00ff41]/20 text-[#ffd700]' : 'bg-yellow-100 text-yellow-600'
                                }`}>
                                {notification.icon}
                            </div>
                            <div>
                                <div className="font-bold text-sm">🎉 Achievement Unlocked!</div>
                                <div className={`text-xs ${isTerminal ? 'text-[#8b949e]' : 'text-slate-500'}`}>
                                    {notification.title} (+{notification.xp} XP)
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Level Up Animation */}
            <AnimatePresence>
                {showLevelUp && (
                    <motion.div
                        className="fixed inset-0 z-[70] flex items-center justify-center pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className={`text-4xl font-bold ${isTerminal ? 'text-[#00ff41] terminal-glow' : 'text-blue-600'
                                }`}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 200 }}
                        >
                            ⬆️ LEVEL UP!
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
