// ===================================================
// js/quiz.js — Interactive Quiz Game (Feature 2)
// Teaches users to recognize the ancient alphabet
// ===================================================

const QuizGame = (function () {
    let score = 0;
    let questionsAnswered = 0;
    let currentCorrect = null;

    function init() {
        const fab = document.getElementById('quiz-fab');
        const panel = document.getElementById('quiz-panel');
        const closeBtn = document.getElementById('quiz-close');
        const nextBtn = document.getElementById('quiz-next-q');

        if (!fab || !panel) return;

        fab.addEventListener('click', () => {
            panel.classList.add('open');
            fab.style.transform = 'scale(0)';
            if (questionsAnswered === 0) score = 0; // reset on fresh open
            if (window.AudioFX) AudioFX.playStoneScrape();
            nextQuestion();
        });

        closeBtn.addEventListener('click', () => {
            panel.classList.remove('open');
            fab.style.transform = '';
            if (window.AudioFX) AudioFX.playStoneThud();
        });

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (window.AudioFX) AudioFX.playStoneScrape();
                nextQuestion();
            });
        }
    }

    function getRandomItem(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function shuffle(arr) {
        return arr.sort(() => Math.random() - 0.5);
    }

    function nextQuestion() {
        const letters = LetterDB.getAll();
        if (letters.length < 3) return; // not enough data

        const isAr = (typeof SiteLang !== 'undefined' && SiteLang.current() === 'ar');

        // Pick 3 random unique letters
        const shuffled = shuffle([...letters]);
        const optionsData = shuffled.slice(0, 3);
        currentCorrect = optionsData[0]; // first one is correct

        // Decide question type
        // Type 0: Show symbol -> Guess name
        // Type 1: Show meaning -> Guess symbol
        const qType = Math.random() > 0.5 ? 0 : 1;

        const qEl = document.getElementById('quiz-question');
        const symEl = document.getElementById('quiz-symbol');
        const optsEl = document.getElementById('quiz-options');
        const resEl = document.getElementById('quiz-result');
        const nextBtn = document.getElementById('quiz-next-q');

        resEl.textContent = '';
        resEl.className = 'quiz-result';
        nextBtn.style.display = 'none';

        if (qType === 0) {
            symEl.textContent = currentCorrect.phoenicianSymbol || '𐤀';
            symEl.style.fontSize = '4.5rem';
            qEl.textContent = isAr ? 'ما اسم هذا الحرف؟' : 'What is the name of this symbol?';
        } else {
            const meaning = isAr ? currentCorrect.meaningAr || currentCorrect.meaning : currentCorrect.meaning || currentCorrect.meaningAr;
            symEl.textContent = '🤔';
            symEl.style.fontSize = '3.5rem';
            qEl.textContent = isAr ? `أي حرف يعني "${meaning}"؟` : `Which symbol means "${meaning}"?`;
        }

        optsEl.innerHTML = '';

        // Shuffle the 3 options
        const finalOptions = shuffle([...optionsData]);

        finalOptions.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'quiz-option';

            if (qType === 0) {
                btn.textContent = isAr ? opt.nameAr : opt.nameEn;
            } else {
                btn.textContent = opt.phoenicianSymbol || opt.nameEn;
                btn.style.fontSize = '1.8rem';
                btn.style.padding = '10px';
            }

            btn.addEventListener('click', () => handleGuess(btn, opt.id, finalOptions, qType));
            optsEl.appendChild(btn);
        });

        updateScoreDisplay();
    }

    function handleGuess(clickedBtn, guessedId, optionsList, qType) {
        const isAr = (typeof SiteLang !== 'undefined' && SiteLang.current() === 'ar');
        const resEl = document.getElementById('quiz-result');
        const optsEl = document.getElementById('quiz-options');
        const nextBtn = document.getElementById('quiz-next-q');

        // Disable all buttons
        Array.from(optsEl.children).forEach(btn => btn.disabled = true);

        questionsAnswered++;

        if (guessedId === currentCorrect.id) {
            score++;
            clickedBtn.classList.add('correct');
            resEl.textContent = isAr ? '✨ إجابة صحيحة!' : '✨ Correct!';
            resEl.classList.add('correct');
            if (window.AudioFX) AudioFX.playDustChime();
            if (window.Particles && qType === 0) {
                // burst from symbol
                const rect = document.getElementById('quiz-symbol').getBoundingClientRect();
                Particles.emitDust(rect.left + rect.width / 2, rect.top + rect.height / 2);
            }
        } else {
            clickedBtn.classList.add('wrong');
            // Highlight the correct one
            Array.from(optsEl.children).forEach(btn => {
                const optData = optionsList.find(o =>
                    (qType === 0 && (o.nameEn === btn.textContent || o.nameAr === btn.textContent)) ||
                    (qType !== 0 && (o.phoenicianSymbol === btn.textContent || o.nameEn === btn.textContent))
                );
                if (optData && optData.id === currentCorrect.id) {
                    btn.classList.add('correct');
                }
            });
            resEl.textContent = isAr ? '❌ إجابة خاطئة' : '❌ Incorrect';
            resEl.classList.add('wrong');
            if (window.AudioFX) AudioFX.playStoneThud();
        }

        updateScoreDisplay();
        nextBtn.style.display = 'block';
    }

    function updateScoreDisplay() {
        const scoreEl = document.getElementById('quiz-score-el');
        if (scoreEl) {
            scoreEl.textContent = `${score}/${questionsAnswered}`;
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    return { init };
})();
