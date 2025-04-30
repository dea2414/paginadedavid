// js/map.js  (v3)
window.addEventListener('DOMContentLoaded', () => {
  const mapDiv = document.getElementById('map');
  const id     = 'd9hBUyLEhTfmYcySdwiUS';     // your Aeris Client ID
  const secret = 'ijQ1dVpW0zbYTWnvXEA6wL1zKmbYQTtCvqT1jP5h'; // your Aeris Secret

  fetch('https://ipapi.co/json/')
    .then(res => res.json())
    .then(loc => {
      mapDiv.textContent = '';  // clear “loading…”

      // use numeric lat,lng for center
      const lat = loc.latitude;
      const lon = loc.longitude;
      const centerZoom = `${lat},${lon},6`; // lat,lon,zoom

      // build the Static Maps URL (png only)
      const url = [
        'https://maps.aerisapi.com/',
        `${id}_${secret}/`,
        'roads,forecast-precip/',  // layer: 24h precip forecast + roads
        '600x400/',                // size
        `${centerZoom}/`,          // center+zoom
        'current.png'              // png format
      ].join('');

      // insert the image
      const img = document.createElement('img');
      img.src = url;
      img.alt = `forecast for ${loc.city}`;
      img.style.maxWidth = '100%';
      mapDiv.appendChild(img);

      // fallback link
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
      mapDiv.textContent = 'map failed to load';
    });
});
