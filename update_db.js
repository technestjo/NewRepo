const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'js', 'database.js');
let dbContent = fs.readFileSync(dbPath, 'utf8');

// We bump the DB_VERSION
dbContent = dbContent.replace(/DB_VERSION:\s*['"]2\.[0-9]+['"]/, "DB_VERSION: '2.3'");

// We need to parse SEED_DATA. Since it's a JS object inside the file, we can extract it, eval it, modify it, and stringify it back.
// But evaluating the whole file might fail if it uses DOM/localStorage.
// Instead, let's extract just the SEED_DATA array string.
const seedObjMatch = dbContent.match(/SEED_DATA:\s*(\[\s*\{.*\P*.*\s*\}\s*\])\s*,/s);
if (!seedObjMatch) {
    console.error("Could not find SEED_DATA array.");
    process.exit(1);
}

// Let's write a simple extraction that finds the matching brackets for SEED_DATA
let startIdx = dbContent.indexOf('SEED_DATA: [');
let searchIdx = startIdx + 'SEED_DATA: ['.length;
let bracketCount = 1;
let endIdx = -1;

for (let i = searchIdx; i < dbContent.length; i++) {
    if (dbContent[i] === '[') bracketCount++;
    if (dbContent[i] === ']') bracketCount--;
    if (bracketCount === 0) {
        endIdx = i;
        break;
    }
}

if (endIdx === -1) {
    console.error("Failed to parse outer array brackets");
    process.exit(1);
}

let seedDataStr = dbContent.substring(startIdx + 'SEED_DATA: '.length, endIdx + 1);

// Safely eval the seed data
const seedData = eval('(' + seedDataStr + ')');

const lookup = {
    1: { hiero: '𓃾', aram: '𐡀', nab: '𐢀' },
    2: { hiero: '𓉐', aram: '𐡁', nab: '𐢁' },
    3: { hiero: '𓌙', aram: '𐡂', nab: '𐢂' },
    4: { hiero: '𓉿', aram: '𐡃', nab: '𐢃' },
    5: { hiero: '𓀠', aram: '𐡄', nab: '𐢄' },
    6: { hiero: '𓌕', aram: '𐡅', nab: '𐢅' },
    7: { hiero: '𓌛', aram: '𐡆', nab: '𐢆' },
    8: { hiero: '𓉗', aram: '𐡇', nab: '𐢇' }
};

for (const letter of seedData) {
    const syms = lookup[letter.id];
    const oldStages = letter.stages || [];

    // Attempt to locate old SVGs to reuse for Proto-Sinaitic, Phoenician, Arabic
    const getOldStage = (nameStr) => oldStages.find(s => s.nameEn && s.nameEn.toLowerCase().includes(nameStr));

    const proto = getOldStage('proto') || oldStages[1] || { svgContent: '' };
    const phoen = getOldStage('phoenician') || oldStages[2] || { svgContent: '' };
    const arab = getOldStage('arabic') || oldStages[oldStages.length - 1] || { svgContent: '' };

    letter.stages = [
        {
            id: 1,
            nameEn: 'Egyptian Hieroglyphic',
            nameAr: 'الهيروغليفية المصرية',
            period: '~2000 BCE',
            description: oldStages[0]?.description || '',
            descriptionAr: oldStages[0]?.descriptionAr || '',
            textSymbol: syms.hiero,
            svgContent: oldStages[0]?.svgContent || '',
            imageBase64: null
        },
        {
            id: 2,
            nameEn: 'Proto-Sinaitic',
            nameAr: 'السينائية الأولية',
            period: '~1800 BCE',
            description: proto.description || '',
            descriptionAr: proto.descriptionAr || '',
            textSymbol: '',
            svgContent: proto.svgContent || '',
            imageBase64: null
        },
        {
            id: 3,
            nameEn: 'Phoenician',
            nameAr: 'الفينيقية',
            period: '~1050 BCE',
            description: phoen.description || '',
            descriptionAr: phoen.descriptionAr || '',
            textSymbol: letter.phoenicianSymbol || '',
            svgContent: phoen.svgContent || '',
            imageBase64: null
        },
        {
            id: 4,
            nameEn: 'Aramaic',
            nameAr: 'الآرامية',
            period: '~800 BCE',
            description: 'Aramaic script, evolved from Phoenician. Became the official script of the Neo-Assyrian and Achaemenid empires.',
            descriptionAr: 'الخط الآرامي، مشتق من الفينيقية. أصبح الخط الرسمي للإمبراطوريات الآشورية الحديثة والأخمينية.',
            textSymbol: syms.aram,
            svgContent: '',
            imageBase64: null
        },
        {
            id: 5,
            nameEn: 'Nabataean',
            nameAr: 'النبطية',
            period: '~200 BCE',
            description: 'Nabataean script, developed from Aramaic by the Nabataeans (Petra). Shows more cursive, connected forms.',
            descriptionAr: 'الخط النبطي، تطور من الآرامية بواسطة الأنباط (في البتراء). يظهر أشكالاً أكثر ليونة وارتباطاً.',
            textSymbol: syms.nab,
            svgContent: '',
            imageBase64: null
        },
        {
            id: 6,
            nameEn: 'Arabic',
            nameAr: 'العربية',
            period: '~400 CE',
            description: arab.description || 'Final evolution: the Arabic script, evolving directly from late Nabataean.',
            descriptionAr: arab.descriptionAr || 'التطور النهائي: الخط العربي، متطوراً مباشرة من النبطية المتأخرة.',
            textSymbol: letter.arabicSymbol ? letter.arabicSymbol.split(' ')[0] : '', // e.g. 'أ / ا' -> 'أ'
            svgContent: arab.svgContent || '',
            imageBase64: null
        }
    ];
}

const newSeedDataStr = JSON.stringify(seedData, null, 2)
// We want the SVG contents to not look totally unreadable, but JSON stringify escapes newlines
// Let's replace \" with " and \\n with actual newlines in svgContent if possible, or just leave as is.
// Actually, normal output is fine.

const finalContent = dbContent.substring(0, startIdx + 'SEED_DATA: '.length) +
    newSeedDataStr +
    dbContent.substring(endIdx + 1);

fs.writeFileSync(dbPath, finalContent, 'utf8');
console.log("database.js updated successfully.");
