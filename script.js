// Dark Mode Toggle
const toggle = document.getElementById("dark-mode-toggle");
if (toggle) {
    if (localStorage.getItem("dark-mode") === "enabled") {
        document.body.classList.add("dark-mode");
    }

    toggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("dark-mode", document.body.classList.contains("dark-mode") ? "enabled" : "disabled");
    });
}

// Handle Profile Selection & Redirect to Dashboard
const loginBtn = document.getElementById("login-btn");
if (loginBtn) {
    loginBtn.addEventListener("click", () => {
        const profileType = document.getElementById("profile-select").value;
        localStorage.setItem("profile", profileType);
        window.location.href = "dashboard.html";
    });
}

// Load User Profile Content
if (window.location.pathname.includes("dashboard.html")) {
    const profileType = localStorage.getItem("profile") || "guest";
    const welcomeMessage = document.getElementById("welcome-message");
    const customContent = document.getElementById("custom-content");

    if (profileType === "recruiter") {
        welcomeMessage.textContent = "Hello, Recruiter! Let's discuss job opportunities.";
        customContent.innerHTML = `<p>Here are my best projects and resume.</p><a href="projects.html" class="btn">View Projects</a>`;
    } else if (profileType === "friend") {
        welcomeMessage.textContent = "Yo Friend! Glad you're here.";
        customContent.innerHTML = `<p>Check out some fun stuff I've been working on.</p><a href="blog.html" class="btn">Read My Blog</a>`;
    } else if (profileType === "family") {
        welcomeMessage.textContent = "Welcome, Family! Thanks for supporting me.";
        customContent.innerHTML = `<p>See what I've been up to lately.</p><a href="contact.html" class="btn">Contact Me</a>`;
    } else if (profileType === "stalker") {
        welcomeMessage.textContent = "Oh... it's you.";
        customContent.innerHTML = `<p>Nothing to see here. Move along.</p>`;
    } else {
        welcomeMessage.textContent = "Welcome!";
        customContent.innerHTML = `<p>Select a profile to see personalized content.</p>`;
    }
}
