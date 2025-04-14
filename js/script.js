document.addEventListener("DOMContentLoaded", function() {
  // PROFILE SELECTION (existing code)
  document.querySelectorAll(".profile-btn").forEach(function(btn) {
    btn.addEventListener("click", function() {
      const profileType = btn.getAttribute("data-profile");
      localStorage.setItem("profile", profileType);
      window.location.href = "dashboard.html?profile=" + profileType;
    });
  });

  // API Football Integration: Fetch and display live scores
  function fetchFootballScores() {
    fetch("https://v3.api-football.com/fixtures?live=all", {
      method: "GET",
      headers: {
        "x-apisports-key": "c6026d8ad3079698dcc2ea5ce5e2cdac" // Replace with your API Football key
      }
    })
    .then(response => response.json())
    .then(data => {
      const tbody = document.getElementById("score-table").querySelector("tbody");
      tbody.innerHTML = "";
      if (data.response && data.response.length > 0) {
        data.response.forEach(function(fixture) {
          const homeTeam = fixture.teams.home.name;
          const awayTeam = fixture.teams.away.name;
          const homeScore = fixture.goals.home !== null ? fixture.goals.home : 0;
          const awayScore = fixture.goals.away !== null ? fixture.goals.away : 0;
          const row = document.createElement("tr");
          const matchCell = document.createElement("td");
          matchCell.textContent = `${homeTeam} vs ${awayTeam}`;
          const scoreCell = document.createElement("td");
          scoreCell.textContent = `${homeScore} - ${awayScore}`;
          row.appendChild(matchCell);
          row.appendChild(scoreCell);
          tbody.appendChild(row);
        });
      } else {
        tbody.innerHTML = "<tr><td colspan='2'>No live fixtures at the moment.</td></tr>";
      }
    })
    .catch(err => {
      console.error("Error fetching football scores:", err);
      const tbody = document.getElementById("score-table").querySelector("tbody");
      tbody.innerHTML = "<tr><td colspan='2'>Error fetching scores.</td></tr>";
    });
  }

  // Only fetch the scores if the scoreboard exists on the page.
  if (document.getElementById("score-table")) {
    fetchFootballScores();
  }

  // DASHBOARD PAGE LOGIC (if applicable)
  if (window.location.pathname.includes("dashboard.html")) {
    const urlParams = new URLSearchParams(window.location.search);
    const profile = urlParams.get("profile") || localStorage.getItem("profile") || "guest";

    const profiles = {
      recruiter: {
        title: "Hello Recruiter!",
        desc: "Check out my professional projects and resume.",
        extra: "Extra: 5 years in tech recruiting.",
        image: ""
      },
      friend: {
        title: "Hey Friend!",
        desc: "Explore my fun projects and blog posts.",
        extra: "Extra: Check out my creative side with new projects.",
        image: "img/chicha.jpg"
      },
      family: {
        title: "Hi Family!",
        desc: "Thanks for your support. See my latest updates.",
        extra: "Extra: Proud moments and family updates.",
        image: "img/pierogi.jpg"
      },
      stalker: {
        title: "Uh oh...",
        desc: "Not much to see. Please leave.",
        extra: "Extra: This area is private.",
        image: ""
      },
      guest: {
        title: "Welcome, Guest!",
        desc: "No profile selected.",
        extra: "Extra: Please select a profile from the Home page.",
        image: ""
      }
    };

    const current = profiles[profile] || profiles.guest;
    const welcomeMsg = document.getElementById("welcome-message");
    const profileDesc = document.getElementById("profile-desc");
    if (welcomeMsg) welcomeMsg.textContent = current.title;
    if (profileDesc) profileDesc.textContent = current.desc;

    // Display profile image if exists
    if (current.image) {
      const imgElem = document.createElement("img");
      imgElem.src = current.image;
      imgElem.alt = profile + " image";
      imgElem.className = "profile-image";
      let imgContainer = document.getElementById("profile-image");
      if (!imgContainer) {
        imgContainer = document.createElement("div");
        imgContainer.id = "profile-image";
        profileDesc.insertAdjacentElement("afterend", imgContainer);
      }
      imgContainer.innerHTML = "";
      imgContainer.appendChild(imgElem);
    }

    // Dark Mode Toggle for Dashboard
    const darkToggle = document.getElementById("dark-mode-toggle");
    if (localStorage.getItem("dark-mode") === "enabled") {
      document.body.classList.add("dark-mode");
    }
    if (darkToggle) {
      darkToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
          localStorage.setItem("dark-mode", "enabled");
        } else {
          localStorage.removeItem("dark-mode");
        }
      });
    }

    // More Info Toggle on Dashboard
    const moreInfoBtn = document.getElementById("more-info-btn");
    const extraInfoElem = document.getElementById("extra-info");
    if (moreInfoBtn && extraInfoElem) {
      moreInfoBtn.addEventListener("click", () => {
        if (extraInfoElem.classList.contains("hidden")) {
          extraInfoElem.textContent = current.extra;
          extraInfoElem.classList.remove("hidden");
          moreInfoBtn.textContent = "Less Info";
        } else {
          extraInfoElem.classList.add("hidden");
          extraInfoElem.textContent = "";
          moreInfoBtn.textContent = "More Info";
        }
      });
    }
  }

  // Contact Form (if exists)
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();
      alert("Message sent! (Demo only)");
      contactForm.reset();
    });
  }
});
