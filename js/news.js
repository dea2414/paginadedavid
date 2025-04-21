// js/news.js
document.addEventListener("DOMContentLoaded", () => {
  const locSpan    = document.getElementById("location");
  const listDiv    = document.getElementById("news-list");
  const newsApiKey = "6557ae20719640869fbc4315ed58c427";

  const overrideInput = document.getElementById("city-input");
  const overrideBtn   = document.getElementById("city-btn");

  // Helper to fetch JSON and throw on HTTP errors
  async function fetchJson(url) {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`${resp.status} ${resp.statusText}`);
    return resp.json();
  }

  // Detect city by IP (HTTPS), fallback if needed
  async function detectCity() {
    try {
      const data = await fetchJson("https://ip-api.com/json/");
      if (data.status === "success" && data.city) return data.city;
    } catch {}
    try {
      const data2 = await fetchJson("https://ipapi.co/json/");
      return data2.city || data2.region || "your area";
    } catch {
      return "your area";
    }
  }

  // Fetch and render news for a given city
  async function loadNews(city) {
    locSpan.textContent = city;
    listDiv.innerHTML   = `<p>Loading news for ${city}…</p>`;

    const newsUrl = `https://newsapi.org/v2/top-headlines?` +
                    `q=${encodeURIComponent(city)}` +
                    `&pageSize=5&apiKey=${newsApiKey}`;
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(newsUrl)}`;

    try {
      const news = await fetchJson(proxyUrl);
      if (news.status !== "ok") {
        listDiv.innerHTML = `<p>Error: ${news.message}</p>`;
        return;
      }
      const articles = news.articles;
      if (!articles.length) {
        listDiv.innerHTML = "<p>No recent headlines found.</p>";
        return;
      }
      listDiv.innerHTML = "";
      articles.forEach(art => {
        const div = document.createElement("div");
        div.className = "news-item";
        div.innerHTML = `
          <h3><a href="${art.url}" target="_blank">${art.title}</a></h3>
          <p>${art.source.name}</p>
        `;
        listDiv.appendChild(div);
      });
    } catch (err) {
      console.error(err);
      listDiv.innerHTML = `<p>Network error: ${err.message}</p>`;
    }
  }

  // On load: auto-detect city then load news
  detectCity().then(loadNews).catch(err => {
    console.error(err);
    locSpan.textContent = "your area";
    listDiv.innerHTML = `<p>Could not detect location.</p>`;
  });

  // On override button click: load news for typed city
  overrideBtn.addEventListener("click", () => {
    const city = overrideInput.value.trim();
    if (city) loadNews(city);
  });
});
