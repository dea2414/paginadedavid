// js/map.js
 window.addEventListener('DOMContentLoaded', () => {
-  // this was HTTP-only, so it fails on HTTPS pages
-  fetch('https://ip-api.com/json/?fields=city,region')
+  // switch to ipapi.co, which supports HTTPS
+  fetch('https://ipapi.co/json/')
     .then(res => res.json())
     .then(loc => {
       const place  = encodeURIComponent(`${loc.city},${loc.region}`);
       const id     = 'd9hBUyLEhTfmYcySdwiUS';
       const secret = 'ijQ1dVpW0zbYTWnvXEA6wL1zKmbYQTtCvqT1jP5h';

       const url = [
         'https://maps.aerisapi.com/',
         `${id}_${secret}/`,
         'roads,forecast-precip/',  // layer
         '600x400/',                // size
         `${place}/`,               // location
         '6/',                      // zoom
         'current.gif'              // format
       ].join('');

       document.getElementById('map').innerHTML =
         `<img src="${url}" alt="forecast for ${loc.city}" />`;
     })
     .catch(err => {
       console.error('geolookup failed:', err);
       document.getElementById('map').textContent = 'map failed to load';
     });
});
