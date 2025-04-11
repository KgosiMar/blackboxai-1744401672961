const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const multer = require('multer');
const app = express();
const PORT = process.env.PORT || 3000;

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const uploadDir = path.join(__dirname, 'public', 'uploads');
        try {
            await fs.mkdir(uploadDir, { recursive: true });
            cb(null, uploadDir);
        } catch (error) {
            cb(error);
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory data store with proper JSON formatting
const dataStore = {
    djs: [
        {
            "id": "1",
            "name": "DJ Soulful",
            "bio": "Bringing the best of South African soul music to the world.",
            "profilePic": "https://via.placeholder.com/300",
            "audioSet": "sample1.mp3",
            "contactDetails": "dj.soulful@example.com",
            "genres": ["Soul", "R&B", "Jazz"],
            "bookingFee": 5000,
            "upcomingEvents": [
                {
                    "date": "2024-02-01",
                    "venue": "Soul Club Johannesburg",
                    "type": "Club Session"
                }
            ],
            "socialMedia": {
                "facebook": "djsoulful",
                "instagram": "djsoulful",
                "twitter": "djsoulful"
            }
        },
        {
            "id": "2",
            "name": "DJ Groove Master",
            "bio": "Specializing in classic soul and modern remixes.",
            "profilePic": "https://via.placeholder.com/300",
            "audioSet": "sample2.mp3",
            "contactDetails": "groove.master@example.com",
            "genres": ["Soul", "Funk", "House"],
            "bookingFee": 6000,
            "upcomingEvents": [
                {
                    "date": "2024-02-15",
                    "venue": "Soweto Music Festival",
                    "type": "Festival"
                }
            ],
            "socialMedia": {
                "facebook": "groovemaster",
                "instagram": "groovemaster",
                "twitter": "groovemaster"
            }
        }
    ]
};

// Serve index.html at the root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index_v5.html'));
});

// DJ Routes
app.get('/api/djs', (req, res) => {
    // Ensure proper JSON formatting in the response
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(dataStore.djs, null, 2));
});

app.post('/api/register', upload.fields([
    { name: 'profile-pic', maxCount: 1 },
    { name: 'audio-set', maxCount: 1 }
]), async (req, res) => {
    try {
        const newDJ = {
            "id": Date.now().toString(),
            "name": req.body.name,
            "bio": req.body.bio,
            "profilePic": req.files?.['profile-pic']?.[0]?.filename || 'https://via.placeholder.com/300',
            "audioSet": req.files?.['audio-set']?.[0]?.filename || null,
            "contactDetails": req.body.contactDetails,
            "genres": [],
            "bookingFee": 0,
            "upcomingEvents": [],
            "socialMedia": {}
        };
        
        dataStore.djs.push(newDJ);
        res.status(201).json(newDJ);
    } catch (error) {
        console.error('Error registering DJ:', error);
        res.status(500).json({ error: 'Failed to register DJ' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Data loaded successfully');
    console.log('Available DJs:', JSON.stringify(dataStore.djs, null, 2));
});
