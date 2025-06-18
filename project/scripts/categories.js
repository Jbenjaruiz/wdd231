document.addEventListener('DOMContentLoaded', () => {
    // --- CONFIGURACIÓN ---
    const UNSPLASH_ACCESS_KEY = 'Elfow2DKAeCJDEnc6x3PLQ61CF_DxbqUdbkuey0JtYw'; // Tu clave de API
    
    // Elementos del DOM
    const filtersList = document.querySelector('#filters-list');
    const galleryGrid = document.querySelector('#gallery-grid');
    const galleryMessage = document.querySelector('#gallery-message');

    // --- FUNCIONES ---

    /**
     * Busca imágenes en Unsplash y las muestra en el grid.
     * @param {string} query - El término de búsqueda o la ordenación.
     * @param {string} type - 'search' para buscar o 'order' para ordenar.
     */
    async function fetchAndDisplayImages(query, type = 'search') {
        galleryGrid.innerHTML = '';
        galleryMessage.textContent = `Loading pictures for "${query}"...`;
        galleryMessage.style.display = 'block';

        let endpoint;
        if (type === 'order') {
            // Para "The Latest", buscamos fotos de motos y las ordenamos por fecha
            endpoint = `https://api.unsplash.com/search/photos?query=motorcycle&order_by=${query}&per_page=21&lang=en&client_id=${UNSPLASH_ACCESS_KEY}`;
        } else {
            // Para las otras categorías, hacemos una búsqueda normal
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
                    // Reutilizamos el mismo HTML de tarjeta que en la galería
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

    // --- EVENT LISTENERS ---

    // 1. Clic en los filtros (usando delegación de eventos)
    filtersList.addEventListener('click', (event) => {
        // Solo reacciona si se hace clic en un elemento de filtro
        if (event.target.classList.contains('filter-item')) {
            // Quita la clase 'active' de todos los filtros
            document.querySelectorAll('.filter-item').forEach(item => item.classList.remove('active'));
            // Añade 'active' al filtro clickeado
            event.target.classList.add('active');
            
            // Obtiene los datos del filtro para la llamada a la API
            const query = event.target.dataset.query;
            const type = event.target.dataset.type;
            
            fetchAndDisplayImages(query, type);
        }
    });

    // 2. Carga inicial de imágenes al cargar la página
    // Busca el filtro activo por defecto y carga sus imágenes
    const defaultFilter = document.querySelector('.filter-item.active');
    if (defaultFilter) {
        const query = defaultFilter.dataset.query;
        const type = defaultFilter.dataset.type;
        fetchAndDisplayImages(query, type);
    }
});