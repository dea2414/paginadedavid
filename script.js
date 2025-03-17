// Projects Data
const projects = [
    { title: "AI Chatbot", link: "https://github.com/dea2414/ai-chatbot", description: "An AI-powered chatbot using Python & NLP." },
    { title: "Portfolio Website", link: "https://davidearellano.com", description: "My personal portfolio website built with HTML, CSS, and JavaScript." },
    { title: "E-Commerce API", link: "https://github.com/dea2414/ecommerce-api", description: "A RESTful API for an e-commerce website using Node.js & MongoDB." }
];

// Load Projects Dynamically
const projectContainer = document.querySelector(".project-container");

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

// Dark Mode Toggle
const toggle = document.getElementById("dark-mode-toggle");
toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

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