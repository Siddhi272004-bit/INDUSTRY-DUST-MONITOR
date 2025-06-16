//Leaflet Map
const map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Add a Marker with a Popup
L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('A pretty CSS popup.<br> Easily customizable.')
    .openPopup();

// Location Finder 
const input = document.getElementById("locationInput");
const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", () => {
  const location = input.value;
  if (location) {
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);
          map.setView([lat, lon], 13); // Set map view to the searched location
          L.marker([lat, lon]).addTo(map) // Add a marker for the searched location
            .bindPopup(`Location: ${location}`)
            .openPopup();
          fetchAirQualityData(lat, lon); // Fetch air quality data for the location
        } 
        
        else {
          alert("Location not found. Please try again.");
        }
      })
      .catch(error => {
        console.error("Error fetching location data:", error);
      });
  }
});

// Fetch Air Quality Data from OpenWeatherMap API
async function fetchAirQualityData(lat, lng) {
  const apiKey = "6f0d396f584163675485322c2ac8ad45"; // Replace with your API key
  const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lng}&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    updateAirQualityUI(data); // Update the UI with air quality data
  } catch (error) {
    console.error("Error fetching air quality data:", error);
  }
}

// Update Air Quality UI
function updateAirQualityUI(data) {
  const aqi = data.list[0].main.aqi;
  const pollutants = data.list[0].components;

  // Update Air Quality Circle
  let quality;
  if (aqi === 1) quality = "Good";
  else if (aqi === 2) quality = "Moderate";
  else if (aqi === 3) quality = "Unhealthy";
  else if (aqi === 4) quality = "Very Unhealthy";
  else quality = "Hazardous";
  updateAirQuality(quality);

  // Update Pollutant Values
  document.getElementById("pm25").textContent = pollutants.pm2_5;
  document.getElementById("pm10").textContent = pollutants.pm10;
  document.getElementById("co").textContent = pollutants.co;
  document.getElementById("no2").textContent = pollutants.no2;
}

// Update Air Quality Circle
function updateAirQuality(quality) {
  const airQualityCircle = document.getElementById("airQualityCircle");
  const airQualityText = document.getElementById("airQualityText");

  let color;
  switch (quality) {
    case "Good":
      color = "#00b09b";
      break;
    case "Moderate":
      color = "#ff9a00";
      break;
    case "Unhealthy":
      color = "#ff4757";
      break;
    case "Very Unhealthy":
      color = "#8b0000";
      break;
    case "Hazardous":
      color = "#800080";
      break;
    default:
      color = "#000000";
  }
  airQualityCircle.style.background = `linear-gradient(135deg, ${color}, ${color}77)`;
  airQualityText.textContent = quality;
}