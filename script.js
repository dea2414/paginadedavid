// Dark Mode Toggle
const toggle = document.getElementById("dark-mode-toggle");
toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("dark-mode", document.body.classList.contains("dark-mode"));
});

// Retain Dark Mode Preference
if (localStorage.getItem("dark-mode") === "true") {
    document.body.classList.add("dark-mode");
}

// Dynamic Project Loading
const projects = [
    { title: "AI Chatbot", link: "https://github.com/dea2414/ai-chatbot", description: "A chatbot using Python & NLP." },
    { title: "Portfolio Website", link: "https://davidearellano.com", description: "My personal portfolio built with HTML, CSS, and JavaScript." },
    { title: "E-Commerce API", link: "https://github.com/dea2414/ecommerce-api", description: "A RESTful API using Node.js & MongoDB." }
];

const projectContainer = document.querySelector(".project-container");

if (projectContainer) {
    projects.forEach(project => {
        const projectCard = document.createElement("div");
        projectCard.classList.add("project-card");
        projectCard.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <a href="${project.link}" target="_blank">View Project</a>
        `;
        projectContainer.appendChild(projectCard);
    });
}

// Typing Effect in Hero Section
const textElement = document.createElement("h2");
textElement.textContent = "Full-Stack Developer | AI Enthusiast";
document.querySelector(".hero").appendChild(textElement);

let index = 0;
const text = textElement.textContent;
textElement.textContent = "";

function typeEffect() {
    if (index < text.length) {
        textElement.textContent += text.charAt(index);
        index++;
        setTimeout(typeEffect, 100);
    }
}

typeEffect();
