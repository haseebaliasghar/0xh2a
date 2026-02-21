'use client';

import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import { ReactNode, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BootSequence from './BootSequence';
import ParticleNetwork from './ParticleNetwork';
import CursorEffects from './CursorEffects';

function ThemeWrapper({ children }: { children: ReactNode }) {
    const { isTerminal, mounted } = useTheme();
    const [showBoot, setShowBoot] = useState(false);
    const [bootComplete, setBootComplete] = useState(false);

    useEffect(() => {
        // Only run after ThemeContext has read localStorage (mounted=true)
        if (!mounted) return;

        const alreadySeen = !!sessionStorage.getItem('boot-sequence-seen');
        if (alreadySeen) {
            setShowBoot(false);
            setBootComplete(true);
        } else if (isTerminal) {
            setShowBoot(true);
        } else {
            setBootComplete(true);
        }
    }, [mounted]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleBootComplete = () => {
        setShowBoot(false);
        setTimeout(() => setBootComplete(true), 500);
    };

    // Show a plain dark screen while waiting for localStorage to load (one frame).
    // This prevents animations from firing in the wrong mode.
    if (!mounted) {
        return <div className="min-h-screen bg-[#0d1117]" />;
    }

    return (
        <>
            {/* Boot Sequence */}
            <AnimatePresence>
                {showBoot && isTerminal && (
                    <BootSequence onComplete={handleBootComplete} />
                )}
            </AnimatePresence>

            {/* Background color + effects wrapper */}
            <motion.div
                className={`min-h-screen ${isTerminal ? 'terminal-mode' : 'recruiter-mode'}`}
                animate={{
                    backgroundColor: isTerminal ? '#0d1117' : '#f8fafc',
                }}
                transition={{ duration: 0.5 }}
            >
                {/* Background Effects - Terminal Mode */}
                {isTerminal && bootComplete && (
                    <>
                        <ParticleNetwork color="#00ff41" particleCount={40} opacity={0.15} />
                        <CursorEffects />
                    </>
                )}

                {/* Background Effects - Recruiter Mode */}
                {!isTerminal && (
                    <ParticleNetwork color="#3b82f6" particleCount={25} opacity={0.08} />
                )}

                {/* CRT + Scanlines */}
                {isTerminal && bootComplete && (
                    <>
                        <div className="crt-overlay pointer-events-none fixed inset-0 z-50" />
                        <div className="scanlines pointer-events-none fixed inset-0 z-40" />
                    </>
                )}

                {/* Content — keyed by mode so all whileInView animations reset cleanly on switch */}
                <div key={isTerminal ? 'terminal' : 'recruiter'}>
                    {children}
                </div>
            </motion.div>
        </>
    );
}

export default function ClientLayout({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider>
            <ThemeWrapper>{children}</ThemeWrapper>
        </ThemeProvider>
    );
}
