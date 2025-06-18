document.addEventListener('DOMContentLoaded', () => {
    // --- CONFIGURACIÓN ---
    // Clave de API que proporcionaste en el ejemplo de cURL.
    const UNSPLASH_ACCESS_KEY = 'Elfow2DKAeCJDEnc6x3PLQ61CF_DxbqUdbkuey0JtYw';

    // Elementos del DOM
    const searchForm = document.querySelector('#search-form');
    const searchInput = document.querySelector('#search-input');
    const galleryGrid = document.querySelector('#gallery-grid');
    const galleryMessage = document.querySelector('#gallery-message');

    // --- FUNCIONES ---

    /**
     * Busca imágenes en Unsplash y las muestra en el grid.
     * @param {string} query - El término de búsqueda.
     */
    async function fetchAndDisplayImages(query) {
        galleryGrid.innerHTML = '';
        galleryMessage.textContent = `Searching for "${query}" pictures...`;
        galleryMessage.style.display = 'block';

        // --- CAMBIO 1: URL actualizada con el parámetro 'lang=en' ---
        // También mantengo 'per_page=21' para que la galería se vea más llena.
        const endpoint = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=21&lang=en&client_id=${UNSPLASH_ACCESS_KEY}`;

        try {
            // --- CAMBIO 2: Se añade el objeto de 'headers' a la llamada fetch ---
            const response = await fetch(endpoint, {
                headers: {
                    'Accept-Version': 'v1'
                }
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();

            galleryMessage.style.display = 'none';

            if (data.results.length > 0) {
                data.results.forEach(photo => {
                    const card = document.createElement('div');
                    card.className = 'gallery-card';

                    const img = document.createElement('img');
                    img.src = photo.urls.small;
                    img.alt = photo.alt_description || 'Motorcycle photo';
                    img.loading = 'lazy';

                    // === ESTA ES LA NUEVA VERSIÓN ===
                    const overlay = document.createElement('div');
                    overlay.className = 'gallery-overlay';

                    // Primero, determinamos qué descripción usar
                    const description = photo.description || photo.alt_description;

                    // Construimos el HTML del overlay dinámicamente
                    let overlayContent = '';

                    // Añadimos la descripción solo si existe
                    if (description) {
                        // Truncamos la descripción si es muy larga para no romper el diseño
                        const truncatedDescription = description.length > 100 ? `${description.substring(0, 100)}...` : description;
                        overlayContent += `<p class="photo-description">${truncatedDescription}</p>`;
                    }

                    // Añadimos la atribución del fotógrafo
                    overlayContent += `
    <p class="photo-attribution">
        Photo by <a href="${photo.user.links.html}?utm_source=alma_motera&utm_medium=referral" target="_blank">${photo.user.name}</a>
    </p>
`;

                    // Asignamos el contenido completo al overlay
                    overlay.innerHTML = overlayContent;

                    card.appendChild(img);
                    card.appendChild(overlay);
                    galleryGrid.appendChild(card);
                });
            } else {
                galleryMessage.textContent = `Sorry, no pictures found for "${query}". Try another search.`;
                galleryMessage.style.display = 'block';
            }

        } catch (error) {
            console.error(error);
            galleryMessage.textContent = 'Oops! Something went wrong. Please check your API key or try again later.';
            galleryMessage.style.display = 'block';
        }
    }

    // --- EVENT LISTENERS ---
    fetchAndDisplayImages('motorcycle');

    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const userQuery = searchInput.value.trim();

        if (userQuery) {
            const finalQuery = `${userQuery} motorcycle`;
            fetchAndDisplayImages(finalQuery);
        } else {
            // Si la búsqueda está vacía, vuelve a buscar 'motorcycle' por defecto
            fetchAndDisplayImages('motorcycle');
        }
    });
});