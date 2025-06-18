document.addEventListener('DOMContentLoaded', () => {
    // --- CONFIGURACIÓN ---
    const UNSPLASH_ACCESS_KEY = 'Elfow2DKAeCJDEnc6x3PLQ61CF_DxbqUdbkuey0JtYw';
    const MAX_HISTORY_ITEMS = 5;

    // Elementos del DOM
    const searchForm = document.querySelector('#search-form');
    const searchInput = document.querySelector('#search-input');
    const galleryGrid = document.querySelector('#gallery-grid');
    const galleryMessage = document.querySelector('#gallery-message');
    const historyContainer = document.querySelector('#history-container');

    // --- FUNCIONES DE HISTORIAL ---

    /**
     * Obtiene el historial desde Local Storage.
     * @returns {string[]} Un array de términos de búsqueda.
     */
    function getSearchHistory() {
        const history = localStorage.getItem('motorcycleSearchHistory');
        return history ? JSON.parse(history) : [];
    }

    /**
     * Guarda un nuevo término en el historial de Local Storage.
     * @param {string} term - El término de búsqueda del usuario.
     */
    function saveToHistory(term) {
        let history = getSearchHistory();
        // Elimina duplicados para que el más reciente quede al principio
        history = history.filter(item => item.toLowerCase() !== term.toLowerCase());
        // Añade el nuevo término al principio
        history.unshift(term);
        // Limita el historial al número máximo de ítems
        history.splice(MAX_HISTORY_ITEMS);
        // Guarda el array actualizado en Local Storage
        localStorage.setItem('motorcycleSearchHistory', JSON.stringify(history));
    }

    /**
     * Muestra los ítems del historial en la página.
     */
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

    // --- FUNCIÓN PRINCIPAL DE FETCH --- (Sin cambios)
    async function fetchAndDisplayImages(query) {
        // ... el código de esta función se queda exactamente igual que antes ...
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

    // --- EVENT LISTENERS ---

    // Búsqueda del usuario
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const userQuery = searchInput.value.trim();
        if (userQuery) {
            const finalQuery = `${userQuery} motorcycle`;
            fetchAndDisplayImages(finalQuery);
            saveToHistory(userQuery); // Guarda la búsqueda en el historial
            displayHistory();        // Actualiza la vista del historial
        }
    });

    // Clic en un ítem del historial (usando delegación de eventos)
    historyContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('history-item')) {
            const term = event.target.textContent;
            searchInput.value = term; // Pone el término en la barra de búsqueda
            searchForm.requestSubmit(); // Envía el formulario programáticamente
        }
    });

    // --- INICIALIZACIÓN ---
    displayHistory(); // Muestra el historial al cargar la página
    fetchAndDisplayImages('motorcycle'); // Carga inicial
});