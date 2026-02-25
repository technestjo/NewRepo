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

    // A soft, deep string pluck (like an ancient Oud)
    function playStoneThud() {
        if (!ctx || isMuted) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Use triangle for a softer, string-like tone
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(140, ctx.currentTime);
        // Slight pitch decay mimicking a plucked string
        osc.frequency.exponentialRampToValueAtTime(130, ctx.currentTime + 0.6);

        // Volume envelope
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.8, ctx.currentTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);

        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.9);
    }

    // A soft, breathy flute sound (like a Ney)
    function playStoneScrape() {
        if (!ctx || isMuted) return;
        const noise = ctx.createBufferSource();
        noise.buffer = createNoiseBuffer(0.6);

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 400;
        filter.Q.value = 5;

        // Slight breath flutter
        filter.frequency.linearRampToValueAtTime(450, ctx.currentTime + 0.2);
        filter.frequency.linearRampToValueAtTime(380, ctx.currentTime + 0.5);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);

        noise.start(ctx.currentTime);
        noise.stop(ctx.currentTime + 0.6);
    }

    // A gentle, resonant ancient bell (subtle chime)
    function playDustChime() {
        if (!ctx || isMuted) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(masterGain);

        osc.type = 'sine';
        // Gentle bell frequency with slight variation
        osc.frequency.setValueAtTime(600 + Math.random() * 100, ctx.currentTime);

        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.2);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 1.5);
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
