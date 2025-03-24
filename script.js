document.addEventListener("DOMContentLoaded", function() {
  var loginBtn = document.getElementById("login-btn");
  var select = document.getElementById("profile-select");

  if (loginBtn && select) {
    loginBtn.onclick = function() {
      var profile = select.value;
      if (profile) {
        localStorage.setItem("profile", profile);
        window.location.href = "dashboard.html";
      } else {
        alert("Please select a profile type");
      }
    };
    // Also trigger on Enter key from the select
    select.onkeypress = function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        loginBtn.onclick();
      }
    };
  }

  if (window.location.pathname.includes("dashboard.html")) {
    var profile = localStorage.getItem("profile") || "guest";
    var msg = document.getElementById("welcome-message");
    var content = document.getElementById("custom-content");
    var views = {
      recruiter: ["Hello Recruiter", '<a href="projects.html" class="btn">View Projects</a>'],
      friend: ["Hey Friend", '<a href="blog.html" class="btn">Read Blog</a>'],
      family: ["Hi Family", '<a href="contact.html" class="btn">Contact Me</a>'],
      stalker: ["...you found me", "Sorry, no content"],
      guest: ["Welcome", "No profile selected"]
    };
    msg.textContent = views[profile][0];
    content.innerHTML = views[profile][1];
  }

  var toggle = document.getElementById("dark-mode-toggle");
  if (toggle) {
    if (localStorage.getItem("dark") === "1") document.body.classList.add("dark");
    toggle.onclick = function() {
      document.body.classList.toggle("dark");
      localStorage.setItem("dark", document.body.classList.contains("dark") ? "1" : "0");
    };
  }
});
