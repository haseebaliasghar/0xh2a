'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';

export default function CursorEffects() {
    const { isTerminal } = useTheme();
    const trailRef = useRef<HTMLDivElement[]>([]);
    const positionsRef = useRef<{ x: number; y: number }[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const trailLength = 8;
        positionsRef.current = Array(trailLength).fill({ x: 0, y: 0 });

        const handleMouseMove = (e: MouseEvent) => {
            positionsRef.current.unshift({ x: e.clientX, y: e.clientY });
            positionsRef.current.pop();

            trailRef.current.forEach((el, index) => {
                if (el && positionsRef.current[index]) {
                    const pos = positionsRef.current[index];
                    el.style.left = `${pos.x}px`;
                    el.style.top = `${pos.y}px`;
                    el.style.opacity = String(1 - index / trailLength);
                    el.style.transform = `translate(-50%, -50%) scale(${1 - index * 0.1})`;
                }
            });
        };

        // Click ripple effect
        const handleClick = (e: MouseEvent) => {
            const ripple = document.createElement('div');
            ripple.className = 'click-ripple';
            ripple.style.left = `${e.clientX}px`;
            ripple.style.top = `${e.clientY}px`;
            ripple.style.setProperty('--ripple-color', isTerminal ? '#00ff41' : '#3b82f6');
            document.body.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('click', handleClick);
        };
    }, [isTerminal]);

    if (!isTerminal) return null;

    return (
        <div ref={containerRef} className="pointer-events-none fixed inset-0 z-[9999]">
            {Array.from({ length: 8 }).map((_, i) => (
                <div
                    key={i}
                    ref={(el) => {
                        if (el) trailRef.current[i] = el;
                    }}
                    className="cursor-trail"
                    style={{
                        position: 'fixed',
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: isTerminal ? '#00ff41' : '#3b82f6',
                        boxShadow: isTerminal
                            ? '0 0 10px #00ff41, 0 0 20px #00ff41'
                            : '0 0 10px #3b82f6',
                        pointerEvents: 'none',
                        transition: 'opacity 0.1s',
                    }}
                />
            ))}
        </div>
    );
}
