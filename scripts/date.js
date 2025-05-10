document.addEventListener('DOMContentLoaded', () => {

    const currentYearSpan = document.getElementById('currentyear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    const lastModifiedParagraph = document.getElementById('lastModified');
    if (lastModifiedParagraph) {
        const lastModDate = new Date(document.lastModified);
        const optionsDate = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }; // hour12 para AM/PM
        
        const formattedDate = lastModDate.toLocaleDateString("es-GT", optionsDate); // "es-GT" para Guatemala
        const formattedTime = lastModDate.toLocaleTimeString("en-US", optionsTime); // "en-US" para formato AM/PM común

        lastModifiedParagraph.textContent = `Last Update: ${formattedDate} ${formattedTime}`;
    }
});