// js/map.js
window.addEventListener('DOMContentLoaded', () => {
  // fetch city and region by ip
  fetch('https://ipapi.co/json/')
    .then(res => res.json())
    .then(loc => {
      const id     = 'd9hBUyLEhTfmYcySdwiUS'      // your aeris client id
      const secret = 'ijQ1dVpW0zbYTWnvXEA6wL1zKmbYQTtCvqT1jP5h' // your aeris secret
      const place  = encodeURIComponent(`${loc.city},${loc.region}`)
      // build static map url (png only)
      const url = 
        `https://maps.aerisapi.com/` +
        `${id}_${secret}/` +
        `roads,forecast-precip/` +
        `600x400/` +
        `${place},6/` +
        `current.png`

      const mapDiv = document.getElementById('map')
      mapDiv.textContent = ''  // clear loading text

      // insert map image
      const img = document.createElement('img')
      img.src = url
      img.alt = `forecast for ${loc.city}`
      img.style.maxWidth = '100%'
      mapDiv.appendChild(img)

      // add direct link in case image fails
      const link = document.createElement('a')
      link.href = url
      link.textContent = 'open full map in new tab'
      link.target = '_blank'
      link.style.display = 'block'
      link.style.marginTop = '0.5em'
      mapDiv.appendChild(link)
    })
    .catch(() => {
      // show error if anything goes wrong
      document.getElementById('map').textContent = 'map failed to load'
    })
})
;
