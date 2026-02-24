// ============================================================
// js/cursor.js — Custom Ancient Gold Cursor with Trail
// ============================================================
; (function CustomCursor() {
    if (window.matchMedia('(pointer: coarse)').matches) return; // skip touch

    const style = document.createElement('style');
    style.textContent = `
    * { cursor: none !important; }
    #x-cursor {
      position: fixed; width: 10px; height: 10px; border-radius: 50%;
      background: #D4AF37; pointer-events: none; z-index: 999999;
      left: 0; top: 0;
      transform: translate(-50%,-50%);
      filter: drop-shadow(0 0 8px rgba(212,175,55,0.9));
      transition: width .15s, height .15s, background .15s;
    }
    #x-cursor.hover {
      width: 32px; height: 32px;
      background: transparent;
      border: 2px solid #D4AF37;
      filter: drop-shadow(0 0 14px rgba(212,175,55,0.7));
    }
    #x-cursor.click { transform: translate(-50%,-50%) scale(0.6); }
    .x-trail {
      position: fixed; border-radius: 50%;
      background: #D4AF37; pointer-events: none; z-index: 999998;
      left: 0; top: 0; transform: translate(-50%,-50%);
      transition: opacity .2s;
    }
  `;
    document.head.appendChild(style);

    const cursor = document.createElement('div');
    cursor.id = 'x-cursor';
    document.body.appendChild(cursor);

    const TRAIL = 7;
    const trails = Array.from({ length: TRAIL }, (_, i) => {
        const el = document.createElement('div');
        el.className = 'x-trail';
        const s = Math.max(2, 8 - i * 1.1);
        el.style.cssText = `width:${s}px;height:${s}px;opacity:${0.55 - i * 0.07};filter:drop-shadow(0 0 ${4 - i * 0.5}px rgba(212,175,55,0.5))`;
        document.body.appendChild(el);
        return { el, x: -200, y: -200 };
    });

    let mx = -200, my = -200;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    document.addEventListener('mousedown', () => cursor.classList.add('click'));
    document.addEventListener('mouseup', () => cursor.classList.remove('click'));

    const HOVER_SEL = 'a, button, .letter-card, .timeline-step, .alef-stage-mini, input, select, textarea, label, [role="button"]';
    document.addEventListener('mouseover', e => { if (e.target.closest(HOVER_SEL)) cursor.classList.add('hover'); });
    document.addEventListener('mouseout', e => { if (e.target.closest(HOVER_SEL)) cursor.classList.remove('hover'); });

    const tick = () => {
        cursor.style.left = mx + 'px';
        cursor.style.top = my + 'px';
        trails[0].x += (mx - trails[0].x) * 0.42;
        trails[0].y += (my - trails[0].y) * 0.42;
        trails[0].el.style.left = trails[0].x + 'px';
        trails[0].el.style.top = trails[0].y + 'px';
        for (let i = 1; i < TRAIL; i++) {
            trails[i].x += (trails[i - 1].x - trails[i].x) * 0.5;
            trails[i].y += (trails[i - 1].y - trails[i].y) * 0.5;
            trails[i].el.style.left = trails[i].x + 'px';
            trails[i].el.style.top = trails[i].y + 'px';
        }
        requestAnimationFrame(tick);
    };
    tick();
})();
