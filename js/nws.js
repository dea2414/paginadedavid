// js/nws.js
// Uses user's IP to auto-detect their city and fetch alerts and forecast
// Also allows manual ZIP override

const form = document.getElementById("nws-form");
const zipInput = document.getElementById("zip");
const output = document.getElementById("nws-result");
let currentZip = "";

// Convert ZIP to lat/lon using Zippopotam.us
async function zipToCoords(zip) {
  const resp = await fetch(`https://api.zippopotam.us/us/${zip}`);
  if (!resp.ok) throw new Error("Invalid ZIP code");
  const data = await resp.json();
  return {
    zip,
    city: data.places[0]["place name"],
    lat: data.places[0].latitude,
    lon: data.places[0].longitude
  };
}

// Detect ZIP using ipapi
async function detectZipByIP() {
  const data = await fetch("https://ipapi.co/json/").then(r => r.json());
  return data.postal;
}

// Get alerts from api.weather.gov/alerts for the lat/lon
async function getAlerts(lat, lon) {
  const resp = await fetch(`https://api.weather.gov/alerts/active?point=${lat},${lon}`);
  const data = await resp.json();
  return data.features || [];
}

// Get forecast from api.weather.gov
async function getForecast(lat, lon) {
  const pointResp = await fetch(`https://api.weather.gov/points/${lat},${lon}`);
  const pointData = await pointResp.json();
  const forecastUrl = pointData.properties.forecast;
  const forecastResp = await fetch(forecastUrl);
  const forecastData = await forecastResp.json();
  return forecastData.properties.periods[0];
}

// Haversine formula to calculate distance between 2 lat/lon points in miles
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 3958.8; // miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat/2)**2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2)**2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return (R * c).toFixed(1);
}

async function showWeatherFor(zip) {
  try {
    const { city, lat, lon } = await zipToCoords(zip);
    const forecast = await getForecast(lat, lon);
    const alerts = await getAlerts(lat, lon);

    let html = `<h2>Weather for ${city} (${zip})</h2>`;
    html += `<p><strong>${forecast.name}:</strong> ${forecast.detailedForecast}</p>`;

    if (alerts.length > 0) {
      html += `<h3>Active Alerts:</h3><ul>`;
      for (const alert of alerts) {
        const alertLat = alert.geometry?.coordinates[1];
        const alertLon = alert.geometry?.coordinates[0];
        const dist = (alertLat && alertLon) ? calculateDistance(lat, lon, alertLat, alertLon) : "N/A";
        html += `<li><strong>${alert.properties.event}</strong>: ${alert.properties.headline}<br/>Distance: ${dist} miles</li>`;
      }
      html += `</ul>`;
    } else {
      html += `<p>No active severe weather alerts at this time.</p>`;
    }

    output.innerHTML = html;
    currentZip = zip;
  } catch (err) {
    console.error(err);
    output.innerHTML = `<p>Error: ${err.message}</p>`;
  }
}

// Auto-detect and refresh every 5 minutes
async function autoUpdate() {
  try {
    if (!currentZip) {
      const detected = await detectZipByIP();
      await showWeatherFor(detected);
    } else {
      await showWeatherFor(currentZip);
    }
  } catch (err) {
    console.error("Auto-update error:", err);
  }
  setTimeout(autoUpdate, 300000); // every 5 mins
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const zip = zipInput.value.trim();
  if (zip) showWeatherFor(zip);
});

autoUpdate();
