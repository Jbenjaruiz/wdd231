document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DEL CAROUSEL ---
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        const slides = document.querySelectorAll('.carousel-slide');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const dots = document.querySelectorAll('.dot');
        let currentSlide = 0;

        function applyBackgroundImages() {
            slides.forEach(slide => {
                const bgImage = slide.dataset.background;
                if (bgImage) {
                    slide.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${bgImage}')`;
                }
            });
        }

        function showSlide(slideIndex) {
            if (slideIndex >= slides.length) slideIndex = 0;
            if (slideIndex < 0) slideIndex = slides.length - 1;

            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            slides[slideIndex].classList.add('active');
            dots[slideIndex].classList.add('active');
            currentSlide = slideIndex;
        }

        function initializeCarousel() {
            if (slides.length > 0) {
                applyBackgroundImages();
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
        
        initializeCarousel();
    }

    // --- LÓGICA DEL FORMULARIO Y MODAL (ESTA ES LA PARTE QUE FALTABA) ---
    const newsletterForm = document.querySelector('.newsletter-form');
    const emailInput = document.querySelector('.newsletter-form input[type="email"]');
    const modal = document.querySelector('#subscription-modal');
    const closeModalBtn = document.querySelector('#close-modal-btn');

    if (newsletterForm && emailInput && modal && closeModalBtn) {
        newsletterForm.addEventListener('submit', (event) => {
            event.preventDefault();
            if (emailInput.checkValidity()) {
                modal.showModal();
                emailInput.value = '';
            } else {
                emailInput.reportValidity();
            }
        });

        closeModalBtn.addEventListener('click', () => {
            modal.close();
        });
    }
});