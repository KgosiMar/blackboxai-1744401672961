<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>South African Soul DJs</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 p-8">
    <div class="max-w-7xl mx-auto">
        <h1 class="text-3xl font-bold mb-8 text-center">South African Soul DJs</h1>
        <div id="djs-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        </div>
    </div>

    <script>
        fetch('/api/djs')
            .then(response => response.json())
            .then(djs => {
                const container = document.getElementById('djs-container');
                djs.forEach(dj => {
                    const card = document.createElement('div');
                    card.className = 'bg-white rounded-lg shadow-md p-6';
                    card.innerHTML = `
                        <img src="${dj.profilePic}" alt="${dj.name}" class="w-full h-48 object-cover rounded-lg mb-4">
                        <h2 class="text-xl font-bold mb-2">${dj.name}</h2>
                        <p class="text-gray-600 mb-4">${dj.bio}</p>
                        <div class="mb-4">
                            <h3 class="font-semibold mb-2">Genres:</h3>
                            <div class="flex flex-wrap gap-2">
                                ${dj.genres.map(genre => `
                                    <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">${genre}</span>
                                `).join('')}
                            </div>
                        </div>
                        <div class="mb-4">
                            <h3 class="font-semibold mb-2">Booking Fee:</h3>
                            <p class="text-gray-700">R${dj.bookingFee}</p>
                        </div>
                        <div class="mb-4">
                            <h3 class="font-semibold mb-2">Contact:</h3>
                            <p class="text-gray-700">${dj.contactDetails}</p>
                        </div>
                        <div>
                            <h3 class="font-semibold mb-2">Social Media:</h3>
                            <div class="flex gap-4">
                                <a href="https://facebook.com/${dj.socialMedia.facebook}" target="_blank" class="text-blue-600 hover:text-blue-800">Facebook</a>
                                <a href="https://instagram.com/${dj.socialMedia.instagram}" target="_blank" class="text-purple-600 hover:text-purple-800">Instagram</a>
                                <a href="https://twitter.com/${dj.socialMedia.twitter}" target="_blank" class="text-blue-400 hover:text-blue-600">Twitter</a>
                            </div>
                        </div>
                    `;
                    container.appendChild(card);
                });
            })
            .catch(error => console.error('Error:', error));
    </script>
</body>
</html>
