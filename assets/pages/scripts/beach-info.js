// Testing weather
document.addEventListener('DOMContentLoaded', () => {
    getWeather();
    updateUvIndex();
});

function getWeather() {
    const apiKey = 'e717f95d40a7b743e3507b7b88cc9075';
    const city = 'Narrabeen';

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching hourly forecast data:', error);
            alert('Error fetching hourly forecast data. Please try again.');
        });
}

function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    // Clear previous content
    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';

    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = 'Turimetta Beach';
        const temperature = Math.round(data.main.temp - 273.15); // Convert to Celsius
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHTML = `
            <p>${temperature}°C</p>
        `;

        const weatherHtml = `
            <p>${description}</p>
        `;

        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHtml;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();
    }
}

function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    const next24Hours = hourlyData.slice(0, 8); // Display the next 24 hours (3-hour intervals)

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15); // Convert to Celsius
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;

        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block'; // Make the image visible once it's loaded
}

// Get UV
function updateUvIndex() {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=-33.7128&longitude=151.2974&current=wind_speed_10m,wind_direction_10m&daily=uv_index_max&timezone=Australia%2FSydney')
        .then(response => response.json())
        .then(data => {
            // Log the full response to inspect the structure
            console.log('Full API Response:', data);

            // Ensure data is correctly structured and handle possible undefined values
            const windSpeed = data.current.wind_speed_10m;  // Check the actual key name from the console log
            const windDirection = data.current.wind_direction_10m; // Check the actual key name from the console log
            const UVIndex = data.daily.uv_index_max[0]; // Check the actual key name from the console log


            // Log the values for debugging
            console.log('Wind Speed:', windSpeed, 'km/h');
            console.log('Wind Direction:', windDirection, 'degrees');
            console.log('UV Index Max Today:', UVIndex);

            // Get the element by its ID
            let windElement = document.getElementById('dynamic-wind');
            let UVElement = document.getElementById('dynamic-uv');

            // wind speed
            if (windSpeed !== null) {
                windElement.textContent = `${windSpeed} km/h`;
            } else {
                // Fallback if windSpeed is null or undefined
                windElement.textContent = 'N/A';
            }

            // UV
            if (UVIndex !== null) {
                UVElement.textContent = `${UVIndex}`;
            } else {
                // Fallback if windSpeed is null or undefined
                UVElement.textContent = 'N/A';
            }
        })
        .catch(error => console.error('Error fetching UV and wind data:', error));
}
