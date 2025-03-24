document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("login-btn");
  const profileSelect = document.getElementById("profile-select");

  // ✅ Button click
  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      const selectedProfile = profileSelect.value;
      if (selectedProfile) {
        localStorage.setItem("profile", selectedProfile);
        console.log("Redirecting to dashboard...");
        window.location.href = "dashboard.html";
      } else {
        alert("Please choose a profile type!");
      }
    });
  }

  // ✅ Dashboard logic
  if (window.location.pathname.includes("dashboard.html")) {
    const profile = localStorage.getItem("profile") || "guest";
    const msg = document.getElementById("welcome-message");
    const content = document.getElementById("custom-content");

    const views = {
      recruiter: {
        title: "Hello Recruiter 👔",
        body: `<p>Here are my best projects and resume.</p><a class="btn" href="projects.html">View Projects</a>`
      },
      friend: {
        title: "Hey Friend 😎",
        body: `<p>Check out fun things I've built!</p><a class="btn" href="blog.html">My Blog</a>`
      },
      family: {
        title: "Hi Fam ❤️",
        body: `<p>Thanks for checking in :)</p><a class="btn" href="contact.html">Say Hi</a>`
      },
      stalker: {
        title: "Uhh... 👀",
        body: `<p>Please leave now.</p>`
      },
      guest: {
        title: "Welcome Guest",
        body: `<p>Please go back and select a profile.</p>`
      }
    };

    if (msg && content) {
      msg.textContent = views[profile]?.title || views.guest.title;
      content.innerHTML = views[profile]?.body || views.guest.body;
    }
  }
});
