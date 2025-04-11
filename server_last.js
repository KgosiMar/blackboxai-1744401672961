const express = require('express');
const app = express();
const PORT = 3000;

// DJ data as a simple array
const djs = [
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

// Single endpoint returning just the array
app.get('/api/djs', (_, res) => {
    // Set explicit headers
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-store');
    
    // Send array directly without wrapping it in an object
    res.send(djs);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
