// js/assistant.js

document.addEventListener('DOMContentLoaded', () => {
    const inputArea = document.getElementById('ai-input');
    const translateBtn = document.getElementById('translate-btn');
    const outputArea = document.getElementById('shrine-output-area');
    const arabicOutput = document.getElementById('arabic-output');
    const nabataeanOutput = document.getElementById('nabataean-output');
    const loader = document.getElementById('shrine-loading');

    // Mymemory API limits to 500 chars/day for free without email, but works for our simple UI.
    const TRANSLATE_API = 'https://api.mymemory.translated.net/get';

    // Nabataean Unicode mapping based on the Arabic alphabet
    const nabataeanMap = {
        'ا': '𐢀', 'أ': '𐢀', 'إ': '𐢀', 'آ': '𐢀', 'ى': '𐢀',
        'ب': '𐢁',
        'ج': '𐢂',
        'د': '𐢃', 'ذ': '𐢃', // Nabataean didn't distinguish dotting initially
        'ه': '𐢄', 'ة': '𐢄',
        'و': '𐢅', 'ؤ': '𐢅',
        'ز': '𐢆',
        'ح': '𐢇', 'خ': '𐢇',
        'ط': '𐢈', 'ظ': '𐢈',
        'ي': '𐢉', 'ئ': '𐢉',
        'ك': '𐢊',
        'ل': '𐢋',
        'م': '𐢌',
        'ن': '𐢍',
        'س': '𐢎',
        'ع': '𐢏', 'غ': '𐢏',
        'ف': '𐢐',
        'ص': '𐢑', 'ض': '𐢑',
        'ق': '𐢒',
        'ر': '𐢓',
        'ش': '𐢔',
        'ت': '𐢕', 'ث': '𐢕',
        ' ': ' ' // Space
    };

    function transliterateToNabataean(arabicText) {
        let result = '';
        for (let char of arabicText) {
            // Keep original character if not in map (e.g. punctuation, numbers)
            result += nabataeanMap[char] || char;
        }
        return result;
    }

    function renderNabataean(text) {
        nabataeanOutput.innerHTML = '';
        // Since Nabataean is RTL, CSS handles the direction. 
        // We wrap each letter in a span for a staggered reveal animation.
        const chars = Array.from(text);

        chars.forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            if (char !== ' ') {
                span.className = 'nabataean-char';
                span.style.animationDelay = `${index * 0.08}s`;
            } else {
                span.style.width = '16px';
                span.style.display = 'inline-block';
            }
            nabataeanOutput.appendChild(span);
        });

        if (window.AudioFX) {
            AudioFX.playDustChime(); // Magical success sound
        }
    }

    async function handleTranslation() {
        const text = inputArea.value.trim();
        if (!text) return;

        // UI State: Loading
        translateBtn.disabled = true;
        loader.style.display = 'flex';
        outputArea.classList.add('active');

        if (window.AudioFX) {
            AudioFX.playStoneThud(); // Action click sound
        }

        try {
            // Translating from Auto-detect to Arabic
            const params = new URLSearchParams({
                q: text,
                langpair: 'autodetect|ar'
            });

            const response = await fetch(`${TRANSLATE_API}?${params.toString()}`);
            const data = await response.json();

            let arabicText = text; // Fallback to input text
            if (data && data.responseData && data.responseData.translatedText) {
                arabicText = data.responseData.translatedText;
            }

            // UI State: Success
            loader.style.display = 'none';

            // Render Arabic
            arabicOutput.textContent = arabicText;

            // Transliterate and animate Nabataean
            const nabataeanText = transliterateToNabataean(arabicText);
            renderNabataean(nabataeanText);

        } catch (err) {
            console.error('Translation failed:', err);
            loader.style.display = 'none';
            arabicOutput.textContent = 'Translation Error. Try again.';
            nabataeanOutput.textContent = '...';
        } finally {
            translateBtn.disabled = false;
        }
    }

    translateBtn.addEventListener('click', handleTranslation);

    inputArea.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleTranslation();
        }
    });

    // Mobile menu toggle logic
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('toggle');
        });
    }
});
