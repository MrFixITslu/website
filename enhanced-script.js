/*
===============================================================================
VISION79 ENHANCED INTERACTIVITY
===============================================================================

This file contains advanced JavaScript functionality including:
- Smooth scroll animations
- Interactive navigation
- Form enhancements
- Loading states
- Micro-interactions
- Accessibility features
- Performance optimizations

===============================================================================
*/

// ===============================================================================
// UTILITY FUNCTIONS
// ===============================================================================

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ===============================================================================
// NAVIGATION ENHANCEMENTS
// ===============================================================================

class NavigationManager {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.lastScrollY = window.scrollY;
        this.isScrolling = false;
        
        this.init();
    }
    
    init() {
        this.setupMobileMenu();
        this.setupScrollEffects();
        this.setupSmoothScrolling();
        this.setupActiveNavHighlight();
    }
    
    setupMobileMenu() {
        if (!this.hamburger || !this.navMenu) return;
        
        this.hamburger.addEventListener('click', () => {
            this.toggleMobileMenu();
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.hamburger.contains(e.target) && !this.navMenu.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
        
        // Close mobile menu when clicking on a link
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });
    }
    
    toggleMobileMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }
    
    closeMobileMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
    
    setupScrollEffects() {
        const handleScroll = throttle(() => {
            const currentScrollY = window.scrollY;
            
            // Navbar background effect
            if (this.navbar) {
                if (currentScrollY > 100) {
                    this.navbar.classList.add('scrolled');
                } else {
                    this.navbar.classList.remove('scrolled');
                }
            }
            
            // Hide/show navbar on scroll
            if (currentScrollY > this.lastScrollY && currentScrollY > 200) {
                this.navbar.classList.add('navbar-hidden');
            } else {
                this.navbar.classList.remove('navbar-hidden');
            }
            
            this.lastScrollY = currentScrollY;
        }, 100);
        
        window.addEventListener('scroll', handleScroll);
    }
    
    setupSmoothScrolling() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        this.smoothScrollTo(target);
                    }
                }
            });
        });
    }
    
    smoothScrollTo(target) {
        const targetPosition = target.offsetTop - 100;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start = null;
        
        function animation(currentTime) {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        function easeInOutCubic(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t * t + b;
            t -= 2;
            return c / 2 * (t * t * t + 2) + b;
        }
        
        requestAnimationFrame(animation);
    }
    
    setupActiveNavHighlight() {
        const sections = document.querySelectorAll('section[id]');
        
        const updateActiveNav = () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });
            
            this.navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        };
        
        window.addEventListener('scroll', throttle(updateActiveNav, 100));
    }
}

// ===============================================================================
// ANIMATION SYSTEM
// ===============================================================================

class AnimationManager {
    constructor() {
        this.animatedElements = [];
        this.observer = null;
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
        this.setupParallaxEffects();
        this.setupCounterAnimations();
        this.setupHoverEffects();
    }
    
    setupIntersectionObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    this.observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe all elements with animation classes
        const elementsToAnimate = document.querySelectorAll(
            '.service-card, .feature, .testimonial-card, .blog-card, .stat, .section-header'
        );
        
        elementsToAnimate.forEach(el => {
            el.classList.add('animate-on-scroll');
            this.observer.observe(el);
        });
    }
    
    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        const handleParallax = throttle(() => {
            const scrolled = window.pageYOffset;
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        }, 16);
        
        window.addEventListener('scroll', handleParallax);
    }
    
    setupCounterAnimations() {
        const counters = document.querySelectorAll('.counter');
        
        const animateCounter = (counter) => {
            const target = parseInt(counter.dataset.target);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        };
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
    
    setupHoverEffects() {
        // Add hover effects to interactive elements
        const hoverElements = document.querySelectorAll('.btn, .card, .service-card');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.classList.add('hover');
            });
            
            element.addEventListener('mouseleave', () => {
                element.classList.remove('hover');
            });
        });
    }
}

// ===============================================================================
// FORM ENHANCEMENTS
// ===============================================================================

class FormManager {
    constructor() {
        this.forms = document.querySelectorAll('form');
        this.init();
    }
    
    init() {
        this.setupFormValidation();
        this.setupFormAnimations();
        this.setupAutoResize();
    }
    
