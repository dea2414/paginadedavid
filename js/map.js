// js/map.js
window.addEventListener('DOMContentLoaded', () => {
  fetch('/api/location')
    .then(r => r.json())
    .then(loc => {
      const place = encodeURIComponent(`${loc.city},${loc.region}`);
      const id     = 'd9hBUyLEhTfmYcySdwiUS';     // your Client ID
      const secret = 'ijQ1dVpW0zbYTWnvXEA6wL1zKmbYQTtCvqT1jP5h'; // your Secret

      const layers = 'flat,forecast-precip';
      const size   = '600x400';
      const zoom   = 6;
      const ext    = 'gif';   // or 'jpg'

      const src = [
        'https://maps.api.xweather.com/',
        `${id}_${secret}/`,
        `${layers}/`,
        `${size}/`,
        `${place}/`,
        `${zoom}/`,
        `current.${ext}`
      ].join('');

      document.getElementById('map')
              .innerHTML = `<img src="${src}" alt="forecast for ${loc.city}">`;
    })
    .catch(err => {
      console.error(err);
      document.getElementById('map').textContent = 'map failed to load';
    });
});
