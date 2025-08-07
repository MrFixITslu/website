// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        
        // Skip if href is just "#" or empty
        if (href === '#' || !href || href.length <= 1) {
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar && window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else if (navbar) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .stat, .contact-item, .section-header, .faq-item, .feature, .testimonial-card, .blog-card');
    animateElements.forEach(el => {
        if (el) {
            el.classList.add('scroll-animate');
            observer.observe(el);
        }
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Simulate form submission (replace with actual form handling)
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            alert('Thank you for your message! We will get back to you within 24 hours.');
            this.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat h4');
    const speed = 200;

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target') || parseInt(counter.innerText);
            const count = +counter.innerText.replace(/\D/g, '');
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment) + '+';
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target + '+';
            }
        };
        updateCount();
    });
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add active class to current navigation item
function setActiveNavItem() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveNavItem);

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #2563eb !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
    body.loaded {
        opacity: 1;
    }
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
`;
document.head.appendChild(style);

// FAQ Section Functionality
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            question.addEventListener('click', () => {
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });
});

// Exit Intent Popup (Basic Implementation)
let hasShownExitIntent = false;

document.addEventListener('mouseleave', (e) => {
    if (e.clientY <= 0 && !hasShownExitIntent) {
        hasShownExitIntent = true;
        // You can implement a popup here
        console.log('Exit intent detected - show CTA popup');
    }
});

// Track CTA Clicks (without interfering with mailto links)
// Removed event listener to allow mailto links to work properly
// The onclick attribute in HTML will handle tracking

// CTA Button functionality
document.addEventListener('DOMContentLoaded', () => {
    const ctaButtons = document.querySelectorAll('.btn-cta, .btn-hero-cta');
    
    console.log('Found CTA buttons:', ctaButtons.length);
    
    ctaButtons.forEach((button, index) => {
        if (button) {
            console.log(`CTA button ${index + 1} found:`, button);
            console.log(`CTA button ${index + 1} href:`, button.href);
            console.log(`CTA button ${index + 1} classes:`, button.className);
            
            // CTA Button Pulse Animation (only for main CTA button)
            if (button.classList.contains('btn-cta')) {
                setInterval(() => {
                    button.style.transform = 'scale(1.05)';
                    setTimeout(() => {
                        button.style.transform = 'scale(1)';
                    }, 200);
                }, 3000);
            }
            
            // Add click tracking without interfering with mailto
            button.addEventListener('click', (e) => {
                console.log(`CTA button ${index + 1} clicked successfully`);
                console.log('Button href:', button.href);
                // Don't prevent default - let the mailto link work naturally
            });
        }
    });
});

// Enhanced scroll animations for new sections
document.addEventListener('DOMContentLoaded', () => {
    // Animate FAQ items on scroll
    const faqObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.faq-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.5s ease';
        faqObserver.observe(item);
    });
});

// Service card hover effects
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});



// Smooth reveal animation for about features
document.addEventListener('DOMContentLoaded', () => {
    const features = document.querySelectorAll('.feature');
    
    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.3 });

    features.forEach(feature => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateX(-30px)';
        feature.style.transition = 'all 0.6s ease';
        featureObserver.observe(feature);
    });
});

// Lead Magnet Form Handling
document.addEventListener('DOMContentLoaded', () => {
    const leadForm = document.querySelector('.lead-form');
    
    if (leadForm) {
        leadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            // Show loading state
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            submitButton.disabled = true;
            
            // Simulate form processing
            setTimeout(() => {
                // Show success message
                alert('Thank you! Your AI Readiness Checklist has been sent to your email. Check your inbox (and spam folder) for the download link.');
                
                // Reset form
                this.reset();
                
                // Restore button
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                // Track conversion (if analytics is set up)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'lead_magnet_download', {
                        'event_category': 'conversion',
                        'event_label': 'AI Readiness Checklist'
                    });
                }
            }, 2000);
        });
    }
});
