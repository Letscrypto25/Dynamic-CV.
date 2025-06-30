// Mobile menu toggle
document.querySelector('.hamburger').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('active');
});

document.querySelector('.contact-form form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Message sent! We'll contact you soon.');
  e.target.reset();
});

