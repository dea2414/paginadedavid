document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("weather-form");
  const cityInput = document.getElementById("city");
  const output = document.getElementById("weather-result");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (!city) {
      output.innerHTML = "<p>Please enter a city name.</p>";
      return;
    }

    const apiKey = "d65e0394269143c193e215726251404"; // your correct key
    const url =
      "https://api.weatherapi.com/v1/current.json" +
      `?key=${apiKey}` +
      `&q=${encodeURIComponent(city)}` +
      "&aqi=no";

    try {
      const resp = await fetch(url);
      const data = await resp.json();

      if (data.error) {
        output.innerHTML = `<p>Error: ${data.error.message}</p>`;
        return;
      }

      const tempF = data.current.temp_f;
      const condition = data.current.condition.text;
      const loc = data.location;
      output.innerHTML = `
        <h2>Weather in ${loc.name}, ${loc.region}</h2>
        <p>${condition}</p>
        <p><strong>${tempF} °F</strong></p>
      `;
    } catch (err) {
      console.error(err);
      output.innerHTML = `<p>Network error: ${err.message}</p>`;
    }
  });
});
