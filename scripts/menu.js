document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menu-button');
    const navLinks = document.getElementById('nav-links');

    if (menuButton && navLinks) {
        menuButton.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            if (navLinks.classList.contains('open')) {
                menuButton.textContent = '✖'; 
            } else {
                menuButton.textContent = '☰'; 
            }
        });
    }

});