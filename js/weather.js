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
    const apiKey = "d65e0394269143c193e215726251404"; // Your API key from OpenWeather
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=imperial&appid=${apiKey}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        resultDiv.innerHTML = `<p>Error: ${response.statusText}</p>`;
        return;
      }
      const data = await response.json();
      const temp = data.main ? data.main.temp : "N/A";
      resultDiv.innerHTML = `<p>The temperature in <strong>${city}</strong> is <strong>${temp}</strong> °F.</p>`;
    } catch (err) {
      resultDiv.innerHTML = `<p>Error fetching weather: ${err.message}</p>`;
    }
  });
});