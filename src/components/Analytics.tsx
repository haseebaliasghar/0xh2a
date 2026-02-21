'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Simple privacy-friendly analytics
// Tracks page views and interactions without cookies or personal data

interface AnalyticsEvent {
    type: 'pageview' | 'terminal_command' | 'mode_switch' | 'achievement' | 'interaction';
    data?: Record<string, string | number | boolean>;
    timestamp: number;
}

class AnalyticsTracker {
    private events: AnalyticsEvent[] = [];
    private sessionId: string;

    constructor() {
        // Generate anonymous session ID (not stored persistently)
        this.sessionId = Math.random().toString(36).substring(2, 15);
    }

    track(type: AnalyticsEvent['type'], data?: AnalyticsEvent['data']) {
        const event: AnalyticsEvent = {
            type,
            data,
            timestamp: Date.now(),
        };

        this.events.push(event);

        // Log in development
        if (process.env.NODE_ENV === 'development') {
            console.log(`[Analytics] ${type}`, data || '');
        }

        // In production, you would send to your analytics endpoint:
        // this.sendToServer(event);
    }

    trackPageView(path: string) {
        this.track('pageview', { path });
    }

    trackTerminalCommand(command: string) {
        // Only track command name, not arguments (privacy)
        const cmd = command.split(' ')[0];
        this.track('terminal_command', { command: cmd });
    }

    trackModeSwitch(mode: 'terminal' | 'recruiter') {
        this.track('mode_switch', { mode });
    }

    trackAchievement(achievementId: string) {
        this.track('achievement', { id: achievementId });
    }

    trackInteraction(element: string, action: string) {
        this.track('interaction', { element, action });
    }

    getSessionStats(): { pageViews: number; commands: number; duration: number } {
        const pageViews = this.events.filter(e => e.type === 'pageview').length;
        const commands = this.events.filter(e => e.type === 'terminal_command').length;
        const duration = this.events.length > 0
            ? Date.now() - this.events[0].timestamp
            : 0;

        return { pageViews, commands, duration };
    }

    // For production: send events to your analytics server
    // private async sendToServer(event: AnalyticsEvent) {
    //   try {
    //     await fetch('/api/analytics', {
    //       method: 'POST',
    //       body: JSON.stringify({ ...event, sessionId: this.sessionId }),
    //     });
    //   } catch (e) {
    //     // Silently fail - analytics should never break the site
    //   }
    // }
}

// Singleton instance
export const analytics = new AnalyticsTracker();

// React component to track page views
export function Analytics() {
    const pathname = usePathname();

    useEffect(() => {
        analytics.trackPageView(pathname);
    }, [pathname]);

    // Track time on page
    useEffect(() => {
        const startTime = Date.now();

        const handleBeforeUnload = () => {
            const duration = Math.round((Date.now() - startTime) / 1000);
            analytics.track('interaction', {
                element: 'page',
                action: 'leave',
                duration: `${duration}s`
            } as Record<string, string>);
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, []);

    // Track scroll depth
    useEffect(() => {
        let maxScroll = 0;

        const handleScroll = () => {
            const scrollPercent = Math.round(
                (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            );

            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;

                // Track milestones: 25%, 50%, 75%, 100%
                if ([25, 50, 75, 100].includes(scrollPercent) && scrollPercent === maxScroll) {
                    analytics.track('interaction', {
                        element: 'page',
                        action: 'scroll',
                        depth: `${scrollPercent}%`
                    } as Record<string, string>);
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return null; // This component doesn't render anything
}
