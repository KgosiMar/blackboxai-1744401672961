const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Simple array of DJs
const djList = [
    {
        id: "1",
        name: "DJ Soulful",
        bio: "Bringing the best of South African soul music to the world.",
        profilePic: "https://via.placeholder.com/300",
        audioSet: "sample1.mp3",
        contactDetails: "dj.soulful@example.com",
        genres: ["Soul", "R&B", "Jazz"],
        bookingFee: 5000,
        upcomingEvents: [
            {
                date: "2024-02-01",
                venue: "Soul Club Johannesburg",
                type: "Club Session"
            }
        ],
        socialMedia: {
            facebook: "djsoulful",
            instagram: "djsoulful",
            twitter: "djsoulful"
        }
    },
    {
        id: "2",
        name: "DJ Groove Master",
        bio: "Specializing in classic soul and modern remixes.",
        profilePic: "https://via.placeholder.com/300",
        audioSet: "sample2.mp3",
        contactDetails: "groove.master@example.com",
        genres: ["Soul", "Funk", "House"],
        bookingFee: 6000,
        upcomingEvents: [
            {
                date: "2024-02-15",
                venue: "Soweto Music Festival",
                type: "Festival"
            }
        ],
        socialMedia: {
            facebook: "groovemaster",
            instagram: "groovemaster",
            twitter: "groovemaster"
        }
    }
];

// Serve index.html at the root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index_v5.html'));
});

// DJ Routes
app.get('/api/djs', (req, res) => {
    // Send array directly without wrapping it in an object
    res.json(djList);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
