// js/components.js

document.addEventListener('DOMContentLoaded', () => {
    
    // Función para cargar un componente HTML en un elemento
    const loadComponent = (selector, url) => {
        return fetch(url)
            .then(response => {
                if (!response.ok) throw new Error(`Failed to fetch ${url}`);
                return response.text();
            })
            .then(data => {
                document.querySelector(selector).innerHTML = data;
            })
            .catch(error => console.error(error));
    };

    // Cargar Header y Footer
    const loadHeader = loadComponent('#header-placeholder', 'header.html');
    const loadFooter = loadComponent('#footer-placeholder', 'footer.html');

    // Después de que el header se haya cargado, inicializamos el menú de hamburguesa
    Promise.all([loadHeader]).then(() => {
        initHamburgerMenu();
        setActiveNavLink();
    });
});

// Lógica para el menú de hamburguesa
function initHamburgerMenu() {
    const menuIcon = document.querySelector('.mobile-menu-icon');
    const navList = document.querySelector('.nav-list');
    
    if (menuIcon && navList) {
        menuIcon.addEventListener('click', () => {
            navList.classList.toggle('active');
            menuIcon.classList.toggle('active');
        });
    }
}

// Lógica para marcar el enlace de navegación activo
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-list a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}
