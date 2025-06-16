// Usamos async en el evento para poder usar 'await' adentro
document.addEventListener('DOMContentLoaded', async () => {

    // --- 1. SELECCIÓN DE ELEMENTOS DEL DOM ---
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');

    let currentSlide = 0;
    let slideData = []; // El array de datos ahora empieza vacío

    // --- 2. FUNCIÓN PARA OBTENER LOS DATOS DEL JSON ---
    async function fetchSlideData() {
        try {
            const response = await fetch('project/data/slides.json'); // Busca el archivo
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json(); // Convierte la respuesta a JSON
        } catch (error) {
            console.error("Could not fetch slide data:", error);
            return []; // Retorna un array vacío si hay un error
        }
    }

    // --- 3. FUNCIÓN PARA CARGAR DATOS EN LOS SLIDES ---
    function populateSlides() {
        slides.forEach((slide, index) => {
            const data = slideData[index];
            if (data) {
                slide.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${data.image}')`;
                slide.querySelector('h1').textContent = data.title;
                slide.querySelector('p').textContent = data.subtitle;
                const button = slide.querySelector('.cta-button');
                button.textContent = data.buttonText;
                button.href = data.buttonLink;
            }
        });
    }

    // --- 4. LÓGICA DEL CAROUSEL (sin cambios) ---
    function showSlide(slideIndex) {
        if (slideIndex >= slideData.length) slideIndex = 0;
        if (slideIndex < 0) slideIndex = slideData.length - 1;

        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        slides[slideIndex].classList.add('active');
        dots[slideIndex].classList.add('active');

        currentSlide = slideIndex;
    }

    // --- 5. INICIALIZACIÓN COMPLETA ---
    // Esta función orquesta todo
    async function initializeCarousel() {
        slideData = await fetchSlideData(); // Espera a que los datos se carguen

        if (slideData.length > 0) {
            populateSlides(); // Rellena el HTML con los datos
            showSlide(0);     // Muestra el primer slide

            // Asigna los eventos SOLO si todo se cargó correctamente
            nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
            prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
            dots.forEach(dot => {
                dot.addEventListener('click', () => {
                    showSlide(parseInt(dot.dataset.slide));
                });
            });

            // Inicia el carrusel automático
            setInterval(() => showSlide(currentSlide + 1), 5000);
        }
    }

    initializeCarousel(); // ¡Llama a la función principal para empezar todo!

    // --- LÓGICA DEL FORMULARIO DE SUSCRIPCIÓN Y MODAL ---

    const newsletterForm = document.querySelector('.newsletter-form');
    const emailInput = document.querySelector('.newsletter-form input[type="email"]');
    const modal = document.querySelector('#subscription-modal');
    const closeModalBtn = document.querySelector('#close-modal-btn');

    // 1. Escuchar el evento 'submit' del formulario
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (event) => {
            // Previene que el formulario se envíe de la forma tradicional (recargando la página)
            event.preventDefault();

            // 2. Validar el input de email usando las reglas de HTML5
            // checkValidity() retorna 'true' si el input es válido (p.ej. no está vacío y es un email)
            if (emailInput.checkValidity()) {
                // 3. Si es válido, muestra el modal
                modal.showModal();

                // Opcional: Limpia el campo de email después de la suscripción
                emailInput.value = '';
            } else {
                // Si no es válido, el navegador mostrará automáticamente un mensaje de error
                // gracias a los atributos 'required' y 'type="email"' en el HTML.
                // Podrías agregar un estilo de error al input aquí si quisieras.
                emailInput.reportValidity(); // Fuerza a mostrar el popup de validación del navegador
            }
        });
    }

    // 4. Lógica para cerrar el modal
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modal.close();
        });
    }
});