const weatherForm = document.getElementById('weather-form');
const cityInput = document.getElementById('city');
const locationEl = document.getElementById('location');
const temperatureEl = document.getElementById('temperature');
const humidityEl = document.getElementById('humidity');
const conditionEl = document.getElementById('condition');
const weatherIcon = document.getElementById('icon');
const body = document.body;

const weatherApiKey = 'e3a44cd9569f45588e431152250402'; // Replace with your WeatherAPI key
const unsplashApiKey = 'gOB-5k4sRY5kpG8n63mQh-7aC_3CvhpmiT2jzR-Z3Vw'; // Replace with your Unsplash API key

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();
  if (!city) return;

  fetchWeather(city)
    .then((weatherData) => {
      updateWeatherUI(weatherData);
      return fetchBackgroundImage(city);
    })
    .then((imageUrl) => {
      body.style.backgroundImage = `url(${imageUrl})`;
    })
    .catch((err) => {
      alert('Error fetching data. Please try again.');
      console.error(err);
    });
});

function fetchWeather(city) {
  const url = `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${city}`;
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    });
}

function updateWeatherUI(data) {
  const { location, current } = data;
  locationEl.textContent = `${location.name}, ${location.country}`;
  temperatureEl.textContent = `Temperature: ${current.temp_c}°C`;
  humidityEl.textContent = `Humidity: ${current.humidity}%`;
  conditionEl.textContent = `Condition: ${current.condition.text}`;
  weatherIcon.src = `https:${current.condition.icon}`;
}

function fetchBackgroundImage(query) {
  const unsplashUrl = `https://api.unsplash.com/photos/random?query=${query}&client_id=${unsplashApiKey}`;
  return fetch(unsplashUrl)
    .then((response) => response.json())
    .then((data) => data.urls.full);
}
