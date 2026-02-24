// ===================================================
// js/lang.js — Bilingual EN / AR toggle
// ===================================================
(function () {
    const STORAGE_KEY = 'siteLang';
    const SUPPORTED = ['en', 'ar'];

    window.SiteLang = {
        get current() { return localStorage.getItem(STORAGE_KEY) || 'en'; },

        set(lang) {
            if (!SUPPORTED.includes(lang)) return;
            localStorage.setItem(STORAGE_KEY, lang);
            this.apply();
            // Refresh grid if app is loaded
            if (typeof renderGrid === 'function') renderGrid();
        },

        toggle() { this.set(this.current === 'en' ? 'ar' : 'en'); },

        apply() {
            const lang = this.current;
            document.documentElement.lang = lang;

            // RTL for Arabic
            document.body.style.direction = lang === 'ar' ? 'rtl' : 'ltr';

            // Update toggle button states
            document.querySelectorAll('[data-lang-toggle]').forEach(btn => {
                btn.setAttribute('aria-pressed', btn.dataset.langToggle === lang ? 'true' : 'false');
                btn.classList.toggle('active', btn.dataset.langToggle === lang);
            });

            // Swap all [data-en] / [data-ar] elements
            document.querySelectorAll('[data-en]').forEach(el => {
                el.textContent = lang === 'ar' ? (el.dataset.ar || el.dataset.en) : el.dataset.en;
            });
        },

        init() {
            // Wire all toggle buttons
            document.querySelectorAll('[data-lang-toggle]').forEach(btn => {
                btn.addEventListener('click', () => this.set(btn.dataset.langToggle));
            });
            // Wire all lang-switch buttons (single toggle)
            document.querySelectorAll('.lang-switch').forEach(btn => {
                btn.addEventListener('click', () => this.toggle());
            });
            this.apply();
        }
    };

    document.addEventListener('DOMContentLoaded', () => SiteLang.init());
})();
