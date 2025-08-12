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

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        const target = document.querySelector(href);
        
        // Special handling for #top - scroll to top of page
        if (href === '#top' || href === '#') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
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

console.log('Psychology website loaded successfully!');