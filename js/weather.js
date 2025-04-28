// js/weather.js
document.addEventListener("DOMContentLoaded", () => {
  const form      = document.getElementById("weather-form");
  const cityInput = document.getElementById("city");
  const output    = document.getElementById("weather-result");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (!city) {
      output.innerHTML = "<p>Please enter a city name.</p>";
      return;
    }

    const apiKey = "d65e0394269143c193e215726251404";
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

      const { location, current } = data;
      const {
        temp_f,
        temp_c,
        condition,
        humidity,
        wind_mph,
        wind_kph,
        uv,
        feelslike_f,
        feelslike_c,
        precip_in,
        precip_mm
      } = current;

      output.innerHTML = `
        <h2>Weather in ${location.name}, ${location.region}</h2>
        <p><img src="https:${condition.icon}" alt="${condition.text}"> ${condition.text}</p>
        <ul style="list-style-type: none; padding: 0;">
          <li><strong>Temperature:</strong> ${temp_f} °F (${temp_c} °C)</li>
          <li><strong>Feels Like:</strong> ${feelslike_f} °F (${feelslike_c} °C)</li>
          <li><strong>Humidity:</strong> ${humidity}%</li>
          <li><strong>Wind:</strong> ${wind_mph} mph (${wind_kph} kph)</li>
          <li><strong>Precipitation:</strong> ${precip_in} in (${precip_mm} mm)</li>
          <li><strong>UV Index:</strong> ${uv}</li>
        </ul>
      `;

    } catch (err) {
      console.error(err);
      output.innerHTML = `<p>Network error: ${err.message}</p>`;
    }
  });
});
