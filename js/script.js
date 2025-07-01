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

// Additional FAQ Toggle Functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        faqItem.classList.toggle('active');
        
        // Rotate chevron icon
        const chevron = question.querySelector('i');
        if (chevron) {
            chevron.classList.toggle('fa-chevron-up');
            chevron.classList.toggle('fa-chevron-down');
        }
    });
});

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.team-member, .stat-card, .service-detail, .process-step');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
        observer.observe(el);
    });
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Existing code from your script.js
    
    // New animations
    animateOnScroll();
    
    // Add specific animation for service details
    const serviceDetails = document.querySelectorAll('.service-detail');
    serviceDetails.forEach((detail, index) => {
        detail.style.opacity = '0';
        detail.style.transform = 'translateY(20px)';
        detail.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
        setTimeout(() => {
            detail.style.opacity = '1';
            detail.style.transform = 'translateY(0)';
        }, 300 + (index * 200));
    });
});

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


// Template selection
let selectedTemplate = 'professional';
document.querySelectorAll('.template-card').forEach(card => {
    card.addEventListener('click', function() {
        document.querySelectorAll('.template-card').forEach(c => {
            c.classList.remove('selected');
        });
        this.classList.add('selected');
        selectedTemplate = this.dataset.template;
        document.getElementById('selectedTemplate').value = selectedTemplate;
    });
});

// Add to the existing script
document.addEventListener('DOMContentLoaded', function() {
    // Handle form submission status
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    
    if (status === 'success') {
        nextStep(8);
        document.getElementById('successEmail').textContent = document.getElementById('email').value || "your email";
    } else if (status === 'error') {
        alert('There was an error submitting your form. Please try again or contact us directly.');
    }
});
