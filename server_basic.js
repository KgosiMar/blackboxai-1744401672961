const http = require('http');

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

// Create server
const server = http.createServer((req, res) => {
    if (req.url === '/api/djs' && req.method === 'GET') {
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store'
        });
        res.end(JSON.stringify(djs));
    } else {
        res.writeHead(404);
        res.end();
    }
});

// Start server
server.listen(3000, () => {
    console.log('Server running on port 3000');
});
