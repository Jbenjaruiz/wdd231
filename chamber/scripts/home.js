// chamber/scripts/home.js
// Handles weather API and member spotlights for the home page.

document.addEventListener('DOMContentLoaded', () => {
    // --- OpenWeatherMap API Configuration ---
    const apiKey = "f3677c3b641f37deeda89ed34f57a618"; // <-- IMPORTANTE: Reemplaza esto con tu API Key de OpenWeatherMap
    const city = "Antigua Guatemala";
    const countryCode = "GT";
    // Coordenadas aproximadas para Antigua Guatemala (puedes ajustarlas)
    const lat = 14.5573;
    const lon = -90.7333;
    const units = "metric"; // Para Celsius. Usa "imperial" para Fahrenheit.

    const weatherApiUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
    const weatherApiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

    // DOM Elements for Weather
    const currentTempElement = document.getElementById('current-temperature');
    const weatherDescElement = document.getElementById('weather-description');
    const weatherIconElement = document.getElementById('weather-api-icon');
    const forecastDisplayElement = document.getElementById('weather-forecast-display');

    // DOM Elements for Spotlights
    const spotlightContainer = document.getElementById('spotlight-cards-container');
    const membersDataURL = 'data/members.json'; // Path to your JSON file

    // --- Fetch and Display Weather Data ---
    async function fetchWeather() {
        // Fetch Current Weather
        try {
            const currentResponse = await fetch(weatherApiUrlCurrent);
            if (!currentResponse.ok) {
                throw new Error(`HTTP error! status: ${currentResponse.status} for current weather`);
            }
            const currentData = await currentResponse.json();
            displayCurrentWeather(currentData);
        } catch (error) {
            console.error("Error fetching current weather:", error);
            if (currentTempElement) currentTempElement.textContent = "N/A";
            if (weatherDescElement) weatherDescElement.textContent = "Weather data unavailable.";
            if (weatherIconElement) weatherIconElement.alt = "Weather data unavailable";
        }

        // Fetch Forecast
        try {
            const forecastResponse = await fetch(weatherApiUrlForecast);
            if (!forecastResponse.ok) {
                throw new Error(`HTTP error! status: ${forecastResponse.status} for forecast`);
            }
            const forecastData = await forecastResponse.json();
            displayWeatherForecast(forecastData);
        } catch (error) {
            console.error("Error fetching weather forecast:", error);
            if (forecastDisplayElement) forecastDisplayElement.innerHTML = '<p class="error-message">Forecast data unavailable.</p>';
        }
    }

    function displayCurrentWeather(data) {
        if (!data || !data.main || !data.weather || data.weather.length === 0) {
            console.error("Current weather data is incomplete:", data);
            if (currentTempElement) currentTempElement.textContent = "N/A";
            if (weatherDescElement) weatherDescElement.textContent = "Weather data incomplete.";
            return;
        }

        if (currentTempElement) {
            currentTempElement.textContent = Math.round(data.main.temp); // Temperature
        }
        if (weatherDescElement) {
            // Capitalize first letter of each word in description
            const description = data.weather[0].description;
            weatherDescElement.textContent = description.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        }
        if (weatherIconElement) {
            const iconCode = data.weather[0].icon;
            weatherIconElement.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            weatherIconElement.alt = data.weather[0].description;
        }
    }

    function displayWeatherForecast(data) {
        if (!data || !data.list || data.list.length === 0) {
            console.error("Forecast data is incomplete:", data);
            if (forecastDisplayElement) forecastDisplayElement.innerHTML = '<p class="error-message">Forecast data incomplete.</p>';
            return;
        }
        if (!forecastDisplayElement) return;

        forecastDisplayElement.innerHTML = ''; // Clear placeholders

        // Get forecast for approximately the same time next 3 days
        // OpenWeatherMap forecast returns data in 3-hour intervals
        const dailyForecasts = {};
        data.list.forEach(item => {
            const date = new Date(item.dt * 1000);
            const dayKey = date.toISOString().split('T')[0]; // YYYY-MM-DD

            // Store the forecast around midday for each day
            if (!dailyForecasts[dayKey] && date.getHours() >= 12 && date.getHours() <= 15) {
                 // Or pick the first one for the day if midday is not available
                dailyForecasts[dayKey] = item;
            } else if (!dailyForecasts[dayKey]) {
                dailyForecasts[dayKey] = item; // Fallback to first available for the day
            }
        });
        
        const today = new Date().toISOString().split('T')[0];
        let forecastCount = 0;

        for (const dayKey in dailyForecasts) {
            if (dayKey === today) continue; // Skip today's forecast as we have current weather

            if (forecastCount < 3) {
                const item = dailyForecasts[dayKey];
                const forecastItemDiv = document.createElement('div');
                forecastItemDiv.classList.add('forecast-item');

                const date = new Date(item.dt * 1000);
                const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                const temp = Math.round(item.main.temp);
                // const iconCode = item.weather[0].icon; // Optional: add icons to forecast

                forecastItemDiv.innerHTML = `
                    <p class="forecast-day">${dayName}</p>
                    <p class="forecast-temp">${temp}&deg;C</p>
                    `;
                forecastDisplayElement.appendChild(forecastItemDiv);
                forecastCount++;
            }
        }
        if (forecastCount === 0) {
             forecastDisplayElement.innerHTML = '<p class="error-message">Not enough forecast data available.</p>';
        }
    }

    // --- Fetch and Display Member Spotlights ---
    async function fetchAndDisplaySpotlights() {
        if (!spotlightContainer) return;

        try {
            const response = await fetch(membersDataURL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const members = await response.json();

            // Filter for Gold (3) or Silver (2) members
            const eligibleMembers = members.filter(member => member.membershipLevel === 2 || member.membershipLevel === 3);

            if (eligibleMembers.length === 0) {
                spotlightContainer.innerHTML = '<p class="no-spotlights-message">No members currently eligible for spotlight.</p>';
                return;
            }

            // Shuffle the eligible members array
            const shuffledMembers = eligibleMembers.sort(() => 0.5 - Math.random());

            // Select 2 or 3 members (or fewer if not enough eligible)
            const spotlightCount = Math.min(shuffledMembers.length, Math.floor(Math.random() * 2) + 2); // Randomly 2 or 3
            const selectedSpotlights = shuffledMembers.slice(0, spotlightCount);

            spotlightContainer.innerHTML = ''; // Clear loading message
            selectedSpotlights.forEach(member => {
                const card = createSpotlightCard(member);
                spotlightContainer.appendChild(card);
            });

        } catch (error) {
            console.error("Error fetching or displaying spotlights:", error);
            spotlightContainer.innerHTML = '<p class="error-message">Could not load member spotlights.</p>';
        }
    }

    function createSpotlightCard(member) {
        const card = document.createElement('article');
        card.classList.add('spotlight-card', 'member-card'); // Reuse .member-card styles if applicable

        if (member.imageFileName) {
            const img = document.createElement('img');
            img.src = `images/logos/${member.imageFileName}`;
            img.alt = `${member.name} Logo`;
            img.classList.add('logo');
            img.loading = 'lazy';
            card.appendChild(img);
        }

        const name = document.createElement('h3');
        name.textContent = member.name;
        card.appendChild(name);

        if (member.phone) {
            const phone = document.createElement('p');
            phone.classList.add('phone');
            phone.textContent = `Phone: ${member.phone}`;
            card.appendChild(phone);
        }

        if (member.address) { // Optional: Address in spotlight
            const address = document.createElement('p');
            address.classList.add('address');
            address.textContent = member.address;
            card.appendChild(address);
        }
        
        if (member.websiteURL) {
            const websiteLink = document.createElement('a');
            websiteLink.href = member.websiteURL;
            websiteLink.textContent = 'Visit Website';
            websiteLink.target = '_blank';
            websiteLink.rel = 'noopener noreferrer';
            websiteLink.classList.add('website');
            card.appendChild(websiteLink);
        }

        // Display membership level
        let levelText = "Member";
        if (member.membershipLevel === 2) levelText = "Silver Member";
        if (member.membershipLevel === 3) levelText = "Gold Member";
        const membership = document.createElement('p');
        membership.classList.add('membership-level');
        membership.textContent = levelText;
        card.appendChild(membership);

        return card;
    }

    // --- Initialize Page ---
    fetchWeather();
    fetchAndDisplaySpotlights();
});
