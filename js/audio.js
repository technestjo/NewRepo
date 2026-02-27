// ===================================================
// js/audio.js — Synthesized Ambient & UI Sounds
// Uses Web Audio API (No external files needed)
// ===================================================

const AudioFX = (function () {
    let ctx = null;
    let masterGain = null;
    let isMuted = localStorage.getItem('siteMuted') === 'true';

    function init() {
        if (ctx) return;
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        ctx = new AudioContext();
        masterGain = ctx.createGain();
        masterGain.gain.value = isMuted ? 0 : 0.6;
        masterGain.connect(ctx.destination);
    }

    function createNoiseBuffer(duration) {
        if (!ctx) return null;
        const bufferSize = ctx.sampleRate * duration;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        return buffer;
    }

    // Authentic Oud/Qanun Pluck (Layered Oscillators)
    function playStoneThud() {
        if (!ctx || isMuted) return;

        // Pluck body (fundamental)
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'triangle';
        osc2.type = 'sine';

        // Detune slightly for string thickness
        osc1.frequency.setValueAtTime(130, ctx.currentTime);
        osc2.frequency.setValueAtTime(132, ctx.currentTime);

        // Fast pitch decay for the "pluck" transient
        osc1.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.1);
        osc2.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.1);

        // Pluck volume envelope
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.7, ctx.currentTime + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(masterGain);

        osc1.start(ctx.currentTime);
        osc2.start(ctx.currentTime);
        osc1.stop(ctx.currentTime + 1.25);
        osc2.stop(ctx.currentTime + 1.25);
    }

    // Authentic Ney Flute Breath
    function playStoneScrape() {
        if (!ctx || isMuted) return;

        const noise = ctx.createBufferSource();
        noise.buffer = createNoiseBuffer(0.8);

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 450;
        filter.Q.value = 15; // Higher Q for whistle resonance

        // Adds breath flutter (LFO on the frequency)
        const lfo = ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.value = 6; // 6Hz vibrato
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 30; // pitch modulation depth
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);
        lfo.start();

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.7, ctx.currentTime + 0.15); // soft attack
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7); // breath fade

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);

        noise.start(ctx.currentTime);
        noise.stop(ctx.currentTime + 0.8);
        lfo.stop(ctx.currentTime + 0.8);
    }

    // Ancient Bronze Bell (Multi-oscillator inharmonic)
    function playDustChime() {
        if (!ctx || isMuted) return;

        // Base frequency
        const baseFreq = 500 + Math.random() * 50;

        // Bell ratios for authentic metallic sound
        const ratios = [1, 1.34, 1.83, 2.37];
        const gainNode = ctx.createGain();

        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.6, ctx.currentTime + 0.02); // strike
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5); // long ring
        gainNode.connect(masterGain);

        ratios.forEach(ratio => {
            const osc = ctx.createOscillator();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(baseFreq * ratio, ctx.currentTime);
            osc.connect(gainNode);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 2.8);
        });
    }

    function toggleMute() {
        isMuted = !isMuted;
        localStorage.setItem('siteMuted', isMuted);
        if (masterGain) {
            masterGain.gain.setTargetAtTime(isMuted ? 0 : 0.6, ctx.currentTime, 0.1);
        }
        updateUI();
        if (!isMuted) {
            init();
            if (ctx.state === 'suspended') ctx.resume();
            playStoneThud(); // feedback
        }
        return isMuted;
    }

    function updateUI() {
        document.querySelectorAll('.audio-toggle-btn').forEach(btn => {
            btn.innerHTML = isMuted ? '🔇 <span data-en="Unmute" data-ar="تشغيل الصوت">Unmute</span>' : '🔊 <span data-en="Mute" data-ar="كتم الصوت">Mute</span>';
            btn.classList.toggle('muted', isMuted);
        });
        // apply lang translations if lang.js is available
        if (typeof SiteLang !== 'undefined') SiteLang.apply();
    }

    // Initialize on first user interaction to comply with browser autoplay policies
    document.addEventListener('click', () => {
        if (!isMuted && !ctx) {
            init();
            if (ctx.state === 'suspended') ctx.resume();
        }
    }, { once: true });

    // Initialize UI on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateUI);
    } else {
        updateUI();
    }

    return {
        init,
        playStoneThud,
        playStoneScrape,
        playDustChime,
        toggleMute,
        updateUI,
        get muted() { return isMuted; }
    };
})();
