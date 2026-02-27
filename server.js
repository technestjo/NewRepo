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

        // Auto-seed data on first boot if DB is empty
        try {
            const count = await mongoose.model('Letter').countDocuments();
            if (count < 8) {
                console.log('📦 Database is empty or corrupted. Wiping and reseeding...');
                await mongoose.model('Letter').deleteMany({});
                const seedData = require('./seed.js');
                await mongoose.model('Letter').insertMany(seedData);
                console.log('🌱 Database seeded successfully!');
            }
        } catch (e) {
            console.error('Failed to auto-seed database:', e.message);
        }
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
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Sync/Import bulk letters
app.post('/api/sync', async (req, res) => {
    try {
        const data = req.body;
        if (!Array.isArray(data)) return res.status(400).json({ error: 'Data must be an array' });

        await Letter.deleteMany({}); // Clear existing
        const saved = await Letter.insertMany(data);
        res.json({ success: true, count: saved.length });
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
