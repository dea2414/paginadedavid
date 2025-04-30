// js/map.js (v2)  
window.addEventListener('DOMContentLoaded', () => {
  fetch('https://ipapi.co/json/')           // https geolookup
    .then(r => r.json())
    .then(loc => {
      const mapDiv = document.getElementById('map');
      mapDiv.textContent = '';              // clear “loading…”

      // your Aeris credentials exactly as shown in your Demo App
      const id     = 'd9hBUyLEhTfmYcySdwiUS';
      const secret = 'ijQ1dVpW0zbYTWnvXEA6wL1zKmbYQTtCvqT1jP5h';

      // build a PNG-only, 24-hr precip forecast + roads map
      const place = encodeURIComponent(`${loc.city},${loc.region}`);
      const url = [
        'https://maps.aerisapi.com/',
        `${id}_${secret}/`,
        'roads,forecast-precip/',  // layer
        '600x400/',                // size
        `${place},6/`,             // center,zoom
        'current.png'              // png format only
      ].join('');

      // insert the <img>
      const img = document.createElement('img');
      img.src = url;
      img.alt = `forecast for ${loc.city}`;
      img.style.maxWidth = '100%';
      mapDiv.appendChild(img);

      // fallback link (always shown)
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
