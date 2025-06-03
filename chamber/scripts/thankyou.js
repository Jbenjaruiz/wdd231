document.addEventListener('DOMContentLoaded', () => {
    const submittedDataDisplay = document.getElementById('submitted-data-display');

    if (submittedDataDisplay) {
        const params = new URLSearchParams(window.location.search);

        // Fields to display (must match 'name' attributes in the form)
        const fieldsToShow = {
            fname: "First Name",
            lname: "Last Name",
            email: "Email Address",
            phone: "Mobile Phone",
            orgname: "Business/Organization Name",
            membershiplevel: "Selected Membership Level", // Will display value (e.g., "gold")
            timestamp: "Application Timestamp"
        };
        
        // Remove loading message
        const loadingMessage = submittedDataDisplay.querySelector('.loading-message');
        if (loadingMessage) {
            loadingMessage.remove();
        }

        let dataHtml = "<ul>";
        let dataFound = false;

        for (const key in fieldsToShow) {
            if (params.has(key)) {
                dataFound = true;
                let value = params.get(key);
                // Make membership level more readable
                if (key === "membershiplevel") {
                    switch(value) {
                        case "np": value = "NP Membership (Non-Profit)"; break;
                        case "bronze": value = "Bronze Membership"; break;
                        case "silver": value = "Silver Membership"; break;
                        case "gold": value = "Gold Membership"; break;
                    }
                }
                // Format timestamp if needed (it's currently ISO string)
                if (key === "timestamp") {
                    try {
                        const date = new Date(value);
                        // Using a locale-friendly format
                        value = date.toLocaleString('en-US', { 
                            year: 'numeric', month: 'long', day: 'numeric', 
                            hour: '2-digit', minute: '2-digit', second: '2-digit' 
                        });
                    } catch (e) {
                        // Keep original value if date parsing fails
                        console.warn("Could not parse timestamp:", value);
                    }
                }

                dataHtml += `<li><strong>${fieldsToShow[key]}:</strong> ${escapeHTML(value)}</li>`;
            }
        }

        dataHtml += "</ul>";

        if (dataFound) {
            submittedDataDisplay.innerHTML = dataHtml;
        } else {
            submittedDataDisplay.innerHTML = "<p>No application data was found. Please ensure you submitted the form correctly.</p>";
        }
    }
});

// Helper function to escape HTML to prevent XSS if displaying user input directly
// (though URLSearchParams usually handles basic encoding)
function escapeHTML(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}