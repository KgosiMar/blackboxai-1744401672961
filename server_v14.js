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

// Helper function to read data file
const readDataFile = async () => {
    try {
        const rawData = await fs.readFile(path.join(__dirname, 'data.json'), 'utf8');
        // Parse the JSON data and immediately stringify it to ensure proper formatting
        const parsedData = JSON.parse(rawData);
        // Write back the properly formatted JSON
        await fs.writeFile(
            path.join(__dirname, 'data.json'),
            JSON.stringify(parsedData, null, 2),
            'utf8'
        );
        return parsedData;
    } catch (error) {
        console.error('Error reading data file:', error);
        return { djs: [], events: [], playlists: [], genres: [] };
    }
};

// Helper function to write data file
const writeDataFile = async (data) => {
    try {
        // Ensure proper JSON formatting
        const formattedData = JSON.stringify(data, null, 2);
        await fs.writeFile(
            path.join(__dirname, 'data.json'),
            formattedData,
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
app.get('/api/djs', async (req, res) => {
    try {
        const data = await readDataFile();
        const djs = data.djs || [];
        // Set proper content type and ensure JSON formatting
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(djs, null, 2));
    } catch (error) {
        console.error('Error fetching DJs:', error);
        res.status(500).json({ error: 'Failed to fetch DJs' });
    }
});

app.post('/api/register', upload.fields([
    { name: 'profilePic', maxCount: 1 },
    { name: 'audioSet', maxCount: 1 }
]), async (req, res) => {
    try {
        const data = await readDataFile();
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
        await writeDataFile(data);
        
        res.status(201).json(newDJ);
    } catch (error) {
        console.error('Error registering DJ:', error);
        res.status(500).json({ error: 'Failed to register DJ' });
    }
});

// Event Routes
app.get('/api/events', async (req, res) => {
    try {
        const data = await readDataFile();
        res.json(data.events || []);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch events' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    try {
        const data = await readDataFile();
        console.log('Data loaded successfully');
        // Log the properly formatted JSON
        console.log('Available DJs:', JSON.stringify(data.djs, null, 2));
    } catch (error) {
        console.error('Error reading initial data:', error);
    }
});
