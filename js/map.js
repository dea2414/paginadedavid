// js/map.js
window.addEventListener('DOMContentLoaded', () => {
  const id     = 'd9hBUyLEhTfmYcySdwiUS';      // your Aeris client ID
  const secret = 'ijQ1dVpW0zbYTWnvXEA6wL1zKmbYQTtCvqT1jP5h'; // your Aeris secret

  console.log('map.js loaded, fetching location…');

  fetch('https://ipapi.co/json/')
    .then(res => res.json())
    .then(loc => {
      console.log('resolved to', loc.city, loc.region);

      // build “place,zoom” in one segment
      const place = encodeURIComponent(`${loc.city},${loc.region}`);
      const zoom  = 6;

      // static map URL (Aeris)
      const url = 
        `https://maps.aerisapi.com/` +
        `${id}_${secret}/` +                            // creds
        `roads,forecast-precip/` +                      // your layers
        `600x400/` +                                    // size
        `${place},${zoom}/` +                           // center,zoom
        `current.gif`;                                  // animated forecast

      console.log('map url →', url);

      document
        .getElementById('map')
        .innerHTML = `<img src="${url}" alt="forecast for ${loc.city}">`;
    })
    .catch(err => {
      console.error('something went wrong:', err);
      document.getElementById('map').textContent = 'map failed to load';
    });
});
