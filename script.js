const menuToggle = document.getElementById('menuToggle');
const siteNav = document.getElementById('siteNav');
const year = document.getElementById('year');
const navLinks = document.querySelectorAll('.nav a');
const reveals = document.querySelectorAll('.reveal');

year.textContent = new Date().getFullYear();

menuToggle?.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

reveals.forEach((section) => observer.observe(section));

const sectionIds = navLinks
  .map((link) => link.getAttribute('href'))
  .filter(Boolean);

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = `#${entry.target.id}`;
      navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === id));
    });
  },
  { rootMargin: '-35% 0px -50% 0px', threshold: 0.01 }
);

sectionIds.forEach((id) => {
  const section = document.querySelector(id);
  if (section) activeObserver.observe(section);
});
