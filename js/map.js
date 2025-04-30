// js/map.js
window.addEventListener('DOMContentLoaded', () => {
  console.log('map.js loaded')
  // get city+region over https
  fetch('https://ipapi.co/json/')
    .then(r => r.json())
    .then(loc => {
      console.log('location:', loc.city, loc.region)
      const place  = encodeURIComponent(`${loc.city},${loc.region}`)
      const id     = 'd9hBUyLEhTfmYcySdwiUS'      // your client id
      const secret = 'ijQ1dVpW0zbYTWnvXEA6wL1zKmbYQTtCvqT1jP5h' // your secret

      // build xweather static-map url
      const url = [
        'https://maps.api.xweather.com/',
        `${id}_${secret}/`,
        'roads,forecast-precip/',  // layer
        '600x400/',                // size
        `${place}/`,               // location
        '6/',                      // zoom
        'current.gif'              // format
      ].join('')
      console.log('map url:', url)

      // inject the image
      const img = `<img src="${url}" alt="forecast for ${loc.city}" />`
      document.getElementById('map').innerHTML = img
    })
    .catch(err => {
      console.error('failed to load map data', err)
      document.getElementById('map').textContent = 'map failed to load'
    })
})
