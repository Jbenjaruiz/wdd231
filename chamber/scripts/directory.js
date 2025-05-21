// chamber/scripts/directory.js
// Handles fetching member data and displaying it in grid or list view.

document.addEventListener('DOMContentLoaded', () => {
    const membersDisplayArea = document.getElementById('members-display-area');
    const gridViewBtn = document.getElementById('grid-view-btn');
    const listViewBtn = document.getElementById('list-view-btn');
    const membersDataURL = 'data/members.json'; // Path to your JSON file

    let membersData = []; // To store the fetched member data

    // Function to create a member card (HTML structure)
    function createMemberCard(member) {
        const card = document.createElement('article');
        card.classList.add('member-card');

        // Add an optional class for membership level for styling
        if (member.membershipLevel) {
            let levelClass = '';
            switch (member.membershipLevel) {
                case 1: levelClass = 'level-normal'; break;
                case 2: levelClass = 'level-silver'; break;
                case 3: levelClass = 'level-gold'; break;
                default: levelClass = 'level-unknown';
            }
            card.classList.add(levelClass);
        }
        
        // Image (logo)
        if (member.imageFileName) {
            const img = document.createElement('img');
            img.src = `images/logos/commerce-thumbnail.avif`;
            //img.src = `images/logos/${member.imageFileName}`; // Assuming logos are in images/logos/
            img.alt = `${member.name} Logo`;
            img.classList.add('logo');
            img.loading = 'lazy'; // Lazy load images
            card.appendChild(img);
        }

        // Member Details container (for better flex control in list view)
        const detailsDiv = document.createElement('div');
        detailsDiv.classList.add('member-details');

        const name = document.createElement('h3');
        name.textContent = member.name;
        detailsDiv.appendChild(name);

        if (member.address) {
            const address = document.createElement('p');
            address.classList.add('address');
            address.textContent = member.address;
            detailsDiv.appendChild(address);
        }

        if (member.phone) {
            const phone = document.createElement('p');
            phone.classList.add('phone');
            phone.textContent = `Phone: ${member.phone}`;
            detailsDiv.appendChild(phone);
        }
        
        if (member.description) {
            const description = document.createElement('p');
            description.classList.add('description');
            description.textContent = member.description;
            detailsDiv.appendChild(description);
        }

        if (member.websiteURL) {
            const website = document.createElement('a');
            website.href = member.websiteURL;
            website.textContent = 'Visit Website';
            website.classList.add('website');
            website.target = '_blank'; // Open in new tab
            website.rel = 'noopener noreferrer';
            detailsDiv.appendChild(website);
        }
        
        card.appendChild(detailsDiv);
        return card;
    }

    // Function to display members
    function displayMembers(members) {
        if (!membersDisplayArea) return;
        membersDisplayArea.innerHTML = ''; // Clear previous content or loading message

        if (members.length === 0) {
            membersDisplayArea.innerHTML = '<p class="no-members-message">No members to display at this time.</p>';
            return;
        }

        members.forEach(member => {
            const cardElement = createMemberCard(member);
            membersDisplayArea.appendChild(cardElement);
        });
    }

    // Async function to fetch member data
    async function getMembersData() {
        try {
            const response = await fetch(membersDataURL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            membersData = await response.json();
            displayMembers(membersData); // Display members once data is fetched
        } catch (error) {
            console.error('Error fetching members data:', error);
            if (membersDisplayArea) {
                membersDisplayArea.innerHTML = '<p class="error-message">Could not load member data. Please try again later.</p>';
            }
        }
    }

    // Event Listeners for View Toggle Buttons
    if (gridViewBtn && listViewBtn && membersDisplayArea) {
        gridViewBtn.addEventListener('click', () => {
            membersDisplayArea.classList.remove('list-view');
            membersDisplayArea.classList.add('cards-grid');
            gridViewBtn.classList.add('active-view');
            listViewBtn.classList.remove('active-view');
            // displayMembers(membersData); // Re-display if structure changes significantly, otherwise CSS handles it
        });

        listViewBtn.addEventListener('click', () => {
            membersDisplayArea.classList.remove('cards-grid');
            membersDisplayArea.classList.add('list-view');
            listViewBtn.classList.add('active-view');
            gridViewBtn.classList.remove('active-view');
            // displayMembers(membersData); // Re-display if structure changes significantly, otherwise CSS handles it
        });
    }

    // Initial fetch and display of members
    getMembersData();
});
