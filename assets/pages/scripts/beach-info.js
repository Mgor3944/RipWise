// Pulls all data when dom is loaded
document.addEventListener('DOMContentLoaded', () => {
    getWeather();
    updateUvIndex();
    updateSwell();
});

function getWeather() {
    const apiKey = 'e717f95d40a7b743e3507b7b88cc9075';
    const city = 'Narrabeen';  //uses Narrabeen as a proxy for weather

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    // fetch weather
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

// displays the weather
function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    // Clear previous content
    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';

    // error handling
    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
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

// append html
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

// make image of weather icon visible
function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block'; // Make the image visible once it's loaded
}

// Get UV (and other data)
function updateUvIndex() {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=-33.8915&longitude=151.2767&current=wind_speed_10m,wind_direction_10m&hourly=wind_speed_10m,uv_index&timezone=Australia%2FSydney&past_hours=24&forecast_days=1&forecast_hours=24&cell_selection=nearest')
        .then(response => response.json())
        .then(data => {
            // Log the full response to inspect the structure
            console.log('Full API Response:', data);

            // Ensure data is correctly structured and handle possible undefined values
            const windSpeed = data.current?.wind_speed_10m;  // Check if the key exists to avoid errors
            const windDirection = data.current?.wind_direction_10m; // Check if the key exists to avoid errors
            const timeArray = data.hourly?.time || [];
            const windSpeedArray = data.hourly?.wind_speed_10m || [];
            const uvIndexArray = data.hourly?.uv_index || [];

            // Get the current date in the format 'YYYY-MM-DD'
            const currentDate = new Date().toLocaleDateString('en-CA'); // Format as YYYY-MM-DD
            const now = new Date();
            const currentHour = now.getHours();
            

            // Find the starting index for the current day at midnight
            const startIndex = timeArray.findIndex(time => time.startsWith(`${currentDate}T00:00`));
            console.log("start index: " + startIndex);
            console.log(currentDate);

            // If the startIndex is -1, it means there is no data for the current day
            if (startIndex === -1) {
                console.error("No data available for the current day.");
                return;
            }

            // Slice arrays to get the 24 hours of the current day (from midnight to 23:00)
            const slicedTimeArray = timeArray.slice(startIndex, startIndex + 24);
            const slicedWindSpeedArray = windSpeedArray.slice(startIndex, startIndex + 24);
            const slicedUvIndexArray = uvIndexArray.slice(startIndex, startIndex + 24);
            

            // Convert the arrays to floats
            const windSpeedArrayAsFloat = slicedWindSpeedArray.map(value => parseFloat(value));
            const uvIndexArrayAsFloat = slicedUvIndexArray.map(value => parseFloat(value));

            // Find max values and the index of max UV
            const maxWindSpeed = Math.max(...windSpeedArrayAsFloat);
            const maxUvIndex = Math.max(...uvIndexArrayAsFloat);
            const maxUvIndexIndex = uvIndexArrayAsFloat.indexOf(maxUvIndex);

            let maxUvHour = null;
            if (maxUvIndexIndex !== -1) {
                const maxUvTime = slicedTimeArray[maxUvIndexIndex];
                maxUvHour = new Date(maxUvTime).getHours();
            }

            // Convert the max UV time to a more readable format (e.g., 1:00 PM)
            let maxUvTimeFormatted = 'time unavailable';
            if (maxUvHour !== null) {
                maxUvTimeFormatted = maxUvHour > 12
                    ? `${maxUvHour - 12}:00 PM`
                    : `${maxUvHour === 0 ? 12 : maxUvHour}:00 AM`;
            }

            // Find current UV index
            const currentUvIndex = Math.round(slicedUvIndexArray[currentHour]);
            

            // Log the current values
            console.log('currentHour is: ', currentHour);
            console.log('UV index array: ', slicedUvIndexArray);
            console.log('Wind Speed:', windSpeed, 'km/h');
            console.log('Wind Direction:', windDirection, 'degrees');
            console.log('current UV', currentUvIndex);
            console.log('max Wind Speed', maxWindSpeed);
            console.log('max Uv Index', maxUvIndex);
            console.log('Max UV index time:', maxUvTimeFormatted);

            // Get the element by its ID
            let windElement = document.getElementById('dynamic-wind');
            let currentUvElement = document.getElementById('dynamic-uv');
            let maxUvElement = document.getElementById('dynamic-uv-max');
            let maxWindElement = document.getElementById('dynamic-wind-max');
            let maxUvTimeElement = document.querySelector('.beach-info-bottom .beach-info-max-today.sub');

            // wind speed
            if (windSpeed !== null) {
                windElement.textContent = `${windSpeed} km/h`;
            } else {
                // Fallback if windSpeed is null or undefined
                windElement.textContent = 'Unavailable';
            }

            // Current UV
            if (currentUvIndex !== null) {
                currentUvElement.textContent = `${currentUvIndex}`;
            } else {
                // Fallback if currentUvIndex is null or undefined
                currentUvElement.textContent = 'Unavailable';
            }

            // Max UV
            if (maxUvIndex !== null) {
                maxUvElement.textContent = `${Math.round(maxUvIndex)}`;
            } else {
                // Fallback if maxUvIndex is null or undefined
                maxUvElement.textContent = 'N/A';
            }

            // Max Wind Speed
            if (!isNaN(maxWindSpeed)) {
                maxWindElement.textContent = `${Math.round(maxWindSpeed)} km/h`;
            } else {
                // Fallback if maxWindSpeed is null or undefined
                maxWindElement.textContent = 'N/A';
            }

            // Update the max UV time element
            if (maxUvTimeFormatted) {
                maxUvTimeElement.textContent = `(around ${maxUvTimeFormatted})`;
            } else {
                maxUvTimeElement.textContent = '(time unavailable)';
            }
        })
        .catch(error => console.error('Error fetching UV and wind data:', error));
}

