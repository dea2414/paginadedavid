document.addEventListener("DOMContentLoaded", () => {
  const profileLinks = document.querySelectorAll('.profile-btn');
  profileLinks.forEach(link => {
    link.addEventListener('click', () => {
      const profile = link.getAttribute('data-profile');
      localStorage.setItem('profile', profile);
    });
  });

  const darkToggle = document.getElementById('dark-toggle');
  if (darkToggle) {
    darkToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      localStorage.setItem('dark', document.body.classList.contains('dark') ? 'true' : 'false');
    });
  }

  if (window.location.pathname.includes('dashboard.html')) {
    const profile = localStorage.getItem('profile') || 'guest';
    const welcomeMsg = document.getElementById('welcome-msg');
    const profileDesc = document.getElementById('profile-desc');
    if (profile === 'recruiter') {
      welcomeMsg.textContent = 'Hello Recruiter!';
      profileDesc.textContent = 'Discover my professional projects and resume.';
      document.body.classList.add('recruiter-theme');
    } else if (profile === 'friend') {
      welcomeMsg.textContent = 'Hey Friend!';
      profileDesc.textContent = 'Check out fun projects and blog posts.';
      document.body.classList.add('friend-theme');
    } else if (profile === 'family') {
      welcomeMsg.textContent = 'Hi Family!';
      profileDesc.textContent = 'I appreciate your support. See my latest updates.';
      document.body.classList.add('family-theme');
    } else if (profile === 'stalker') {
      welcomeMsg.textContent = 'Uh oh...';
      profileDesc.textContent = 'Not much to see here. Please leave.';
      document.body.classList.add('stalker-theme');
    } else {
      welcomeMsg.textContent = 'Welcome!';
      profileDesc.textContent = 'Please select a profile from the home page.';
    }
    if (localStorage.getItem('dark') === 'true') {
      document.body.classList.add('dark');
    }
  }
});
