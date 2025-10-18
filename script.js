const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
const yearSpan = document.getElementById('year');
const form = document.getElementById('contactForm');
const status = document.getElementById('contactStatus');

yearSpan.textContent = new Date().getFullYear();

const savedTheme = localStorage.getItem('theme');
if (savedTheme) root.setAttribute('data-theme', savedTheme);

// Animate skill boxes on scroll
const skillBoxes = document.querySelectorAll('.skill');

function revealSkills() {
  const triggerBottom = window.innerHeight * 0.85;
  skillBoxes.forEach(box => {
    const boxTop = box.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      box.classList.add('show');
    }
  });
}

window.addEventListener('scroll', revealSkills);
revealSkills();

// Hacker glitch rotating titles
const profileText = document.getElementById("profileText");
const roles = ["Student", "Thinker", "CONTENT", "Creator"];
let roleIndex = 0;

setInterval(() => {
  roleIndex = (roleIndex + 1) % roles.length;
  profileText.textContent = roles[roleIndex];
  profileText.setAttribute("data-text", roles[roleIndex]);
}, 2500);

// ===== Multi-slider Support (About Me + Class Notes) =====
document.querySelectorAll('.slider').forEach(slider => {
  const slidesContainer = slider.querySelector('.slides');
  const slides = slider.querySelectorAll('.note-slide');
  const dotsContainer = slider.querySelector('.slider-dots');

  // Clear old dots (if reloaded)
  dotsContainer.innerHTML = "";

  // Create dots (1 per slide)
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    if (i === 0) dot.classList.add('active');
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('button');

  // Update active dot on scroll
  function updateDots() {
    const scrollLeft = slidesContainer.scrollLeft;
    const width = slidesContainer.offsetWidth;
    const index = Math.round(scrollLeft / width);
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  }

  slidesContainer.addEventListener('scroll', updateDots);

  // Dot click navigation
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      slidesContainer.scrollTo({
        left: slides[i].offsetLeft - slidesContainer.offsetLeft,
        behavior: 'smooth'
      });
    });
  });
});
//form successfully 
document.getElementById('contact-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);
  const response = await fetch(form.action, {
    method: form.method,
    body: data,
    headers: { 'Accept': 'application/json' }
  });
  if (response.ok) {
    alert('✅ Message sent successfully!');
    form.reset();
  } else {
    alert('❌ Oops! Something went wrong.');
  }
});

// Dynamic brand title rotation
const dynamicTitle = document.getElementById("dynamicTitle");
const titles = ["Thinker", "Hacker", "Creator"];
let titleIndex = 0;

setInterval(() => {
  titleIndex = (titleIndex + 1) % titles.length;
  dynamicTitle.textContent = titles[titleIndex];
}, 2000);
themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  themeToggle.textContent = next === 'dark' ? '☀️' : '🌙';
  localStorage.setItem('theme', next);
});

hamburger.addEventListener('click', () => {
  const visible = mobileNav.style.display === 'block';
  mobileNav.style.display = visible ? 'none' : 'block';
});

mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.style.display = 'none';
  });
});

form.addEventListener('submit', e => {
  e.preventDefault();
  status.textContent = 'Message saved (demo only)';
  const data = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value,
    time: new Date().toISOString()
  };
  const messages = JSON.parse(localStorage.getItem('messages') || '[]');
  messages.push(data);
  localStorage.setItem('messages', JSON.stringify(messages));
  form.reset();
  setTimeout(() => (status.textContent = ''), 3000);
});