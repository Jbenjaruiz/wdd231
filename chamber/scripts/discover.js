document.addEventListener('DOMContentLoaded', () => {

    // --- Last Visit Message using localStorage ---
    const visitMessageElement = document.getElementById('last-visit-message');
    if (visitMessageElement) {
        const lastVisitTimestamp = localStorage.getItem('lastVisitTimestamp');
        const now = Date.now();
        const oneDayInMillis = 24 * 60 * 60 * 1000;

        if (!lastVisitTimestamp) {
            // First visit
            visitMessageElement.textContent = "Welcome! Let us know if you have any questions.";
        } else {
            const timeDifference = now - parseInt(lastVisitTimestamp, 10);
            const daysDifference = Math.floor(timeDifference / oneDayInMillis);

            if (daysDifference < 1) {
                // Less than a day
                visitMessageElement.textContent = "Back so soon! Awesome!";
            } else {
                // More than a day
                const dayText = daysDifference === 1 ? "day" : "days";
                visitMessageElement.textContent = `You last visited ${daysDifference} ${dayText} ago.`;
            }
        }
        // Store the new visit timestamp
        localStorage.setItem('lastVisitTimestamp', now.toString());
    }


    // --- Dynamically Load Place Cards ---
    const placesGridContainer = document.getElementById('places-grid-container');
    const placesDataURL = 'data/places.json';

    async function loadPlaces() {
        if (!placesGridContainer) return;

        try {
            const response = await fetch(placesDataURL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const places = await response.json();
            displayPlaces(places);
        } catch (error) {
            console.error('Error fetching places data:', error);
            placesGridContainer.innerHTML = '<p class="error-message">Could not load attractions. Please try again later.</p>';
        }
    }

    function displayPlaces(places) {
        placesGridContainer.innerHTML = ''; // Clear loading message
        places.forEach(place => {
            const card = document.createElement('article');
            card.classList.add('place-card');

            card.innerHTML = `
                <h2>${place.name}</h2>
                <figure>
                    <img src="images/discover/${place.image}" alt="${place.name}" loading="lazy" width="300" height="200">
                </figure>
                <address>${place.address}</address>
                <p>${place.description}</p>
                <button type="button">Learn More</button>
            `;
            placesGridContainer.appendChild(card);
        });
    }

    // Initial load
    loadPlaces();
});