// js/map.js
window.addEventListener('DOMContentLoaded', () => {
  // 1) lookup city/region by visitor IP
  fetch('https://ip-api.com/json/?fields=city,region')
    .then(res => res.json())
    .then(loc => {
      const place  = encodeURIComponent(`${loc.city},${loc.region}`);
      const id     = 'd9hBUyLEhTfmYcySdwiUS';      // your Aeris Client ID
      const secret = 'ijQ1dVpW0zbYTWnvXEA6wL1zKmbYQTtCvqT1jP5h'; // your Aeris Secret

      // 2) build the static-map URL
      const url = [
        'https://maps.aerisapi.com/',
        `${id}_${secret}/`,
        'roads,forecast-precip/',  // layer: 24h precip forecast + roads
        '600x400/',                // size
        `${place}/`,               // city,region
        '6/',                      // zoom
        'current.gif'              // gif animation (or .png/.jpg)
      ].join('');

      // 3) inject the image
      document.getElementById('map').innerHTML =
        `<img src="${url}" alt="forecast for ${loc.city}" />`;
    })
    .catch(err => {
      console.error(err);
      document.getElementById('map').textContent = 'map failed to load';
    });
});
