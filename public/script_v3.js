// DOM Elements
const registrationForm = document.getElementById('registration-form');
const djList = document.getElementById('dj-list');

// Utility Functions
const showToast = (message, type = 'success') => {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
};

const createDJCard = (dj) => {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow-md overflow-hidden hover-scale';
    
    card.innerHTML = `
        <div class="relative pb-2/3">
            <img src="${dj.profilePic || 'https://via.placeholder.com/300'}" 
                 alt="${dj.name}" 
                 class="absolute h-full w-full object-cover">
        </div>
        <div class="p-4">
            <h3 class="text-xl font-semibold mb-2">${dj.name}</h3>
            <p class="text-gray-600 mb-4">${dj.bio}</p>
            ${dj.audioSet ? `
                <audio controls>
                    <source src="${dj.audioSet}" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio>
            ` : ''}
            <div class="flex justify-between items-center mt-4">
                <button onclick="contactDJ('${dj.name}')" 
                        class="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                    Contact
                </button>
                <div class="text-gray-600">
                    <i class="fas fa-heart mr-2"></i>${Math.floor(Math.random() * 1000)}
                </div>
            </div>
        </div>
    `;
    
    return card;
};

// Event Handlers
const handleFileUpload = async (file, type) => {
    // In a real application, this would upload to a server
    return URL.createObjectURL(file);
};

const contactDJ = (djName) => {
    showToast(`Contacting ${djName}...`);
    // Implement actual contact functionality
};

// Form Submission
registrationForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    try {
        const formData = new FormData(registrationForm);
        
        // Handle file uploads
        const profilePic = await handleFileUpload(
            formData.get('profile-pic'),
            'image'
        );
        const audioSet = await handleFileUpload(
            formData.get('audio-set'),
            'audio'
        );

        const djData = {
            name: formData.get('dj-name'),
            bio: formData.get('bio'),
            profilePic,
            audioSet,
            contactDetails: formData.get('contact-details')
        };

        // Send registration data to the server
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(djData)
        });

        if (!response.ok) {
            throw new Error('Registration failed');
        }

        const result = await response.json();
        showToast('Registration successful!');
        
        // Add the new DJ card to the list
        djList.appendChild(createDJCard(djData));
        
        // Reset the form
        registrationForm.reset();
        
    } catch (error) {
        console.error('Error:', error);
        showToast('Registration failed. Please try again.', 'error');
    }
});

// Load existing DJs
const loadDJs = async () => {
    try {
        const response = await fetch('/api/djs');
        const djs = await response.json();
        
        djs.forEach(dj => {
            djList.appendChild(createDJCard(dj));
        });
    } catch (error) {
        console.error('Error loading DJs:', error);
        showToast('Failed to load DJs', 'error');
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadDJs();
});

// Music Library Features (to be implemented)
const musicLibrary = {
    searchTracks: () => {
        // Implement search functionality
    },
    createPlaylist: () => {
        // Implement playlist creation
    },
    beatMatch: () => {
        // Implement beatmatching
    }
};

// Community Features (to be implemented)
const community = {
    createPost: () => {
        // Implement forum posting
    },
    shareTrack: () => {
        // Implement track sharing
    },
    followDJ: () => {
        // Implement following system
    }
};

// Event Management (to be implemented)
const events = {
    createEvent: () => {
        // Implement event creation
    },
    registerForEvent: () => {
        // Implement event registration
    },
    getUpcomingEvents: () => {
        // Implement event listing
    }
};
