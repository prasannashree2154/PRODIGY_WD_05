const apiKey = 'YOUR_API_KEY_HERE'; // Replace with your OpenWeatherMap API key
const weatherInfo = document.getElementById('weather-info');
const locationElement = document.getElementById('location');
const descriptionElement = document.getElementById('description');
const temperatureElement = document.getElementById('temperature');
const humidityElement = document.getElementById('humidity');
const windElement = document.getElementById('wind');

document.getElementById('search-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const city = document.getElementById('city-input').value;
  if (city) {
    getWeatherByCity(city);
  }
});

document.getElementById('current-location').addEventListener('click', function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        getWeatherByCoords(lat, lon);
      },
      () => alert("Unable to fetch location.")
    );
  } else {
    alert("Geolocation not supported by your browser.");
  }
});

function getWeatherByCity(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => displayWeather(data))
    .catch(err => alert("Error fetching weather data."));
}

function getWeatherByCoords(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => displayWeather(data))
    .catch(err => alert("Error fetching weather data."));
}

function displayWeather(data) {
  if (data.cod !== 200) {
    alert(data.message);
    return;
  }

  locationElement.textContent = `Location: ${data.name}, ${data.sys.country}`;
  descriptionElement.textContent = `Condition: ${data.weather[0].description}`;
  temperatureElement.textContent = `Temperature: ${data.main.temp}°C`;
  humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
  windElement.textContent = `Wind Speed: ${data.wind.speed} m/s`;
}
