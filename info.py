import requests
from datetime import datetime

# Your WeatherAPI.com API key
api_key = "995f3434a9d748f2b1e22712240910"

# URL to request current marine data
url = f"http://api.weatherapi.com/v1/marine.json"

# Define parameters including location (latitude, longitude) and API key
params = {
    'key': api_key,
    'q': '-33.698769, 151.309912',  #coordinates for turimetta beach
}

# Make the API request
response = requests.get(url, params=params)

# Get the data as JSON
data = response.json()

if "forecast" in data:
    current_hour = datetime.utcnow().hour
    marine_data = next((hour for hour in data["forecast"]["forecastday"][0]["hour"] if hour["time_epoch"] >= datetime.utcnow().timestamp()), data["forecast"]["forecastday"][0]["hour"][current_hour])
    last_update = marine_data.get("last_updated", "No data available")
    uv = marine_data.get("uv", "No uv data available")
    temp = marine_data.get("temp_c", "No temp data available")
    wind_speed = marine_data.get("wind_kph", "No wind data available")
    print(f"updated: {last_update}")
    print(f"UV: {uv}")
    print(f"Temperature: {temp} Celcius")
    print(f"Wind Speed: {wind_speed} kph")
else:
    print("No data found")