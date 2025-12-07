/* ============================================
   CREATIVE PORTFOLIO - SCRIPT.JS
   Intersection Observer Animations & Interactions
   ============================================ */

/**
 * Portfolio Animation Controller
 * Handles scroll-based animations using Intersection Observer API
 */
class PortfolioAnimations {
    constructor() {
        // Configuration
        this.config = {
            // Intersection Observer threshold (0 = start of element, 1 = full element)
            threshold: 0.1,
            // Root margin for triggering animations earlier
            rootMargin: '0px 0px -50px 0px',
            // Class to add when element is visible
            visibleClass: 'is-visible'
        };

        // Initialize on DOM ready
        this.init();
    }

    /**
     * Initialize all animation systems
     */
    init() {
        this.initScrollAnimations();
        this.initSmoothScroll();
        this.initHeaderBehavior();
        console.log('🎨 Portfolio animations initialized');
    }

    /**
     * Initialize Intersection Observer for scroll animations
     * Elements with .animate-on-scroll class will fade in and slide up
     */
    initScrollAnimations() {
        // Check for Intersection Observer support
        if (!('IntersectionObserver' in window)) {
            // Fallback: show all elements immediately
            document.querySelectorAll('.animate-on-scroll').forEach(el => {
                el.classList.add(this.config.visibleClass);
            });
            return;
        }

        // Create the observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add visible class to trigger CSS animation
                    entry.target.classList.add(this.config.visibleClass);
                    
                    // Optional: Unobserve after animation (performance optimization)
                    // Uncomment if you don't want elements to re-animate when scrolling back
                    // observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: this.config.threshold,
            rootMargin: this.config.rootMargin
        });

        // Observe all elements with animate-on-scroll class
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }

    /**
     * Initialize smooth scroll for anchor links
     */
    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const targetId = anchor.getAttribute('href');
                
                // Skip if it's just "#"
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    // Calculate offset accounting for fixed header
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * Initialize header hide/show behavior on scroll
     */
    initHeaderBehavior() {
        const header = document.querySelector('.header');
        if (!header) return;

        let lastScrollY = window.scrollY;
        let ticking = false;

        const updateHeader = () => {
            const currentScrollY = window.scrollY;
            
            // Add/remove shadow based on scroll position
            if (currentScrollY > 10) {
                header.style.boxShadow = '0 1px 20px rgba(0, 0, 0, 0.05)';
            } else {
                header.style.boxShadow = 'none';
            }

            lastScrollY = currentScrollY;
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        }, { passive: true });
    }
}

/**
 * Project Card Interactions
 * Handles hover effects and click behaviors for project cards
 */
class ProjectCardInteractions {
    constructor() {
        this.init();
    }

    init() {
        this.initCardHoverEffects();
        this.initVideoCards();
    }

    /**
     * Enhanced hover effects for project cards
     * Adds parallax-like micro-interactions
     */
    initCardHoverEffects() {
        const cards = document.querySelectorAll('.project-card:not(.project-card--video)');
        
        cards.forEach(card => {
            const media = card.querySelector('.project-card__media');
            const image = card.querySelector('.project-card__image');
            
            if (!media || !image) return;

            // Mouse move parallax effect
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const moveX = (x - centerX) / centerX * 5;
                const moveY = (y - centerY) / centerY * 5;
                
                image.style.transform = `scale(1.05) translate(${moveX}px, ${moveY}px)`;
            });

            // Reset on mouse leave
            card.addEventListener('mouseleave', () => {
                image.style.transform = 'scale(1) translate(0, 0)';
            });
        });
    }

    /**
     * Initialize video card specific behaviors
     * Prevents hover effects from interfering with video controls
     */
    initVideoCards() {
        const videoCards = document.querySelectorAll('.project-card--video');
        
        videoCards.forEach(card => {
            // Add click handler to focus video iframe
            card.addEventListener('click', (e) => {
                const iframe = card.querySelector('iframe');
                if (iframe && e.target !== iframe) {
                    iframe.focus();
                }
            });
        });
    }
}

/**
 * Utility Functions
 */
const utils = {
    /**
     * Debounce function for performance optimization
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     */
    debounce(func, wait = 100) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Throttle function for scroll events
     * @param {Function} func - Function to throttle
     * @param {number} limit - Time limit in milliseconds
     */
    throttle(func, limit = 100) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

/**
 * Preloader (Optional Enhancement)
 * Adds a subtle loading transition when page first loads
 */
class Preloader {
    constructor() {
        this.init();
    }

    init() {
        // Wait for all content to load
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
            
            // Trigger initial animations after a short delay
            setTimeout(() => {
                document.querySelectorAll('.hero .animate-on-scroll').forEach(el => {
                    el.classList.add('is-visible');
                });
            }, 100);
        });
    }
}

/**
 * Initialize everything when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animation systems
    new PortfolioAnimations();
    new ProjectCardInteractions();
    new Preloader();

    // Log ready state
    console.log('✨ Portfolio ready');
});

/* ============================================
   ADDING NEW PROJECT CARDS
   ============================================
   
   To add a new IMAGE project, copy this template:
   
   <div class="project-card animate-on-scroll">
       <div class="project-card__media">
           <img 
               src="YOUR_IMAGE_URL_HERE" 
               alt="Description of your project"
               class="project-card__image"
               loading="lazy"
           >
       </div>
       <div class="project-card__info">
           <h3 class="project-card__title">Project Title</h3>
           <span class="project-card__category">Category</span>
       </div>
   </div>

   To add a new VIDEO project (YouTube), copy this template:
   
   <div class="project-card project-card--video animate-on-scroll">
       <div class="project-card__media">
           <iframe 
               src="https://www.youtube.com/embed/YOUR_VIDEO_ID?controls=1&rel=0&modestbranding=1" 
               title="Video title"
               class="project-card__video"
               frameborder="0"
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
               allowfullscreen
               loading="lazy"
           ></iframe>
       </div>
       <div class="project-card__info">
           <h3 class="project-card__title">Video Title</h3>
           <span class="project-card__category">Video Category</span>
       </div>
   </div>

   To add a new VIDEO project (Vimeo), copy this template:
   
   <div class="project-card project-card--video animate-on-scroll">
       <div class="project-card__media">
           <iframe 
               src="https://player.vimeo.com/video/YOUR_VIDEO_ID?h=0&title=0&byline=0&portrait=0" 
               title="Video title"
               class="project-card__video"
               frameborder="0"
               allow="autoplay; fullscreen; picture-in-picture"
               allowfullscreen
               loading="lazy"
           ></iframe>
       </div>
       <div class="project-card__info">
           <h3 class="project-card__title">Video Title</h3>
           <span class="project-card__category">Video Category</span>
       </div>
   </div>

   ============================================ */
