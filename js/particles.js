// ============================================================
// js/particles.js — Global Ancient Symbol Background (all pages)
// ============================================================
; (function GlobalParticles() {
    const canvas = document.createElement('canvas');
    canvas.id = 'global-symbol-canvas';
    Object.assign(canvas.style, {
        position: 'fixed', top: '0', left: '0',
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: '0',
    });
    document.body.prepend(canvas);
    const ctx = canvas.getContext('2d');

    const SYMS = [
        '𐤀', '𐤁', '𐤂', '𐤃', '𐤄', '𐤅', '𐤆', '𐤇', '𐤈', '𐤉', '𐤊', '𐤋', '𐤌', '𐤍', '𐤎', '𐤏', '𐤐', '𐤑', '𐤒', '𐤓', '𐤔', '𐤕',
        'ا', 'ب', 'ت', 'ج', 'ح', 'د', 'ر', 'ز', 'س', 'ش', 'ص', 'ط', 'ع', 'غ', 'ف', 'ق',
        'Α', 'Β', 'Γ', 'Δ', 'Ε', 'Ζ', 'Η', 'Θ', 'Ι', 'Κ', 'Λ', 'Μ', 'Ν', 'Ξ', 'Π',
        '⟡', '◈', '✦', '✧', '⌬', '⊕', '⟴'
    ];

    let W, H, particles = [];
    const COUNT = 65;

    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener('resize', resize);
    resize();

    const mk = (initial = false) => ({
        x: Math.random() * W,
        y: initial ? Math.random() * H : H + 60 + Math.random() * 300,
        s: 14 + Math.random() * 42,
        vx: (Math.random() - 0.5) * 0.2,
        vy: -(0.06 + Math.random() * 0.2),
        rot: Math.random() * Math.PI * 2,
        rotV: (Math.random() - 0.5) * 0.005,
        a: initial ? Math.random() * 0.09 : 0,
        maxA: 0.025 + Math.random() * 0.085,
        pulse: Math.random() * Math.PI * 2,
        pulseS: 0.007 + Math.random() * 0.012,
        sym: SYMS[Math.floor(Math.random() * SYMS.length)]
    });

    for (let i = 0; i < COUNT; i++) particles.push(mk(true));

    let dustParticles = [];
    const emitDust = (x, y) => {
        if (!x || !y) return;
        for (let i = 0; i < 25; i++) {
            dustParticles.push({
                x, y,
                s: 2 + Math.random() * 6,
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8 - 2,
                life: 1.0,
                decay: 0.02 + Math.random() * 0.03
            });
        }
        if (typeof AudioFX !== 'undefined') AudioFX.playDustChime();
    };

    window.Particles = { emitDust };

    const loop = () => {
        ctx.clearRect(0, 0, W, H);

        // Background slow symbols
        particles.forEach((p, i) => {
            p.x += p.vx; p.y += p.vy; p.rot += p.rotV;
            p.pulse += p.pulseS;
            p.a = Math.min(p.maxA, p.a + 0.0004);
            if (p.y < -100) { particles[i] = mk(false); return; }
            const opMod = 1 + 0.35 * Math.sin(p.pulse);
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot);
            ctx.globalAlpha = Math.min(p.maxA, p.a * opMod);
            ctx.fillStyle = '#D4AF37';
            ctx.font = `${p.s}px serif`;
            ctx.fillText(p.sym, 0, 0);
            ctx.restore();
        });

        // Fast dust burst (interaction)
        for (let i = dustParticles.length - 1; i >= 0; i--) {
            const dp = dustParticles[i];
            dp.x += dp.vx; dp.y += dp.vy;
            dp.life -= dp.decay;
            if (dp.life <= 0) { dustParticles.splice(i, 1); continue; }
            ctx.save();
            ctx.globalAlpha = dp.life;
            ctx.fillStyle = '#FFF2A8';
            ctx.beginPath();
            ctx.arc(dp.x, dp.y, dp.s, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        requestAnimationFrame(loop);
    };
    loop();
})();
