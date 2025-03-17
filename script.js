// Dark Mode
const toggle = document.getElementById("dark-mode-toggle");
toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// Dynamic Project Loading
const projects = [
    { title: "AI Chatbot", link: "#", description: "A chatbot using Python & NLP." },
    { title: "Portfolio Website", link: "#", description: "My personal portfolio built with HTML, CSS, and JavaScript." },
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
