// server.js — Express server for Render deployment with MongoDB
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// ── MONGODB CONNECTION ──
// ⚠️ IMPORTANT: The database name 'AncientScriptsDB' MUST be in the URI.
// Without it, MongoDB defaults to the 'test' database which can be shared/overwritten.
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://technestjo_db_user:9jqhvhpzsK6NK4n6@cluster0.jy2rg0a.mongodb.net/AncientScriptsDB?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGODB_URI)
    .then(async () => {
        console.log('✅ Connected to MongoDB Atlas');
        try {
            const count = await Letter.countDocuments({ deletedAt: null });
            console.log(`\n======================================================`);
            console.log(`📊 DATABASE STATUS: successfully loaded from MongoDB`);
            console.log(`🛡️  Live Data: Found ${count} active letters.`);
            console.log(`📝 All changes are safely stored in the cloud.`);
            console.log(`======================================================\n`);
        } catch (e) {
            console.error('Failed to verify database:', e.message);
        }
    })
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// ── SCHEMAS ──

const letterSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    code: String,
    nameAr: String,
    nameEn: String,
    civilization: String,
    phoenicianSymbol: String,
    arabicSymbol: String,
    meaning: String,
    meaningAr: String,
    order: Number,
    description: String,
    descriptionAr: String,
    thumbnailBase64: String,
    deletedAt: { type: Date, default: null }, // 🛡️ null=active, date=soft-deleted (trash)
    stages: [{
        nameEn: String,
        nameAr: String,
        period: String,
        description: String,
        descriptionAr: String,
        scriptType: String,
        textSymbol: String,
        imageBase64: String,
        svgContent: String
    }]
}, { collection: 'letters', id: false });

const Letter = mongoose.model('Letter', letterSchema);

// 🛡️ BACKUP SCHEMA — full snapshot before every destructive op
const backupSchema = new mongoose.Schema({
    label: { type: String, required: true },
    letterCount: { type: Number, default: 0 },
    letters: { type: mongoose.Schema.Types.Mixed },
    createdAt: { type: Date, default: Date.now }
}, { collection: 'backups' });

const Backup = mongoose.model('Backup', backupSchema);

const logSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    action: String,
    target: String,
    details: String
}, { collection: 'admin_logs' });

const AdminLog = mongoose.model('AdminLog', logSchema);

// ── HELPERS ──

async function addLog(action, target, details) {
    try {
        await AdminLog.create({ action, target, details });
    } catch (e) {
        console.error('Failed to save log:', e);
    }
}

// 🛡️ Auto-saves a full snapshot of ALL active letters before any destructive operation
async function createBackup(label) {
    try {
        const activeLetters = await Letter.find({ deletedAt: null }).lean();
        const backup = await Backup.create({
            label,
            letterCount: activeLetters.length,
            letters: JSON.parse(JSON.stringify(activeLetters))
        });
        console.log(`💾 Backup: "${label}" — ${activeLetters.length} letters saved.`);
        return backup;
    } catch (e) {
        console.error('❌ Backup failed:', e);
        return null;
    }
}

// ── API ROUTES ──

