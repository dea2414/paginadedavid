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
      // 1. Geocode ZIP to get lat/lon
      const geoResp = await fetch(`https://api.weather.gov/points/${zip}`);
      const geoData = await geoResp.json();
      if (!geoData.properties) throw new Error("Invalid ZIP Code");

      const forecastUrl = geoData.properties.forecast;
      const city = geoData.properties.relativeLocation.properties.city;

      // 2. Fetch Forecast
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
