document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SELECCIÓN DE ELEMENTOS DEL DOM ---
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    
    let currentSlide = 0;

    // --- 2. FUNCIÓN PARA APLICAR LAS IMÁGENES DESDE EL HTML ---
    function applyBackgroundImages() {
        slides.forEach(slide => {
            // Lee el valor del atributo 'data-background'
            const bgImage = slide.dataset.background;
            
            // Si el atributo existe, lo aplica como fondo
            if (bgImage) {
                slide.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${bgImage}')`;
            }
        });
    }

    // --- 3. LÓGICA DEL CAROUSEL ---
    function showSlide(slideIndex) {
        if (slideIndex >= slides.length) slideIndex = 0;
        if (slideIndex < 0) slideIndex = slides.length - 1;

        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        slides[slideIndex].classList.add('active');
        dots[slideIndex].classList.add('active');
        
        currentSlide = slideIndex;
    }

    // --- 4. INICIALIZACIÓN ---
    function initializeCarousel() {
        if (slides.length > 0) {
            applyBackgroundImages(); // Aplica los fondos desde el HTML
            showSlide(0);            // Muestra el primer slide

            // Asigna los eventos
            nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
            prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
            dots.forEach(dot => {
                dot.addEventListener('click', () => {
                    showSlide(parseInt(dot.dataset.slide));
                });
            });

            setInterval(() => showSlide(currentSlide + 1), 5000);
        }
    }

    // Lógica del formulario y modal...
    const newsletterForm = document.querySelector('.newsletter-form');
    // ... (el resto de tu código para el modal se queda igual)
    if (newsletterForm) {
        // ...
    }

    initializeCarousel();
});