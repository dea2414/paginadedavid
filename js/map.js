// js/map.js (version 2)
window.addEventListener('DOMContentLoaded', () => {
  // 1) lookup city & region over HTTPS
  fetch('https://ipapi.co/json/')
    .then(res => res.json())
    .then(loc => {
      const mapDiv = document.getElementById('map');
      mapDiv.textContent = ''; // clear "loading…"

      // 2) your Aeris credentials (copy EXACTLY from your dashboard)
      const id     = 'd9hBUyLEhTfmYcySdwiUS';       // client ID
      const secret = 'ijQ1dVpW0zbYT WnvXEA6wL1zKmbYQTtCvqT1jP5h'.replace(' ', ''); // secret

      // 3) build the static‐map URL (PNG forecast)
      const place = encodeURIComponent(`${loc.city},${loc.region}`);
      const url = [
        'https://maps.aerisapi.com/',
        `${id}_${secret}/`,
        'roads,forecast-precip/',  // 24h precip forecast + roads
        '600x400/',                // size
        `${place},6/`,             // center (city,region) + zoom
        'current.png'              // **PNG** image
      ].join('');

      // 4) insert the <img>
      const img = document.createElement('img');
      img.src = url;
      img.alt = `forecast for ${loc.city}`;
      img.style.maxWidth = '100%';
      mapDiv.appendChild(img);

      // 5) always provide a clickable link fallback
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
