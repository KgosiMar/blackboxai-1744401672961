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
    },
    {
        id: "3",
        name: "Zonke",
        bio: "A prominent South African soul artist known for her powerful voice.",
        profilePic: "https://via.placeholder.com/300",
        audioSet: "zonke_sample.mp3",
        contactDetails: "zonke@example.com",
        genres: ["Soul", "R&B"],
        bookingFee: 7000,
        upcomingEvents: [],
        socialMedia: {
            facebook: "zonke",
            instagram: "zonke",
            twitter: "zonke"
        }
    },
    {
        id: "4",
        name: "Kelly Khumalo",
        bio: "A versatile South African artist known for her soulful music.",
        profilePic: "https://via.placeholder.com/300",
        audioSet: "kelly_sample.mp3",
        contactDetails: "kelly@example.com",
        genres: ["Soul", "Pop"],
        bookingFee: 8000,
        upcomingEvents: [],
        socialMedia: {
            facebook: "kellykhumalo",
            instagram: "kellykhumalo",
            twitter: "kellykhumalo"
        }
    },
    {
        id: "5",
        name: "Lira",
        bio: "An award-winning South African singer and songwriter.",
        profilePic: "https://via.placeholder.com/300",
        audioSet: "lira_sample.mp3",
        contactDetails: "lira@example.com",
        genres: ["Soul", "Jazz"],
        bookingFee: 9000,
        upcomingEvents: [],
        socialMedia: {
            facebook: "lira",
            instagram: "lira",
            twitter: "lira"
        }
    },
    {
        id: "6",
        name: "Amanda Black",
        bio: "A rising star in the South African music scene.",
        profilePic: "https://via.placeholder.com/300",
        audioSet: "amanda_sample.mp3",
        contactDetails: "amanda@example.com",
        genres: ["Soul", "R&B"],
        bookingFee: 7500,
        upcomingEvents: [],
        socialMedia: {
            facebook: "amandablack",
            instagram: "amandablack",
            twitter: "amandablack"
        }
    }
];
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
    // Create a new array to avoid sending references to the original data
    const responseData = [...djs];
    
    // Set explicit headers
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-store');
    
    // Send the array directly
    res.end(JSON.stringify(responseData));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
