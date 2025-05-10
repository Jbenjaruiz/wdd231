// scripts/main.js

document.addEventListener('DOMContentLoaded', () => {
    // --- MANEJO DEL MENÚ HAMBURGUESA ---
    const menuButton = document.getElementById('menu-button');
    const navLinks = document.getElementById('nav-links');

    if (menuButton && navLinks) {
        menuButton.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            // Cambiar el ícono del botón (opcional, pero mejora la UX)
            if (navLinks.classList.contains('open')) {
                menuButton.textContent = '✖'; // Icono de cerrar
            } else {
                menuButton.textContent = '☰'; // Icono de hamburguesa
            }
        });
    }

    // --- ACTUALIZACIÓN DINÁMICA DEL FOOTER ---
    const currentYearSpan = document.getElementById('currentyear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    const lastModifiedParagraph = document.getElementById('lastModified');
    if (lastModifiedParagraph) {
        // Usamos un formato más amigable y consistente para la fecha.
        const lastModDate = new Date(document.lastModified);
        const optionsDate = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }; // hour12 para AM/PM
        
        const formattedDate = lastModDate.toLocaleDateString("es-GT", optionsDate); // "es-GT" para Guatemala
        const formattedTime = lastModDate.toLocaleTimeString("en-US", optionsTime); // "en-US" para formato AM/PM común

        lastModifiedParagraph.textContent = `Last Update: ${formattedDate} ${formattedTime}`;
        // El diseño original tenía "Last Update: 01/01/1970 12:00:00".
        // Si quieres ese formato específico, o si document.lastModified no es lo que esperas
        // (especialmente en desarrollo local o contenido muy dinámico), considera esto.
        // Para archivos estáticos en un servidor, document.lastModified suele ser preciso.
    }

    // Aquí NO va la lógica de los cursos, eso irá en card.js
});