// =====================
// Initialize AOS Animation
// =====================
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// =====================
// Navigation Functionality
// =====================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');

function highlightNav() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNav);

// =====================
// Smooth Scrolling
// =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// =====================
// Gallery Filter
// =====================
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(button => button.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filterValue === 'all') {
                item.classList.remove('hide');
                // Reset AOS animation
                item.setAttribute('data-aos', 'zoom-in');
            } else {
                if (item.classList.contains(filterValue)) {
                    item.classList.remove('hide');
                    item.setAttribute('data-aos', 'zoom-in');
                } else {
                    item.classList.add('hide');
                }
            }
        });
        
        // Refresh AOS
        AOS.refresh();
    });
});

// =====================
// Contact Form Handling
// =====================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;
    
    // Validate form
    if (!name || !email || !phone || !service || !message) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showMessage('Please enter a valid email address', 'error');
        return;
    }
    
    // Create WhatsApp message
    const whatsappMessage = `*New Contact Form Submission*%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Email:* ${encodeURIComponent(email)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Service:* ${encodeURIComponent(service)}%0A*Message:* ${encodeURIComponent(message)}`;
    
    // Open WhatsApp with the message
    const whatsappNumber = '233249595115'; // Primary contact number
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
    
    // Show success message
    showMessage('Thank you! Opening WhatsApp...', 'success');
    
    // Reset form
    contactForm.reset();
    
    // Redirect to WhatsApp immediately
    window.location.href = whatsappUrl;
});

// Validate email function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Show form message
function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// =====================
// Back to Top Button
// =====================
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// =====================
// Dynamic Year in Footer
// =====================
const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    footerYear.innerHTML = footerYear.innerHTML.replace('2025', currentYear);
}

// =====================
// Enhanced Animations
// =====================

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - scrolled / 600;
    }
});

// Add hover effect to service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// =====================
// Intersection Observer for Animations
// =====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all sections
sections.forEach(section => {
    observer.observe(section);
});

// =====================
// Preloader (Optional)
// =====================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// =====================
// Form Input Focus Effects
// =====================
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');

formInputs.forEach(input => {
    // Add placeholder attribute for CSS :placeholder-shown selector
    if (!input.hasAttribute('placeholder')) {
        input.setAttribute('placeholder', ' ');
    }
    
    // Add focus and blur effects
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

// =====================
// Lazy Loading Images
// =====================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    const images = document.querySelectorAll('img');
    images.forEach(img => imageObserver.observe(img));
}

// =====================
// Statistics Counter Animation
// =====================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Trigger counter animation when stats are in view
const statItems = document.querySelectorAll('.stat-item h4');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            statItems.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target);
            });
            statsAnimated = true;
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.image-overlay');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// =====================
// Click outside to close mobile menu
// =====================
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// =====================
// Scroll Reveal Effect
// =====================
window.addEventListener('scroll', () => {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 100;
        
        if (revealTop < windowHeight - revealPoint) {
            reveal.classList.add('active');
        }
    });
});

// =====================
// Console Welcome Message
// =====================
console.log('%c Welcome to Royal Gordons Ventures! ', 'background: #c41e3a; color: #ffd700; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('%c Built with ❤️ for Excellence ', 'background: #1a1a1a; color: #ffd700; font-size: 14px; padding: 5px;');

// =====================
// Performance Optimization
// =====================

// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(() => {
    // Scroll-related functions here
}));

// =====================
// Prevent Right Click on Images (Optional Security)
// =====================
// Uncomment if you want to protect images
/*
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });
});
*/

// =====================
// Service Worker Registration (For PWA - Optional)
// =====================
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => console.log('SW registered'))
            .catch(err => console.log('SW registration failed'));
    });
}
*/

// =====================
// Check if user is online
// =====================
window.addEventListener('online', () => {
    console.log('Back online!');
});

window.addEventListener('offline', () => {
    console.log('Connection lost. Some features may not work.');
});

// =====================
// Initial Setup
// =====================
document.addEventListener('DOMContentLoaded', () => {
    // Highlight first nav item on page load
    if (window.pageYOffset === 0) {
        const firstNavLink = document.querySelector('.nav-link[href="#home"]');
        if (firstNavLink) {
            firstNavLink.classList.add('active');
        }
    }
    
    // Initialize all tooltips and effects
    console.log('Royal Gordons Ventures website loaded successfully!');
});


