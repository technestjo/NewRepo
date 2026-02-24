// ===================================================
// js/translator.js — Name Translator Feature
// Translates English/Arabic text into Phoenician
// ===================================================

const Translator = (function () {
    // Basic mapping for common Latin/Arabic to Phoenician
    const map = {
        // Arabic
        'أ': '𐤀', 'ا': '𐤀', 'إ': '𐤀', 'آ': '𐤀', 'ء': '𐤀',
        'ب': '𐤁', 'پ': '𐤁',
        'ج': '𐤂', 'گ': '𐤂',
        'د': '𐤃', 'ذ': '𐤃',
        'ه': '𐤄', 'ة': '𐤄', 'هـ': '𐤄',
        'و': '𐤅', 'ؤ': '𐤅',
        'ز': '𐤆',
        'ح': '𐤇', 'خ': '𐤇',
        'ط': '𐤈',
        'ي': '𐤉', 'ئ': '𐤉', 'ى': '𐤉',
        'ك': '𐤊', 'ک': '𐤊',
        'ل': '𐤋',
        'م': '𐤌',
        'ن': '𐤍',
        'س': '𐤎', 'ص': '𐤑', 'ض': '𐤑', 'ش': '𐤔',
        'ع': '𐤏', 'غ': '𐤏',
        'ف': '𐤐', 'ڤ': '𐤐',
        'ق': '𐤒',
        'ر': '𐤓',
        'ت': '𐤕', 'ث': '𐤕',

        // Latin (lowercase ensures matching)
        'a': '𐤀', 'e': '𐤄', 'i': '𐤉', 'o': '𐤏', 'u': '𐤅',
        'b': '𐤁', 'p': '𐤐',
        'c': '𐤊', 'k': '𐤊', 'q': '𐤒',
        'd': '𐤃',
        'f': '𐤐', 'v': '𐤐',
        'g': '𐤂', 'j': '𐤂',
        'h': '𐤄',
        'l': '𐤋',
        'm': '𐤌',
        'n': '𐤍',
        'r': '𐤓',
        's': '𐤎', 'x': '𐤎', 'z': '𐤆',
        't': '𐤕',
        'w': '𐤅',
        'y': '𐤉'
    };

    function translateText(text) {
        if (!text) return '';
        const chars = text.toLowerCase().split('');
        return chars.map(c => map[c] || c).join('\u200C'); // ZWNJ to prevent unwanted browser ligature joining issues on some devices
    }

    function init() {
        const input = document.getElementById('name-translator-input');
        const output = document.getElementById('name-translator-output');
        const copyBtn = document.getElementById('translator-copy-btn');

        if (!input || !output) return;

        input.addEventListener('input', (e) => {
            const val = e.target.value;
            if (!val.trim()) {
                output.textContent = '...';
                output.style.opacity = '0.3';
            } else {
                output.textContent = translateText(val).replace(/\u200C/g, ''); // remove ZWNJ for visual display alone
                output.style.opacity = '1';
                if (window.AudioFX) AudioFX.playStoneScrape();
            }
        });

        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                const text = output.textContent;
                if (text && text !== '...') {
                    navigator.clipboard.writeText(text).then(() => {
                        const orig = copyBtn.innerHTML;
                        copyBtn.innerHTML = '✓ Copied!';
                        if (window.AudioFX) AudioFX.playDustChime();
                        setTimeout(() => copyBtn.innerHTML = orig, 2000);
                    });
                }
            });
        }
    }

    document.addEventListener('DOMContentLoaded', init);

    return { translate: translateText, init };
})();
