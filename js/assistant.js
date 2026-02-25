document.addEventListener('DOMContentLoaded', () => {
    const inputArea = document.getElementById('ai-input');
    const translateBtn = document.getElementById('translate-btn');
    const outputArea = document.getElementById('shrine-output-area');
    const arabicOutput = document.getElementById('arabic-output');
    const nabataeanOutput = document.getElementById('nabataean-output');
    const nabataeanRaw = document.getElementById('nabataean-raw');
    const loader = document.getElementById('shrine-loading');

    // Mymemory API limits to 500 chars/day for free without email, but works for our simple UI.
    const TRANSLATE_API = 'https://api.mymemory.translated.net/get';

    const scriptMaps = {
        'nabataean': {
            'ا': '𐢀', 'أ': '𐢀', 'إ': '𐢀', 'آ': '𐢀', 'ى': '𐢀', 'ب': '𐢁', 'ج': '𐢂', 'د': '𐢃', 'ذ': '𐢃',
            'ه': '𐢄', 'ة': '𐢄', 'و': '𐢅', 'ؤ': '𐢅', 'ز': '𐢆', 'ح': '𐢇', 'خ': '𐢇', 'ط': '𐢈', 'ظ': '𐢈',
            'ي': '𐢉', 'ئ': '𐢉', 'ك': '𐢊', 'ل': '𐢋', 'م': '𐢌', 'ن': '𐢍', 'س': '𐢎', 'ع': '𐢏', 'غ': '𐢏',
            'ف': '𐢐', 'ص': '𐢑', 'ض': '𐢑', 'ق': '𐢒', 'ر': '𐢓', 'ش': '𐢔', 'ت': '𐢕', 'ث': '𐢕', ' ': ' '
        },
        'phoenician': {
            'ا': '𐤀', 'أ': '𐤀', 'إ': '𐤀', 'آ': '𐤀', 'ى': '𐤀', 'ب': '𐤁', 'ج': '𐤂', 'د': '𐤃', 'ذ': '𐤃',
            'ه': '𐤄', 'ة': '𐤄', 'و': '𐤅', 'ؤ': '𐤅', 'ز': '𐤆', 'ح': '𐤇', 'خ': '𐤇', 'ط': '𐤈', 'ظ': '𐤈',
            'ي': '𐤉', 'ئ': '𐤉', 'ك': '𐤊', 'ل': '𐤋', 'م': '𐤌', 'ن': '𐤍', 'س': '𐤎', 'ع': '𐤏', 'غ': '𐤏',
            'ف': '𐤐', 'ص': '𐤑', 'ض': '𐤑', 'ق': '𐤒', 'ر': '𐤓', 'ش': '𐤔', 'ت': '𐤕', 'ث': '𐤕', ' ': ' '
        },
        'aramaic': {
            'ا': '𐡀', 'أ': '𐡀', 'إ': '𐡀', 'آ': '𐡀', 'ى': '𐡀', 'ب': '𐡁', 'ج': '𐡂', 'د': '𐡃', 'ذ': '𐡃',
            'ه': '𐡄', 'ة': '𐡄', 'و': '𐡅', 'ؤ': '𐡅', 'ز': '𐡆', 'ح': '𐡇', 'خ': '𐡇', 'ط': '𐡈', 'ظ': '𐡈',
            'ي': '𐡉', 'ئ': '𐡉', 'ك': '𐡊', 'ل': '𐡋', 'م': '𐡌', 'ن': '𐡍', 'س': '𐡎', 'ع': '𐡏', 'غ': '𐡏',
            'ف': '𐡐', 'ص': '𐡑', 'ض': '𐡑', 'ق': '𐡒', 'ر': '𐡓', 'ش': '𐡔', 'ت': '𐡕', 'ث': '𐡕', ' ': ' '
        }
    };

    function transliterateToAncientScript(arabicText, script) {
        let result = '';
        const map = scriptMaps[script] || scriptMaps['nabataean'];
        for (let char of arabicText) {
            result += map[char] || char;
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

        if (nabataeanRaw) {
            nabataeanRaw.textContent = text;
        }

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

            // Update label based on script
            const scriptSelector = document.getElementById('script-selector');
            const targetScriptLabel = document.getElementById('target-script-label');
            const targetScript = scriptSelector ? scriptSelector.value : 'nabataean';

            if (targetScriptLabel && scriptSelector) {
                const selectedOption = scriptSelector.options[scriptSelector.selectedIndex];
                targetScriptLabel.textContent = selectedOption.textContent + ' Inscription';
            }

            // Transliterate and animate
            const nabataeanText = transliterateToAncientScript(arabicText, targetScript);
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

    // Copy to clipboard logic
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const targetEl = document.getElementById(targetId);
            if (!targetEl || targetEl.textContent === '...' || !targetEl.textContent) return;

            const textToCopy = targetEl.textContent.trim();
            const showSuccessFn = () => {
                const originalText = btn.innerHTML;
                if (window.AudioFX) AudioFX.playDustChime(); // subtle success sound
                const currentLang = document.documentElement.lang || 'en';
                btn.innerHTML = currentLang === 'ar' ? '✓ تم النسخ' : '✓ Copied';
                btn.style.color = 'var(--gold)';
                btn.style.borderColor = 'var(--gold)';
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.color = '';
                    btn.style.borderColor = '';
                }, 2000);
            };

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(textToCopy).then(showSuccessFn).catch(err => {
                    console.error('Failed to copy text: ', err);
                });
            } else {
                // Fallback for file:// protocol or older browsers
                const textArea = document.createElement("textarea");
                textArea.value = textToCopy;
                textArea.style.position = "fixed";
                textArea.style.left = "-9999px";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                try {
                    document.execCommand('copy');
                    showSuccessFn();
                } catch (err) {
                    console.error('Fallback copy failed: ', err);
                }
                document.body.removeChild(textArea);
            }
        });
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
