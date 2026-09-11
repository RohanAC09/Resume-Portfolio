const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');

function setMenu(isOpen) {
    navMenu.classList.toggle('show-menu', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
}

navToggle.addEventListener('click', () => setMenu(true));
navClose.addEventListener('click', () => setMenu(false));
navLinks.forEach((link) => link.addEventListener('click', () => setMenu(false)));

const roles = [
    "I'm a full stack developer",
    "I'm a badminton player",
    "I'm a photographer"
];
const typedText = document.getElementById('typed-text');
let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeRole() {
    const role = roles[roleIndex];
    typedText.textContent = role.slice(0, characterIndex);

    if (!deleting && characterIndex === role.length) {
        deleting = true;
        window.setTimeout(typeRole, 1500);
        return;
    }

    if (deleting && characterIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        window.setTimeout(typeRole, 300);
        return;
    }

    characterIndex += deleting ? -1 : 1;
    window.setTimeout(typeRole, deleting ? 30 : 60);
}

window.setTimeout(typeRole, 1200);

// const projectTrack = document.getElementById('project-track');
// const projectViewport = document.getElementById('project-viewport');
// const projectCards = [...projectTrack.children];
// const previousButton = document.getElementById('project-prev');
// const nextButton = document.getElementById('project-next');
// const progress = document.getElementById('project-progress');
// let projectIndex = 0;

// function updateProjects() {
//     const gap = parseFloat(getComputedStyle(projectTrack).gap) || 0;
//     const cardWidth = projectCards[0].getBoundingClientRect().width;
//     projectTrack.style.transform = `translateX(-${projectIndex * (cardWidth + gap)}px)`;
//     progress.style.transform = `scaleX(${(projectIndex + 1) / projectCards.length})`;
//     previousButton.disabled = projectIndex === 0;
//     nextButton.disabled = projectIndex === projectCards.length - 1;
// }

// previousButton.addEventListener('click', () => {
//     projectIndex = Math.max(0, projectIndex - 1);
//     updateProjects();
// });

// nextButton.addEventListener('click', () => {
//     projectIndex = Math.min(projectCards.length - 1, projectIndex + 1);
//     updateProjects();
// });

// let pointerStart = 0;
// projectViewport.addEventListener('pointerdown', (event) => { pointerStart = event.clientX; });
// projectViewport.addEventListener('pointerup', (event) => {
//     const distance = event.clientX - pointerStart;
//     if (Math.abs(distance) < 45) return;
//     projectIndex = Math.max(0, Math.min(projectCards.length - 1, projectIndex + (distance < 0 ? 1 : -1)));
//     updateProjects();
// });
// window.addEventListener('resize', updateProjects);
// updateProjects();

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const sections = document.querySelectorAll('main section[id]');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
    });
}, { rootMargin: '-35% 0px -55%', threshold: 0 });
sections.forEach((section) => sectionObserver.observe(section));

const header = document.getElementById('header');
function updateHeader() {
    header.classList.toggle('scrolled', window.scrollY > 20);
}
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

document.getElementById('experience-year').textContent = '0' + (new Date().getFullYear() - 2022);
document.getElementById('current-year').textContent = new Date().getFullYear();
