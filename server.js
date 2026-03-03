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
app.use(express.json({ limit: '50mb' })); // Support large base64 image strings

// ── MONGODB CONNECTION ──
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://technestjo_db_user:9jqhvhpzsK6NK4n6@cluster0.jy2rg0a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(MONGODB_URI)
    .then(async () => {
        console.log('✅ Connected to MongoDB Atlas');

        try {
            const count = await mongoose.model('Letter').countDocuments();
            console.log(`\n======================================================`);
            console.log(`📊 DATABASE STATUS: successfully loaded from MongoDB`);
            console.log(`🛡️  Live Data verification: Found ${count} saved letters.`);
            console.log(`📝 Letters and changes are safely stored in the cloud.`);
            console.log(`======================================================\n`);
        } catch (e) {
            console.error('Failed to verify database letters:', e.message);
        }

        // Auto-seed on boot removed to prevent overwriting deliberate user deletions
        // To seed the database, use the admin panel "Reset to Defaults" button.
    })
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// ── MONGOOSE SCHEMA ──
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

const logSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    action: String, // 'ADD', 'UPDATE', 'DELETE', 'RESET', 'SYNC'
    target: String, // Name of the letter or 'Database'
    details: String // Additional info
}, { collection: 'admin_logs' });

const AdminLog = mongoose.model('AdminLog', logSchema);

// Helper function to create logs
async function addLog(action, target, details) {
    try {
        await AdminLog.create({ action, target, details });
    } catch (e) {
        console.error('Failed to save log:', e);
    }
}

// ── API ROUTES ──

// Login Admin
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    // Simple environment variable check for Admin, or fallback to default
    const adminUser = process.env.ADMIN_USER || 'MasterScribe';
    const adminPass = process.env.ADMIN_PASS || 'P@ssw0rd_Ancient$2026';

    if (username === adminUser && password === adminPass) {
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// Get all letters
app.get('/api/letters', async (req, res) => {
    try {
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        res.setHeader('Surrogate-Control', 'no-store');
        const letters = await Letter.find().sort({ order: 1 });
        res.json(letters);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a new letter
app.post('/api/letters', async (req, res) => {
    try {
        const newLetter = new Letter({
            ...req.body,
            id: Date.now() // Simple ID generation
        });
        const savedLetter = await newLetter.save();
        await addLog('ADD', savedLetter.nameEn || 'Unknown Letter', `Added new letter with ID: ${savedLetter.id}`);
        res.status(201).json(savedLetter);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update a letter
app.put('/api/letters/:id', async (req, res) => {
    try {
        const updatedLetter = await Letter.findOneAndUpdate(
            { id: parseInt(req.params.id) },
            req.body,
            { new: true } // Returns the updated document
        );
        if (!updatedLetter) return res.status(404).json({ message: 'Letter not found' });
        await addLog('UPDATE', updatedLetter.nameEn || 'Unknown Letter', `Updated letter properties`);
        res.json(updatedLetter);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a letter
app.delete('/api/letters/:id', async (req, res) => {
    try {
        const deletedLetter = await Letter.findOneAndDelete({ id: parseInt(req.params.id) });
        if (!deletedLetter) return res.status(404).json({ message: 'Letter not found' });
        await addLog('DELETE', deletedLetter.nameEn || 'Unknown Letter', `Deleted letter permanently`);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Seed defaults from server seed.js
app.post('/api/seed', async (req, res) => {
    try {
        await Letter.deleteMany({}); // Clear existing
        const seedData = require('./seed.js');
        const saved = await Letter.insertMany(seedData);
        await addLog('RESET', 'Database', `Reset database to default seed data (${saved.length} letters)`);
        res.json({ success: true, count: saved.length });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Sync/Import bulk letters
app.post('/api/sync', async (req, res) => {
    try {
        const data = req.body;
        if (!Array.isArray(data)) return res.status(400).json({ error: 'Data must be an array' });

        // Strip internal _ids from the backup so Mongoose regenerates them cleanly
        // This prevents schema strictness issues where nested properties get dropped.
        const cleanData = data.map(letter => {
            const l = { ...letter };
            delete l._id;
            if (l.stages && Array.isArray(l.stages)) {
                l.stages = l.stages.map(s => {
                    const st = { ...s };
                    delete st._id;
                    return st;
                });
            }
            return l;
        });

        await Letter.deleteMany({}); // Clear existing
        const saved = await Letter.insertMany(cleanData);
        await addLog('SYNC', 'Database', `Imported ${saved.length} letters from JSON file`);
        res.json({ success: true, count: saved.length });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get recent logs
app.get('/api/logs', async (req, res) => {
    try {
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
        const logs = await AdminLog.find().sort({ timestamp: -1 }).limit(100);
        res.json(logs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// ── STATIC FALLBACKS ──
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
