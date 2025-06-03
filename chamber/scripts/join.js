document.addEventListener('DOMContentLoaded', () => {
    // Set the hidden timestamp field
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        timestampField.value = new Date().toISOString(); // ISO format e.g., 2024-05-31T12:30:00.000Z
    }

    // Modal functionality
    const openModalButtons = document.querySelectorAll('[data-modal-target]');
    const closeModalButtons = document.querySelectorAll('[data-modal-close]');

    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.dataset.modalTarget;
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.showModal(); // Use the built-in <dialog> method
            }
        });
    });

    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('dialog'); // Find the parent dialog
            if (modal) {
                modal.close(); // Use the built-in <dialog> method
            }
        });
    });

    // Optional: Close modal if clicked outside of its content (on the backdrop)
    const allModals = document.querySelectorAll('.membership-modal');
    allModals.forEach(modal => {
        modal.addEventListener('click', event => {
            if (event.target === modal) { // Check if the click is on the dialog backdrop itself
                modal.close();
            }
        });
    });

    // Animation for membership cards (simple example: fade in)
    const membershipCards = document.querySelectorAll('.membership-card');
    membershipCards.forEach((card, index) => {
        // Ensure the card is initially transparent if using CSS for opacity transition
        // This might be better handled directly in CSS for initial state
        card.style.opacity = '0'; 
        setTimeout(() => {
            card.style.transition = `opacity 0.5s ease-in-out ${index * 0.15}s, transform 0.5s ease-in-out ${index * 0.15}s`;
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)'; // If you add an initial translateY in CSS
        }, 50); // Small delay to ensure transition applies
    });
});
