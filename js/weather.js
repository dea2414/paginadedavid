// js/news.js
document.addEventListener("DOMContentLoaded", () => {
  const locSpan    = document.getElementById("location");
  const listDiv    = document.getElementById("news-list");
  const newsApiKey = "6557ae20719640869fbc4315ed58c427";

  async function fetchJson(url) {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`${resp.status} ${resp.statusText}`);
    return resp.json();
  }

  async function detectCity() {
    try {
      const data = await fetchJson("https://ip-api.com/json/");
      if (data.status === "success" && data.city) return data.city;
    } catch {}
    const data2 = await fetchJson("https://ipapi.co/json/");
    return data2.city || data2.region || "your area";
  }

  async function loadNews(city) {
    locSpan.textContent = city;
    listDiv.innerHTML   = `<p>Loading headlines for ${city}…</p>`;

    // Use the "everything" endpoint with qInTitle to match city in title
    const everythingUrl = 
      `https://newsapi.org/v2/everything?` +
      `qInTitle=${encodeURIComponent(city)}` +
      `&pageSize=5&language=en&sortBy=publishedAt&apiKey=${newsApiKey}`;

    // Proxy through AllOrigins to avoid CORS
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(everythingUrl)}`;

    try {
      const news = await fetchJson(proxyUrl);
      if (news.status !== "ok") {
        listDiv.innerHTML = `<p>Error: ${news.message}</p>`;
        return;
      }
      const articles = news.articles;
      if (!articles.length) {
        listDiv.innerHTML = `<p>No recent headlines with “${city}” in the title.</p>`;
        return;
      }
      listDiv.innerHTML = "";
      articles.forEach(art => {
        const div = document.createElement("div");
        div.className = "news-item";
        div.innerHTML = `
          <h3><a href="${art.url}" target="_blank">${art.title}</a></h3>
          <p><small>${new Date(art.publishedAt).toLocaleString()} – ${art.source.name}</small></p>
        `;
        listDiv.appendChild(div);
      });
    } catch (err) {
      console.error("News fetch failed:", err);
      listDiv.innerHTML = `<p>Network error: ${err.message}</p>`;
    }
  }

  // On load: detect and load
  detectCity()
    .then(loadNews)
    .catch(err => {
      console.error("City detection failed:", err);
      loadNews("your area");
    });
});
