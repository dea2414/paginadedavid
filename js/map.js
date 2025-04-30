// js/map.js
window.addEventListener('DOMContentLoaded', () => {
  // 1) lookup city & region (HTTPS)
  fetch('https://ipapi.co/json/')
    .then(r => r.json())
    .then(loc => {
      const mapDiv = document.getElementById('map');
      mapDiv.textContent = ''; // clear "loading…"

      // 2) your Aeris creds
      const id     = 'd9hBUyLEhTfmYcySdwiUS';      // client ID
      const secret = 'ijQ1dVpW0zbYTWnvXEA6wL1zKmbYQTtCvqT1jP5h'; // secret

      // 3) build the static-map URL (PNG forecast)
      const place = encodeURIComponent(`${loc.city},${loc.region}`);
      const url = [
        'https://maps.aerisapi.com/',
        `${id}_${secret}/`,
        'roads,forecast-precip/',  // layer: 24h precip + roads
        '600x400/',                // size
        `${place},6/`,             // center (city,region) + zoom
        'current.png'              // PNG image
      ].join('');

      // 4) try to load the image
      const img = document.createElement('img');
      img.src = url;
      img.alt = `forecast for ${loc.city}`;
      img.style.maxWidth = '100%';
      mapDiv.appendChild(img);

      // 5) always include a direct link as fallback
      const link = document.createElement('a');
      link.href = url;
      link.textContent = 'open full map in new tab';
      link.target = '_blank';
      link.style.display = 'block';
      link.style.marginTop = '0.5em';
      mapDiv.appendChild(link);
    })
    .catch(err => {
      console.error('map load error:', err);
      document.getElementById('map').textContent = 'map failed to load';
    });
});
