// Fix hero padding based on actual navbar height
function fixHeroPadding() {
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero');
    const heroH1 = document.querySelector('.hero h1');
    
    if (navbar && hero && heroH1) {
        const navbarHeight = navbar.offsetHeight;
        let safetyMargin = 40; // Base safety margin
        
        // Progressive increase until h1 is fully visible
        let totalPadding = navbarHeight + safetyMargin;
        
        // Only apply on mobile devices
        if (window.innerWidth <= 768) {
            // Test if h1 is overlapping with navbar
            const heroRect = hero.getBoundingClientRect();
            const h1Rect = heroH1.getBoundingClientRect();
            
            // If h1 top is above navbar bottom, increase padding
            if (h1Rect.top < navbarHeight) {
                const overlap = navbarHeight - h1Rect.top + 20;
                totalPadding = Math.max(totalPadding, totalPadding + overlap);
                console.log(`OnePlus Fix: H1 overlap detected: ${overlap}px`);
            }
            
            hero.style.paddingTop = `${totalPadding}px`;
            hero.style.setProperty('padding-top', `${totalPadding}px`, 'important');
            
            console.log(`OnePlus Fix: Screen ${window.innerWidth}x${window.innerHeight}, Navbar: ${navbarHeight}px, Applied: ${totalPadding}px`);
        }
    }
}

// Run on DOM ready, load and resize
document.addEventListener('DOMContentLoaded', fixHeroPadding);
window.addEventListener('load', fixHeroPadding);
window.addEventListener('resize', fixHeroPadding);

// Additional fix for OnePlus/Android after delay (sometimes layout takes time)
setTimeout(fixHeroPadding, 500);

// Debug info for OnePlus 12 (can be removed in production)
function debugInfo() {
    console.log('=== MOBILE DEBUG INFO ===');
    console.log('Screen:', window.innerWidth, 'x', window.innerHeight);
    console.log('Viewport:', window.visualViewport ? window.visualViewport.width + 'x' + window.visualViewport.height : 'N/A');
    console.log('User Agent:', navigator.userAgent);
    console.log('Device Pixel Ratio:', window.devicePixelRatio);
    
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero');
    const h1 = document.querySelector('.hero h1');
    
    if (navbar) {
        const navRect = navbar.getBoundingClientRect();
        console.log('Navbar height:', navbar.offsetHeight, 'px');
        console.log('Navbar rect:', navRect);
    }
    
    if (hero) {
        const heroStyle = getComputedStyle(hero);
        console.log('Hero padding-top:', heroStyle.paddingTop);
    }
    
    if (h1) {
        const h1Rect = h1.getBoundingClientRect();
        console.log('H1 position:', h1Rect);
        console.log('H1 is visible:', h1Rect.top >= 0);
    }
    console.log('========================');
}

// Run debug on mobile devices
if (window.innerWidth <= 768) {
    setTimeout(debugInfo, 1000);
}

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

