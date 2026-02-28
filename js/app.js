// ============================================================
// js/app.js  — Fixed + Voice Assistant + Share + Achievements
// ============================================================

// ── Persistence helpers ──────────────────────────────────────
const FavDB = {
    KEY: 'anc_favs',
    get: () => new Set(JSON.parse(localStorage.getItem(FavDB.KEY) || '[]')),
    toggle: id => { const s = FavDB.get(); s.has(id) ? s.delete(id) : s.add(id); localStorage.setItem(FavDB.KEY, JSON.stringify([...s])); },
    has: id => FavDB.get().has(id)
};
const ExplDB = {
    KEY: 'anc_expl',
    get: () => new Set(JSON.parse(localStorage.getItem(ExplDB.KEY) || '[]')),
    mark: id => { const s = ExplDB.get(); const wasNew = !s.has(id); s.add(id); localStorage.setItem(ExplDB.KEY, JSON.stringify([...s])); return wasNew; },
    has: id => ExplDB.get().has(id),
    count: () => ExplDB.get().size
};

// ── Voice Assistant ──────────────────────────────────────────
const Voice = {
    supported: 'speechSynthesis' in window,
    speaking: false,
    _voices: [],

    // Must be called after DOMContentLoaded so voiceschanged fires correctly
    loadVoices() {
        if (!this.supported) return;
        const load = () => { this._voices = window.speechSynthesis.getVoices(); };
        load();
        window.speechSynthesis.addEventListener('voiceschanged', load);
    },

    findArabicVoice() {
        const all = this._voices.length ? this._voices : (window.speechSynthesis.getVoices() || []);
        return all.find(v => v.lang === 'ar-SA') ||
            all.find(v => v.lang === 'ar-EG') ||
            all.find(v => v.lang.startsWith('ar')) ||
            all.find(v => v.name.toLowerCase().includes('arab')) || null;
    },

    speak(text, lang, englishFallback) {
        if (!this.supported) { showToast('Voice not supported in this browser', 'info'); return; }
        window.speechSynthesis.cancel();
        const utt = new SpeechSynthesisUtterance();
        if (lang === 'ar-SA' || lang === 'ar') {
            const all = this._voices.length ? this._voices : window.speechSynthesis.getVoices();
            const ar = this.findArabicVoice();
            if (ar) {
                utt.text = text; utt.voice = ar; utt.lang = ar.lang;
            } else {
                // No Arabic voice installed — speak English equivalent so audio always plays
                const fallback = all.find(v => v.lang.startsWith('en')) || all[0];
                if (fallback) { utt.voice = fallback; }
                utt.lang = fallback?.lang || 'en-US';
                utt.text = englishFallback || `Letter info: ${text.replace(/[\u0600-\u06FF\s]+/g, ' ').trim()}`;
            }
        } else {
            utt.text = text;
            utt.lang = lang || 'en-US';
        }
        utt.rate = 0.88; utt.pitch = 1.0; utt.volume = 1.0;
        const setSpeak = (v) => { this.speaking = v; document.querySelectorAll('.voice-btn').forEach(b => b.classList.toggle('speaking', v)); };
        utt.onstart = () => setSpeak(true);
        utt.onend = () => setSpeak(false);
        utt.onerror = (e) => { setSpeak(false); console.warn('TTS error:', e.error); };
        window.speechSynthesis.speak(utt);
    },

    stop() {
        if (this.supported) window.speechSynthesis.cancel();
        this.speaking = false;
        document.querySelectorAll('.voice-btn').forEach(b => b.classList.remove('speaking'));
    },

    toggle(text, lang, enFallback) { this.speaking ? this.stop() : this.speak(text, lang, enFallback); },

    narrateLetter(l, lang) {
        const enText = `${l.nameEn}. Code: ${l.code}. Meaning: ${l.meaning || ''}. ${l.description || ''}`;
        if (lang === 'ar') {
            const arText = `${l.nameAr}. رمز: ${l.code}. المعنى: ${l.meaningAr || ''}. ${l.descriptionAr || ''}`;
            this.speak(arText, 'ar', enText); // enText is fallback if no Arabic voice
        } else {
            this.speak(enText, 'en-US');
        }
    }
};

// ── Toast ────────────────────────────────────────────────────
window.showToast = function (msg, type = 'success', opts = {}) {
    let cont = document.querySelector('.toast-container');
    if (!cont) { cont = document.createElement('div'); cont.className = 'toast-container'; document.body.appendChild(cont); }
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    if (opts.html) { t.innerHTML = msg; }
    else { t.innerHTML = `<span class="toast-icon">${{ success: '✓', error: '✗', info: 'ℹ', achievement: '🏆' }[type] || '✓'}</span>${msg}`; }
    cont.appendChild(t);
    requestAnimationFrame(() => t.classList.add('show'));
    setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 500); }, opts.duration || 3200);
};

// ── Share Letter ─────────────────────────────────────────────
async function shareLetter(letter) {
    const text = `${letter.nameEn} (${letter.nameAr}) — ${letter.meaning}\nCode: ${letter.code}\nAncient Scripts Project`;
    if (navigator.share) {
        try { await navigator.share({ title: `${letter.nameEn} | Ancient Scripts`, text }); return; }
        catch (e) { /* fall through to clipboard */ }
    }
    await navigator.clipboard?.writeText(text);
    showToast('Letter info copied to clipboard!', 'success');
}

// ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
    await LetterDB.init();
    Voice.loadVoices(); // load TTS voices (async on Chrome)

    // ── Nav ──
    document.getElementById('hamburger')?.addEventListener('click', () =>
        document.querySelector('.nav-links')?.classList.toggle('open'));
    const page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(a => {
        if (a.getAttribute('href') === page) a.classList.add('active');
    });

    // ── Scroll Reveal ──
    const io = new IntersectionObserver(entries =>
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } }),
        { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => io.observe(el));

    // ── Counter animation ──
    document.querySelectorAll('.stat-num[data-target]').forEach(el => {
        const target = parseInt(el.dataset.target), suffix = el.dataset.suffix || '';
        const io2 = new IntersectionObserver(entries => {
            if (!entries[0].isIntersecting) return;
            let n = 0; const step = Math.ceil(target / 55);
            const t = setInterval(() => { n = Math.min(n + step, target); el.textContent = n + suffix; if (n >= target) clearInterval(t); }, 22);
            io2.unobserve(el);
        }, { threshold: 0.5 });
        io2.observe(el);
    });

    // ── Back to top ──
    const btt = document.getElementById('back-top');
    if (btt) {
        window.addEventListener('scroll', () => btt.classList.toggle('show', window.scrollY > 400));
        btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // ── Hero canvas particles ──
    const heroCanvas = document.getElementById('hero-canvas');
    if (heroCanvas) initHeroParticles(heroCanvas);

    // ── Alef mini stages (index) ──
    document.querySelectorAll('.alef-stage-mini').forEach(mini =>
        mini.addEventListener('click', () => {
            document.querySelectorAll('.alef-stage-mini').forEach(m => m.classList.remove('active'));
            mini.classList.add('active');
        })
    );

    // ══════════════════════════════════════════════
    // LETTERS GRID (letters.html)
    // ══════════════════════════════════════════════
    const grid = document.getElementById('letters-grid');
    if (!grid) return; // only run on letters page

    const searchEl = document.getElementById('search-input');
    const sortEl = document.getElementById('sort-select');
    const countEl = document.getElementById('letters-count');
    const filterTabs = document.getElementById('filter-tabs');
    let activeFilter = 'all';

    renderProgress();
    renderGrid();

    // ══════════════════════════════════════════════
    // GLOBAL UI EVENTS
    // ══════════════════════════════════════════════
    document.querySelectorAll('.audio-toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (typeof AudioFX !== 'undefined') AudioFX.toggleMute();
        });
    });

    if (typeof AudioFX !== 'undefined') {
        AudioFX.updateUI();
    }

    // Filter tabs
    filterTabs?.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            activeFilter = tab.dataset.filter;
            filterTabs.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderGrid(searchEl?.value || '', sortEl?.value);
        });
    });

    searchEl?.addEventListener('input', () => renderGrid(searchEl.value, sortEl?.value));
    sortEl?.addEventListener('change', () => renderGrid(searchEl?.value || '', sortEl.value));

    // ── Progress ──
    function renderProgress() {
        const total = LetterDB.getAll().length;
        const done = ExplDB.count();
        const pct = total ? Math.round((done / total) * 100) : 0;
        const fill = document.getElementById('progress-fill');
        const pctEl = document.getElementById('progress-pct');
        const lbl = document.getElementById('progress-label-text');
        if (fill) fill.style.width = pct + '%';
        if (pctEl) pctEl.textContent = pct + '%';
        if (lbl) lbl.textContent = `${done} of ${total} letters explored`;
    }

    function updateTabCounts() {
        const all = LetterDB.getAll();
        const favs = FavDB.get();
        const expl = ExplDB.get();
        filterTabs?.querySelectorAll('.filter-tab').forEach(tab => {
            const f = tab.dataset.filter;
            let c = all.length;
            if (f === 'favorites') c = [...favs].length;
            if (f === 'explored') c = [...expl].length;
            const badge = tab.querySelector('.tab-count');
            if (badge) badge.textContent = c;
        });
    }

    // ── Grid render ──
    function renderGrid(query = '', sort = 'order') {
        updateTabCounts();
        let letters = LetterDB.getAll();
        if (activeFilter === 'favorites') letters = letters.filter(l => FavDB.has(l.id));
        if (activeFilter === 'explored') letters = letters.filter(l => ExplDB.has(l.id));
        if (query) {
            const q = query.toLowerCase();
            letters = letters.filter(l =>
                l.nameEn.toLowerCase().includes(q) || l.nameAr.includes(q) ||
                (l.meaning || '').toLowerCase().includes(q) || l.code.toLowerCase().includes(q)
            );
        }
        letters.sort((a, b) => {
            if (sort === 'name') return a.nameEn.localeCompare(b.nameEn);
            if (sort === 'code') return a.code.localeCompare(b.code);
            return (a.order || 999) - (b.order || 999);
        });
        if (countEl) countEl.textContent = `${letters.length} letter${letters.length !== 1 ? 's' : ''}`;
        if (!letters.length) {
            grid.innerHTML = `<div class="empty-state"><div class="icon">𐤀</div><p>${activeFilter === 'favorites' ? 'No favourites yet — click ☆ on any card.' :
                activeFilter === 'explored' ? 'No letters explored yet — click any card.' :
                    `No results for "<strong>${query}</strong>"`}</p></div>`;
            return;
        }
        grid.innerHTML = letters.map(l => cardHTML(l)).join('');
        // Card click → modal
        grid.querySelectorAll('.letter-card').forEach(card => {
            card.addEventListener('click', function (e) {
                // Ignore clicks on interactive overlays
                if (e.target.closest('.card-star') || e.target.closest('.card-voice')) return;
                addRipple(this, e);
                setTimeout(() => openModal(parseInt(this.dataset.id)), 80);
            });
            card.addEventListener('keydown', e => { if (e.key === 'Enter') card.click(); });
        });
        // Star clicks
        grid.querySelectorAll('.card-star').forEach(star => {
            star.addEventListener('click', e => {
                e.preventDefault(); e.stopPropagation();
                const id = parseInt(star.dataset.id);
                FavDB.toggle(id);
                const fav = FavDB.has(id);
                star.classList.toggle('starred', fav);
                star.textContent = fav ? '★' : '☆';
                showToast(fav ? 'Added to favourites ★' : 'Removed from favourites', fav ? 'success' : 'info');
                updateTabCounts();
            });
        });
        // Voice buttons on cards
        grid.querySelectorAll('.card-voice').forEach(btn => {
            btn.addEventListener('click', e => {
                e.preventDefault(); e.stopPropagation();
                const id = parseInt(btn.dataset.id);
                const l = LetterDB.getById(id);
                if (!l) return;
                Voice.toggle(`${l.nameEn}. Meaning: ${l.meaning}. ${l.description}`, 'en-US');
            });
        });
        // Stagger entrance animations
        grid.querySelectorAll('.letter-card').forEach((c, i) => {
            c.style.animationDelay = `${i * 0.055}s`;
            c.classList.add('animate-fade-up');
        });
    }

    function cardHTML(l) {
        const stage0 = l.stages?.[0];
        const isFav = FavDB.has(l.id);
        const isExpl = ExplDB.has(l.id);
        const dots = (l.stages || []).map((_, i) => `<span class="${i === 0 ? 'active' : ''}"></span>`).join('');
        const siteLang = localStorage.getItem('siteLang') || 'en';

        // Card visual: prefer stage SVG → thumbnail image → Phoenician symbol text
        let cardVisual;
        if (stage0?.svgContent) {
            cardVisual = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">${stage0.svgContent}</svg>`;
        } else if (l.thumbnailBase64) {
            cardVisual = `<img src="${l.thumbnailBase64}" style="width:90%;height:90%;object-fit:contain;border-radius:8px;filter: drop-shadow(0 0 8px rgba(212,175,55,0.6));" class="animate-glow" alt="${l.nameEn}">`;
        } else {
            cardVisual = `<span style="font-size:4rem;color:var(--gold);line-height:1">${l.phoenicianSymbol || '𐤀'}</span>`;
        }

        const dispName = siteLang === 'ar' ? l.nameAr : l.nameEn;
        const dispMeaning = siteLang === 'ar' ? (l.meaningAr || l.meaning || '') : (l.meaning || l.meaningAr || '');

        return `
    <div class="letter-card ripple-container" data-id="${l.id}" tabindex="0" role="button" aria-label="Open ${l.nameEn}">
      ${isExpl ? '<div class="explored-badge">✓ Explored</div>' : ''}
      <button class="card-star ${isFav ? 'starred' : ''}" data-id="${l.id}" title="Favourite" aria-label="Favourite">
        ${isFav ? '★' : '☆'}
      </button>
      <div class="card-code">${l.code}</div>
      <div class="card-svg-wrap">${cardVisual}</div>
      <div class="card-body">
        <div class="card-name-en">${dispName}</div>
        <div class="card-name-ar" style="${siteLang === 'ar' ? 'display:none' : ''}">${l.nameAr}</div>
        <div class="card-meaning">${dispMeaning}</div>
      </div>
      <div class="card-meta">
        <span class="card-symbol">${l.phoenicianSymbol || '𐤀'}</span>
        <div class="card-stages-count"><div class="stages-dots">${dots}</div>${l.stages?.length || 0} stages</div>
        <span class="card-civ">${(l.civilization || '').split('/')[0].trim()}</span>
      </div>
      ${Voice.supported ? `<button class="card-voice" data-id="${l.id}" title="Listen">🔊</button>` : ''}
    </div>`;
    }

    // ══════════════════════════════════════════════
    // MODAL — fully safe implementation
    // ══════════════════════════════════════════════
    const modalOverlay = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('modal-content');

    if (!modalOverlay || !modalContent) {
        console.error('[AncientScripts] Modal elements not found in DOM');
        return;
    }

    let currentLetter = null, currentStage = 0, autoTimer = null, isFullscreen = false;

    // Emergency scroll restore — if body is locked but no modal, fix it
    window.addEventListener('click', e => {
        if (document.body.style.overflow === 'hidden' && !modalOverlay.classList.contains('open')) {
            document.body.style.overflow = '';
        }
    });

    function openModal(id) {
        Voice.stop(); // stop any running narration
        const letter = LetterDB.getById(id);
        if (!letter) { console.warn('[AncientScripts] Letter not found:', id); return; }
        currentLetter = letter;
        currentStage = 0;

        // Mark explored and check for achievement
        const isFirst = ExplDB.mark(id);
        if (isFirst) {
            renderProgress();
            updateTabCounts();
            // Refresh explored badge on card
            const card = grid?.querySelector(`.letter-card[data-id="${id}"]`);
            if (card && !card.querySelector('.explored-badge')) {
                const badge = document.createElement('div');
                badge.className = 'explored-badge'; badge.textContent = '✓ Explored';
                card.prepend(badge);
            }
            // Achievement: all explored?
            const total = LetterDB.getAll().length;
            if (ExplDB.count() >= total) {
                setTimeout(() => showToast(
                    `<div><strong>🏆 Achievement Unlocked!</strong></div><div style="font-size:.8rem;margin-top:4px;color:var(--text-muted)">You explored all ${total} ancient letters!</div>`,
                    'achievement', { html: true, duration: 6000 }
                ), 1500);
            }
        }

        try {
            renderModal();
            modalOverlay.classList.add('open');
            document.body.style.overflow = 'hidden';
            if (typeof AudioFX !== 'undefined') AudioFX.playStoneThud();
            modalContent.querySelector('.modal-close')?.focus();
        } catch (err) {
            console.error('[AncientScripts] Modal render error:', err);
            document.body.style.overflow = '';
            modalOverlay.classList.remove('open');
        }
    }

    function closeModal() {
        Voice.stop();
        stopAuto();
        modalOverlay.classList.remove('open', 'fullscreen');
        document.body.style.overflow = ''; // ALWAYS restore scroll
        currentLetter = null;
        isFullscreen = false;
    }

    // Close on backdrop click
    modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });

    // Keyboard navigation
    document.addEventListener('keydown', e => {
        if (!currentLetter) return;
        const stages = currentLetter.stages || [];
        if (e.key === 'Escape') { closeModal(); return; }
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault(); stopAuto();
            if (currentStage < stages.length - 1) { currentStage++; updateStageDisplay(stages); }
        }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault(); stopAuto();
            if (currentStage > 0) { currentStage--; updateStageDisplay(stages); }
        }
    });

    function renderModal() {
        const l = currentLetter;
        const stages = l.stages || [];
        const stage = stages[currentStage] || {};
        const isFav = FavDB.has(l.id);
        const voiceText = `${l.nameEn}. Meaning: ${l.meaning}. ${l.description}`;
        const voiceAr = `${l.nameAr}. المعنى: ${l.meaningAr}. ${l.descriptionAr}`;

        modalContent.innerHTML = `
    <div class="modal-header">
      <div class="modal-title-group">
        <div class="modal-code">${l.code} · ${l.civilization}</div>
        <h2>${l.nameEn}</h2>
        <div class="modal-ar">${l.nameAr} — ${l.phoenicianSymbol || ''}</div>
      </div>
      <div style="display:flex;align-items:center;gap:8px;flex-shrink:0">
        <button class="fullscreen-btn" id="modal-fs-btn">⛶</button>
        <button class="modal-close" id="modal-close-btn" aria-label="Close">✕</button>
      </div>
    </div>

    <!-- Action row: voice + share + favourite -->
    <div class="modal-action-row">
      ${Voice.supported ? `
        <button class="voice-btn" id="modal-voice-btn" title="Listen in English">🔊 Listen EN</button>
        <button class="voice-btn" id="modal-voice-ar-btn" title="استمع بالعربية">🔊 AR</button>
      ` : ''}
      <button class="share-btn" id="modal-share-btn">↗ Share</button>
      <button class="card-star ${isFav ? 'starred' : ''}" id="modal-fav-btn" data-id="${l.id}" title="Favourite" style="position:static;font-size:1.2rem">${isFav ? '★' : '☆'}</button>
    </div>

    <div class="modal-body">
      <p class="modal-desc">${l.description}</p>
      <p class="modal-desc font-amiri rtl" style="margin-top:-10px">${l.descriptionAr}</p>

      <div class="journey-section">
        <div class="journey-header">
          <h3>🏺 Evolution Journey</h3>
          <div class="journey-controls">
            <button class="journey-btn" id="modal-prev">← Prev</button>
            <button class="journey-btn" id="modal-auto">▶ Auto</button>
            <button class="journey-btn" id="modal-next">Next →</button>
          </div>
        </div>

        <div class="journey-stage-display" id="modal-stage-display">
          <div class="stage-svg-area" id="modal-stage-visual" style="position:relative">
            <canvas id="modal-draw-canvas" width="400" height="400" style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:8;pointer-events:none;opacity:0;transition:opacity 0.3s;background:rgba(10,12,18,0.7);border-radius:12px"></canvas>
            
            <div id="stage-content-wrapper" style="width:100%;height:100%">
              ${stage.imageBase64 && !stage.svgContent
                ? `<img id="modal-stage-img" src="${stage.imageBase64}" style="width:100%;height:100%;object-fit:contain;border-radius:12px;filter: drop-shadow(0 0 8px rgba(212,175,55,0.6));" class="animate-glow" alt="${stage.nameEn || ''}">`
                : (stage.textSymbol && !stage.svgContent)
                    ? `<div id="modal-stage-text" style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;font-size:7rem;color:var(--gold);line-height:1;user-select:none;">${stage.textSymbol}</div>`
                    : `<svg id="modal-stage-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="svg-draw animate-glow">${stage.svgContent || ''}</svg>`}
              <span class="stage-era-badge">${stage.period || ''}</span>
            </div>
          </div>
          <div class="stage-info" style="display:flex;flex-direction:column">
            <div class="stage-num">Stage ${currentStage + 1} of ${stages.length}</div>
            <div class="stage-name-en">${stage.nameEn || ''}</div>
            <div class="stage-name-ar">${stage.nameAr || ''}</div>
            <div class="stage-period">${stage.period || ''}</div>
            
            <!-- Drawing Controls moved here -->
            <div style="margin:16px 0;display:flex;gap:8px;align-items:center;flex-wrap:wrap">
               <button id="modal-draw-btn" class="btn btn-outline btn-sm" style="padding:6px 14px;font-size:0.85rem">🖌️ Try Drawing</button>
               <button id="modal-draw-clear" class="btn btn-outline btn-sm" style="padding:6px 14px;font-size:0.85rem;display:none;border-color:#F87171;color:#F87171">🗑️ Clear</button>
               <div id="modal-draw-score" style="display:none;font-size:0.9rem;font-weight:600;color:var(--gold);margin-left:auto"></div>
            </div>

            <div class="stage-desc">${stage.description || ''}</div>
            <div class="stage-desc-ar">${stage.descriptionAr || ''}</div>
            <div class="keyboard-hint" style="margin-top:auto;padding-top:16px">
              <span class="kbd">←</span><span class="kbd">→</span> Navigate &nbsp;
              <span class="kbd">Esc</span> Close &nbsp;
              <span style="color:var(--gold-dim)">or swipe on mobile</span>
            </div>
          </div>
        </div>

        <div class="journey-timeline" id="modal-timeline">
          <div class="timeline-progress" id="modal-progress" style="width:${timelineW(stages.length)}"></div>
          ${stages.map((s, i) => `
            <div class="timeline-step ${i < currentStage ? 'passed' : ''} ${i === currentStage ? 'active' : ''}" data-stage="${i}">
              <div class="step-dot">${i + 1}</div>
              <div class="step-label">${(s.nameEn || '').split(' ').slice(0, 2).join(' ')}</div>
            </div>`).join('')}
        </div>
      </div>

      <!-- Meta chips -->
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(148px,1fr));gap:14px;margin-top:32px">
        ${chip('🔤', 'Arabic', `<span style="font-family:Amiri,serif;font-size:1.4rem">${l.arabicSymbol || ''}</span>`, l.arabicSymbol)}
        ${chip('𐤀', 'Phoenician', l.phoenicianSymbol, l.phoenicianSymbol)}
        ${chip('📖', 'Meaning', `${l.meaning || ''} / ${l.meaningAr || ''}`, '')}
        ${chip('#', 'Code', `<code>${l.code}</code>`, l.code)}
      </div>
    </div>`;

        attachModalEvents(stages, voiceText, voiceAr, l);
    }

    function chip(icon, label, val, copyVal) {
        return `<div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-md);padding:16px 14px">
      <div style="font-size:1.3rem;margin-bottom:6px">${icon}</div>
      <div style="font-size:0.68rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:.1em;margin-bottom:4px">${label}</div>
      <div style="color:var(--papyrus);font-weight:600">${val}${copyVal ? `<button class="copy-btn" data-copy="${copyVal}">⎘</button>` : ''}</div>
    </div>`;
    }

    function timelineW(total) {
        if (total <= 1) return '18px';
        const pct = (currentStage / (total - 1)) * 100;
        return `calc(${pct}% * (1 - 36px / 100%) + 18px)`;
    }

    function attachModalEvents(stages, voiceText, voiceAr, letter) {
        document.getElementById('modal-close-btn')?.addEventListener('click', closeModal);

        // Fullscreen
        document.getElementById('modal-fs-btn')?.addEventListener('click', () => {
            isFullscreen = !isFullscreen;
            modalOverlay.classList.toggle('fullscreen', isFullscreen);
            document.getElementById('modal-fs-btn').textContent = isFullscreen ? '⊡' : '⛶';
        });

        // Voice buttons
        document.getElementById('modal-voice-btn')?.addEventListener('click', () => Voice.toggle(voiceText, 'en-US'));
        document.getElementById('modal-voice-ar-btn')?.addEventListener('click', () => Voice.toggle(voiceAr, 'ar', voiceText));

        // Share
        document.getElementById('modal-share-btn')?.addEventListener('click', () => shareLetter(letter));

        // Favourite toggle in modal
        const favBtn = document.getElementById('modal-fav-btn');
        favBtn?.addEventListener('click', () => {
            FavDB.toggle(letter.id);
            const fav = FavDB.has(letter.id);
            favBtn.classList.toggle('starred', fav);
            favBtn.textContent = fav ? '★' : '☆';
            // Sync card star
            const cardStar = grid?.querySelector(`.card-star[data-id="${letter.id}"]`);
            if (cardStar) { cardStar.classList.toggle('starred', fav); cardStar.textContent = fav ? '★' : '☆'; }
            showToast(fav ? 'Added to favourites ★' : 'Removed from favourites', fav ? 'success' : 'info');
            updateTabCounts();
        });

        // Prev / Next / Auto
        document.getElementById('modal-prev')?.addEventListener('click', () => {
            stopAuto(); if (currentStage > 0) { currentStage--; updateStageDisplay(stages); }
        });
        document.getElementById('modal-next')?.addEventListener('click', () => {
            stopAuto(); if (currentStage < stages.length - 1) { currentStage++; updateStageDisplay(stages); }
        });
        const autoBtn = document.getElementById('modal-auto');
        autoBtn?.addEventListener('click', () => {
            if (autoTimer) { stopAuto(); return; }
            autoBtn.classList.add('active'); autoBtn.textContent = '⏹ Stop';
            if (currentStage >= stages.length - 1) { currentStage = 0; updateStageDisplay(stages); }
            autoTimer = setInterval(() => {
                if (currentStage < stages.length - 1) { currentStage++; updateStageDisplay(stages); }
                else stopAuto();
            }, 2500);
        });

        // Draw Canvas Feature
        const drawBtn = document.getElementById('modal-draw-btn');
        const drawClearBtn = document.getElementById('modal-draw-clear');
        const drawCanvas = document.getElementById('modal-draw-canvas');
        if (drawBtn && drawCanvas) {
            const ctx = drawCanvas.getContext('2d');
            let isDrawing = false;
            let drawMode = false;

            const resizeCanvas = () => {
                const rect = drawCanvas.parentElement.getBoundingClientRect();
                drawCanvas.width = rect.width;
                drawCanvas.height = rect.height;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                // scale brush thickness relative to screen 
                ctx.lineWidth = rect.width < 300 ? 2 : 3;
                ctx.strokeStyle = 'rgba(212,175,55,0.85)'; // gold
                ctx.shadowColor = 'rgba(212,175,55,0.5)';
                ctx.shadowBlur = 4;
            };

            const startDraw = (e) => {
                if (!drawMode) return;
                isDrawing = true;
                const rect = drawCanvas.getBoundingClientRect();
                const x = (e.clientX || e.touches[0].clientX) - rect.left;
                const y = (e.clientY || e.touches[0].clientY) - rect.top;
                ctx.beginPath();
                ctx.moveTo(x, y);
                e.preventDefault();
            };

            const draw = (e) => {
                if (!isDrawing || !drawMode) return;
                const rect = drawCanvas.getBoundingClientRect();
                const x = (e.clientX || e.touches[0].clientX) - rect.left;
                const y = (e.clientY || e.touches[0].clientY) - rect.top;
                ctx.lineTo(x, y);
                ctx.stroke();
                if (window.AudioFX && Math.random() < 0.1) AudioFX.playStoneScrape(); // random scrape noise while drawing
                e.preventDefault();
            };

            const stopDraw = () => {
                if (isDrawing && drawMode) {
                    isDrawing = false;
                    scoreDrawing(); // Evaluate after every stroke
                }
                isDrawing = false;
            };

            const scoreLayer = document.getElementById('modal-draw-score');

            const scoreDrawing = () => {
                if (!scoreLayer) return;
                const userData = ctx.getImageData(0, 0, drawCanvas.width, drawCanvas.height).data;
                let userPixels = 0;
                for (let i = 3; i < userData.length; i += 4) if (userData[i] > 20) userPixels++;

                if (userPixels < 50) {
                    scoreLayer.textContent = '';
                    scoreLayer.style.display = 'none';
                    return;
                }

                const svgEl = document.getElementById('modal-stage-svg');
                if (!svgEl) {
                    scoreLayer.textContent = 'Traced!';
                    scoreLayer.style.display = 'block';
                    return;
                }

                // offscreen render to score
                const offC = document.createElement('canvas');
                offC.width = drawCanvas.width;
                offC.height = drawCanvas.height;
                const oCtx = offC.getContext('2d', { willReadFrequently: true });

                let svgStr = new XMLSerializer().serializeToString(svgEl);
                svgStr = svgStr.replace(/currentColor/g, 'black');

                const img = new Image();
                img.onload = () => {
                    oCtx.drawImage(img, 0, 0, offC.width, offC.height);
                    const svgData = oCtx.getImageData(0, 0, offC.width, offC.height).data;

                    let overlap = 0, totalSvg = 0;
                    for (let i = 3; i < svgData.length; i += 4) {
                        const hasSvg = svgData[i] > 10;
                        if (hasSvg) {
                            totalSvg++;
                            // check nearby 2 pixels in basic layout
                            if (userData[i] > 10) overlap++;
                        }
                    }
                    if (totalSvg === 0) return;
                    let pct = Math.round((overlap / totalSvg) * 100 * 2.5); // 2.5 multiplier for leniency
                    pct = Math.min(100, Math.max(0, pct));
                    scoreLayer.textContent = `Accuracy: ${pct}%`;
                    scoreLayer.style.display = 'block';
                    if (pct === 100 && window.AudioFX) AudioFX.playDustChime();
                };
                img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgStr)));
            };

            drawBtn.addEventListener('click', () => {
                drawMode = !drawMode;
                if (drawMode) {
                    drawBtn.innerHTML = '✕ Close Canvas';
                    drawBtn.style.background = 'var(--gold)';
                    drawBtn.style.color = 'var(--surface)';
                    drawCanvas.style.opacity = '1';
                    drawCanvas.style.pointerEvents = 'auto';
                    drawClearBtn.style.display = 'block';
                    resizeCanvas();
                    const stageImg = document.getElementById('modal-stage-img');
                    const stageSvg = document.getElementById('modal-stage-svg');
                    if (stageImg) stageImg.style.opacity = '0.3'; // dim background
                    if (stageSvg) stageSvg.style.opacity = '0.3';
                } else {
                    drawBtn.innerHTML = '🖌️ Try Drawing';
                    drawBtn.style.background = 'var(--surface)';
                    drawBtn.style.color = 'var(--gold)';
                    drawCanvas.style.opacity = '0';
                    drawCanvas.style.pointerEvents = 'none';
                    drawClearBtn.style.display = 'none';
                    if (scoreLayer) scoreLayer.style.display = 'none';
                    const stageImg = document.getElementById('modal-stage-img');
                    const stageSvg = document.getElementById('modal-stage-svg');
                    if (stageImg) stageImg.style.opacity = '1';
                    if (stageSvg) stageSvg.style.opacity = '1';
                }
            });

            drawClearBtn.addEventListener('click', () => {
                ctx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
                if (scoreLayer) scoreLayer.style.display = 'none';
                if (window.AudioFX) AudioFX.playDustChime();
            });

            drawCanvas.addEventListener('mousedown', startDraw);
            drawCanvas.addEventListener('mousemove', draw);
            window.addEventListener('mouseup', stopDraw);

            drawCanvas.addEventListener('touchstart', startDraw, { passive: false });
            drawCanvas.addEventListener('touchmove', draw, { passive: false });
            window.addEventListener('touchend', stopDraw);

            window.addEventListener('resize', () => { if (drawMode) resizeCanvas(); });
        }

        // Timeline dots
        document.querySelectorAll('#modal-timeline .timeline-step').forEach(step => {
            step.addEventListener('click', () => { stopAuto(); currentStage = parseInt(step.dataset.stage); updateStageDisplay(stages); });
        });

        // Copy buttons
        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', e => {
                e.stopPropagation();
                navigator.clipboard?.writeText(btn.dataset.copy).then(() => {
                    btn.classList.add('copied'); btn.textContent = '✓';
                    setTimeout(() => { btn.classList.remove('copied'); btn.textContent = '⎘'; }, 2000);
                });
            });
        });

        // Swipe on stage display
        const display = document.getElementById('modal-stage-display');
        let tStartX = 0;
        display?.addEventListener('touchstart', e => { tStartX = e.touches[0].clientX; }, { passive: true });
        display?.addEventListener('touchend', e => {
            const dx = e.changedTouches[0].clientX - tStartX;
            if (Math.abs(dx) < 40) return; stopAuto();
            if (dx < 0 && currentStage < stages.length - 1) { currentStage++; updateStageDisplay(stages); }
            if (dx > 0 && currentStage > 0) { currentStage--; updateStageDisplay(stages); }
        }, { passive: true });
    }

    function stopAuto() {
        if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
        const btn = document.getElementById('modal-auto');
        if (btn) { btn.classList.remove('active'); btn.textContent = '▶ Auto'; }
    }

    function updateStageDisplay(stages) {
        const stage = stages[currentStage];
        const visualArea = document.getElementById('modal-stage-visual');
        const contentWrapper = document.getElementById('stage-content-wrapper');
        if (visualArea && contentWrapper) {
            contentWrapper.style.opacity = '0';
            contentWrapper.style.transform = 'scale(0.96)';
            setTimeout(() => {
                contentWrapper.innerHTML = (stage.imageBase64 && !stage.svgContent)
                    ? `<img id="modal-stage-img" src="${stage.imageBase64}" style="width:100%;height:100%;object-fit:contain;border-radius:12px;filter: drop-shadow(0 0 8px rgba(212,175,55,0.6));" class="animate-glow" alt="${stage.nameEn || ''}">
                       <span class="stage-era-badge">${stage.period || ''}</span>`
                    : (stage.textSymbol && !stage.svgContent)
                        ? `<div id="modal-stage-text" style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;font-size:7rem;color:var(--gold);line-height:1;user-select:none;">${stage.textSymbol}</div>
                       <span class="stage-era-badge">${stage.period || ''}</span>`
                        : `<svg id="modal-stage-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="svg-draw animate-glow">${stage.svgContent || ''}</svg>
                       <span class="stage-era-badge">${stage.period || ''}</span>`;
                contentWrapper.style.opacity = '1';
                contentWrapper.style.transform = 'scale(1)';

                // Re-trigger SVG animation if present
                const svg = document.getElementById('modal-stage-svg');
                if (svg) {
                    svg.classList.add('stage-entering', 'svg-draw');
                    setTimeout(() => svg.classList.remove('stage-entering', 'svg-draw'), 640);
                }
                if (typeof AudioFX !== 'undefined') AudioFX.playStoneScrape();

                // Emit dust particles around the visual area
                if (typeof Particles !== 'undefined') {
                    const rect = visualArea.getBoundingClientRect();
                    Particles.emitDust(rect.left + rect.width / 2, rect.top + rect.height / 2);
                }
            }, 250);
        }
        const display = document.getElementById('modal-stage-display');
        if (display) {
            display.querySelector('.stage-num').textContent = `Stage ${currentStage + 1} of ${stages.length} `;
            display.querySelector('.stage-name-en').textContent = stage.nameEn || '';
            display.querySelector('.stage-name-ar').textContent = stage.nameAr || '';
            display.querySelector('.stage-period').textContent = stage.period || '';
            display.querySelector('.stage-desc').textContent = stage.description || '';
            display.querySelector('.stage-desc-ar').textContent = stage.descriptionAr || '';
        }
        document.querySelectorAll('#modal-timeline .timeline-step').forEach((step, i) => {
            step.classList.toggle('active', i === currentStage);
            step.classList.toggle('passed', i < currentStage);
        });
        const prog = document.getElementById('modal-progress');
        if (prog) prog.style.width = timelineW(stages.length);
    }

    // ══════════════════════════════════════════════
    // QUIZ (letters page)
    // ══════════════════════════════════════════════
    const quizFab = document.getElementById('quiz-fab');
    const quizPanel = document.getElementById('quiz-panel');
    let quizScore = 0, quizTotal = 0, quizAnswered = false;

    quizFab?.addEventListener('click', () => {
        quizPanel?.classList.toggle('open');
        if (quizPanel?.classList.contains('open')) loadQuiz();
    });
    document.getElementById('quiz-close')?.addEventListener('click', () => quizPanel?.classList.remove('open'));
    document.getElementById('quiz-next-q')?.addEventListener('click', loadQuiz);

    function loadQuiz() {
        const letters = LetterDB.getAll();
        if (letters.length < 2) return;
        quizAnswered = false;
        const letter = letters[Math.floor(Math.random() * letters.length)];
        const options = shuffle([...letters].filter(l => l.id !== letter.id)).slice(0, 3);
        options.push(letter); shuffle(options);
        document.getElementById('quiz-symbol').textContent = letter.phoenicianSymbol || letter.nameEn[0];
        document.getElementById('quiz-question').textContent = 'Which letter is this Phoenician symbol?';
        document.getElementById('quiz-result').textContent = '';
        const scoreEl = document.getElementById('quiz-score-el');
        if (scoreEl) scoreEl.textContent = `${quizScore} / ${quizTotal}`;
        const cont = document.getElementById('quiz-options');
        if (!cont) return;
        cont.innerHTML = options.map(opt => `
      <button class="quiz-opt" data-id="${opt.id}" data-correct="${opt.id === letter.id}">
        ${opt.nameEn}<br><small style="opacity:.6">${opt.nameAr}</small>
      </button>`).join('');
        cont.querySelectorAll('.quiz-opt').forEach(btn => {
            btn.addEventListener('click', () => {
                if (quizAnswered) return;
                quizAnswered = true; quizTotal++;
                const correct = btn.dataset.correct === 'true';
                if (correct) quizScore++;
                btn.classList.add(correct ? 'correct' : 'wrong');
                cont.querySelectorAll('.quiz-opt[data-correct="true"]').forEach(b => b.classList.add('correct'));
                document.getElementById('quiz-result').innerHTML = correct
                    ? '<span style="color:#4ADE80">✓ Correct! Well done!</span>'
                    : `<span style="color:#F87171">✗ It was "${letter.nameEn}" (${letter.nameAr})</span>`;
                if (scoreEl) scoreEl.textContent = `${quizScore} / ${quizTotal}`;
                if (correct) Voice.supported && Voice.speak(`Correct! ${letter.nameEn}. ${letter.meaning}.`, 'en-US');
            });
        });
    }

    function shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    // ── Ripple ──
    function addRipple(el, e) {
        const r = el.getBoundingClientRect();
        const rip = document.createElement('span');
        rip.className = 'ripple-effect';
        rip.style.left = `${e.clientX - r.left}px`;
        rip.style.top = `${e.clientY - r.top}px`;
        el.appendChild(rip);
        rip.addEventListener('animationend', () => rip.remove());
    }

    // ── Hero canvas (index page) ──
    function initHeroParticles(canvas) {
        const ctx2 = canvas.getContext('2d');
        const SYMS = ['𐤀', '𐤁', '𐤂', '𐤃', '𐤄', '𐤅', '𐤆', '𐤇', 'ا', 'ب', 'ت', 'ج'];
        let W2, H2, ps = [];
        const r2 = () => { W2 = canvas.width = canvas.offsetWidth; H2 = canvas.height = canvas.offsetHeight; };
        window.addEventListener('resize', r2); r2();
        for (let i = 0; i < 24; i++) ps.push({ x: Math.random() * W2, y: H2 + Math.random() * 200, s: 10 + Math.random() * 20, vx: (Math.random() - .5) * .5, vy: -(0.3 + Math.random() * .7), a: 0, maxA: .15 + Math.random() * .25, sym: SYMS[Math.floor(Math.random() * SYMS.length)] });
        (function loop2() {
            ctx2.clearRect(0, 0, W2, H2);
            ps.forEach((p, i) => {
                p.x += p.vx; p.y += p.vy; p.a = Math.min(p.maxA, p.a + 0.002);
                if (p.y < -60) ps[i] = { x: Math.random() * W2, y: H2 + 20, s: 10 + Math.random() * 20, vx: (Math.random() - .5) * .5, vy: -(0.3 + Math.random() * .7), a: 0, maxA: .15 + Math.random() * .25, sym: SYMS[Math.floor(Math.random() * SYMS.length)] };
                ctx2.save(); ctx2.globalAlpha = p.a; ctx2.fillStyle = '#D4AF37'; ctx2.font = `${p.s}px serif`; ctx2.fillText(p.sym, p.x, p.y); ctx2.restore();
            });
            requestAnimationFrame(loop2);
        })();
    }
});
