'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

interface TextScrambleProps {
    text: string;
    className?: string;
    scrambleOnHover?: boolean;
    duration?: number;
}

const chars = '!<>-_\\/[]{}—=+*^?#________';

export default function TextScramble({
    text,
    className = '',
    scrambleOnHover = true,
    duration = 1000
}: TextScrambleProps) {
    const [displayText, setDisplayText] = useState(text);
    const [isScrambling, setIsScrambling] = useState(false);

    const scramble = useCallback(() => {
        if (isScrambling) return;
        setIsScrambling(true);

        let iteration = 0;
        const originalText = text;
        const interval = setInterval(() => {
            setDisplayText(
                originalText
                    .split('')
                    .map((char, index) => {
                        if (index < iteration) {
                            return originalText[index];
                        }
                        if (char === ' ') return ' ';
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('')
            );

            if (iteration >= originalText.length) {
                clearInterval(interval);
                setDisplayText(originalText);
                setIsScrambling(false);
            }

            iteration += 1 / 3;
        }, duration / (originalText.length * 3));
    }, [text, duration, isScrambling]);

    // Initial scramble on mount
    useEffect(() => {
        const timer = setTimeout(scramble, 100);
        return () => clearTimeout(timer);
    }, [scramble]);

    return (
        <motion.span
            className={`${className} ${isScrambling ? 'text-scrambling' : ''}`}
            onMouseEnter={scrambleOnHover ? scramble : undefined}
            style={{ display: 'inline-block' }}
        >
            {displayText}
        </motion.span>
    );
}

// Utility hook for scrambling any text
export function useTextScramble(text: string, trigger: boolean) {
    const [displayText, setDisplayText] = useState(text);

    useEffect(() => {
        if (!trigger) {
            setDisplayText(text);
            return;
        }

        let iteration = 0;
        const interval = setInterval(() => {
            setDisplayText(
                text
                    .split('')
                    .map((char, index) => {
                        if (index < iteration) return text[index];
                        if (char === ' ') return ' ';
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('')
            );

            if (iteration >= text.length) {
                clearInterval(interval);
                setDisplayText(text);
            }

            iteration += 1 / 3;
        }, 30);

        return () => clearInterval(interval);
    }, [text, trigger]);

    return displayText;
}
