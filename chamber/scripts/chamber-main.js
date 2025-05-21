// chamber/scripts/chamber-main.js
// Handles general site functionality like navigation and footer dates.

document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu Toggle for Chamber Site
    const menuButton = document.getElementById('chamber-menu-button');
    const navLinks = document.getElementById('chamber-nav-links');

    if (menuButton && navLinks) {
        menuButton.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            // Update ARIA attribute for accessibility
            const isOpen = navLinks.classList.contains('open');
            menuButton.setAttribute('aria-expanded', isOpen.toString());
            if (isOpen) {
                menuButton.textContent = '✖'; // Close icon
            } else {
                menuButton.textContent = '☰'; // Hamburger icon
            }
        });
    }

    // Dynamic Footer Year
    const currentYearSpan = document.getElementById('chamber-current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Dynamic Last Modification Date
    const lastModifiedSpan = document.getElementById('chamber-last-modified');
    if (lastModifiedSpan) {
        const lastModifiedDate = new Date(document.lastModified);
        // Using en-US locale for a common date format, adjust if needed
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        lastModifiedSpan.textContent = lastModifiedDate.toLocaleDateString('en-US', options);
    }
});
