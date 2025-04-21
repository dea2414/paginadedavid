// js/news.js
// Updated to use a CORS proxy (AllOrigins) for NewsAPI.org requests

/**
 * Fetches JSON from a URL, throwing an error on non-OK status.
 */
async function fetchJson(url) {
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`${resp.status} ${resp.statusText}`);
  return resp.json();
}

document.addEventListener("DOMContentLoaded", () => {
  const locSpan    = document.getElementById("location");
  const listDiv    = document.getElementById("news-list");
  const newsApiKey = "6557ae20719640869fbc4315ed58c427"; // Your NewsAPI.org key

  /**
   * Detects city via IP, tries ip-api.com over HTTPS, falls back to ipapi.co.
   */
  async function detectCity() {
    try {
      const data = await fetchJson("https://ip-api.com/json/");
      if (data.status === "success" && data.city) return data.city;
      throw new Error("ip-api.com returned no city");
    } catch {
      const data2 = await fetchJson("https://ipapi.co/json/");
      return data2.city || data2.region || "your area";
    }
  }

  /**
   * Loads and renders news for the detected city.
   */
  async function loadNews() {
    try {
      const city = await detectCity();
      locSpan.textContent = city;

      // Build NewsAPI URL
      const newsUrl = `https://newsapi.org/v2/top-headlines?q=${encodeURIComponent(city)}&pageSize=5&apiKey=${newsApiKey}`;
      // Wrap it via AllOrigins CORS proxy
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(newsUrl)}`;

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

  loadNews();
});
