// Mobile menu toggle
document.getElementById('mobile-menu-btn').addEventListener('click', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
});

// Counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        let current = 0;
        const increment = target / 100;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (target === 150000) {
                counter.textContent = (current / 1000).toFixed(0) + 'K+';
            } else if (target === 95) {
                counter.textContent = Math.floor(current) + '%';
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 20);
    });
}

// Intersection Observer for counter animation
const counterSection = document.querySelector('.counter-item').parentElement.parentElement;
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counterObserver.observe(counterSection);

// FAQ toggles
document.querySelectorAll('.faq-toggle').forEach(button => {
    button.addEventListener('click', function() {
        const content = this.nextElementSibling;
        const icon = this.querySelector('i');
        
        content.classList.toggle('hidden');
        icon.classList.toggle('rotate-180');
    });
});

// Newsletter form
document.getElementById('newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('newsletter-email').value;
    const message = document.getElementById('newsletter-message');
    
    // Simulate newsletter subscription
    message.textContent = 'Thank you for subscribing! You will receive updates soon.';
    message.classList.remove('hidden');
    
    // Reset form
    this.reset();
    
    // Hide message after 3 seconds
    setTimeout(() => {
        message.classList.add('hidden');
    }, 3000);
});

// Contact form validation and submission [we will implement it later]


// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerOffset = 80;
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
        
        // Close mobile menu if open
        document.getElementById('mobile-menu').classList.add('hidden');
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('nav');
    if (window.scrollY > 50) {
        navbar.classList.add('bg-opacity-95');
    } else {
        navbar.classList.remove('bg-opacity-95');
    }
});

// Add fade-in animation to sections when they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            sectionObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});

// Certifications carousel auto-scroll
const carousel = document.getElementById('certifications-carousel');
let isScrolling = false;

function autoScrollCarousel() {
    if (!isScrolling) {
        const scrollWidth = carousel.scrollWidth;
        const clientWidth = carousel.clientWidth;
        
        if (carousel.scrollLeft >= scrollWidth - clientWidth) {
            carousel.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            carousel.scrollBy({ left: 220, behavior: 'smooth' });
        }
    }
}

// Auto-scroll every 3 seconds
setInterval(autoScrollCarousel, 3000);

// Pause auto-scroll when user is manually scrolling
carousel.addEventListener('scroll', () => {
    isScrolling = true;
    clearTimeout(carousel.scrollTimeout);
    carousel.scrollTimeout = setTimeout(() => {
        isScrolling = false;
    }, 1000);
});

// Form validation helper functions
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validatePhone(phone) {
    const regex = /^[\+]?[1-9][\d]{0,15}$/;
    return regex.test(phone.replace(/\s+/g, ''));
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Trending Professionals website loaded successfully!');
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// Handle window resize for responsive elements
window.addEventListener('resize', function() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth >= 768) {
        document.getElementById('mobile-menu').classList.add('hidden');
    }
});

// Easter egg - Konami code
let konamiCode = [];
const targetSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > targetSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.length === targetSequence.length && 
        konamiCode.every((key, index) => key === targetSequence[index])) {
        
        // Show special message
        const message = document.createElement('div');
        message.innerHTML = '🎉 Konami Code Activated! Thank you for exploring Trending Professionals! 🎉';
        message.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white p-6 rounded-lg shadow-lg z-50 text-center';
        document.body.appendChild(message);
        
        setTimeout(() => {
            document.body.removeChild(message);
        }, 3000);
        
        konamiCode = [];
    }
});