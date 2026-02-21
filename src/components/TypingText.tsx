'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypingTextProps {
    text: string;
    delay?: number;
    speed?: number;
    className?: string;
    showCursor?: boolean;
    onComplete?: () => void;
}

export default function TypingText({
    text,
    delay = 0,
    speed = 50,
    className = '',
    showCursor = true,
    onComplete,
}: TypingTextProps) {
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const startTimeout = setTimeout(() => {
            setStarted(true);
            setIsTyping(true);
        }, delay);

        return () => clearTimeout(startTimeout);
    }, [delay]);

    useEffect(() => {
        if (!started) return;

        if (displayedText.length < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(text.slice(0, displayedText.length + 1));
            }, speed);

            return () => clearTimeout(timeout);
        } else {
            setIsTyping(false);
            onComplete?.();
        }
    }, [displayedText, text, speed, started, onComplete]);

    return (
        <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={className}
        >
            {displayedText}
            {showCursor && (
                <span className={`cursor-blink ${isTyping ? '' : 'opacity-100'}`}>▊</span>
            )}
        </motion.span>
    );
}
