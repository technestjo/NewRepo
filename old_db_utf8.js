// ============================================================
// js/database.js - Ancient Scripts Letter Database
// Uses localStorage for persistence. No server required.
// ============================================================

const LetterDB = {
  STORAGE_KEY: 'ancient_scripts_letters',
  ADMIN_KEY: 'ancient_scripts_admin',
  SESSION_KEY: 'ancient_admin_session',
  VERSION_KEY: 'ancient_scripts_version',
  DB_VERSION: '2.5', // bump to force-reset stale localStorage

  DEFAULT_ADMIN: {
    username: btoa('MasterScribe'),
    password: btoa('P@ssw0rd_Ancient$2026')
  },

  // ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
  // SEED DATA  ΓÇô 8 Phoenician / Canaanite Letters
  // ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
  SEED_DATA: [
    {
      id: 1,
      code: 'PHN-001',
      nameAr: '╪ú┘ä┘ü',
      nameEn: 'Aleph',
      civilization: 'Phoenician / Canaanite',
      phoenicianSymbol: '≡ÉñÇ',
      arabicSymbol: '╪ú / ╪º',
      meaning: 'Ox / Bull',
      meaningAr: '╪½┘ê╪▒ / ╪¿┘é╪▒╪⌐',
      order: 1,
      description: 'First letter of the Phoenician alphabet, derived from the Egyptian hieroglyph of an ox head. The name means "ox" in Proto-Semitic. Rotated and abstracted to become Greek Alpha and Arabic Alef.',
      descriptionAr: '╪ú┘ê┘ä ╪¡╪▒┘ü ┘ü┘è ╪º┘ä╪ú╪¿╪¼╪»┘è╪⌐ ╪º┘ä┘ü┘è┘å┘è┘é┘è╪⌐╪î ┘à╪┤╪¬┘é ┘à┘å ╪º┘ä┘ç┘è╪▒┘ê╪║┘ä┘è┘ü┘è╪⌐ ╪º┘ä┘à╪╡╪▒┘è╪⌐ ┘ä╪▒╪ú╪│ ╪º┘ä╪½┘ê╪▒. ╪º╪│┘à┘ç ┘è╪╣┘å┘è "╪½┘ê╪▒" ╪¿╪º┘ä╪¿╪▒┘ê╪¬┘ê-╪│╪º┘à┘è╪⌐. ╪¬╪¡┘ê┘æ┘ä ┘ä┘è╪╡╪¿╪¡ ╪º┘ä╪ú┘ä┘ü╪º ╪º┘ä┘è┘ê┘å╪º┘å┘è ┘ê╪º┘ä╪ú┘ä┘ü ╪º┘ä╪╣╪▒╪¿┘è.',
      stages: [
        {
          id: 1,
          nameEn: 'Egyptian Hieroglyphic',
          nameAr: '╪º┘ä┘ç┘è╪▒┘ê╪║┘ä┘è┘ü┘è╪⌐ ╪º┘ä┘à╪╡╪▒┘è╪⌐',
          period: '~2000 BCE',
          description: 'The original hieroglyph ΓÇö an ox head viewed from the front with curved horns.',
          descriptionAr: '╪º┘ä╪▒┘à╪▓ ╪º┘ä┘ç┘è╪▒┘ê╪║┘ä┘è┘ü┘è ╪º┘ä╪ú╪╡┘ä┘è ΓÇö ╪▒╪ú╪│ ╪½┘ê╪▒ ┘à┘å ╪º┘ä╪ú┘à╪º┘à ┘à╪╣ ┘é╪▒┘ê┘å ┘à┘å╪¡┘å┘è╪⌐.',
          textSymbol: '≡ôâ╛',
          imageBase64: null,
          svgContent: `<g>
            <path d="M 100,38 Q 68,8 46,24 Q 34,40 52,54" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round"/>
            <path d="M 100,38 Q 132,8 154,24 Q 166,40 148,54" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round"/>
            <ellipse cx="58" cy="76" rx="14" ry="10" fill="none" stroke="currentColor" stroke-width="3" transform="rotate(-15,58,76)"/>
            <ellipse cx="142" cy="76" rx="14" ry="10" fill="none" stroke="currentColor" stroke-width="3" transform="rotate(15,142,76)"/>
            <ellipse cx="100" cy="98" rx="52" ry="46" fill="none" stroke="currentColor" stroke-width="4.5"/>
            <circle cx="80" cy="84" r="9" fill="none" stroke="currentColor" stroke-width="3"/>
            <circle cx="80" cy="84" r="4" fill="currentColor"/>
            <circle cx="120" cy="84" r="9" fill="none" stroke="currentColor" stroke-width="3"/>
            <circle cx="120" cy="84" r="4" fill="currentColor"/>
            <ellipse cx="100" cy="115" rx="28" ry="20" fill="none" stroke="currentColor" stroke-width="3.5"/>
            <ellipse cx="90" cy="117" rx="5" ry="4" fill="currentColor"/>
            <ellipse cx="110" cy="117" rx="5" ry="4" fill="currentColor"/>
            <path d="M 55,128 Q 100,142 145,128" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="5,4"/>
          </g>`
        },
        {
          id: 2,
          nameEn: 'Proto-Sinaitic',
          nameAr: '╪º┘ä╪│┘è┘å╪º╪ª┘è╪⌐ ╪º┘ä╪ú┘ê┘ä┘è╪⌐',
          period: '~1800 BCE',
          description: 'Canaanite workers simplified the hieroglyph into an abstract inverted triangle with horns.',
          descriptionAr: '╪¿╪│┘æ╪╖ ╪º┘ä┘â┘å╪╣╪º┘å┘è┘ê┘å ╪º┘ä╪▒┘à╪▓ ╪Ñ┘ä┘ë ┘à╪½┘ä╪½ ┘à┘é┘ä┘ê╪¿ ┘à╪¼╪▒╪» ┘à╪╣ ┘é╪▒┘ê┘å.',
          textSymbol: '',
          imageBase64: null,
          svgContent: `<g>
            <path d="M 72,52 Q 50,22 28,32" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round"/>
            <path d="M 128,52 Q 150,22 172,32" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round"/>
            <path d="M 60,58 L 100,152 L 140,58 Z" fill="none" stroke="currentColor" stroke-width="6" stroke-linejoin="round"/>
            <circle cx="80" cy="82" r="7" fill="currentColor"/>
            <circle cx="120" cy="82" r="7" fill="currentColor"/>
          </g>`
        },
        {
          id: 3,
          nameEn: 'Phoenician',
          nameAr: '╪º┘ä┘ü┘è┘å┘è┘é┘è╪⌐',
          period: '~1050 BCE',
          description: 'Rotated 90┬░ by the Phoenicians ΓÇö now an angular shape like a rotated "A" with a crossbar.',
          descriptionAr: '╪»┘ê┘æ╪▒┘ç ╪º┘ä┘ü┘è┘å┘è┘é┘è┘ê┘å 90┬░ ΓÇö ╪ú╪╡╪¿╪¡ ╪┤┘â┘ä╪º┘ï ╪▓╪º┘ê┘è╪º┘ï ┘è╪┤╪¿┘ç ╪¡╪▒┘ü "A" ┘à┘é┘ä┘ê╪¿╪º┘ï ┘à╪╣ ╪┤╪▒┘è╪╖ ╪ú┘ü┘é┘è.',
          textSymbol: '≡ÉñÇ',
          imageBase64: null,
          svgContent: `<g transform="translate(100,100)">
            <path d="M 0,-68 L -46,52 M 0,-68 L 46,52" stroke="currentColor" stroke-width="8" stroke-linecap="round" fill="none"/>
            <path d="M -32,-4 L 32,-4" stroke="currentColor" stroke-width="8" stroke-linecap="round"/>
          </g>`
        },
        {
          id: 4,
          nameEn: 'Aramaic',
          nameAr: '╪º┘ä╪ó╪▒╪º┘à┘è╪⌐',
          period: '~800 BCE',
          description: 'Continued evolution towards a regularized vertical stroke with angled top.',
          descriptionAr: '╪¬╪╖┘ê╪▒ ┘å╪¡┘ê ╪╢╪▒╪¿╪⌐ ╪╣┘à┘ê╪»┘è╪⌐ ┘à┘å╪¬╪╕┘à╪⌐ ┘à╪╣ ┘é┘à╪⌐ ┘à╪º╪ª┘ä╪⌐.',
          textSymbol: '≡ÉíÇ',
          imageBase64: null,
          svgContent: ''
        },
        {
          id: 5,
          nameEn: 'Nabataean',
          nameAr: '╪º┘ä┘å╪¿╪╖┘è╪⌐',
          period: '~200 BCE',
          description: 'Nabataean script, developed from Aramaic. The precursor to the Arabic script.',
          descriptionAr: '╪º┘ä╪«╪╖ ╪º┘ä┘å╪¿╪╖┘è╪î ╪¬╪╖┘ê╪▒ ┘à┘å ╪º┘ä╪ó╪▒╪º┘à┘è╪⌐. ┘ê┘ç┘ê ╪º┘ä╪«╪╖ ╪º┘ä╪░┘è ╪│╪¿┘é ╪º┘ä╪«╪╖ ╪º┘ä╪╣╪▒╪¿┘è ┘à╪¿╪º╪┤╪▒╪⌐.',
          textSymbol: '≡ÉóÇ',
          imageBase64: null,
          svgContent: ''
        },
        {
          id: 6,
          nameEn: 'Arabic',
          nameAr: '╪º┘ä╪╣╪▒╪¿┘è╪⌐',
          period: '~400 CE',
          description: 'Final evolution: the Arabic Alef (╪º) with Hamza (╪ú) ΓÇö the very first letter of the Arabic alphabet.',
          descriptionAr: '╪º┘ä╪¬╪╖┘ê╪▒ ╪º┘ä┘å┘ç╪º╪ª┘è: ╪º┘ä╪ú┘ä┘ü ╪º┘ä╪╣╪▒╪¿┘è ┘à╪╣ ╪º┘ä┘ç┘à╪▓╪⌐ (╪ú) ΓÇö ╪ú┘ê┘ä ╪¡╪▒┘ü ┘ü┘è ╪º┘ä╪ú╪¿╪¼╪»┘è╪⌐ ╪º┘ä╪╣╪▒╪¿┘è╪⌐.',
          textSymbol: '╪ú',
          imageBase64: null,
          svgContent: `<g transform="translate(100,100)">
            <path d="M 10,-66 Q 8,0 5,62" stroke="currentColor" stroke-width="11" stroke-linecap="round" fill="none"/>
            <path d="M -2,-82 Q 14,-96 26,-82 Q 20,-70 10,-72" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round"/>
          </g>`
        }
      ]
    },
    {
      id: 2,
      code: 'PHN-002',
      nameAr: '╪¿┘è╪¬ (╪¿╪º╪í)',
      nameEn: 'Beth',
      civilization: 'Phoenician / Canaanite',
      phoenicianSymbol: '≡Éñü',
      arabicSymbol: '╪¿',
      meaning: 'House',
      meaningAr: '╪¿┘è╪¬ / ┘à┘å╪▓┘ä',
      order: 2,
      description: 'Second letter of the Phoenician alphabet. Name means "house". The floor plan of a simple dwelling served as the original symbol, later becoming the Greek Beta and Arabic Ba.',
      descriptionAr: '╪º┘ä╪¡╪▒┘ü ╪º┘ä╪½╪º┘å┘è ┘ü┘è ╪º┘ä╪ú╪¿╪¼╪»┘è╪⌐ ╪º┘ä┘ü┘è┘å┘è┘é┘è╪⌐. ╪º╪│┘à┘ç ┘è╪╣┘å┘è "╪¿┘è╪¬". ┘à╪«╪╖╪╖ ┘à╪│┘â┘å ╪¿╪│┘è╪╖ ┘â╪º┘å ╪º┘ä╪▒┘à╪▓ ╪º┘ä╪ú╪╡┘ä┘è.',
      stages: [
        {
          id: 1,
          nameEn: 'Egyptian Hieroglyphic',
          nameAr: '╪º┘ä┘ç┘è╪▒┘ê╪║┘ä┘è┘ü┘è╪⌐ ╪º┘ä┘à╪╡╪▒┘è╪⌐',
          period: '~2000 BCE',
          description: 'A top-down floor plan of a simple house with an opening on one side.',
          descriptionAr: '┘à╪«╪╖╪╖ ╪ú╪╣┘ä┘ë-╪ú╪│┘ü┘ä ┘ä┘à┘å╪▓┘ä ╪¿╪│┘è╪╖ ┘à╪╣ ┘ü╪¬╪¡╪⌐ ╪¼╪º┘å╪¿┘è╪⌐.',
          textSymbol: '≡ôëÉ',
          imageBase64: null,
          svgContent: `<g transform="translate(28,30)">
            <rect x="10" y="10" width="130" height="110" fill="none" stroke="currentColor" stroke-width="5"/>
            <rect x="0" y="58" width="15" height="40" fill="#0D0B08" stroke="none"/>
            <path d="M 0,58 L 10,58 M 0,98 L 10,98" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>
            <path d="M 10,60 L 140,60" stroke="currentColor" stroke-width="3" stroke-dasharray="6,4"/>
          </g>`
        },
        {
          id: 2,
          nameEn: 'Proto-Sinaitic',
          nameAr: '╪º┘ä╪│┘è┘å╪º╪ª┘è╪⌐ ╪º┘ä╪ú┘ê┘ä┘è╪⌐',
          period: '~1800 BCE',
          description: 'Simplified to an angular bracket shape retaining the house outline.',
          descriptionAr: '┘à╪¿╪│╪╖ ╪Ñ┘ä┘ë ╪┤┘â┘ä ╪▓╪º┘ê┘è╪⌐ ╪¬╪¡╪¬┘ü╪╕ ╪¿┘à╪«╪╖╪╖ ╪º┘ä╪¿┘è╪¬.',
          textSymbol: '',
          imageBase64: null,
          svgContent: `<g transform="translate(40,25)">
            <path d="M 20,135 L 20,18 L 100,18 L 100,135" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M 20,77 L 100,77" stroke="currentColor" stroke-width="6" stroke-linecap="round"/>
          </g>`
        },
        {
          id: 3,
          nameEn: 'Phoenician',
          nameAr: '╪º┘ä┘ü┘è┘å┘è┘é┘è╪⌐',
          period: '~1050 BCE',
          description: 'The angular B-shape ΓÇö a vertical stroke with two lobes, ancestor of Greek Beta.',
          descriptionAr: '╪º┘ä╪┤┘â┘ä ╪º┘ä╪▓╪º┘ê┘è B ΓÇö ╪╢╪▒╪¿╪⌐ ╪╣┘à┘ê╪»┘è╪⌐ ╪¿┘ü╪╡┘è┘å╪î ╪ú╪╡┘ä ╪º┘ä╪¡╪▒┘ü ╪º┘ä┘è┘ê┘å╪º┘å┘è ╪¿┘è╪¬╪º.',
          textSymbol: '≡Éñü',
          imageBase64: null,
          svgContent: `<g transform="translate(38,18)">
            <path d="M 20,20 L 20,162" stroke="currentColor" stroke-width="7" stroke-linecap="round"/>
            <path d="M 20,20 L 72,20 Q 96,20 96,52 Q 96,82 20,82" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M 20,82 L 72,82 Q 100,82 100,118 Q 100,158 20,162" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
          </g>`
        },
        {
          id: 4,
          nameEn: 'Aramaic',
          nameAr: '╪º┘ä╪ó╪▒╪º┘à┘è╪⌐',
          period: '~800 BCE',
          description: 'Aramaic script, open bottom, curving down.',
          descriptionAr: '╪º┘ä╪«╪╖ ╪º┘ä╪ó╪▒╪º┘à┘è ┘à┘ü╪¬┘ê╪¡ ┘à┘å ╪º┘ä╪ú╪│┘ü┘ä ┘ê┘à╪º╪ª┘ä.',
          textSymbol: '≡Éíü',
          imageBase64: null,
          svgContent: ''
        },
        {
          id: 5,
          nameEn: 'Nabataean',
          nameAr: '╪º┘ä┘å╪¿╪╖┘è╪⌐',
          period: '~200 BCE',
          description: 'More rounded letter, foreshadowing the Arabic Ba loop.',
          descriptionAr: '╪¡╪▒┘ü ╪ú┘â╪½╪▒ ╪º╪│╪¬╪»╪º╪▒╪⌐╪î ┘è┘à┘ç╪» ┘ä╪┤┘â┘ä ╪º┘ä╪¿╪º╪í ╪º┘ä╪╣╪▒╪¿┘è╪⌐.',
          textSymbol: '≡Éóü',
          imageBase64: null,
          svgContent: ''
        },
        {
          id: 6,
          nameEn: 'Arabic',
          nameAr: '╪º┘ä╪╣╪▒╪¿┘è╪⌐',
          period: '~400 CE',
          description: 'Arabic Ba (╪¿) ΓÇö a sweeping horizontal curve with a single dot below.',
          descriptionAr: '╪º┘ä╪¿╪º╪í ╪º┘ä╪╣╪▒╪¿┘è╪⌐ (╪¿) ΓÇö ╪«╪╖ ┘à┘å╪¡┘å┘ë ╪ú┘ü┘é┘è ╪¼╪º╪▒┘ü ┘à╪╣ ┘å┘é╪╖╪⌐ ┘ê╪º╪¡╪»╪⌐ ╪ú╪│┘ü┘ä┘ç.',
          textSymbol: '╪¿',
          imageBase64: null,
          svgContent: `<g transform="translate(18,45)">
            <path d="M 152,92 Q 132,62 102,57 Q 62,52 32,72 Q 10,87 14,104" fill="none" stroke="currentColor" stroke-width="9.5" stroke-linecap="round"/>
            <path d="M 14,104 Q 5,112 10,122 L 158,104" fill="none" stroke="currentColor" stroke-width="9.5" stroke-linecap="round"/>
            <circle cx="86" cy="142" r="9" fill="currentColor"/>
          </g>`
        }
      ]
    },
    {
      id: 3,
      code: 'PHN-003',
      nameAr: '╪¼┘è┘à┘ä (╪¼┘è┘à)',
      nameEn: 'Gimel',
      civilization: 'Phoenician / Canaanite',
      phoenicianSymbol: '≡Éñé',
      arabicSymbol: '╪¼',
      meaning: 'Camel / Throwing-stick',
      meaningAr: '╪¼┘à┘ä / ╪╣╪╡╪º ╪▒┘à┘è',
      order: 3,
      description: 'Third letter; name means "camel" or "throwing-stick". Evolved into the Greek Gamma (╬ô) and Arabic Jim (╪¼).',
      descriptionAr: '╪º┘ä╪¡╪▒┘ü ╪º┘ä╪½╪º┘ä╪½╪¢ ╪º╪│┘à┘ç ┘è╪╣┘å┘è "╪¼┘à┘ä" ╪ú┘ê "╪╣╪╡╪º ╪▒┘à┘è". ╪¬╪╖┘ê╪▒ ┘ä┘è╪╡╪¿╪¡ ╪º┘ä╪║╪º┘à╪º ╪º┘ä┘è┘ê┘å╪º┘å┘è ┘ê╪º┘ä╪¼┘è┘à ╪º┘ä╪╣╪▒╪¿┘è.',
      stages: [
        {
          id: 1,
          nameEn: 'Egyptian Hieroglyphic',
          nameAr: '╪º┘ä┘ç┘è╪▒┘ê╪║┘ä┘è┘ü┘è╪⌐ ╪º┘ä┘à╪╡╪▒┘è╪⌐',
          period: '~2000 BCE',
          description: 'The Egyptian hieroglyph for a curved throwing-stick or boomerang.',
          descriptionAr: '╪º┘ä┘ç┘è╪▒┘ê╪║┘ä┘è┘ü┘è╪⌐ ╪º┘ä┘à╪╡╪▒┘è╪⌐ ┘ä╪╣╪╡╪º ╪▒┘à┘è ┘à┘å╪¡┘å┘è╪⌐ ╪ú┘ê ╪¿┘ê┘à┘è╪▒╪º┘å╪¼.',
          textSymbol: '≡ôîÖ',
          imageBase64: null,
          svgContent: `<g transform="translate(18,18)">
            <path d="M 30,155 Q 18,82 78,30 Q 118,4 152,40 Q 168,66 148,92 Q 124,62 96,66 Q 58,78 56,142 Z" fill="none" stroke="currentColor" stroke-width="5.5" stroke-linejoin="round"/>
          </g>`
        },
        {
          id: 2,
          nameEn: 'Proto-Sinaitic',
          nameAr: '╪º┘ä╪│┘è┘å╪º╪ª┘è╪⌐ ╪º┘ä╪ú┘ê┘ä┘è╪⌐',
          period: '~1800 BCE',
          description: 'Simplified to an angular corner shape suggesting a camel\'s hump.',
          descriptionAr: '┘à╪¿╪│╪╖ ╪Ñ┘ä┘ë ╪┤┘â┘ä ╪▒┘â┘å ╪▓╪º┘ê┘è ┘è┘ê╪¡┘è ╪¿╪│┘å╪º┘à ╪º┘ä╪¼┘à┘ä.',
          textSymbol: '',
          imageBase64: null,
          svgContent: `<g transform="translate(28,28)">
            <path d="M 18,155 L 18,48 L 158,142" fill="none" stroke="currentColor" stroke-width="7.5" stroke-linecap="round" stroke-linejoin="round"/>
          </g>`
        },
        {
          id: 3,
          nameEn: 'Phoenician',
          nameAr: '╪º┘ä┘ü┘è┘å┘è┘é┘è╪⌐',
          period: '~1050 BCE',
          description: 'An angular L-shape on its side ΓÇö ancestor of the Greek Gamma (╬ô).',
          descriptionAr: '╪┤┘â┘ä ╪▓╪º┘ê┘è ╪╣┘ä┘ë ╪¼╪º┘å╪¿┘ç ΓÇö ╪ú╪╡┘ä ╪º┘ä╪║╪º┘à╪º ╪º┘ä┘è┘ê┘å╪º┘å┘è╪⌐ (╬ô).',
          textSymbol: '≡Éñé',
          imageBase64: null,
          svgContent: `<g transform="translate(32,18)">
            <path d="M 18,28 L 128,28 L 128,162" fill="none" stroke="currentColor" stroke-width="8.5" stroke-linecap="round" stroke-linejoin="round"/>
          </g>`
        },
        {
          id: 4,
          nameEn: 'Aramaic',
          nameAr: '╪º┘ä╪ó╪▒╪º┘à┘è╪⌐',
          period: '~800 BCE',
          description: 'Aramaic Gimel, smoothed lines.',
          descriptionAr: '╪¡╪▒┘ü ╪º┘ä╪¼┘è┘à ╪º┘ä╪ó╪▒╪º┘à┘è ╪¿╪«╪╖┘ê╪╖ ╪ú┘â╪½╪▒ ╪│┘ä╪º╪│╪⌐.',
          textSymbol: '≡Éíé',
          imageBase64: null,
          svgContent: ''
        },
        {
          id: 5,
          nameEn: 'Nabataean',
          nameAr: '╪º┘ä┘å╪¿╪╖┘è╪⌐',
          period: '~200 BCE',
          description: 'Nabataean Gimel, evolving directly into Arabic Jim.',
          descriptionAr: '╪º┘ä╪¼┘è┘à ╪º┘ä┘å╪¿╪╖┘è ┘è╪¬╪╖┘ê╪▒ ┘à╪¿╪º╪┤╪▒╪⌐ ╪Ñ┘ä┘ë ╪º┘ä╪¼┘è┘à ╪º┘ä╪╣╪▒╪¿┘è.',
          textSymbol: '≡Éóé',
          imageBase64: null,
          svgContent: ''
        },
        {
          id: 6,
          nameEn: 'Arabic',
          nameAr: '╪º┘ä╪╣╪▒╪¿┘è╪⌐',
          period: '~400 CE',
          description: 'Arabic Jim (╪¼) ΓÇö a circular bowl open on one side, with a dot inside.',
          descriptionAr: '╪º┘ä╪¼┘è┘à ╪º┘ä╪╣╪▒╪¿┘è (╪¼) ΓÇö ┘ê╪╣╪º╪í ╪»╪º╪ª╪▒┘è ┘à┘ü╪¬┘ê╪¡ ┘à┘å ╪ú╪¡╪» ╪º┘ä╪¼╪º┘å╪¿┘è┘å ┘à╪╣ ┘å┘é╪╖╪⌐ ╪»╪º╪«┘ä┘ç.',
          textSymbol: '╪¼',
          imageBase64: null,
          svgContent: `<g transform="translate(18,28)">
            <path d="M 142,62 Q 102,40 72,50 Q 30,66 24,96 Q 20,126 62,142 Q 92,152 102,132" fill="none" stroke="currentColor" stroke-width="9.5" stroke-linecap="round"/>
            <path d="M 146,58 Q 164,52 162,68" fill="none" stroke="currentColor" stroke-width="8.5" stroke-linecap="round"/>
            <circle cx="90" cy="108" r="8.5" fill="currentColor"/>
          </g>`
        }
      ]
    },
    {
      id: 4,
      code: 'PHN-004',
      nameAr: '╪»╪º┘ä╪¬ (╪»╪º┘ä)',
      nameEn: 'Daleth',
      civilization: 'Phoenician / Canaanite',
      phoenicianSymbol: '≡Éñâ',
      arabicSymbol: '╪»',
      meaning: 'Door / Tent Flap',
      meaningAr: '╪¿╪º╪¿ / ╪║╪╖╪º╪í ╪º┘ä╪«┘è┘à╪⌐',
      order: 4,
      description: 'Fourth letter ΓÇö "door". Evolved from a triangular tent-door shape through Phoenician to Greek Delta (╬ö) and Arabic Dal (╪»).',
      descriptionAr: '╪º┘ä╪¡╪▒┘ü ╪º┘ä╪▒╪º╪¿╪╣ ΓÇö "╪¿╪º╪¿". ╪¬╪╖┘ê╪▒ ┘à┘å ╪┤┘â┘ä ╪¿╪º╪¿ ╪º┘ä╪«┘è┘à╪⌐ ╪º┘ä┘à╪½┘ä╪½┘è ╪Ñ┘ä┘ë ╪»┘ä╪¬╪º ╪º┘ä┘è┘ê┘å╪º┘å┘è ┘ê╪º┘ä╪»╪º┘ä ╪º┘ä╪╣╪▒╪¿┘è.',
      stages: [
        {
          id: 1,
          nameEn: 'Egyptian Hieroglyphic',
          nameAr: '╪º┘ä┘ç┘è╪▒┘ê╪║┘ä┘è┘ü┘è╪⌐ ╪º┘ä┘à╪╡╪▒┘è╪⌐',
          period: '~2000 BCE',
          description: 'A triangular tent flap common in nomadic culture ΓÇö point at top, base at bottom.',
          descriptionAr: '╪║╪╖╪º╪í ╪«┘è┘à╪⌐ ┘à╪½┘ä╪½┘è ╪┤╪º╪ª╪╣ ┘ü┘è ╪º┘ä╪½┘é╪º┘ü╪⌐ ╪º┘ä╪¿╪»┘ê┘è╪⌐ ΓÇö ┘é┘à╪⌐ ┘ü┘è ╪º┘ä╪ú╪╣┘ä┘ë╪î ┘é╪º╪╣╪»╪⌐ ┘ü┘è ╪º┘ä╪ú╪│┘ü┘ä.',
          textSymbol: '≡ôë┐',
          imageBase64: null,
          svgContent: `<g transform="translate(18,18)">
            <path d="M 100,18 L 170,162 L 30,162 Z" fill="none" stroke="currentColor" stroke-width="5.5"/>
            <path d="M 100,18 L 100,162" stroke="currentColor" stroke-width="3" stroke-dasharray="7,5"/>
          </g>`
        },
        {
          id: 2,
          nameEn: 'Proto-Sinaitic',
          nameAr: '╪º┘ä╪│┘è┘å╪º╪ª┘è╪⌐ ╪º┘ä╪ú┘ê┘ä┘è╪⌐',
          period: '~1800 BCE',
          description: 'A clean bold triangle representing the door.',
          descriptionAr: '┘à╪½┘ä╪½ ╪¼╪▒┘è╪í ┘ê┘å╪╕┘è┘ü ┘è┘à╪½┘ä ╪º┘ä╪¿╪º╪¿.',
          textSymbol: '',
          imageBase64: null,
          svgContent: `<g transform="translate(28,18)">
            <path d="M 100,22 L 166,158 L 34,158 Z" fill="none" stroke="currentColor" stroke-width="7.5" stroke-linejoin="round"/>
          </g>`
        },
        {
          id: 3,
          nameEn: 'Phoenician',
          nameAr: '╪º┘ä┘ü┘è┘å┘è┘é┘è╪⌐',
          period: '~1050 BCE',
          description: 'Angular D-shape ΓÇö a vertical stroke with a rounded top, ancestor of Greek Delta.',
          descriptionAr: '╪┤┘â┘ä D ╪▓╪º┘ê┘è ΓÇö ╪╢╪▒╪¿╪⌐ ╪╣┘à┘ê╪»┘è╪⌐ ┘à╪╣ ┘é┘à╪⌐ ┘à╪│╪¬╪»┘è╪▒╪⌐╪î ╪ú╪╡┘ä ╪º┘ä╪»┘ä╪¬╪º ╪º┘ä┘è┘ê┘å╪º┘å┘è╪⌐.',
          textSymbol: '≡Éñâ',
          imageBase64: null,
          svgContent: `<g transform="translate(28,18)">
            <path d="M 28,22 L 28,162 L 112,162 Q 162,158 162,92 Q 162,22 112,22 Z" fill="none" stroke="currentColor" stroke-width="7.5" stroke-linejoin="round"/>
          </g>`
        },
        {
          id: 4,
          nameEn: 'Aramaic',
          nameAr: '╪º┘ä╪ó╪▒╪º┘à┘è╪⌐',
          period: '~800 BCE',
          description: 'Aramaic Daleth, opened up forming an elbow shape.',
          descriptionAr: '╪º┘ä╪»╪º┘ä ╪º┘ä╪ó╪▒╪º┘à┘è ╪¿╪┤┘â┘ä ╪º┘ä┘â┘ê╪╣.',
          textSymbol: '≡Éíâ',
          imageBase64: null,
          svgContent: ''
        },
        {
          id: 5,
          nameEn: 'Nabataean',
          nameAr: '╪º┘ä┘å╪¿╪╖┘è╪⌐',
          period: '~200 BCE',
          description: 'Smoothed out completely into a cursive stroke.',
          descriptionAr: '╪º┘å╪½┘å┘ë ╪¬┘à╪º┘à╪º┘ï ╪Ñ┘ä┘ë ╪«╪╖ ╪ú┘â╪½╪▒ ╪º┘å╪│┘è╪º╪¿┘è╪⌐.',
          textSymbol: '≡Éóâ',
          imageBase64: null,
          svgContent: ''
        },
        {
          id: 6,
          nameEn: 'Arabic',
          nameAr: '╪º┘ä╪╣╪▒╪¿┘è╪⌐',
          period: '~400 CE',
          description: 'Arabic Dal (╪») ΓÇö a graceful rounded hook, simple and elegant.',
          descriptionAr: '╪º┘ä╪»╪º┘ä ╪º┘ä╪╣╪▒╪¿┘è (╪») ΓÇö ╪«╪╖╪º┘ü ┘à╪│╪¬╪»┘è╪▒ ╪▒╪┤┘è┘é╪î ╪¿╪│┘è╪╖ ┘ê╪ú┘å┘è┘é.',
          textSymbol: '╪»',
          imageBase64: null,
          svgContent: `<g transform="translate(28,38)">
            <path d="M 132,102 Q 92,60 52,80 Q 22,96 26,122 Q 30,142 62,147 Q 82,150 92,132 Q 98,118 122,118 L 148,118" fill="none" stroke="currentColor" stroke-width="10.5" stroke-linecap="round"/>
          </g>`
        }
      ]
    },
    {
      id: 5,
      code: 'PHN-005',
      nameAr: '┘ç┘è┘ç (┘ç╪º╪í)',
      nameEn: 'He',
      civilization: 'Phoenician / Canaanite',
      phoenicianSymbol: '≡Éñä',
      arabicSymbol: '┘ç',
      meaning: 'Window / Jubilation',
      meaningAr: '┘å╪º┘ü╪░╪⌐ / ╪º╪¿╪¬┘ç╪º╪¼',
      order: 5,
      description: 'Fifth letter ΓÇö depicts a man raising arms in joy, or a window. Became Greek Epsilon (╬ò) and Arabic Ha (┘ç).',
      descriptionAr: '╪º┘ä╪¡╪▒┘ü ╪º┘ä╪«╪º┘à╪│ ΓÇö ┘è╪╡┘ê╪▒ ╪▒╪¼┘ä╪º┘ï ╪▒╪º┘ü╪╣╪º┘ï ╪░╪▒╪º╪╣┘è┘ç ┘ü╪▒╪¡╪º┘ï╪î ╪ú┘ê ┘å╪º┘ü╪░╪⌐. ╪ú╪╡╪¿╪¡ ╪º┘ä╪Ñ╪¿╪│┘è┘ä┘ê┘å ╪º┘ä┘è┘ê┘å╪º┘å┘è ┘ê╪º┘ä┘ç╪º╪í ╪º┘ä╪╣╪▒╪¿┘è.',
      stages: [
        {
          id: 1,
          nameEn: 'Egyptian Hieroglyphic',
          nameAr: '╪º┘ä┘ç┘è╪▒┘ê╪║┘ä┘è┘ü┘è╪⌐ ╪º┘ä┘à╪╡╪▒┘è╪⌐',
          period: '~2000 BCE',
          description: 'A human figure with arms raised jubilantly overhead.',
          descriptionAr: '╪┤╪«╪╡┘è╪⌐ ╪Ñ┘å╪│╪º┘å┘è╪⌐ ╪¬╪▒┘ü╪╣ ╪░╪▒╪º╪╣┘è┘ç╪º ┘à╪¿╪¬┘ç╪¼╪⌐ ┘ü┘ê┘é ╪▒╪ú╪│┘ç╪º.',
          textSymbol: '≡ôÇá',
          imageBase64: null,
          svgContent: `<g transform="translate(48,8)">
            <circle cx="52" cy="30" r="20" fill="none" stroke="currentColor" stroke-width="4.5"/>
            <path d="M 52,50 L 52,132" stroke="currentColor" stroke-width="5.5" stroke-linecap="round"/>
            <path d="M 52,76 L 10,44 M 52,76 L 94,44" stroke="currentColor" stroke-width="5.5" stroke-linecap="round"/>
            <path d="M 52,132 L 26,178 M 52,132 L 78,178" stroke="currentColor" stroke-width="5.5" stroke-linecap="round"/>
          </g>`
        },
        {
          id: 2,
          nameEn: 'Proto-Sinaitic',
          nameAr: '╪º┘ä╪│┘è┘å╪º╪ª┘è╪⌐ ╪º┘ä╪ú┘ê┘ä┘è╪⌐',
          period: '~1800 BCE',
          description: 'Abstracted to three horizontal lines with a vertical ΓÇö the arms and body simplified.',
          descriptionAr: '┘à╪¼╪▒╪» ╪Ñ┘ä┘ë ╪½┘ä╪º╪½╪⌐ ╪«╪╖┘ê╪╖ ╪ú┘ü┘é┘è╪⌐ ┘à╪╣ ╪╣┘à┘ê╪»┘è ΓÇö ╪░╪▒╪º╪╣╪º┘å ┘ê╪¼╪│╪» ┘ü┘è ╪ú╪¿╪│╪╖ ╪╡┘ê╪▒╪⌐.',
          textSymbol: '',
          imageBase64: null,
          svgContent: `<g transform="translate(28,28)">
            <path d="M 20,48 L 132,48 M 20,95 L 102,95 M 20,142 L 132,142" stroke="currentColor" stroke-width="7.5" stroke-linecap="round"/>
            <path d="M 20,48 L 20,142" stroke="currentColor" stroke-width="7.5" stroke-linecap="round"/>
          </g>`
        },
        {
          id: 3,
          nameEn: 'Phoenician',
          nameAr: '╪º┘ä┘ü┘è┘å┘è┘é┘è╪⌐',
          period: '~1050 BCE',
          description: 'A comb-like shape: one vertical and three horizontal strokes.',
          descriptionAr: '╪┤┘â┘ä ┘à╪┤╪╖: ╪╢╪▒╪¿╪⌐ ╪╣┘à┘ê╪»┘è╪⌐ ┘ê╪½┘ä╪º╪½ ╪ú┘ü┘é┘è╪⌐.',
          textSymbol: '≡Éñä',
          imageBase64: null,
          svgContent: `<g transform="translate(28,18)">
            <path d="M 22,28 L 22,172" stroke="currentColor" stroke-width="8" stroke-linecap="round"/>
            <path d="M 22,28 L 132,28 M 22,100 L 112,100 M 22,172 L 132,172" stroke="currentColor" stroke-width="8" stroke-linecap="round"/>
          </g>`
        },
        {
          id: 4,
          nameEn: 'Aramaic',
          nameAr: '╪º┘ä╪ó╪▒╪º┘à┘è╪⌐',
          period: '~800 BCE',
          description: 'Aramaic script, losing the vertical rigidity.',
          descriptionAr: '╪º┘ä╪«╪╖ ╪º┘ä╪ó╪▒╪º┘à┘è╪î ┘ü┘é╪» ╪º┘ä╪╡┘ä╪º╪¿╪⌐ ╪º┘ä╪╣┘à┘ê╪»┘è╪⌐.',
          textSymbol: '≡Éíä',
          imageBase64: null,
          svgContent: ''
        },
        {
          id: 5,
          nameEn: 'Nabataean',
          nameAr: '╪º┘ä┘å╪¿╪╖┘è╪⌐',
          period: '~200 BCE',
          description: 'Nabataean script, curled down anticipating the Arabic Ha.',
          descriptionAr: '╪º┘ä╪«╪╖ ╪º┘ä┘å╪¿╪╖┘è ┘à┘å╪¡┘å┘è╪º┘ï ╪º╪│╪¬╪╣╪»╪º╪»╪º┘ï ┘ä╪╕┘ç┘ê╪▒ ╪º┘ä┘ç╪º╪í ╪º┘ä╪╣╪▒╪¿┘è╪⌐.',
          textSymbol: '≡Éóä',
          imageBase64: null,
          svgContent: ''
        },
        {
          id: 6,
          nameEn: 'Arabic',
          nameAr: '╪º┘ä╪╣╪▒╪¿┘è╪⌐',
          period: '~400 CE',
          description: 'Arabic Ha (┘ç) ΓÇö a closed loop, like an eye or simple ring.',
          descriptionAr: '╪º┘ä┘ç╪º╪í ╪º┘ä╪╣╪▒╪¿┘è (┘ç) ΓÇö ╪¡┘ä┘é╪⌐ ┘à╪║┘ä┘é╪⌐ ╪¬╪┤╪¿┘ç ╪º┘ä╪╣┘è┘å ╪ú┘ê ╪«╪º╪¬┘à ╪¿╪│┘è╪╖.',
          textSymbol: '┘ç',
          imageBase64: null,
          svgContent: `<g transform="translate(28,28)">
            <path d="M 102,92 Q 102,42 66,36 Q 28,30 24,66 Q 20,102 52,118 Q 82,130 102,108 Q 122,88 118,62" fill="none" stroke="currentColor" stroke-width="9.5" stroke-linecap="round"/>
            <path d="M 118,62 Q 138,28 158,52" fill="none" stroke="currentColor" stroke-width="9.5" stroke-linecap="round"/>
          </g>`
        }
      ]
    },
    {
      id: 6,
      code: 'PHN-006',
      nameAr: '┘ê╪º┘ê (╪º┘ä┘ê╪º┘ê)',
      nameEn: 'Waw',
      civilization: 'Phoenician / Canaanite',
      phoenicianSymbol: '≡Éñà',
      arabicSymbol: '┘ê',
      meaning: 'Hook / Peg',
      meaningAr: '╪«╪╖╪º┘ü / ┘ê╪¬╪»',
      order: 6,
      description: 'Sixth letter ΓÇö "hook" or "nail". Became Greek Upsilon (╬Ñ), Latin F/U/V/W/Y, and Arabic Waw (┘ê).',
      descriptionAr: '╪º┘ä╪¡╪▒┘ü ╪º┘ä╪│╪º╪»╪│ ΓÇö "╪«╪╖╪º┘ü" ╪ú┘ê "┘à╪│┘à╪º╪▒". ╪ú╪╡╪¿╪¡ ╪º┘ä┘è┘ê┘å╪º┘å┘è ╪ú╪¿╪│┘è┘ä┘ê┘å ┘ê╪º┘ä┘ä╪º╪¬┘è┘å┘è F/U/V/W ┘ê ╪º┘ä┘ê╪º┘ê ╪º┘ä╪╣╪▒╪¿┘è.',
      stages: [
        {
          id: 1,
          nameEn: 'Egyptian Hieroglyphic',
          nameAr: '╪º┘ä┘ç┘è╪▒┘ê╪║┘ä┘è┘ü┘è╪⌐ ╪º┘ä┘à╪╡╪▒┘è╪⌐',
          period: '~2000 BCE',
          description: 'A tent peg or hook: a circle on top of a vertical shaft.',
          descriptionAr: '┘ê╪¬╪» ╪«┘è┘à╪⌐ ╪ú┘ê ╪«╪╖╪º┘ü: ╪»╪º╪ª╪▒╪⌐ ╪╣┘ä┘ë ┘é┘à╪⌐ ╪╣┘à┘ê╪» ╪╣┘à┘ê╪»┘è.',
          textSymbol: '≡ôîò',
          imageBase64: null,
          svgContent: `<g transform="translate(48,8)">
            <circle cx="52" cy="42" r="26" fill="none" stroke="currentColor" stroke-width="5.5"/>
            <path d="M 52,68 L 52,172" stroke="currentColor" stroke-width="6.5" stroke-linecap="round"/>
          </g>`
        },
        {
          id: 2,
          nameEn: 'Proto-Sinaitic',
          nameAr: '╪º┘ä╪│┘è┘å╪º╪ª┘è╪⌐ ╪º┘ä╪ú┘ê┘ä┘è╪⌐',
          period: '~1800 BCE',
          description: 'Simplified to a Y-fork shape.',
          descriptionAr: '┘à╪¿╪│╪╖ ╪Ñ┘ä┘ë ╪┤┘â┘ä ╪┤┘ê┘â╪⌐ Y.',
          textSymbol: '',
          imageBase64: null,
          svgContent: `<g transform="translate(38,18)">
            <path d="M 62,18 L 62,92 M 62,92 L 18,162 M 62,92 L 106,162" stroke="currentColor" stroke-width="7.5" stroke-linecap="round" fill="none"/>
          </g>`
        },
        {
          id: 3,
          nameEn: 'Phoenician',
          nameAr: '╪º┘ä┘ü┘è┘å┘è┘é┘è╪⌐',
          period: '~1050 BCE',
          description: 'Y-fork shape, ancestor of Greek Upsilon and Latin V.',
          descriptionAr: '╪┤┘â┘ä ╪┤┘ê┘â╪⌐ Y╪î ╪ú╪╡┘ä ╪º┘ä┘è┘ê┘å╪º┘å┘è ╪ú╪¿╪│┘è┘ä┘ê┘å ┘ê╪º┘ä┘ä╪º╪¬┘è┘å┘è V.',
          textSymbol: '≡Éñà',
          imageBase64: null,
          svgContent: `<g transform="translate(32,14)">
            <path d="M 68,18 L 68,102" stroke="currentColor" stroke-width="8.5" stroke-linecap="round"/>
            <path d="M 68,102 L 18,168 M 68,102 L 118,168" stroke="currentColor" stroke-width="8.5" stroke-linecap="round" fill="none"/>
          </g>`
        },
        {
          id: 4,
          nameEn: 'Aramaic',
          nameAr: '╪º┘ä╪ó╪▒╪º┘à┘è╪⌐',
          period: '~800 BCE',
          description: 'Aramaic script, developing a distinct curve.',
          descriptionAr: '╪º┘ä╪«╪╖ ╪º┘ä╪ó╪▒╪º┘à┘è╪î ╪╖┘ê╪▒ ┘à┘å╪¡┘å┘ë ┘à┘à┘è╪▓.',
          textSymbol: '≡Éíà',
          imageBase64: null,
          svgContent: ''
        },
        {
          id: 5,
          nameEn: 'Nabataean',
          nameAr: '╪º┘ä┘å╪¿╪╖┘è╪⌐',
          period: '~200 BCE',
          description: 'Curved and rounded shape leading into Arabic Waw.',
          descriptionAr: '╪┤┘â┘ä ╪»╪º╪ª╪▒┘è ┘à┘å╪¡┘å┘è ┘è┘é┘ê╪» ╪Ñ┘ä┘ë ╪º┘ä┘ê╪º┘ê ╪º┘ä╪╣╪▒╪¿┘è.',
          textSymbol: '≡Éóà',
          imageBase64: null,
          svgContent: ''
        },
        {
          id: 6,
          nameEn: 'Arabic',
          nameAr: '╪º┘ä╪╣╪▒╪¿┘è╪⌐',
          period: '~400 CE',
          description: 'Arabic Waw (┘ê) ΓÇö an elegant circular loop with a descending tail.',
          descriptionAr: '╪º┘ä┘ê╪º┘ê ╪º┘ä╪╣╪▒╪¿┘è (┘ê) ΓÇö ╪¡┘ä┘é╪⌐ ╪»╪º╪ª╪▒┘è╪⌐ ╪ú┘å┘è┘é╪⌐ ┘à╪╣ ╪░┘è┘ä ┘ç╪º╪¿╪╖.',
          textSymbol: '┘ê',
          imageBase64: null,
          svgContent: `<g transform="translate(18,18)">
            <path d="M 112,72 Q 112,26 76,20 Q 34,14 24,56 Q 14,92 46,112 Q 72,130 102,112 Q 132,94 126,66" fill="none" stroke="currentColor" stroke-width="9.5" stroke-linecap="round"/>
            <path d="M 126,66 Q 142,44 148,72 Q 150,108 132,142" fill="none" stroke="currentColor" stroke-width="9.5" stroke-linecap="round"/>
          </g>`
        }
      ]
    },
    {
      id: 7,
      code: 'PHN-007',
      nameAr: '╪▓╪º┘è┘å (╪▓╪º┘è)',
      nameEn: 'Zayin',
      civilization: 'Phoenician / Canaanite',
      phoenicianSymbol: '≡Éñå',
      arabicSymbol: '╪▓',
      meaning: 'Weapon / Sword',
      meaningAr: '╪│┘ä╪º╪¡ / ╪│┘è┘ü',
      order: 7,
      description: 'Seventh letter ΓÇö "weapon". Became Greek Zeta (╬û) and Arabic Zayn (╪▓).',
      descriptionAr: '╪º┘ä╪¡╪▒┘ü ╪º┘ä╪│╪º╪¿╪╣ ΓÇö "╪│┘ä╪º╪¡". ╪ú╪╡╪¿╪¡ ╪º┘ä╪▓┘è╪¬╪º ╪º┘ä┘è┘ê┘å╪º┘å┘è╪⌐ ┘ê╪º┘ä╪▓╪º┘è ╪º┘ä╪╣╪▒╪¿┘è.',
      stages: [
        {
          id: 1,
          nameEn: 'Egyptian Hieroglyphic',
          nameAr: '╪º┘ä┘ç┘è╪▒┘ê╪║┘ä┘è┘ü┘è╪⌐ ╪º┘ä┘à╪╡╪▒┘è╪⌐',
          period: '~2000 BCE',
          description: 'A stylised sword with a blade tapering to a point, and a crossguard.',
          descriptionAr: '╪│┘è┘ü ┘à┘å┘à┘é ╪¿┘å╪╡┘ä ┘è╪¬┘é┘ä╪╡ ┘å╪¡┘ê ┘å┘é╪╖╪⌐ ┘ê╪¡╪º╪▒╪│ ╪╣╪▒╪╢┘è.',
          textSymbol: '≡ôî¢',
          imageBase64: null,
          svgContent: `<g transform="translate(38,18)">
            <path d="M 62,18 L 62,132 Q 66,152 70,158" fill="none" stroke="currentColor" stroke-width="5.5" stroke-linecap="round"/>
            <path d="M 62,18 L 62,132 Q 58,152 54,158" fill="none" stroke="currentColor" stroke-width="5.5" stroke-linecap="round"/>
            <path d="M 18,112 L 106,112" stroke="currentColor" stroke-width="7.5" stroke-linecap="round"/>
            <rect x="55" y="158" width="14" height="28" rx="2" fill="none" stroke="currentColor" stroke-width="4.5"/>
          </g>`
        },
        {
          id: 2,
          nameEn: 'Proto-Sinaitic',
          nameAr: '╪º┘ä╪│┘è┘å╪º╪ª┘è╪⌐ ╪º┘ä╪ú┘ê┘ä┘è╪⌐',
          period: '~1800 BCE',
          description: 'Simplified to a vertical stroke with two horizontal crossbars.',
          descriptionAr: '┘à╪¿╪│╪╖ ╪Ñ┘ä┘ë ╪╢╪▒╪¿╪⌐ ╪╣┘à┘ê╪»┘è╪⌐ ┘à╪╣ ╪╣╪º╪▒╪╢╪¬┘è┘å ╪ú┘ü┘é┘è╪¬┘è┘å.',
          textSymbol: '',
          imageBase64: null,
          svgContent: `<g transform="translate(38,18)">
            <path d="M 62,18 L 62,168" stroke="currentColor" stroke-width="7.5" stroke-linecap="round"/>
            <path d="M 18,62 L 106,62 M 18,112 L 106,112" stroke="currentColor" stroke-width="7.5" stroke-linecap="round"/>
          </g>`
        },
        {
          id: 3,
          nameEn: 'Phoenician',
          nameAr: '╪º┘ä┘ü┘è┘å┘è┘é┘è╪⌐',
          period: '~1050 BCE',
          description: 'The I-beam or H-shape of Phoenician Zayin, ancestor of Greek Zeta.',
          descriptionAr: '╪┤┘â┘ä ╪º┘ä╪╣╪º╪▒╪╢╪⌐ I ╪ú┘ê H ┘ä┘ä╪▓╪º┘è┘å ╪º┘ä┘ü┘è┘å┘è┘é┘è╪⌐╪î ╪ú╪╡┘ä ╪º┘ä╪▓┘è╪¬╪º ╪º┘ä┘è┘ê┘å╪º┘å┘è╪⌐.',
          textSymbol: '≡Éñå',
          imageBase64: null,
          svgContent: `<g transform="translate(28,18)">
            <path d="M 18,24 L 128,24 M 73,24 L 73,162 M 18,162 L 128,162" stroke="currentColor" stroke-width="8.5" stroke-linecap="round"/>
          </g>`
        },
        {
          id: 4,
          nameEn: 'Aramaic',
          nameAr: '╪º┘ä╪ó╪▒╪º┘à┘è╪⌐',
          period: '~800 BCE',
          description: 'Aramaic script Zayin.',
          descriptionAr: '╪¡╪▒┘ü ╪º┘ä╪▓╪º┘è ╪º┘ä╪ó╪▒╪º┘à┘è.',
          textSymbol: '≡Éíå',
          imageBase64: null,
          svgContent: ''
        },
        {
          id: 5,
          nameEn: 'Nabataean',
          nameAr: '╪º┘ä┘å╪¿╪╖┘è╪⌐',
          period: '~200 BCE',
          description: 'Nabataean script Zayin.',
          descriptionAr: '╪¡╪▒┘ü ╪º┘ä╪▓╪º┘è ╪º┘ä┘å╪¿╪╖┘è.',
          textSymbol: '≡Éóå',
          imageBase64: null,
          svgContent: ''
        },
        {
          id: 6,
          nameEn: 'Arabic',
          nameAr: '╪º┘ä╪╣╪▒╪¿┘è╪⌐',
          period: '~400 CE',
          description: 'Arabic Zayn (╪▓) ΓÇö identical to Waw but with a diacritical dot above.',
          descriptionAr: '╪º┘ä╪▓╪º┘è ╪º┘ä╪╣╪▒╪¿┘è (╪▓) ΓÇö ┘à╪╖╪º╪¿┘é ┘ä┘ä┘ê╪º┘ê ┘ä┘â┘å ┘à╪╣ ┘å┘é╪╖╪⌐ ┘ü┘ê┘é┘ç.',
          textSymbol: '╪▓',
          imageBase64: null,
          svgContent: `<g transform="translate(18,28)">
            <path d="M 112,72 Q 112,26 76,20 Q 34,14 24,56 Q 14,92 46,112 Q 72,130 102,112 Q 132,94 126,66" fill="none" stroke="currentColor" stroke-width="9.5" stroke-linecap="round"/>
            <path d="M 126,66 Q 142,44 148,72 Q 150,108 132,142" fill="none" stroke="currentColor" stroke-width="9.5" stroke-linecap="round"/>
            <circle cx="76" cy="-4" r="9" fill="currentColor"/>
          </g>`
        }
      ]
    },
    {
      id: 8,
      code: 'PHN-008',
      nameAr: '╪¡┘è╪¬ (╪¡╪º╪í)',
      nameEn: 'Heth',
      civilization: 'Phoenician / Canaanite',
      phoenicianSymbol: '≡Éñç',
      arabicSymbol: '╪¡',
      meaning: 'Fence / Wall',
      meaningAr: '╪│┘è╪º╪¼ / ╪¼╪»╪º╪▒',
      order: 8,
      description: 'Eighth letter ΓÇö "fence". Became Greek Eta (╬ù) and Arabic Ha (╪¡).',
      descriptionAr: '╪º┘ä╪¡╪▒┘ü ╪º┘ä╪½╪º┘à┘å ΓÇö "╪│┘è╪º╪¼". ╪ú╪╡╪¿╪¡ ╪º┘ä╪Ñ┘è╪¬╪º ╪º┘ä┘è┘ê┘å╪º┘å┘è╪⌐ ┘ê╪º┘ä╪¡╪º╪í ╪º┘ä╪╣╪▒╪¿┘è.',
      stages: [
        {
          id: 1,
          nameEn: 'Egyptian Hieroglyphic',
          nameAr: '╪º┘ä┘ç┘è╪▒┘ê╪║┘ä┘è┘ü┘è╪⌐ ╪º┘ä┘à╪╡╪▒┘è╪⌐',
          period: '~2000 BCE',
          description: 'A fence with upright posts and horizontal rails.',
          descriptionAr: '╪│┘è╪º╪¼ ╪¿╪ú╪╣┘à╪»╪⌐ ╪╣┘à┘ê╪»┘è╪⌐ ┘ê┘é╪╢╪¿╪º┘å ╪ú┘ü┘é┘è╪⌐.',
          textSymbol: '≡ôëù',
          imageBase64: null,
          svgContent: `<g transform="translate(18,28)">
            <path d="M 18,38 L 18,162 M 62,38 L 62,162 M 106,38 L 106,162 M 150,38 L 150,162" stroke="currentColor" stroke-width="5.5" stroke-linecap="round"/>
            <path d="M 18,38 L 150,38 M 18,100 L 150,100 M 18,162 L 150,162" stroke="currentColor" stroke-width="5.5" stroke-linecap="round"/>
          </g>`
        },
        {
          id: 2,
          nameEn: 'Proto-Sinaitic',
          nameAr: '╪º┘ä╪│┘è┘å╪º╪ª┘è╪⌐ ╪º┘ä╪ú┘ê┘ä┘è╪⌐',
          period: '~1800 BCE',
          description: 'Reduced to two uprights and two rails ΓÇö a simplified fence.',
          descriptionAr: '╪º╪«╪¬┘Å╪▓┘ä ╪Ñ┘ä┘ë ╪╣┘à┘ê╪»┘è┘å ┘ê┘é╪╢┘è╪¿┘è┘å ΓÇö ╪│┘è╪º╪¼ ┘à╪¿╪│╪╖.',
          textSymbol: '',
          imageBase64: null,
          svgContent: `<g transform="translate(28,28)">
            <path d="M 22,28 L 22,162 M 132,28 L 132,162" stroke="currentColor" stroke-width="7.5" stroke-linecap="round"/>
            <path d="M 22,28 L 132,28 M 22,95 L 132,95 M 22,162 L 132,162" stroke="currentColor" stroke-width="7.5" stroke-linecap="round"/>
          </g>`
        },
        {
          id: 3,
          nameEn: 'Phoenician',
          nameAr: '╪º┘ä┘ü┘è┘å┘è┘é┘è╪⌐',
          period: '~1050 BCE',
          description: 'A classic H-shape: two verticals with a crossbar, ancestor of Greek Eta.',
          descriptionAr: '╪┤┘â┘ä H ╪º┘ä┘â┘ä╪º╪│┘è┘â┘è: ╪╣┘à┘ê╪»┘è╪º┘å ┘à╪╣ ╪╣╪º╪▒╪╢╪⌐╪î ╪ú╪╡┘ä ╪º┘ä╪Ñ┘è╪¬╪º ╪º┘ä┘è┘ê┘å╪º┘å┘è╪⌐.',
          textSymbol: '≡Éñç',
          imageBase64: null,
          svgContent: `<g transform="translate(24,18)">
            <path d="M 26,24 L 26,168 M 138,24 L 138,168" stroke="currentColor" stroke-width="8.5" stroke-linecap="round"/>
            <path d="M 26,96 L 138,96" stroke="currentColor" stroke-width="8.5" stroke-linecap="round"/>
          </g>`
        },
        {
          id: 4,
          nameEn: 'Aramaic',
          nameAr: '╪º┘ä╪ó╪▒╪º┘à┘è╪⌐',
          period: '~800 BCE',
          description: 'Aramaic Heth.',
          descriptionAr: '╪º┘ä╪¡╪º╪í ╪º┘ä╪ó╪▒╪º┘à┘è╪⌐.',
          textSymbol: '≡Éíç',
          imageBase64: null,
          svgContent: ''
        },
        {
          id: 5,
          nameEn: 'Nabataean',
          nameAr: '╪º┘ä┘å╪¿╪╖┘è╪⌐',
          period: '~200 BCE',
          description: 'Nabataean Heth.',
          descriptionAr: '╪º┘ä╪¡╪º╪í ╪º┘ä┘å╪¿╪╖┘è╪⌐.',
          textSymbol: '≡Éóç',
          imageBase64: null,
          svgContent: ''
        },
        {
          id: 6,
          nameEn: 'Arabic',
          nameAr: '╪º┘ä╪╣╪▒╪¿┘è╪⌐',
          period: '~400 CE',
          description: 'Arabic Ha (╪¡) ΓÇö an open-bottomed shape with a distinctive upper lobe.',
          descriptionAr: '╪º┘ä╪¡╪º╪í ╪º┘ä╪╣╪▒╪¿┘è (╪¡) ΓÇö ╪┤┘â┘ä ┘à┘ü╪¬┘ê╪¡ ┘à┘å ╪º┘ä╪ú╪│┘ü┘ä ┘à╪╣ ┘ü╪╡ ╪╣┘ä┘ê┘è ┘à┘à┘è╪▓.',
          textSymbol: '╪¡',
          imageBase64: null,
          svgContent: `<g transform="translate(13,28)">
            <path d="M 152,72 Q 132,30 92,30 Q 50,30 34,66 Q 24,90 46,110 Q 62,124 88,116" fill="none" stroke="currentColor" stroke-width="9.5" stroke-linecap="round"/>
            <path d="M 88,116 Q 104,112 108,96 Q 112,80 94,72" fill="none" stroke="currentColor" stroke-width="9.5" stroke-linecap="round"/>
            <path d="M 108,96 L 148,142" fill="none" stroke="currentColor" stroke-width="9.5" stroke-linecap="round"/>
          </g>`
        }
      ]
    }
  ],

  // ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
  // INITIALISE
  // ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
  init() {
    // Force-reset if version mismatch (fixes stale localStorage ordering)
    const storedVer = localStorage.getItem(this.VERSION_KEY);
    if (storedVer !== this.DB_VERSION) {
      localStorage.removeItem(this.STORAGE_KEY);
      localStorage.removeItem(this.ADMIN_KEY); // Also remove old admin credentials
      localStorage.setItem(this.VERSION_KEY, this.DB_VERSION);
    }
    if (!localStorage.getItem(this.ADMIN_KEY)) {
      localStorage.setItem(this.ADMIN_KEY, JSON.stringify(this.DEFAULT_ADMIN));
    }
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.SEED_DATA));
    }
  },

  // ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
  // CRUD
  // ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
  getAll() {
    this.init();
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
  },
  getById(id) {
    return this.getAll().find(l => l.id === parseInt(id));
  },
  add(letter) {
    const letters = this.getAll();
    letter.id = Date.now();
    letter.code = `PHN-${String(letters.length + 1).padStart(3, '0')}`;
    letters.push(letter);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(letters));
    return letter;
  },
  update(id, updates) {
    const letters = this.getAll();
    const idx = letters.findIndex(l => l.id === parseInt(id));
    if (idx !== -1) {
      letters[idx] = { ...letters[idx], ...updates };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(letters));
      return letters[idx];
    }
    return null;
  },
  delete(id) {
    const letters = this.getAll().filter(l => l.id !== parseInt(id));
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(letters));
  },
  exportJSON() {
    const blob = new Blob([JSON.stringify(this.getAll(), null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'ancient_scripts.json'; a.click();
    URL.revokeObjectURL(url);
  },
  importJSON(jsonStr) {
    try {
      const data = JSON.parse(jsonStr);
      if (Array.isArray(data)) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
        return true;
      }
    } catch (e) { return false; }
    return false;
  },

  // ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
  // ADMIN AUTH
  // ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
  // ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
  checkAuth(username, password) {
    this.init();
    const stored = JSON.parse(localStorage.getItem(this.ADMIN_KEY) || '{}');
    return stored.username === btoa(username) && stored.password === btoa(password);
  },
  isLoggedIn() {
    return sessionStorage.getItem(this.SESSION_KEY) === 'authenticated';
  },
  login(username, password) {
    if (this.checkAuth(username, password)) {
      sessionStorage.setItem(this.SESSION_KEY, 'authenticated');
      return true;
    }
    return false;
  },
  logout() {
    sessionStorage.removeItem(this.SESSION_KEY);
  }
};
