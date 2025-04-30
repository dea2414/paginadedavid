// js/map.js
window.addEventListener('DOMContentLoaded', () => {
  fetch('https://ipapi.co/json/')            // get lat/lon
    .then(r => r.json())
    .then(loc => {
      const lat = loc.latitude, lon = loc.longitude;
      const map = L.map('map').setView([lat, lon], 6);
      L.tileLayer(
        `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=fcf78e5c32b166d2e4507c5f95e2fca7`, {
        maxZoom: 19,
        attribution: '&copy; OpenWeatherMap'
      }).addTo(map);
    })
    .catch(_ => {
      document.getElementById('map').textContent = 'map failed to load';
    });
});
