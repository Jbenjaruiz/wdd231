document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const email = params.get('email');
    const emailSpan = document.querySelector('#submitted-email');

    if (email && emailSpan) {
        emailSpan.textContent = email;
    }

    const thankYouModal = document.querySelector('#thank-you-modal');
    const closeModalBtn = document.querySelector('#close-modal-btn');

    if (thankYouModal && closeModalBtn) {
        thankYouModal.showModal();

        closeModalBtn.addEventListener('click', () => {
            thankYouModal.close();
        });
    }
});