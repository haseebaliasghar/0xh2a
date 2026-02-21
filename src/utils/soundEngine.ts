'use client';

// Sound effects system using Web Audio API
// No external audio files needed - generates sounds programmatically

class SoundEngine {
    private audioContext: AudioContext | null = null;
    private enabled: boolean = false;

    private getContext(): AudioContext {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        }
        return this.audioContext;
    }

    setEnabled(enabled: boolean) {
        this.enabled = enabled;
        // Resume audio context on user interaction
        if (enabled && this.audioContext?.state === 'suspended') {
            this.audioContext.resume();
        }
    }

    isEnabled(): boolean {
        return this.enabled;
    }

    // Keypress sound - short click
    playKeypress() {
        if (!this.enabled) return;

        const ctx = this.getContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.frequency.setValueAtTime(800, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.05);
        oscillator.type = 'square';

        gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.05);
    }

    // Mode toggle sound - swoosh
    playModeSwitch() {
        if (!this.enabled) return;

        const ctx = this.getContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.frequency.setValueAtTime(200, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.15);
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.15);
    }

    // Achievement sound - happy chime
    playAchievement() {
        if (!this.enabled) return;

        const ctx = this.getContext();
        const notes = [523.25, 659.25, 783.99]; // C5, E5, G5

        notes.forEach((freq, i) => {
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);

            oscillator.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.1);
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0, ctx.currentTime + i * 0.1);
            gainNode.gain.linearRampToValueAtTime(0.12, ctx.currentTime + i * 0.1 + 0.02);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.1 + 0.3);

            oscillator.start(ctx.currentTime + i * 0.1);
            oscillator.stop(ctx.currentTime + i * 0.1 + 0.3);
        });
    }

    // Error/warning sound - low buzz
    playError() {
        if (!this.enabled) return;

        const ctx = this.getContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.frequency.setValueAtTime(150, ctx.currentTime);
        oscillator.type = 'sawtooth';

        gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.15);
    }

    // Terminal command success - blip
    playSuccess() {
        if (!this.enabled) return;

        const ctx = this.getContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.frequency.setValueAtTime(600, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.08);
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.08);
    }

    // Boot sequence beep
    playBoot() {
        if (!this.enabled) return;

        const ctx = this.getContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.frequency.setValueAtTime(440, ctx.currentTime);
        oscillator.type = 'square';

        gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.1);
    }

    // Hover sound - subtle
    playHover() {
        if (!this.enabled) return;

        const ctx = this.getContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.frequency.setValueAtTime(1200, ctx.currentTime);
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.03, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.05);
    }

    // Easter egg sound - fun melody
    playEasterEgg() {
        if (!this.enabled) return;

        const ctx = this.getContext();
        const notes = [392, 440, 494, 523, 587, 659, 698, 784]; // G4 to G5 scale

        notes.forEach((freq, i) => {
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);

            oscillator.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
            oscillator.type = 'triangle';

            gainNode.gain.setValueAtTime(0, ctx.currentTime + i * 0.08);
            gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + i * 0.08 + 0.02);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.08 + 0.15);

            oscillator.start(ctx.currentTime + i * 0.08);
            oscillator.stop(ctx.currentTime + i * 0.08 + 0.15);
        });
    }
}

// Singleton instance
export const soundEngine = new SoundEngine();
