// Ensure script runs after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    
    console.log("JavaScript Loaded ✅"); // Debugging check

    // 🚀 Dark Mode Toggle
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

    // 🚀 Handle Profile Selection & Redirect
    const loginBtn = document.getElementById("login-btn");
    const profileSelect = document.getElementById("profile-select");

    function handleLogin() {
        const profileType = profileSelect.value;
        console.log("Profile Selected:", profileType); // Debugging

        if (profileType) {
            localStorage.setItem("profile", profileType);
            window.location.href = "dashboard.html";  // Redirects to Dashboard
        } else {
            alert("Please select a profile type before entering.");
        }
    }

    if (loginBtn) {
        loginBtn.addEventListener("click", handleLogin);

        // Allow pressing "Enter" key to trigger login
        profileSelect.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                event.preventDefault(); // Prevent form submission behavior
                handleLogin();
            }
        });

        console.log("Event Listeners Attached ✅"); // Debugging check
    }

    // 🚀 Load User Profile Content on Dashboard
    if (window.location.pathname.includes("dashboard.html")) {
        console.log("Dashboard Loaded ✅"); // Debugging check

        const profileType = localStorage.getItem("profile") || "guest";
        const welcomeMessage = document.getElementById("welcome-message");
        const customContent = document.getElementById("custom-content");

        const profileMessages = {
            recruiter: {
                title: "Hello, Recruiter! Let's discuss job opportunities.",
                content: `<p>Here are my best projects and resume.</p><a href="projects.html" class="btn">View Projects</a>`
            },
            friend: {
                title: "Yo Friend! Glad you're here.",
                content: `<p>Check out some fun stuff I've been working on.</p><a href="blog.html" class="btn">Read My Blog</a>`
            },
            family: {
                title: "Welcome, Family! Thanks for supporting me.",
                content: `<p>See what I've been up to lately.</p><a href="contact.html" class="btn">Contact Me</a>`
            },
            stalker: {
                title: "Oh... it's you.",
                content: `<p>Nothing to see here. Move along.</p>`
            },
            guest: {
                title: "Welcome!",
                content: `<p>Select a profile to see personalized content.</p>`
            }
        };

        welcomeMessage.textContent = profileMessages[profileType].title;
        customContent.innerHTML = profileMessages[profileType].content;
    }
});
