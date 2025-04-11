const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const app = express();
const PORT = process.env.PORT || 3000;

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, 'public', 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Helper function to read data file
const readDataFile = () => {
    try {
        const rawData = fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8');
        return JSON.parse(rawData);
    } catch (error) {
        console.error('Error reading data file:', error);
        return { djs: [], events: [], playlists: [], genres: [] };
    }
};

// Helper function to write data file
const writeDataFile = (data) => {
    try {
        fs.writeFileSync(
            path.join(__dirname, 'data.json'),
            JSON.stringify(data, null, 2),
            'utf8'
        );
        return true;
    } catch (error) {
        console.error('Error writing data file:', error);
        return false;
    }
};

// Serve index.html at the root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// DJ Routes
app.get('/api/djs', (req, res) => {
    try {
        const data = readDataFile();
        // Only send the djs array
        const djs = data.djs || [];
        res.setHeader('Content-Type', 'application/json');
        res.json(djs);
    } catch (error) {
        console.error('Error fetching DJs:', error);
        res.status(500).json({ error: 'Failed to fetch DJs' });
    }
});

app.post('/api/register', upload.fields([
    { name: 'profilePic', maxCount: 1 },
    { name: 'audioSet', maxCount: 1 }
]), (req, res) => {
    try {
        const data = readDataFile();
        const newDJ = {
            id: Date.now().toString(),
            ...req.body,
            profilePic: req.files?.profilePic?.[0]?.filename || 'https://via.placeholder.com/300',
            audioSet: req.files?.audioSet?.[0]?.filename || null,
            genres: [],
            bookingFee: 0,
            upcomingEvents: [],
            socialMedia: {}
        };
        
        if (!data.djs) {
            data.djs = [];
        }
        
        data.djs.push(newDJ);
        writeDataFile(data);
        
        res.status(201).json(newDJ);
    } catch (error) {
        console.error('Error registering DJ:', error);
        res.status(500).json({ error: 'Failed to register DJ' });
    }
});

// Event Routes
app.get('/api/events', (req, res) => {
    try {
        const data = readDataFile();
        res.json(data.events || []);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch events' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    // Test data reading
    try {
        const data = readDataFile();
        console.log('Data loaded successfully');
        console.log('Available DJs:', JSON.stringify(data.djs, null, 2));
    } catch (error) {
        console.error('Error reading initial data:', error);
    }
});
