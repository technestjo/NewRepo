module.exports = [
    {
      id: 1,
      code: 'PHN-001',
      nameAr: 'ألف',
      nameEn: 'Aleph',
      civilization: 'Phoenician / Canaanite',
      phoenicianSymbol: '𐤀',
      arabicSymbol: 'أ / ا',
      meaning: 'Ox / Bull',
      meaningAr: 'ثور / بقرة',
      order: 1,
      description: 'First letter of the Phoenician alphabet, derived from the Egyptian hieroglyph of an ox head. The name means "ox" in Proto-Semitic. Rotated and abstracted to become Greek Alpha and Arabic Alef.',
      descriptionAr: 'أول حرف في الأبجدية الفينيقية، مشتق من الهيروغليفية المصرية لرأس الثور. اسمه يعني "ثور" بالبروتو-سامية. تحوّل ليصبح الألفا اليوناني والألف العربي.',
      stages: [
        {
          id: 1,
          nameEn: 'Egyptian Hieroglyphic',
          nameAr: 'الهيروغليفية المصرية',
          period: '~2000 BCE',
          description: 'The original hieroglyph — an ox head viewed from the front with curved horns.',
          descriptionAr: 'الرمز الهيروغليفي الأصلي — رأس ثور من الأمام مع قرون منحنية.',
          textSymbol: '𓃾',
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
          nameAr: 'السينائية الأولية',
          period: '~1800 BCE',
          description: 'Canaanite workers simplified the hieroglyph into an abstract inverted triangle with horns.',
          descriptionAr: 'بسّط الكنعانيون الرمز إلى مثلث مقلوب مجرد مع قرون.',
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
          nameAr: 'الفينيقية',
          period: '~1050 BCE',
          description: 'Rotated 90° by the Phoenicians — now an angular shape like a rotated "A" with a crossbar.',
          descriptionAr: 'دوّره الفينيقيون 90° — أصبح شكلاً زاوياً يشبه حرف "A" مقلوباً مع شريط أفقي.',
          textSymbol: '𐤀',
          imageBase64: null,
          svgContent: `<g transform="translate(100,100)">
            <path d="M 0,-68 L -46,52 M 0,-68 L 46,52" stroke="currentColor" stroke-width="8" stroke-linecap="round" fill="none"/>
            <path d="M -32,-4 L 32,-4" stroke="currentColor" stroke-width="8" stroke-linecap="round"/>
          </g>`
        },
        {
          id: 4,
          nameEn: 'Aramaic',
          nameAr: 'الآرامية',
          period: '~800 BCE',
          description: 'Continued evolution towards a regularized vertical stroke with angled top.',
          descriptionAr: 'تطور نحو ضربة عمودية منتظمة مع قمة مائلة.',
          textSymbol: '𐡀',
          imageBase64: null,
          svgContent: ''
        },
        {
          id: 5,
          nameEn: 'Nabataean',
          nameAr: 'النبطية',
          period: '~200 BCE',
          description: 'Nabataean script, developed from Aramaic. The precursor to the Arabic script.',
          descriptionAr: 'الخط النبطي، تطور من الآرامية. وهو الخط الذي سبق الخط العربي مباشرة.',
          textSymbol: '𐢀',
          imageBase64: null,
          svgContent: ''
        },
        {
          id: 6,
          nameEn: 'Arabic',
          nameAr: 'العربية',
          period: '~400 CE',
          description: 'Final evolution: the Arabic Alef (ا) with Hamza (أ) — the very first letter of the Arabic alphabet.',
          descriptionAr: 'التطور النهائي: الألف العربي مع الهمزة (أ) — أول حرف في الأبجدية العربية.',
          textSymbol: 'أ',
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
      nameAr: 'بيت (باء)',
      nameEn: 'Beth',
      civilization: 'Phoenician / Canaanite',
      phoenicianSymbol: '𐤁',
      arabicSymbol: 'ب',
      meaning: 'House',
      meaningAr: 'بيت / منزل',
      order: 2,
      description: 'Second letter of the Phoenician alphabet. Name means "house". The floor plan of a simple dwelling served as the original symbol, later becoming the Greek Beta and Arabic Ba.',
      descriptionAr: 'الحرف الثاني في الأبجدية الفينيقية. اسمه يعني "بيت". مخطط مسكن بسيط كان الرمز الأصلي.',
      stages: [
        {
          id: 1,
          nameEn: 'Egyptian Hieroglyphic',
          nameAr: 'الهيروغليفية المصرية',
          period: '~2000 BCE',
          description: 'A top-down floor plan of a simple house with an opening on one side.',
          descriptionAr: 'مخطط أعلى-أسفل لمنزل بسيط مع فتحة جانبية.',
          textSymbol: '𓉐',
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
          nameAr: 'السينائية الأولية',
          period: '~1800 BCE',
          description: 'Simplified to an angular bracket shape retaining the house outline.',
          descriptionAr: 'مبسط إلى شكل زاوية تحتفظ بمخطط البيت.',
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
          nameAr: 'الفينيقية',
          period: '~1050 BCE',
          description: 'The angular B-shape — a vertical stroke with two lobes, ancestor of Greek Beta.',
          descriptionAr: 'الشكل الزاوي B — ضربة عمودية بفصين، أصل الحرف اليوناني بيتا.',
          textSymbol: '𐤁',
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
          nameAr: 'الآرامية',
          period: '~800 BCE',
          description: 'Aramaic script, open bottom, curving down.',
          descriptionAr: 'الخط الآرامي مفتوح من الأسفل ومائل.',
          textSymbol: '𐡁',
          imageBase64: null,
          svgContent: ''
        },
        {
          id: 5,
          nameEn: 'Nabataean',
          nameAr: 'النبطية',
          period: '~200 BCE',
          description: 'More rounded letter, foreshadowing the Arabic Ba loop.',
          descriptionAr: 'حرف أكثر استدارة، يمهد لشكل الباء العربية.',
          textSymbol: '𐢁',
          imageBase64: null,
          svgContent: ''
        },
        {
          id: 6,
          nameEn: 'Arabic',
          nameAr: 'العربية',
          period: '~400 CE',
          description: 'Arabic Ba (ب) — a sweeping horizontal curve with a single dot below.',
          descriptionAr: 'الباء العربية (ب) — خط منحنى أفقي جارف مع نقطة واحدة أسفله.',
          textSymbol: 'ب',
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
      nameAr: 'جيمل (جيم)',
      nameEn: 'Gimel',
      civilization: 'Phoenician / Canaanite',
      phoenicianSymbol: '𐤂',
      arabicSymbol: 'ج',
      meaning: 'Camel / Throwing-stick',
      meaningAr: 'جمل / عصا رمي',
      order: 3,
      description: 'Third letter; name means "camel" or "throwing-stick". Evolved into the Greek Gamma (Γ) and Arabic Jim (ج).',
      descriptionAr: 'الحرف الثالث؛ اسمه يعني "جمل" أو "عصا رمي". تطور ليصبح الغاما اليوناني والجيم العربي.',
      stages: [
        {
          id: 1,
          nameEn: 'Egyptian Hieroglyphic',
          nameAr: 'الهيروغليفية المصرية',
          period: '~2000 BCE',
          description: 'The Egyptian hieroglyph for a curved throwing-stick or boomerang.',
          descriptionAr: 'الهيروغليفية المصرية لعصا رمي منحنية أو بوميرانج.',
          textSymbol: '𓌙',
          imageBase64: null,
          svgContent: `<g transform="translate(18,18)">
            <path d="M 30,155 Q 18,82 78,30 Q 118,4 152,40 Q 168,66 148,92 Q 124,62 96,66 Q 58,78 56,142 Z" fill="none" stroke="currentColor" stroke-width="5.5" stroke-linejoin="round"/>
          </g>`
        },
        {
          id: 2,
          nameEn: 'Proto-Sinaitic',
          nameAr: 'السينائية الأولية',
          period: '~1800 BCE',
          description: 'Simplified to an angular corner shape suggesting a camel\'s hump.',
          descriptionAr: 'مبسط إلى شكل ركن زاوي يوحي بسنام الجمل.',
          textSymbol: '',
          imageBase64: null,
          svgContent: `<g transform="translate(28,28)">
            <path d="M 18,155 L 18,48 L 158,142" fill="none" stroke="currentColor" stroke-width="7.5" stroke-linecap="round" stroke-linejoin="round"/>
          </g>`
        },
        {
          id: 3,
          nameEn: 'Phoenician',
          nameAr: 'الفينيقية',
          period: '~1050 BCE',
          description: 'An angular L-shape on its side — ancestor of the Greek Gamma (Γ).',
          descriptionAr: 'شكل زاوي على جانبه — أصل الغاما اليونانية (Γ).',
          textSymbol: '𐤂',
          imageBase64: null,
          svgContent: `<g transform="translate(32,18)">
            <path d="M 18,28 L 128,28 L 128,162" fill="none" stroke="currentColor" stroke-width="8.5" stroke-linecap="round" stroke-linejoin="round"/>
          </g>`
        },
        {
          id: 4,
          nameEn: 'Aramaic',
          nameAr: 'الآرامية',
          period: '~800 BCE',
          description: 'Aramaic Gimel, smoothed lines.',
          descriptionAr: 'حرف الجيم الآرامي بخطوط أكثر سلاسة.',
          textSymbol: '𐡂',
          imageBase64: null,
          svgContent: ''
        },
        {
          id: 5,
          nameEn: 'Nabataean',
          nameAr: 'النبطية',
          period: '~200 BCE',
          description: 'Nabataean Gimel, evolving directly into Arabic Jim.',
          descriptionAr: 'الجيم النبطي يتطور مباشرة إلى الجيم العربي.',
          textSymbol: '𐢂',
          imageBase64: null,
          svgContent: ''
        },
        {
          id: 6,
          nameEn: 'Arabic',
          nameAr: 'العربية',
          period: '~400 CE',
          description: 'Arabic Jim (ج) — a circular bowl open on one side, with a dot inside.',
          descriptionAr: 'الجيم العربي (ج) — وعاء دائري مفتوح من أحد الجانبين مع نقطة داخله.',
          textSymbol: 'ج',
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
      nameAr: 'دالت (دال)',
      nameEn: 'Daleth',
      civilization: 'Phoenician / Canaanite',
      phoenicianSymbol: '𐤃',
      arabicSymbol: 'د',
      meaning: 'Door / Tent Flap',
      meaningAr: 'باب / غطاء الخيمة',
      order: 4,
      description: 'Fourth letter — "door". Evolved from a triangular tent-door shape through Phoenician to Greek Delta (Δ) and Arabic Dal (د).',
      descriptionAr: 'الحرف الرابع — "باب". تطور من شكل باب الخيمة المثلثي إلى دلتا اليوناني والدال العربي.',
      stages: [
        {
          id: 1,
          nameEn: 'Egyptian Hieroglyphic',
          nameAr: 'الهيروغليفية المصرية',
          period: '~2000 BCE',
          description: 'A triangular tent flap common in nomadic culture — point at top, base at bottom.',
          descriptionAr: 'غطاء خيمة مثلثي شائع في الثقافة البدوية — قمة في الأعلى، قاعدة في الأسفل.',
          textSymbol: '𓉿',
          imageBase64: null,
          svgContent: `<g transform="translate(18,18)">
            <path d="M 100,18 L 170,162 L 30,162 Z" fill="none" stroke="currentColor" stroke-width="5.5"/>
            <path d="M 100,18 L 100,162" stroke="currentColor" stroke-width="3" stroke-dasharray="7,5"/>
          </g>`
        },
        {
          id: 2,
          nameEn: 'Proto-Sinaitic',
          nameAr: 'السينائية الأولية',
          period: '~1800 BCE',
          description: 'A clean bold triangle representing the door.',
          descriptionAr: 'مثلث جريء ونظيف يمثل الباب.',
          textSymbol: '',
          imageBase64: null,
          svgContent: `<g transform="translate(28,18)">
            <path d="M 100,22 L 166,158 L 34,158 Z" fill="none" stroke="currentColor" stroke-width="7.5" stroke-linejoin="round"/>
          </g>`
        },
        {
          id: 3,
          nameEn: 'Phoenician',
          nameAr: 'الفينيقية',
          period: '~1050 BCE',
          description: 'Angular D-shape — a vertical stroke with a rounded top, ancestor of Greek Delta.',
          descriptionAr: 'شكل D زاوي — ضربة عمودية مع قمة مستديرة، أصل الدلتا اليونانية.',
          textSymbol: '𐤃',
          imageBase64: null,
          svgContent: `<g transform="translate(28,18)">
            <path d="M 28,22 L 28,162 L 112,162 Q 162,158 162,92 Q 162,22 112,22 Z" fill="none" stroke="currentColor" stroke-width="7.5" stroke-linejoin="round"/>
          </g>`
        },
        {
          id: 4,
          nameEn: 'Aramaic',
          nameAr: 'الآرامية',
          period: '~800 BCE',
          description: 'Aramaic Daleth, opened up forming an elbow shape.',
          descriptionAr: 'الدال الآرامي بشكل الكوع.',
          textSymbol: '𐡃',
          imageBase64: null,
          svgContent: ''
        },
        {
          id: 5,
          nameEn: 'Nabataean',
          nameAr: 'النبطية',
          period: '~200 BCE',
          description: 'Smoothed out completely into a cursive stroke.',
          descriptionAr: 'انثنى تماماً إلى خط أكثر انسيابية.',
          textSymbol: '𐢃',
          imageBase64: null,
          svgContent: ''
        },
        {
          id: 6,
          nameEn: 'Arabic',
          nameAr: 'العربية',
          period: '~400 CE',
          description: 'Arabic Dal (د) — a graceful rounded hook, simple and elegant.',
          descriptionAr: 'الدال العربي (د) — خطاف مستدير رشيق، بسيط وأنيق.',
          textSymbol: 'د',
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
      nameAr: 'هيه (هاء)',
      nameEn: 'He',
      civilization: 'Phoenician / Canaanite',
      phoenicianSymbol: '𐤄',
      arabicSymbol: 'ه',
      meaning: 'Window / Jubilation',
      meaningAr: 'نافذة / ابتهاج',
      order: 5,
      description: 'Fifth letter — depicts a man raising arms in joy, or a window. Became Greek Epsilon (Ε) and Arabic Ha (ه).',
      descriptionAr: 'الحرف الخامس — يصور رجلاً رافعاً ذراعيه فرحاً، أو نافذة. أصبح الإبسيلون اليوناني والهاء العربي.',
      stages: [
        {
          id: 1,
          nameEn: 'Egyptian Hieroglyphic',
          nameAr: 'الهيروغليفية المصرية',
          period: '~2000 BCE',
          description: 'A human figure with arms raised jubilantly overhead.',
          descriptionAr: 'شخصية إنسانية ترفع ذراعيها مبتهجة فوق رأسها.',
          textSymbol: '𓀠',
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
          nameAr: 'السينائية الأولية',
          period: '~1800 BCE',
          description: 'Abstracted to three horizontal lines with a vertical — the arms and body simplified.',
          descriptionAr: 'مجرد إلى ثلاثة خطوط أفقية مع عمودي — ذراعان وجسد في أبسط صورة.',
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
          nameAr: 'الفينيقية',
          period: '~1050 BCE',
          description: 'A comb-like shape: one vertical and three horizontal strokes.',
          descriptionAr: 'شكل مشط: ضربة عمودية وثلاث أفقية.',
          textSymbol: '𐤄',
          imageBase64: null,
          svgContent: `<g transform="translate(28,18)">
            <path d="M 22,28 L 22,172" stroke="currentColor" stroke-width="8" stroke-linecap="round"/>
            <path d="M 22,28 L 132,28 M 22,100 L 112,100 M 22,172 L 132,172" stroke="currentColor" stroke-width="8" stroke-linecap="round"/>
          </g>`
        },
        {
          id: 4,
          nameEn: 'Aramaic',
          nameAr: 'الآرامية',
          period: '~800 BCE',
          description: 'Aramaic script, losing the vertical rigidity.',
          descriptionAr: 'الخط الآرامي، فقد الصلابة العمودية.',
          textSymbol: '𐡄',
          imageBase64: null,
          svgContent: ''
        },
        {
          id: 5,
          nameEn: 'Nabataean',
          nameAr: 'النبطية',
          period: '~200 BCE',
          description: 'Nabataean script, curled down anticipating the Arabic Ha.',
          descriptionAr: 'الخط النبطي منحنياً استعداداً لظهور الهاء العربية.',
          textSymbol: '𐢄',
          imageBase64: null,
          svgContent: ''
        },
        {
          id: 6,
          nameEn: 'Arabic',
          nameAr: 'العربية',
          period: '~400 CE',
          description: 'Arabic Ha (ه) — a closed loop, like an eye or simple ring.',
          descriptionAr: 'الهاء العربي (ه) — حلقة مغلقة تشبه العين أو خاتم بسيط.',
          textSymbol: 'ه',
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
      nameAr: 'واو (الواو)',
      nameEn: 'Waw',
      civilization: 'Phoenician / Canaanite',
      phoenicianSymbol: '𐤅',
      arabicSymbol: 'و',
      meaning: 'Hook / Peg',
      meaningAr: 'خطاف / وتد',
      order: 6,
      description: 'Sixth letter — "hook" or "nail". Became Greek Upsilon (Υ), Latin F/U/V/W/Y, and Arabic Waw (و).',
      descriptionAr: 'الحرف السادس — "خطاف" أو "مسمار". أصبح اليوناني أبسيلون واللاتيني F/U/V/W و الواو العربي.',
      stages: [
        {
          id: 1,
          nameEn: 'Egyptian Hieroglyphic',
          nameAr: 'الهيروغليفية المصرية',
          period: '~2000 BCE',
          description: 'A tent peg or hook: a circle on top of a vertical shaft.',
          descriptionAr: 'وتد خيمة أو خطاف: دائرة على قمة عمود عمودي.',
          textSymbol: '𓌕',
          imageBase64: null,
          svgContent: `<g transform="translate(48,8)">
            <circle cx="52" cy="42" r="26" fill="none" stroke="currentColor" stroke-width="5.5"/>
            <path d="M 52,68 L 52,172" stroke="currentColor" stroke-width="6.5" stroke-linecap="round"/>
          </g>`
        },
        {
          id: 2,
          nameEn: 'Proto-Sinaitic',
          nameAr: 'السينائية الأولية',
          period: '~1800 BCE',
          description: 'Simplified to a Y-fork shape.',
          descriptionAr: 'مبسط إلى شكل شوكة Y.',
          textSymbol: '',
          imageBase64: null,
          svgContent: `<g transform="translate(38,18)">
            <path d="M 62,18 L 62,92 M 62,92 L 18,162 M 62,92 L 106,162" stroke="currentColor" stroke-width="7.5" stroke-linecap="round" fill="none"/>
          </g>`
        },
        {
          id: 3,
          nameEn: 'Phoenician',
          nameAr: 'الفينيقية',
          period: '~1050 BCE',
          description: 'Y-fork shape, ancestor of Greek Upsilon and Latin V.',
          descriptionAr: 'شكل شوكة Y، أصل اليوناني أبسيلون واللاتيني V.',
          textSymbol: '𐤅',
          imageBase64: null,
          svgContent: `<g transform="translate(32,14)">
            <path d="M 68,18 L 68,102" stroke="currentColor" stroke-width="8.5" stroke-linecap="round"/>
            <path d="M 68,102 L 18,168 M 68,102 L 118,168" stroke="currentColor" stroke-width="8.5" stroke-linecap="round" fill="none"/>
          </g>`
        },
        {
          id: 4,
          nameEn: 'Aramaic',
          nameAr: 'الآرامية',
          period: '~800 BCE',
          description: 'Aramaic script, developing a distinct curve.',
          descriptionAr: 'الخط الآرامي، طور منحنى مميز.',
          textSymbol: '𐡅',
          imageBase64: null,
          svgContent: ''
        },
        {
          id: 5,
          nameEn: 'Nabataean',
          nameAr: 'النبطية',
          period: '~200 BCE',
          description: 'Curved and rounded shape leading into Arabic Waw.',
          descriptionAr: 'شكل دائري منحني يقود إلى الواو العربي.',
          textSymbol: '𐢅',
          imageBase64: null,
          svgContent: ''
        },
        {
          id: 6,
          nameEn: 'Arabic',
          nameAr: 'العربية',
          period: '~400 CE',
          description: 'Arabic Waw (و) — an elegant circular loop with a descending tail.',
          descriptionAr: 'الواو العربي (و) — حلقة دائرية أنيقة مع ذيل هابط.',
          textSymbol: 'و',
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
      nameAr: 'زاين (زاي)',
      nameEn: 'Zayin',
      civilization: 'Phoenician / Canaanite',
      phoenicianSymbol: '𐤆',
      arabicSymbol: 'ز',
      meaning: 'Weapon / Sword',
      meaningAr: 'سلاح / سيف',
      order: 7,
      description: 'Seventh letter — "weapon". Became Greek Zeta (Ζ) and Arabic Zayn (ز).',
      descriptionAr: 'الحرف السابع — "سلاح". أصبح الزيتا اليونانية والزاي العربي.',
      stages: [
        {
          id: 1,
          nameEn: 'Egyptian Hieroglyphic',
          nameAr: 'الهيروغليفية المصرية',
          period: '~2000 BCE',
          description: 'A stylised sword with a blade tapering to a point, and a crossguard.',
          descriptionAr: 'سيف منمق بنصل يتقلص نحو نقطة وحارس عرضي.',
          textSymbol: '𓌛',
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
          nameAr: 'السينائية الأولية',
          period: '~1800 BCE',
          description: 'Simplified to a vertical stroke with two horizontal crossbars.',
          descriptionAr: 'مبسط إلى ضربة عمودية مع عارضتين أفقيتين.',
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
          nameAr: 'الفينيقية',
          period: '~1050 BCE',
          description: 'The I-beam or H-shape of Phoenician Zayin, ancestor of Greek Zeta.',
          descriptionAr: 'شكل العارضة I أو H للزاين الفينيقية، أصل الزيتا اليونانية.',
          textSymbol: '𐤆',
          imageBase64: null,
          svgContent: `<g transform="translate(28,18)">
            <path d="M 18,24 L 128,24 M 73,24 L 73,162 M 18,162 L 128,162" stroke="currentColor" stroke-width="8.5" stroke-linecap="round"/>
          </g>`
        },
        {
          id: 4,
          nameEn: 'Aramaic',
          nameAr: 'الآرامية',
          period: '~800 BCE',
          description: 'Aramaic script Zayin.',
          descriptionAr: 'حرف الزاي الآرامي.',
          textSymbol: '𐡆',
          imageBase64: null,
          svgContent: ''
        },
        {
          id: 5,
          nameEn: 'Nabataean',
          nameAr: 'النبطية',
          period: '~200 BCE',
          description: 'Nabataean script Zayin.',
          descriptionAr: 'حرف الزاي النبطي.',
          textSymbol: '𐢆',
          imageBase64: null,
          svgContent: ''
        },
        {
          id: 6,
          nameEn: 'Arabic',
          nameAr: 'العربية',
          period: '~400 CE',
          description: 'Arabic Zayn (ز) — identical to Waw but with a diacritical dot above.',
          descriptionAr: 'الزاي العربي (ز) — مطابق للواو لكن مع نقطة فوقه.',
          textSymbol: 'ز',
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
      nameAr: 'حيت (حاء)',
      nameEn: 'Heth',
      civilization: 'Phoenician / Canaanite',
      phoenicianSymbol: '𐤇',
      arabicSymbol: 'ح',
      meaning: 'Fence / Wall',
      meaningAr: 'سياج / جدار',
      order: 8,
      description: 'Eighth letter — "fence". Became Greek Eta (Η) and Arabic Ha (ح).',
      descriptionAr: 'الحرف الثامن — "سياج". أصبح الإيتا اليونانية والحاء العربي.',
      stages: [
        {
          id: 1,
          nameEn: 'Egyptian Hieroglyphic',
          nameAr: 'الهيروغليفية المصرية',
          period: '~2000 BCE',
          description: 'A fence with upright posts and horizontal rails.',
          descriptionAr: 'سياج بأعمدة عمودية وقضبان أفقية.',
          textSymbol: '𓉗',
          imageBase64: null,
          svgContent: `<g transform="translate(18,28)">
            <path d="M 18,38 L 18,162 M 62,38 L 62,162 M 106,38 L 106,162 M 150,38 L 150,162" stroke="currentColor" stroke-width="5.5" stroke-linecap="round"/>
            <path d="M 18,38 L 150,38 M 18,100 L 150,100 M 18,162 L 150,162" stroke="currentColor" stroke-width="5.5" stroke-linecap="round"/>
          </g>`
        },
        {
          id: 2,
          nameEn: 'Proto-Sinaitic',
          nameAr: 'السينائية الأولية',
          period: '~1800 BCE',
          description: 'Reduced to two uprights and two rails — a simplified fence.',
          descriptionAr: 'اختُزل إلى عمودين وقضيبين — سياج مبسط.',
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
          nameAr: 'الفينيقية',
          period: '~1050 BCE',
          description: 'A classic H-shape: two verticals with a crossbar, ancestor of Greek Eta.',
          descriptionAr: 'شكل H الكلاسيكي: عموديان مع عارضة، أصل الإيتا اليونانية.',
          textSymbol: '𐤇',
          imageBase64: null,
          svgContent: `<g transform="translate(24,18)">
            <path d="M 26,24 L 26,168 M 138,24 L 138,168" stroke="currentColor" stroke-width="8.5" stroke-linecap="round"/>
            <path d="M 26,96 L 138,96" stroke="currentColor" stroke-width="8.5" stroke-linecap="round"/>
          </g>`
        },
        {
          id: 4,
          nameEn: 'Aramaic',
          nameAr: 'الآرامية',
          period: '~800 BCE',
          description: 'Aramaic Heth.',
          descriptionAr: 'الحاء الآرامية.',
          textSymbol: '𐡇',
          imageBase64: null,
          svgContent: ''
        },
        {
          id: 5,
          nameEn: 'Nabataean',
          nameAr: 'النبطية',
          period: '~200 BCE',
          description: 'Nabataean Heth.',
          descriptionAr: 'الحاء النبطية.',
          textSymbol: '𐢇',
          imageBase64: null,
          svgContent: ''
        },
        {
          id: 6,
          nameEn: 'Arabic',
          nameAr: 'العربية',
          period: '~400 CE',
          description: 'Arabic Ha (ح) — an open-bottomed shape with a distinctive upper lobe.',
          descriptionAr: 'الحاء العربي (ح) — شكل مفتوح من الأسفل مع فص علوي مميز.',
          textSymbol: 'ح',
          imageBase64: null,
          svgContent: `<g transform="translate(13,28)">
            <path d="M 152,72 Q 132,30 92,30 Q 50,30 34,66 Q 24,90 46,110 Q 62,124 88,116" fill="none" stroke="currentColor" stroke-width="9.5" stroke-linecap="round"/>
            <path d="M 88,116 Q 104,112 108,96 Q 112,80 94,72" fill="none" stroke="currentColor" stroke-width="9.5" stroke-linecap="round"/>
            <path d="M 108,96 L 148,142" fill="none" stroke="currentColor" stroke-width="9.5" stroke-linecap="round"/>
          </g>`
        }
      ]
    }
];