// Admin Login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const adminUser = process.env.ADMIN_USER || 'MasterScribe';
    const adminPass = process.env.ADMIN_PASS || 'P@ssw0rd_Ancient$2026';
    if (username === adminUser && password === adminPass) {
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// GET all active letters (soft-deleted are excluded)
app.get('/api/letters', async (req, res) => {
    try {
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        res.setHeader('Surrogate-Control', 'no-store');
        const letters = await Letter.find({ deletedAt: null }).sort({ order: 1 });
        res.json(letters);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET trash — soft-deleted letters
app.get('/api/letters/deleted', async (req, res) => {
    try {
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
        const letters = await Letter.find({ deletedAt: { $ne: null } }).sort({ deletedAt: -1 });
        res.json(letters);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST add new letter
app.post('/api/letters', async (req, res) => {
    try {
        const newLetter = new Letter({ ...req.body, id: Date.now(), deletedAt: null });
        const savedLetter = await newLetter.save();
        await addLog('ADD', savedLetter.nameEn || 'Unknown', `Added letter ID: ${savedLetter.id}`);
        res.status(201).json(savedLetter);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT update a letter
app.put('/api/letters/:id', async (req, res) => {
    try {
        const updated = await Letter.findOneAndUpdate(
            { id: parseInt(req.params.id), deletedAt: null },
            req.body,
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: 'Letter not found' });
        await addLog('UPDATE', updated.nameEn || 'Unknown', `Updated letter properties`);
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 🛡️ SOFT DELETE — letter moves to trash, never permanently erased
app.delete('/api/letters/:id', async (req, res) => {
    try {
        await createBackup(`Before Delete — letter #${req.params.id}`);
        const deleted = await Letter.findOneAndUpdate(
            { id: parseInt(req.params.id), deletedAt: null },
            { deletedAt: new Date() },
            { new: true }
        );
        if (!deleted) return res.status(404).json({ message: 'Letter not found' });
        await addLog('DELETE', deleted.nameEn || 'Unknown', `Moved to trash. Backup saved.`);
        res.json({ success: true, message: `"${deleted.nameEn}" moved to trash — can be recovered anytime.` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🛡️ RECOVER — restore a soft-deleted letter from trash
app.post('/api/letters/:id/recover', async (req, res) => {
    try {
        const recovered = await Letter.findOneAndUpdate(
            { id: parseInt(req.params.id), deletedAt: { $ne: null } },
            { deletedAt: null },
            { new: true }
        );
        if (!recovered) return res.status(404).json({ message: 'Letter not found in trash' });
        await addLog('RECOVER', recovered.nameEn || 'Unknown', `Recovered from trash`);
        res.json({ success: true, letter: recovered });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🛡️ SEED (Reset to Defaults) — auto-backup first, protected by secret
app.post('/api/seed', async (req, res) => {
    const adminSecret = process.env.ADMIN_SEED_SECRET || 'seed-secret-2026';
    if (req.headers['x-admin-secret'] !== adminSecret) {
        return res.status(403).json({ error: 'Forbidden: Invalid admin secret' });
    }
    try {
        const backup = await createBackup('Before Reset to Defaults');
        await Letter.deleteMany({});
        const seedData = require('./seed.js');
        const saved = await Letter.insertMany(seedData.map(l => ({ ...l, deletedAt: null })));
        await addLog('RESET', 'Database', `Reset to defaults. Backup saved (${backup?.letterCount || 0} letters).`);
        res.json({ success: true, count: saved.length, backupId: backup?._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🛡️ SYNC (Import JSON) — auto-backup first
app.post('/api/sync', async (req, res) => {
    try {
        const data = req.body;
        if (!Array.isArray(data)) return res.status(400).json({ error: 'Data must be an array' });
        const backup = await createBackup('Before JSON Import');
        const cleanData = data.map(letter => {
            const l = { ...letter };
            delete l._id;
            l.deletedAt = null;
            if (l.stages && Array.isArray(l.stages)) {
                l.stages = l.stages.map(s => { const st = { ...s }; delete st._id; return st; });
            }
            return l;
        });
        await Letter.deleteMany({});
        const saved = await Letter.insertMany(cleanData);
        await addLog('SYNC', 'Database', `Imported ${saved.length} letters. Backup saved (${backup?.letterCount || 0} letters).`);
        res.json({ success: true, count: saved.length, backupId: backup?._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ── BACKUP MANAGEMENT ──

// GET list all backups (no letter data, just metadata)
app.get('/api/backups', async (req, res) => {
    try {
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
        const backups = await Backup.find({}, { letters: 0 }).sort({ createdAt: -1 }).limit(50);
        res.json(backups);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🛡️ RESTORE from backup — backs up current state FIRST then restores
app.post('/api/restore/:backupId', async (req, res) => {
    try {
        const backup = await Backup.findById(req.params.backupId);
        if (!backup) return res.status(404).json({ message: 'Backup not found' });
        await createBackup(`Before Restore from "${backup.label}"`);
        await Letter.deleteMany({});
        const restored = backup.letters.map(l => {
            const letter = { ...l };
            delete letter._id;
            letter.deletedAt = null;
            if (letter.stages && Array.isArray(letter.stages)) {
                letter.stages = letter.stages.map(s => { const st = { ...s }; delete st._id; return st; });
            }
            return letter;
        });
        const saved = await Letter.insertMany(restored);
        await addLog('RESTORE', 'Database', `Restored "${backup.label}" — ${saved.length} letters.`);
        res.json({ success: true, count: saved.length });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET recent logs
app.get('/api/logs', async (req, res) => {
    try {
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
        const logs = await AdminLog.find().sort({ timestamp: -1 }).limit(100);
        res.json(logs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ── STATIC FILES ──
app.use(express.static(path.join(__dirname), {
    maxAge: '1h',
    setHeaders(res, filePath) {
        if (filePath.endsWith('.html')) {
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        }
    }
}));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🏺 Ancient Scripts API running on http://localhost:${PORT}`);
});
