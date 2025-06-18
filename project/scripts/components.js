document.addEventListener('DOMContentLoaded', () => {
    const loadComponent = (selector, url) => {
        return fetch(url)
            .then(response => {
                if (!response.ok) throw new Error(`Failed to fetch ${url}`);
                return response.text();
            })
            .then(data => {
                const element = document.querySelector(selector);
                if (element) {
                    element.innerHTML = data;
                }
            })
            .catch(error => console.error(error));
    };

    const headerPlaceholder = document.querySelector('#header-placeholder');
    const footerPlaceholder = document.querySelector('#footer-placeholder');
    let headerPromise;

    if (headerPlaceholder) {
        headerPromise = loadComponent('#header-placeholder', 'header.html');
    } else {
        headerPromise = Promise.resolve();
    }

    if (footerPlaceholder) {
        loadComponent('#footer-placeholder', 'footer.html');
    }

    headerPromise.then(() => {
        initHamburgerMenu();
        setActiveNavLink();
    });
});

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

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-list a');

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref) {
            const linkPage = linkHref.split('/').pop();
            if (linkPage === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }
    });
}