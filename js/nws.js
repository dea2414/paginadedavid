document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("nws-form");
  const zipInput = document.getElementById("zip");
  const output = document.getElementById("nws-result");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const zip = zipInput.value.trim();
    if (!zip) {
      output.innerHTML = "<p>Please enter a ZIP Code.</p>";
      return;
    }
    await fetchForecast(zip);
  });

  async function fetchForecast(zip) {
    output.innerHTML = `<p>Loading forecast for ${zip}...</p>`;

    try {
      // 1. Convert ZIP → lat/lon using Zippopotam.us
      const geoResp = await fetch(`https://api.zippopotam.us/us/${zip}`);
      if (!geoResp.ok) throw new Error("Invalid ZIP Code");
      const geoData = await geoResp.json();
      const latitude = geoData.places[0].latitude;
      const longitude = geoData.places[0].longitude;

      // 2. Get forecast URL from weather.gov
      const pointResp = await fetch(`https://api.weather.gov/points/${latitude},${longitude}`);
      if (!pointResp.ok) throw new Error("Invalid coordinates or not found.");
      const pointData = await pointResp.json();
      const forecastUrl = pointData.properties.forecast;
      const city = pointData.properties.relativeLocation.properties.city;

      // 3. Fetch the forecast
      const forecastResp = await fetch(forecastUrl);
      const forecastData = await forecastResp.json();

      if (!forecastData.properties || !forecastData.properties.periods) {
        throw new Error("Forecast unavailable");
      }

      const current = forecastData.properties.periods[0]; // First period (usually today)
      output.innerHTML = `
        <h2>Forecast for ${city}</h2>
        <p><strong>${current.name}</strong>: ${current.detailedForecast}</p>
      `;

      // Auto refresh every 5 minutes (300000 ms)
      setTimeout(() => fetchForecast(zip), 300000);

    } catch (err) {
      console.error(err);
      output.innerHTML = `<p>Error: ${err.message}</p>`;
    }
  }
});
