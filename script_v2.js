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
});