// function to handle swell data
function updateSwell() {
    fetch('https://marine-api.open-meteo.com/v1/marine?latitude=-33.8915&longitude=151.2767&hourly=wave_height,wave_direction,wave_period&length_unit=imperial&timezone=Australia%2FSydney&forecast_days=1&models=best_match')
    .then(response => response.json())
    .then(data => {
        const waveHeight = data.hourly.wave_height; 
        const waveDirection = data.hourly.wave_direction; 
        const wavePeriod = data.hourly.wave_period;

        // Get the current hour in the timezone of the forecast
        const currentHour = new Date().getHours();

        // Get the corresponding values for the current hour
        const currentWaveHeight = waveHeight[currentHour];
        const currentWaveDirection = waveDirection[currentHour];
        const currentWavePeriod = wavePeriod[currentHour];

        // Log the current values for debugging
        console.log(`Current hour: ${currentHour}`);
        console.log(`Wave height at hour ${currentHour}: ${currentWaveHeight} ft`);
        console.log(`Wave direction at hour ${currentHour}: ${currentWaveDirection} degrees`);
        console.log(`Wave period at hour ${currentHour}: ${currentWavePeriod} seconds`);

        // Formula for calculating surf height from wave height and swell period- based on a rule of thumb
        let surfHeight = Math.round(currentWaveHeight * 0.55 * (currentWavePeriod / 10));
        let surfHeightBigger = surfHeight + 1;
        let surfHeightConjugated = `${surfHeight}-${surfHeightBigger}`;

        let surfElement = document.getElementById('dynamic-swell');
        let swellDirectionElement = document.getElementById('dynamic-swell-max');

        // Determine cardinal direction from wave direction in degrees
        const cardinalDirection = getCardinalDirection(currentWaveDirection);

        if (surfHeightConjugated !== null) {
            surfElement.textContent = `${surfHeightConjugated} ft`;
        } else {
            // Fallback if surfHeight is null or undefined
            surfElement.textContent = 'N/A';
        }

        if (cardinalDirection !== null) {
            swellDirectionElement.textContent = `${cardinalDirection}`;
        } else {
            // Fallback if waveDirection is null or undefined
            swellDirectionElement.textContent = 'N/A';
        }
    })
    .catch(error => console.error('Error fetching swell data:', error));
}

// Utility function to convert degrees to cardinal direction
function getCardinalDirection(degrees) {
    const directions = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
}
