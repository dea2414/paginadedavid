document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("weather-form");
  const cityInput = document.getElementById("city");
  const resultDiv = document.getElementById("weather-result");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (!city) {
      resultDiv.innerHTML = "<p>Please enter a city.</p>";
      return;
    }

    // Your WeatherAPI.com key
    const apiKey = "YOUR_WEATHERAPI_KEY_HERE";

    // WeatherAPI current weather endpoint (Fahrenheit)
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=no`;

    try {
      const resp = await fetch(url);
      if (!resp.ok) {
        resultDiv.innerHTML = `<p>Error: ${resp.status} ${resp.statusText}</p>`;
        return;
      }
      const data = await resp.json();
      // Data.main.temp is replaced by data.current.temp_f in WeatherAPI response
      if (!data.current || typeof data.current.temp_f === "undefined") {
        resultDiv.innerHTML = `<p>Could not retrieve temperature for ${city}.</p>`;
        return;
      }
      const tempF = data.current.temp_f;
      const condition = data.current.condition.text;
      resultDiv.innerHTML = `
        <h2>Weather in ${data.location.name}, ${data.location.region}</h2>
        <p>${condition}</p>
        <p><strong>${tempF} °F</strong></p>
      `;
    } catch (err) {
      resultDiv.innerHTML = `<p>Error fetching weather: ${err.message}</p>`;
    }
  });
});
