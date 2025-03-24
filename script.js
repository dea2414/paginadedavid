document.addEventListener("DOMContentLoaded", function() {
  // Attach click events to profile links on index.html
  const links = document.querySelectorAll(".profile-link");
  links.forEach(link => {
    link.addEventListener("click", function() {
      const profile = this.getAttribute("data-profile");
      localStorage.setItem("profile", profile);
    });
  });

  // On dashboard.html, display profile-specific content
  if (window.location.pathname.indexOf("dashboard.html") !== -1) {
    const profile = localStorage.getItem("profile") || "guest";
    const welcome = document.getElementById("welcome");
    const content = document.getElementById("content");
    const messages = {
      recruiter: "Hello Recruiter!",
      friend: "Hey Friend!",
      family: "Hi Family!",
      stalker: "Go away, stalker!",
      guest: "Welcome, guest."
    };
    welcome.textContent = messages[profile] || "Welcome.";
    content.innerHTML = "<p>This is your dashboard for profile: " + profile + "</p>";
  }
});
