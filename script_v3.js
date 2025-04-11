// Fetch and display DJ information
document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/djs')
        .then(response => response.json())
        .then(data => {
            const djList = document.getElementById('dj-list');
            data.forEach(dj => {
                const djItem = document.createElement('div');
                djItem.innerHTML = `
                    <h2>${dj.name}</h2>
                    <p>Booking Fee: R${dj.booking_fee}</p>
                    <h3>Bookings:</h3>
                    <ul>
                        ${dj.bookings.map(booking => `<li>${booking.date} at ${booking.venue}</li>`).join('')}
                    </ul>
                    <h3>Music Samples:</h3>
                    <ul>
                        ${dj.music_samples.map(sample => `<li>${sample}</li>`).join('')}
                    </ul>
                `;
                djList.appendChild(djItem);
            });
        })
        .catch(error => console.error('Error fetching DJ data:', error));

    // Handle registration form submission
    const registrationForm = document.getElementById('registration-form');
    registrationForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const formData = new FormData(registrationForm);
        const djData = {
            name: formData.get('dj-name'),
            bio: formData.get('bio'),
            audio_set: formData.get('audio-set'),
            contact_details: formData.get('contact-details')
        };

        // Send registration data to the server
        fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(djData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Registration successful:', data);
            // Optionally, refresh the DJ list or show a success message
        })
        .catch(error => console.error('Error registering DJ:', error));
    });
});
