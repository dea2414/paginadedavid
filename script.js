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
    const extraInfo = document.getElementById('extra-info');
    const moreBtn = document.getElementById('more-info');
    const profiles = {
      recruiter: {
        title: "Hello Recruiter!",
        desc: "Discover my professional projects and resume.",
        extra: "Recruiter Extra: Experienced in IT recruiting and talent acquisition."
      },
      friend: {
        title: "Hey Friend!",
        desc: "Check out fun projects and blog posts.",
        extra: "Friend Extra: Catch up on my latest adventures and side projects."
      },
      family: {
        title: "Hi Family!",
        desc: "I appreciate your support. See my latest updates.",
        extra: "Family Extra: Proud moments and personal growth updates."
      },
      stalker: {
        title: "Uh oh...",
        desc: "Not much to see. Please leave.",
        extra: "Stalker Extra: This area is private."
      },
      guest: {
        title: "Welcome!",
        desc: "No profile selected.",
        extra: "Guest Extra: Please select a profile from the home page."
      }
    };
    const current = profiles[profile] || profiles.guest;
    welcomeMsg.textContent = current.title;
    profileDesc.textContent = current.desc;
    moreBtn.addEventListener('click', () => {
      if (extraInfo.classList.contains('hidden')) {
        extraInfo.textContent = current.extra;
        extraInfo.classList.remove('hidden');
        moreBtn.textContent = "Less Info";
      } else {
        extraInfo.classList.add('hidden');
        extraInfo.textContent = "";
        moreBtn.textContent = "More Info";
      }
    });
    if (localStorage.getItem('dark') === 'true') document.body.classList.add('dark');
    document.body.classList.add(profile + "-theme");
  }
});