// Smooth scrolling for navigation links with iOS support
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        const target = document.querySelector(href);
        
        // Detect iOS devices
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                     (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
        
        // Special handling for #top - scroll to top of page
        if (href === '#top' || href === '#') {
            if (isIOS) {
                // iOS fallback - smooth but reliable
                window.scrollTo(0, 0);
            } else {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        } else if (target) {
            const offsetTop = target.offsetTop - 80;
            if (isIOS) {
                // iOS fallback with manual smooth scrolling
                const start = window.pageYOffset;
                const distance = offsetTop - start;
                const duration = 800;
                let startTime = null;
                
                function animation(currentTime) {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const run = ease(timeElapsed, start, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                }
                
                function ease(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t + b;
                    t--;
                    return -c / 2 * (t * (t - 2) - 1) + b;
                }
                
                requestAnimationFrame(animation);
            } else {
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Form submission handler
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const formObject = {};
    
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    // Basic form validation
    if (!formObject.name || !formObject.email || !formObject.service || !formObject.message) {
        showNotification('Por favor, completa todos los campos requeridos.', 'error');
        return;
    }
    
    if (!formObject.privacy) {
        showNotification('Por favor, acepta la política de privacidad para continuar.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formObject.email)) {
        showNotification('Por favor, ingresa una dirección de email válida.', 'error');
        return;
    }
    
    // Show loading state
    const submitButton = this.querySelector('.submit-btn');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;
    submitButton.style.opacity = '0.7';
    submitButton.style.cursor = 'not-allowed';
    
    try {
        // Send form data to PHP script
        const response = await fetch('contact.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formObject)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showNotification(result.message, 'success');
            this.reset(); // Reset form on success
        } else {
            showNotification(result.error || 'Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo.', 'error');
        }
        
    } catch (error) {
        console.error('Form submission error:', error);
        
        // Handle different types of network errors
        let errorMessage = 'Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo más tarde.';
        
        if (!navigator.onLine) {
            errorMessage = 'Sin conexión a internet. Por favor, verifica tu conexión e inténtalo de nuevo.';
        } else if (error.name === 'TypeError') {
            errorMessage = 'No se pudo conectar con el servidor. Por favor, inténtalo de nuevo más tarde.';
        }
        
        showNotification(errorMessage, 'error');
    } finally {
        // Restore button state
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
        submitButton.style.opacity = '1';
        submitButton.style.cursor = 'pointer';
    }
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 1rem;
        border-radius: 10px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        min-width: 300px;
        animation: slideIn 0.3s ease;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Add CSS for notification animation
const style = document.createElement('style');
style.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 1rem;
        margin-left: auto;
        opacity: 0.8;
        transition: opacity 0.3s ease;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @media (max-width: 768px) {
        .notification {
            right: 15px !important;
            left: 15px !important;
            min-width: auto !important;
        }
    }
`;
document.head.appendChild(style);

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'var(--background-white)';
        navbar.style.backdropFilter = 'none';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .step, .contact-form');
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
});

// Form field validation on blur
document.querySelectorAll('#contactForm input, #contactForm textarea, #contactForm select').forEach(field => {
    field.addEventListener('blur', function() {
        validateField(this);
    });
});

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let message = '';
    
    // Remove existing error styling
    field.style.borderColor = '#e9ecef';
    
    // Remove existing error message
    const existingError = field.parentElement.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Validation rules
    switch (field.name) {
        case 'name':
            if (!value) {
                isValid = false;
                message = 'Name is required';
            } else if (value.length < 2) {
                isValid = false;
                message = 'Name must be at least 2 characters';
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) {
                isValid = false;
                message = 'Email is required';
            } else if (!emailRegex.test(value)) {
                isValid = false;
                message = 'Please enter a valid email address';
            }
            break;
            
        case 'service':
            if (!value) {
                isValid = false;
                message = 'Please select a service type';
            }
            break;
            
        case 'message':
            if (!value) {
                isValid = false;
                message = 'Message is required';
            } else if (value.length < 10) {
                isValid = false;
                message = 'Message must be at least 10 characters';
            }
            break;
    }
    
    // Show error if validation fails
    if (!isValid) {
        field.style.borderColor = '#e74c3c';
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #e74c3c;
            font-size: 0.8rem;
            margin-top: 5px;
            display: block;
        `;
        
        field.parentElement.appendChild(errorElement);
    }
    
    return isValid;
}

// Emergency contact information
function showEmergencyInfo() {
    const emergencyModal = document.createElement('div');
    emergencyModal.innerHTML = `
        <div class="emergency-modal">
            <div class="emergency-content">
                <h3>Emergency Resources</h3>
                <div class="emergency-info">
                    <div class="emergency-item">
                        <strong>Mental Health Crisis:</strong>
                        <p>Call 988 (Suicide & Crisis Lifeline)</p>
                    </div>
                    <div class="emergency-item">
                        <strong>Emergency Services:</strong>
                        <p>Call 911</p>
                    </div>
                    <div class="emergency-item">
                        <strong>Crisis Text Line:</strong>
                        <p>Text HOME to 741741</p>
                    </div>
                </div>
                <button onclick="this.closest('.emergency-modal').remove()">Close</button>
            </div>
        </div>
    `;
    
    emergencyModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10001;
    `;
    
    document.body.appendChild(emergencyModal);
}

// Add click event listener for emergency info (if needed)
document.addEventListener('click', function(e) {
    if (e.target.textContent && e.target.textContent.includes('Crisis Hotline')) {
        e.preventDefault();
        showEmergencyInfo();
    }
});

// Testimonials Carousel Functionality
class TestimonialsCarousel {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 0;
        this.testimonialsPerView = 3; // Desktop: 3, Mobile: 1
        this.autoplayInterval = null;
        this.autoplayDelay = 5000; // 5 seconds
        
        this.init();
    }
    
    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }
    
    setup() {
        this.track = document.querySelector('.testimonials-track');
        this.cards = document.querySelectorAll('.testimonial-card');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.indicators = document.querySelectorAll('.indicator');
        
        if (!this.track || !this.cards.length) return;
        
        this.totalSlides = this.cards.length;
        this.updateResponsiveSettings();
        this.bindEvents();
        this.updateCarousel();
        this.startAutoplay();
        
        // Update on window resize
        window.addEventListener('resize', () => {
            this.updateResponsiveSettings();
            this.updateCarousel();
        });
    }
    
    updateResponsiveSettings() {
        const windowWidth = window.innerWidth;
        
        // Determine testimonials per view based on screen size
        if (windowWidth <= 375) {
            this.testimonialsPerView = 1;
        } else if (windowWidth <= 768) {
            this.testimonialsPerView = 1;
        } else if (windowWidth <= 1024) {
            this.testimonialsPerView = 2;
        } else {
            this.testimonialsPerView = 3;
        }
        
        // Update max slide index
        this.maxSlideIndex = Math.max(0, this.totalSlides - this.testimonialsPerView);
        
        // Reset to valid slide if current slide is out of bounds
        if (this.currentSlide > this.maxSlideIndex) {
            this.currentSlide = this.maxSlideIndex;
        }
        
        this.updateIndicators();
        this.updateButtonVisibility();
    }
    
    bindEvents() {
        // Previous button
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.stopAutoplay();
                this.prevSlide();
                this.startAutoplay();
            });
        }
        
        // Next button  
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.stopAutoplay();
                this.nextSlide();
                this.startAutoplay();
            });
        }
        
        // Indicators
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.stopAutoplay();
                this.goToSlide(index);
                this.startAutoplay();
            });
        });
        
        // Pause autoplay on hover
        const carousel = document.querySelector('.testimonials-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => this.stopAutoplay());
            carousel.addEventListener('mouseleave', () => this.startAutoplay());
        }
        
        // Touch/swipe support for mobile
        if ('ontouchstart' in window) {
            this.addTouchSupport();
        }
    }
    
    addTouchSupport() {
        let startX = 0;
        let startY = 0;
        let deltaX = 0;
        let deltaY = 0;
        let isSwiping = false;
        
        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isSwiping = false;
        }, { passive: true });
        
        this.track.addEventListener('touchmove', (e) => {
            if (!startX || !startY) return;
            
            deltaX = e.touches[0].clientX - startX;
            deltaY = e.touches[0].clientY - startY;
            
            // Determine if this is a horizontal swipe
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
                isSwiping = true;
                e.preventDefault(); // Prevent vertical scrolling only when swiping
            }
        });
        
        this.track.addEventListener('touchend', (e) => {
            if (!startX || !startY || !isSwiping) {
                // Reset values and return if not a valid swipe
                startX = 0;
                startY = 0;
                deltaX = 0;
                deltaY = 0;
                isSwiping = false;
                return;
            }
            
            // Adjust minimum swipe distance based on screen size
            const windowWidth = window.innerWidth;
            const minSwipeDistance = windowWidth <= 375 ? 30 : 50;
            
            if (Math.abs(deltaX) > minSwipeDistance) {
                this.stopAutoplay();
                
                if (deltaX > 0) {
                    // Swipe right - previous slide
                    this.prevSlide();
                } else {
                    // Swipe left - next slide  
                    this.nextSlide();
                }
                
                this.startAutoplay();
            }
            
            // Reset values
            startX = 0;
            startY = 0;
            deltaX = 0;
            deltaY = 0;
            isSwiping = false;
        }, { passive: true });
    }
    
    prevSlide() {
        if (this.currentSlide > 0) {
            this.currentSlide--;
        } else {
            this.currentSlide = this.maxSlideIndex;
        }
        this.updateCarousel();
    }
    
    nextSlide() {
        if (this.currentSlide < this.maxSlideIndex) {
            this.currentSlide++;
        } else {
            this.currentSlide = 0;
        }
        this.updateCarousel();
    }
    
    goToSlide(index) {
        this.currentSlide = Math.max(0, Math.min(index, this.maxSlideIndex));
        this.updateCarousel();
    }
    
    updateCarousel() {
        if (!this.track) return;
        
        // Calculate transform based on current view settings
        const firstCard = this.track.querySelector('.testimonial-card');
        if (!firstCard) return;
        
        const cardWidth = firstCard.offsetWidth;
        const windowWidth = window.innerWidth;
        
        // Determine gap based on screen size
        let gap;
        if (windowWidth <= 375) {
            gap = 24; // 1.5rem
        } else if (windowWidth <= 768) {
            gap = 24; // 1.5rem
        } else {
            gap = 32; // 2rem
        }
        
        // Calculate translation based on testimonials per view
        const slideWidth = cardWidth + gap;
        const translateX = -(this.currentSlide * slideWidth);
        
        this.track.style.transform = `translateX(${translateX}px)`;
        
        this.updateButtons();
        this.updateIndicators();
        this.updateButtonVisibility();
    }
    
    updateButtons() {
        if (!this.prevBtn || !this.nextBtn) return;
        
        // Disable/enable buttons based on current position
        this.prevBtn.disabled = this.currentSlide === 0;
        this.nextBtn.disabled = this.currentSlide === this.maxSlideIndex;
    }
    
    updateButtonVisibility() {
        if (!this.prevBtn || !this.nextBtn) return;
        
        const windowWidth = window.innerWidth;
        const showButtons = windowWidth > 375; // Hide buttons on very small screens
        
        this.prevBtn.style.display = showButtons ? 'flex' : 'none';
        this.nextBtn.style.display = showButtons ? 'flex' : 'none';
    }
    
    updateIndicators() {
        const totalIndicators = Math.ceil(this.totalSlides / this.testimonialsPerView);
        const indicatorContainer = document.querySelector('.carousel-indicators');
        
        if (!indicatorContainer) return;
        
        // Update existing indicators
        this.indicators.forEach((indicator, index) => {
            if (index < totalIndicators) {
                indicator.style.display = 'block';
                indicator.classList.toggle('active', index === this.currentSlide);
            } else {
                indicator.style.display = 'none';
            }
        });
    }
    
    startAutoplay() {
        this.stopAutoplay(); // Clear any existing interval
        
        this.autoplayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoplayDelay);
    }
    
    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
    
    // Public method to destroy carousel (for cleanup)
    destroy() {
        this.stopAutoplay();
        // Remove event listeners if needed
        if (this.prevBtn) this.prevBtn.replaceWith(this.prevBtn.cloneNode(true));
        if (this.nextBtn) this.nextBtn.replaceWith(this.nextBtn.cloneNode(true));
    }
}

// Initialize carousel when DOM is ready
let testimonialsCarousel;

document.addEventListener('DOMContentLoaded', () => {
    testimonialsCarousel = new TestimonialsCarousel();
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (testimonialsCarousel) {
        testimonialsCarousel.destroy();
    }
});

console.log('Psychology website loaded successfully!');