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

    // A deep, resonant thud (like dropping a small stone)
    function playStoneThud() {
        if (!ctx || isMuted) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(masterGain);

        osc.type = 'sine';
        // Pitch drop
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.1);

        // Volume envelope
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(1, ctx.currentTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.3);
    }

    // A gritty scraping sound (like sliding a stone block)
    function playStoneScrape() {
        if (!ctx || isMuted) return;
        const noiseSource = ctx.createBufferSource();
        noiseSource.buffer = createNoiseBuffer(0.4);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        // Sweep filter for texture
        filter.frequency.setValueAtTime(800, ctx.currentTime);
        filter.frequency.linearRampToValueAtTime(150, ctx.currentTime + 0.3);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);

        noiseSource.connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);

        noiseSource.start(ctx.currentTime);
        noiseSource.stop(ctx.currentTime + 0.4);
    }

    // A soft magical "dust" chime
    function playDustChime() {
        if (!ctx || isMuted) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(masterGain);

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(800 + Math.random() * 400, ctx.currentTime);

        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.5);
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
