document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".profile-link");
  links.forEach(link => {
    link.addEventListener("click", () => {
      const profile = link.getAttribute("data-profile");
      localStorage.setItem("profile", profile);
    });
  });

  if (window.location.pathname.includes("dashboard.html")) {
    const profile = localStorage.getItem("profile") || "guest";
    const welcome = document.getElementById("welcome-message");
    const content = document.getElementById("custom-content");
    const views = {
      recruiter: ["Hello Recruiter", '<a class="btn" href="projects.html">View Projects</a>'],
      friend: ["Hey Friend", '<a class="btn" href="blog.html">Read Blog</a>'],
      family: ["Hi Family", '<a class="btn" href="contact.html">Contact Me</a>'],
      stalker: ["Uh oh...", "No content available."],
      guest: ["Welcome", "No profile selected."]
    };
    welcome.textContent = views[profile][0];
    content.innerHTML = views[profile][1];
  }

  const toggle = document.getElementById("dark-mode-toggle");
  if (toggle) {
    if (localStorage.getItem("dark") === "1") document.body.classList.add("dark");
    toggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      localStorage.setItem("dark", document.body.classList.contains("dark") ? "1" : "0");
    });
  }
});
