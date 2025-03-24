document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".profile-link");
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const profile = link.getAttribute("data-profile");
      localStorage.setItem("profile", profile);
      window.location.href = link.getAttribute("href");
    });
  });

  if (window.location.pathname.includes("dashboard.html")) {
    const profile = localStorage.getItem("profile") || "guest";
    const msg = document.getElementById("welcome-message");
    const content = document.getElementById("custom-content");
    const views = {
      recruiter: ["Hello Recruiter", '<a href="projects.html" class="btn">View Projects</a>'],
      friend: ["Hey Friend", '<a href="blog.html" class="btn">Read Blog</a>'],
      family: ["Hi Family", '<a href="contact.html" class="btn">Contact Me</a>'],
      stalker: ["...you found me", "No content"],
      guest: ["Welcome", "No profile selected"]
    };
    msg.textContent = views[profile][0];
    content.innerHTML = views[profile][1];
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
