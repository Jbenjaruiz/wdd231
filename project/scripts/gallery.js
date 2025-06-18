document.addEventListener('DOMContentLoaded', () => {
    const UNSPLASH_ACCESS_KEY = 'Elfow2DKAeCJDEnc6x3PLQ61CF_DxbqUdbkuey0JtYw';
    const MAX_HISTORY_ITEMS = 5;

    const searchForm = document.querySelector('#search-form');
    const searchInput = document.querySelector('#search-input');
    const galleryGrid = document.querySelector('#gallery-grid');
    const galleryMessage = document.querySelector('#gallery-message');
    const historyContainer = document.querySelector('#history-container');

    function getSearchHistory() {
        const history = localStorage.getItem('motorcycleSearchHistory');
        return history ? JSON.parse(history) : [];
    }

    function saveToHistory(term) {
        let history = getSearchHistory();
        history = history.filter(item => item.toLowerCase() !== term.toLowerCase());
        history.unshift(term);
        history.splice(MAX_HISTORY_ITEMS);
        localStorage.setItem('motorcycleSearchHistory', JSON.stringify(history));
    }

    function displayHistory() {
        historyContainer.innerHTML = '';
        const history = getSearchHistory();
        if (history.length > 0) {
            historyContainer.innerHTML = '<span>Recent Searches:</span>';
            history.forEach(term => {
                const historyItem = document.createElement('button');
                historyItem.className = 'history-item';
                historyItem.textContent = term;
                historyContainer.appendChild(historyItem);
            });
        }
    }

    async function fetchAndDisplayImages(query) {
        galleryGrid.innerHTML = '';
        galleryMessage.textContent = `Searching for "${query}" pictures...`;
        galleryMessage.style.display = 'block';
        const endpoint = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=21&lang=en&client_id=${UNSPLASH_ACCESS_KEY}`;
        try {
            const response = await fetch(endpoint, { headers: { 'Accept-Version': 'v1' } });
            if (!response.ok) throw new Error(`API Error: ${response.status}`);
            const data = await response.json();
            galleryMessage.style.display = 'none';
            if (data.results.length > 0) {
                data.results.forEach(photo => {
                    const card = document.createElement('div');
                    card.className = 'gallery-card';
                    card.innerHTML = `<img src="${photo.urls.small}" alt="${photo.alt_description || 'Motorcycle'}" loading="lazy"><div class="gallery-overlay">${(photo.description || photo.alt_description) ? `<p class="photo-description">${((photo.description || photo.alt_description).substring(0, 100))}...</p>` : ''}<p class="photo-attribution">Photo by <a href="${photo.user.links.html}?utm_source=alma_motera&utm_medium=referral" target="_blank">${photo.user.name}</a></p></div>`;
                    galleryGrid.appendChild(card);
                });
            } else {
                galleryMessage.textContent = `Sorry, no pictures found for "${query}".`;
                galleryMessage.style.display = 'block';
            }
        } catch (error) {
            console.error(error);
            galleryMessage.textContent = 'Oops! Something went wrong. Please try again later.';
            galleryMessage.style.display = 'block';
        }
    }

    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const userQuery = searchInput.value.trim();
        if (userQuery) {
            const finalQuery = `${userQuery} motorcycle`;
            fetchAndDisplayImages(finalQuery);
            saveToHistory(userQuery);
            displayHistory();
        }
    });

    historyContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('history-item')) {
            const term = event.target.textContent;
            searchInput.value = term;
            searchForm.requestSubmit();
        }
    });

    displayHistory();
    fetchAndDisplayImages('motorcycle');
});