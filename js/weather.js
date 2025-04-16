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

    // Replace with your valid OpenWeather API key
    const apiKey = "d65e0394269143c193e215726251404";
    
    // Endpoint for current weather in Fahrenheit
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=imperial&appid=${apiKey}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        // Show the error message from the response, e.g. "Unauthorized"
        resultDiv.innerHTML = `<p>Error: ${response.statusText}</p>`;
        return;
      }
      const data = await response.json();

      // If the API responds with an error code or missing data:
      if (!data.main || typeof data.main.temp === "undefined") {
        resultDiv.innerHTML = `<p>Could not retrieve temperature for ${city}.</p>`;
        return;
      }

      const temp = data.main.temp;
      resultDiv.innerHTML = `<p>The temperature in <strong>${city}</strong> is <strong>${temp}</strong> °F.</p>`;
    } catch (err) {
      resultDiv.innerHTML = `<p>Error fetching weather: ${err.message}</p>`;
    }
  });
});
