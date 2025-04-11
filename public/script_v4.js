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
        // Get form values using the correct IDs
        const djName = document.getElementById('dj-name').value;
        const bio = document.getElementById('bio').value;
        const profilePic = document.getElementById('profile-pic').files[0];
        const audioSet = document.getElementById('audio-set').files[0];
        const contactDetails = document.getElementById('contact-details').value;

        // Handle file uploads
        const profilePicUrl = profilePic ? await handleFileUpload(profilePic, 'image') : null;
        const audioSetUrl = audioSet ? await handleFileUpload(audioSet, 'audio') : null;

        const djData = {
            name: djName,
            bio: bio,
            profilePic: profilePicUrl,
            audioSet: audioSetUrl,
            contactDetails: contactDetails
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
        djList.appendChild(createDJCard(result));
        
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
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const djs = await response.json();
        console.log('Loaded DJs:', djs); // Debug log
        
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

// Make contactDJ function globally available
window.contactDJ = contactDJ;
