// js/news.js
document.addEventListener("DOMContentLoaded", () => {
  const locSpan   = document.getElementById("location");
  const listDiv   = document.getElementById("news-list");
  const newsApiKey= "YOUR_NEWSAPI_KEY"; // ← paste your NewsAPI.org key

  // 1. Detect city by IP
  fetch("http://ip-api.com/json/")
    .then(res => res.json())
    .then(loc => {
      const city = loc.city || loc.regionName || "your area";
      locSpan.textContent = city;
      return city;
    })
    .then(city => {
      // 2. Fetch top headlines
      const url = `https://newsapi.org/v2/top-headlines?` +
                  `q=${encodeURIComponent(city)}` +
                  `&pageSize=5&apiKey=${newsApiKey}`;
      return fetch(url);
    })
    .then(res => res.json())
    .then(data => {
      if (data.status !== "ok") {
        listDiv.innerHTML = `<p>Error: ${data.message}</p>`;
        return;
      }
      if (!data.articles.length) {
        listDiv.innerHTML = "<p>No recent headlines found.</p>";
        return;
      }
      // 3. Render articles
      listDiv.innerHTML = "";
      data.articles.forEach((art) => {
        const div = document.createElement("div");
        div.className = "news-item";
        div.innerHTML = `
          <h3><a href="${art.url}" target="_blank">${art.title}</a></h3>
          <p>${art.source.name}</p>
        `;
        listDiv.appendChild(div);
      });
    })
    .catch(err => {
      console.error(err);
      listDiv.innerHTML = `<p>Network error: ${err.message}</p>`;
    });
});
