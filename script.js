document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("login-btn");
  const select = document.getElementById("profile-select");

  if (btn && select) {
    btn.onclick = () => {
      const val = select.value;
      if (val) {
        localStorage.setItem("profile", val);
        window.location.href = "dashboard.html";
      }
    };
  }

  if (window.location.pathname.includes("dashboard.html")) {
    const type = localStorage.getItem("profile") || "guest";
    const msg = document.getElementById("welcome-message");
    const out = document.getElementById("custom-content");

    const views = {
      recruiter: ["Hello Recruiter", '<a href="projects.html" class="btn">View Projects</a>'],
      friend: ["Hey Friend", '<a href="blog.html" class="btn">Read Blog</a>'],
      family: ["Hi Family", '<a href="contact.html" class="btn">Contact Me</a>'],
      stalker: ["...you found me?", '🕵️‍♂️'],
      guest: ["Welcome", "No profile selected."]
    };

    msg.textContent = views[type][0];
    out.innerHTML = views[type][1];
  }

  const toggle = document.getElementById("dark-mode-toggle");
  if (toggle) {
    if (localStorage.getItem("dark") === "1") document.body.classList.add("dark");
    toggle.onclick = () => {
      document.body.classList.toggle("dark");
      localStorage.setItem("dark", document.body.classList.contains("dark") ? "1" : "0");
    };
  }
});
