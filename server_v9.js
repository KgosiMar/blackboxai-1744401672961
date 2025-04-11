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

// Serve index.html at the root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Helper function to read data file
const readDataFile = () => {
    try {
        const data = fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8');
        return JSON.parse(data);
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

// DJ Routes
app.get('/api/djs', (req, res) => {
    try {
        const data = readDataFile();
        res.json(data.djs || []);
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
            profilePic: req.files?.profilePic?.[0]?.filename,
            audioSet: req.files?.audioSet?.[0]?.filename,
            genres: [],
            bookingFee: 0,
            upcomingEvents: [],
            socialMedia: {}
        };
        
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
    const data = readDataFile();
    res.json(data.events || []);
});

app.post('/api/events', (req, res) => {
    try {
        const data = readDataFile();
        const newEvent = {
            id: Date.now().toString(),
            ...req.body
        };
        
        data.events.push(newEvent);
        writeDataFile(data);
        
        res.status(201).json(newEvent);
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ error: 'Failed to create event' });
    }
});

// Playlist Routes
app.get('/api/playlists', (req, res) => {
    const data = readDataFile();
    res.json(data.playlists || []);
});

app.post('/api/playlists', (req, res) => {
    try {
        const data = readDataFile();
        const newPlaylist = {
            id: Date.now().toString(),
            ...req.body,
            tracks: []
        };
        
        data.playlists.push(newPlaylist);
        writeDataFile(data);
        
        res.status(201).json(newPlaylist);
    } catch (error) {
        console.error('Error creating playlist:', error);
        res.status(500).json({ error: 'Failed to create playlist' });
    }
});

// Genre Routes
app.get('/api/genres', (req, res) => {
    const data = readDataFile();
    res.json(data.genres || []);
});

// DJ Profile Updates
app.put('/api/djs/:id', (req, res) => {
    try {
        const data = readDataFile();
        const djIndex = data.djs.findIndex(dj => dj.id === req.params.id);
        
        if (djIndex === -1) {
            return res.status(404).json({ error: 'DJ not found' });
        }
        
        data.djs[djIndex] = {
            ...data.djs[djIndex],
            ...req.body
        };
        
        writeDataFile(data);
        res.json(data.djs[djIndex]);
    } catch (error) {
        console.error('Error updating DJ profile:', error);
        res.status(500).json({ error: 'Failed to update DJ profile' });
    }
});

// Event Registration
app.post('/api/events/:id/register', (req, res) => {
    try {
        const data = readDataFile();
        const event = data.events.find(e => e.id === req.params.id);
        
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        
        // Add DJ to event performers
        if (!event.performers.includes(req.body.djId)) {
            event.performers.push(req.body.djId);
        }
        
        writeDataFile(data);
        res.json(event);
    } catch (error) {
        console.error('Error registering for event:', error);
        res.status(500).json({ error: 'Failed to register for event' });
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
});
