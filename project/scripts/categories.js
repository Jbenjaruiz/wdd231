document.addEventListener('DOMContentLoaded', () => {
    const UNSPLASH_ACCESS_KEY = 'Elfow2DKAeCJDEnc6x3PLQ61CF_DxbqUdbkuey0JtYw';

    const filtersList = document.querySelector('#filters-list');
    const galleryGrid = document.querySelector('#gallery-grid');
    const galleryMessage = document.querySelector('#gallery-message');

    async function fetchAndDisplayImages(query, type = 'search') {
        galleryGrid.innerHTML = '';
        galleryMessage.textContent = `Loading pictures for "${query}"...`;
        galleryMessage.style.display = 'block';

        let endpoint;
        if (type === 'order') {
            endpoint = `https://api.unsplash.com/search/photos?query=motorcycle&order_by=${query}&per_page=21&lang=en&client_id=${UNSPLASH_ACCESS_KEY}`;
        } else {
            endpoint = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=21&lang=en&client_id=${UNSPLASH_ACCESS_KEY}`;
        }

        try {
            const response = await fetch(endpoint, {
                headers: { 'Accept-Version': 'v1' }
            });
            if (!response.ok) throw new Error(`API Error: ${response.status}`);
            const data = await response.json();

            galleryMessage.style.display = 'none';

            if (data.results.length > 0) {
                data.results.forEach(photo => {
                    const card = document.createElement('div');
                    card.className = 'gallery-card';
                    card.innerHTML = `
                        <img src="${photo.urls.small}" alt="${photo.alt_description || 'Motorcycle'}" loading="lazy">
                        <div class="gallery-overlay">
                            ${(photo.description || photo.alt_description) ? `<p class="photo-description">${((photo.description || photo.alt_description).substring(0, 100))}...</p>` : ''}
                            <p class="photo-attribution">Photo by <a href="${photo.user.links.html}?utm_source=alma_motera&utm_medium=referral" target="_blank">${photo.user.name}</a></p>
                        </div>
                    `;
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

    filtersList.addEventListener('click', (event) => {
        if (event.target.classList.contains('filter-item')) {
            document.querySelectorAll('.filter-item').forEach(item => item.classList.remove('active'));
            event.target.classList.add('active');
            
            const query = event.target.dataset.query;
            const type = event.target.dataset.type;
            
            fetchAndDisplayImages(query, type);
        }
    });

    const defaultFilter = document.querySelector('.filter-item.active');
    if (defaultFilter) {
        const query = defaultFilter.dataset.query;
        const type = defaultFilter.dataset.type;
        fetchAndDisplayImages(query, type);
    }
});