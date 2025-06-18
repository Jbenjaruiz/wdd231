document.addEventListener('DOMContentLoaded', () => {
    // --- 1. MOSTRAR EL EMAIL ENVIADO DESDE LA URL ---
    const params = new URLSearchParams(window.location.search);
    const email = params.get('email');
    const emailSpan = document.querySelector('#submitted-email');

    if (email && emailSpan) {
        emailSpan.textContent = email;
    }

    // --- 2. MOSTRAR EL MODAL DE BIENVENIDA AUTOMÁTICAMENTE ---
    const thankYouModal = document.querySelector('#thank-you-modal');
    const closeModalBtn = document.querySelector('#close-modal-btn');

    if (thankYouModal && closeModalBtn) {
        thankYouModal.showModal(); // Muestra el modal al cargar la página

        // Asigna el evento para cerrar el modal
        closeModalBtn.addEventListener('click', () => {
            thankYouModal.close();
        });
    }
});