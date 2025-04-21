// js/news.js
document.addEventListener("DOMContentLoaded", () => {
  const locSpan    = document.getElementById("location");
  const listDiv    = document.getElementById("news-list");
  const newsApiKey = "6557ae20719640869fbc4315ed58c427";

  // Helper: fetch JSON or throw
  async function fetchJson(url) {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`${resp.status} ${resp.statusText}`);
    return resp.json();
  }

  // 1. Get city by IP, try ip‑api.com over HTTPS, then fallback to ipapi.co
  async function detectCity() {
    try {
      const data = await fetchJson("https://ip-api.com/json/");
      if (data.status === "success" && data.city) return data.city;
      throw new Error("ip-api.com no city");
    } catch {
      // fallback
      const data2 = await fetchJson("https://ipapi.co/json/");
      return data2.city || data2.region || "your area";
    }
  }

  // 2. Fetch and render news for that city
  async function loadNews() {
    try {
      const city = await detectCity();
      locSpan.textContent = city;
      const url = `https://newsapi.org/v2/top-headlines?` +
                  `q=${encodeURIComponent(city)}` +
                  `&pageSize=5&apiKey=${newsApiKey}`;
      const news = await fetchJson(url);
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
