/* ============================================
   BRUTALIST ELEGANCE - SCRIPT.JS
   ============================================ */

// Floating Particles System
class ParticleSystem {
    constructor() {
        this.container = document.getElementById('particles-bg');
        this.particleCount = 50;
        this.init();
    }
    
    init() {
        for (let i = 0; i < this.particleCount; i++) {
            this.createParticle();
        }
    }
    
    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random starting position
        const startX = Math.random() * 100;
        particle.style.left = `${startX}%`;
         const startY = Math.random() * 100;
    particle.style.top = `${startY}vh`;
        
        // Random drift amount (horizontal movement)
        const drift = (Math.random() - 0.2) * 100;
        particle.style.setProperty('--drift', `${drift}px`);
        
        // Random duration (speed)
        const duration = 15 + Math.random() * 25;
        particle.style.animationDuration = `${duration}s`;
        
        // Random delay for staggered effect
        const delay = Math.random() * 10;
        particle.style.animationDelay = `${delay}s`;
        
        // Random size variation
        const size = 2 + Math.random() * 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random opacity
        const opacity = 0.2 + Math.random() * 0.4;
        particle.style.opacity = opacity;
        
        this.container.appendChild(particle);
    }
}

// Custom Cursor: NOW USES PURE CSS + GPU TRANSFORM FOR ZERO LAG
class CustomCursor {
    constructor() {
        this.cursor = document.getElementById('custom-cursor');
        this.init();
    }
    
    init() {
        // Use transform: translate(X, Y) for fast, GPU-accelerated positioning
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
        });
        
        this.setupHoverEffects();
    }
    
    setupHoverEffects() {
        const hoverElements = document.querySelectorAll('.project-item, a, button');
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('hover-active');
            });
            
            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('hover-active');
            });
        });
    }
}

// Preloader
class Preloader {
    constructor() {
        this.preloader = document.getElementById('preloader');
        this.init();
    }
    
    init() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.preloader.classList.add('hidden');
            }, 1000);
        });
    }
}

// Scroll Reveal Animation
class ScrollReveal {
    constructor() {
        this.items = document.querySelectorAll('.project-item');
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        this.items.forEach(item => observer.observe(item));
    }
}

// Grid Hover Effect (Dim Others)
class GridHoverEffect {
    constructor() {
        this.items = document.querySelectorAll('.project-item');
        this.init();
    }
    
    init() {
        this.items.forEach(item => {
            item.addEventListener('mouseenter', () => {
                this.items.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.add('dimmed');
                    }
                });
            });
            
            item.addEventListener('mouseleave', () => {
                this.items.forEach(otherItem => {
                    otherItem.classList.remove('dimmed');
                });
            });
        });
    }
}

// Lightbox Modal
class Lightbox {
    constructor() {
        this.lightbox = document.getElementById('lightbox');
        this.content = document.getElementById('lightbox-content');
        this.closeBtn = document.getElementById('lightbox-close');
        this.init();
    }
    
    init() {
        // Click handlers for project items
        document.querySelectorAll('.project-item').forEach(item => {
            item.addEventListener('click', () => {
                this.open(item);
            });
        });
        
        // Close handlers
        this.closeBtn.addEventListener('click', () => this.close());
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) this.close();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.close();
        });
    }
    
    open(item) {
        const type = item.dataset.type;
        
        if (type === 'image') {
            const src = item.dataset.src;
            this.content.innerHTML = `<img src="${src}" alt="Project">`;
        } else if (type === 'video') {
            const videoUrl = item.dataset.videoUrl; 
            let embedUrl = '';

            if (!videoUrl) return; 

            if (videoUrl.includes('youtu.be') || videoUrl.includes('youtube.com')) {
                let videoId = '';
                try {
                    if (videoUrl.includes('youtu.be')) {
                        videoId = videoUrl.split('/').pop().split('?')[0];
                    } else if (videoUrl.includes('youtube.com')) {
                        const urlObj = new URL(videoUrl);
                        const vParam = urlObj.searchParams.get('v');
                        videoId = vParam;
                    }
                } catch (e) {
                    console.error('YouTube URL parsing failed:', e);
                }

                if (videoId) {
                    embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&controls=1&modestbranding=1`;
                }
            } else if (videoUrl.includes('vimeo.com')) {
                let videoId = '';
                try {
                    const parts = videoUrl.split('/').filter(p => p); 
                    videoId = parts.pop();
                    if (videoId.match(/^\d+$/)) { 
                        embedUrl = `https://player.vimeo.com/video/${videoId}?autoplay=1&title=0&byline=0&portrait=0`;
                    }
                } catch (e) {
                    console.error('Vimeo URL parsing failed:', e);
                }
            }
            
            if (embedUrl) {
                this.content.innerHTML = `
                    <iframe 
                        src="${embedUrl}" 
                        frameborder="0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowfullscreen
                        referrerpolicy="strict-origin-when-cross-origin"
                    ></iframe>
                `;
            }
        }
        
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        document.body.classList.add('lightbox-open'); // This class is key to the fix
    }
    
    close() {
        this.lightbox.classList.remove('active');
        document.body.classList.remove('lightbox-open'); 
        setTimeout(() => {
            this.content.innerHTML = '';
        }, 400);
        document.body.style.overflow = '';
    }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
    new CustomCursor();
    new Preloader();
    new ScrollReveal();
    new GridHoverEffect();
    new Lightbox();
});