    setupFormValidation() {
        this.forms.forEach(form => {
            const inputs = form.querySelectorAll('input, textarea, select');
            
            inputs.forEach(input => {
                input.addEventListener('blur', () => {
                    this.validateField(input);
                });
                
                input.addEventListener('input', () => {
                    if (input.classList.contains('error')) {
                        this.validateField(input);
                    }
                });
            });
            
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(form);
            });
        });
    }
    
    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        const required = field.hasAttribute('required');
        
        // Remove existing error states
        field.classList.remove('error', 'success');
        
        // Check if required field is empty
        if (required && !value) {
            field.classList.add('error');
            this.showFieldError(field, 'This field is required');
            return false;
        }
        
        // Validate email
        if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                field.classList.add('error');
                this.showFieldError(field, 'Please enter a valid email address');
                return false;
            }
        }
        
        // Validate phone
        if (type === 'tel' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/\s/g, ''))) {
                field.classList.add('error');
                this.showFieldError(field, 'Please enter a valid phone number');
                return false;
            }
        }
        
        // If validation passes
        if (value) {
            field.classList.add('success');
        }
        
        return true;
    }
    
    showFieldError(field, message) {
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Create new error message
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        field.parentNode.appendChild(errorElement);
    }
    
    async handleFormSubmission(form) {
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        try {
            // Simulate form submission (replace with actual API call)
            await this.simulateFormSubmission(form);
            
            // Show success state
            this.showFormSuccess(form);
            
        } catch (error) {
            // Show error state
            this.showFormError(form, error.message);
        } finally {
            // Reset button
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    }
    
    async simulateFormSubmission(form) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate 90% success rate
                if (Math.random() > 0.1) {
                    resolve();
                } else {
                    reject(new Error('Network error. Please try again.'));
                }
            }, 2000);
        });
    }
    
    showFormSuccess(form) {
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <h3>Thank you!</h3>
            <p>Your message has been sent successfully. We'll get back to you soon.</p>
        `;
        
        form.style.display = 'none';
        form.parentNode.appendChild(successMessage);
    }
    
    showFormError(form, message) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'form-error';
        errorMessage.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <h3>Oops!</h3>
            <p>${message}</p>
            <button onclick="location.reload()">Try Again</button>
        `;
        
        form.style.display = 'none';
        form.parentNode.appendChild(errorMessage);
    }
    
    setupFormAnimations() {
        const formGroups = document.querySelectorAll('.form-group');
        
        formGroups.forEach((group, index) => {
            group.style.animationDelay = `${index * 0.1}s`;
            group.classList.add('animate-on-scroll');
        });
    }
    
    setupAutoResize() {
        const textareas = document.querySelectorAll('textarea');
        
        textareas.forEach(textarea => {
            textarea.addEventListener('input', () => {
                textarea.style.height = 'auto';
                textarea.style.height = textarea.scrollHeight + 'px';
            });
        });
    }
}

// ===============================================================================
// PERFORMANCE OPTIMIZATIONS
// ===============================================================================

class PerformanceManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupLazyLoading();
        this.setupImageOptimization();
        this.setupScrollOptimization();
    }
    
    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    setupImageOptimization() {
        // Add loading="lazy" to all images
        const images = document.querySelectorAll('img:not([loading])');
        images.forEach(img => {
            img.loading = 'lazy';
        });
    }
    
    setupScrollOptimization() {
        // Use passive event listeners for better performance
        window.addEventListener('scroll', () => {}, { passive: true });
        window.addEventListener('resize', () => {}, { passive: true });
    }
}

// ===============================================================================
// ACCESSIBILITY ENHANCEMENTS
// ===============================================================================

class AccessibilityManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
        this.setupSkipLinks();
        this.setupAriaLabels();
    }
    
    setupKeyboardNavigation() {
        // Add keyboard navigation for custom components
        const interactiveElements = document.querySelectorAll('.btn, .card, .service-card');
        
        interactiveElements.forEach(element => {
            element.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    element.click();
                }
            });
        });
    }
    
    setupFocusManagement() {
        // Manage focus for modals and overlays
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // Close any open modals or menus
                const openModals = document.querySelectorAll('.modal.active, .nav-menu.active');
                openModals.forEach(modal => {
                    modal.classList.remove('active');
                });
            }
        });
    }
    
    setupSkipLinks() {
        // Add skip links for keyboard users
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
    
    setupAriaLabels() {
        // Add ARIA labels to interactive elements
        const buttons = document.querySelectorAll('.btn:not([aria-label])');
        buttons.forEach(button => {
            if (!button.textContent.trim()) {
                button.setAttribute('aria-label', 'Button');
            }
        });
    }
}

// ===============================================================================
// INITIALIZATION
// ===============================================================================

// Initialize all managers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all managers
    new NavigationManager();
    new AnimationManager();
    new FormManager();
    new PerformanceManager();
    new AccessibilityManager();
    
    // Add loading class to body for initial animations
    document.body.classList.add('loaded');
    
    // Remove loading screen after everything is ready
    setTimeout(() => {
        document.body.classList.remove('loading');
    }, 1000);
});

// ===============================================================================
// GLOBAL UTILITIES
// ===============================================================================

// Global utility functions
window.Vision79Utils = {
    // Smooth scroll to element
    scrollTo: (element, offset = 100) => {
        const targetPosition = element.offsetTop - offset;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    },
    
    // Show notification
    showNotification: (message, type = 'info') => {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    },
    
    // Format phone number
    formatPhone: (phone) => {
        return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    },
    
    // Validate email
    validateEmail: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
};

// ===============================================================================
// EXPORT FOR MODULE SYSTEMS
// ===============================================================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        NavigationManager,
        AnimationManager,
        FormManager,
        PerformanceManager,
        AccessibilityManager
    };
}
