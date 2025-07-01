// Mobile Menu Toggle
document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Fade-in animations on scroll
const fadeElements = document.querySelectorAll('.card');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => observer.observe(el));

// Contact button animations
const contactButtons = document.querySelectorAll('.contact-btn');
contactButtons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        const label = btn.querySelector('.contact-label');
        label.style.opacity = '1';
        label.style.right = '75px';
    });
    
    btn.addEventListener('mouseleave', () => {
        const label = btn.querySelector('.contact-label');
        label.style.opacity = '0';
        label.style.right = '70px';
    });
});
