document.addEventListener('DOMContentLoaded', async () => {
    
    // --- 1. CONFIGURACIÓN DEL CONTENIDO DEL CAROUSEL (SIMPLIFICADO) ---
    const slideData = [
        { image: 'images/moto-hero-1.jpeg' },
        { image: 'images/moto-hero-2.jpeg' },
        { image: 'images/moto-hero-3.jpeg' }
    ];

    // --- 2. SELECCIÓN DE ELEMENTOS DEL DOM ---
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    
    let currentSlide = 0;

    // --- 3. FUNCIÓN PARA CARGAR DATOS EN LOS SLIDES (SIMPLIFICADA) ---
    function populateSlides() {
        slides.forEach((slide, index) => {
            const data = slideData[index];
            if (data) {
                // Aplicar solo la imagen de fondo
                slide.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${data.image}')`;
            }
        });
    }

    // --- 4. LÓGICA DEL CAROUSEL ---
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
    async function initializeCarousel() {
        // Ya no necesitamos hacer fetch, los datos están aquí mismo.
        if (slideData.length > 0) {
            populateSlides();
            showSlide(0);

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

    // Lógica del formulario y modal (si está en esta página)
    const newsletterForm = document.querySelector('.newsletter-form');
    if(newsletterForm) {
        // ... (el resto de tu código para el modal se queda igual)
    }

    initializeCarousel();
});