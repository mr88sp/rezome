/**
 * SOHEILI WOOD - Premium UI/UX JavaScript
 * Enhanced animations and interactions
 */

// DOM Elements
const header = document.getElementById('header');
const navMenu = document.getElementById('navMenu');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelectorAll('.nav-link');
const animateElements = document.querySelectorAll('.animate-on-scroll');
const lightbox = document.getElementById('lightbox');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDesc = document.getElementById('lightboxDesc');
const galleryImages = document.querySelectorAll('.gallery-image');
const inquiryForm = document.getElementById('inquiryForm');

// Premium Navbar Scroll Effect
let lastScroll = 0;
const navbarThreshold = 100;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Shrink effect
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Hide/show on scroll direction
    if (currentScroll > navbarThreshold && currentScroll > lastScroll) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Enhanced Mobile Menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    
    // Add backdrop blur
    if (navMenu.classList.contains('active')) {
        document.body.classList.add('menu-open');
    } else {
        document.body.classList.remove('menu-open');
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Smooth scroll to section
        const targetId = link.getAttribute('href');
        if (targetId.startsWith('#')) {
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close menu
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
                document.body.classList.remove('menu-open');
            }
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
        document.body.classList.remove('menu-open');
    }
});

// Active Navigation Link with Intersection Observer
const sections = document.querySelectorAll('section[id]');
const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('id');
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Enhanced Animate on Scroll with Intersection Observer
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Staggered animation for cards
            if (entry.target.classList.contains('trust-card') || 
                entry.target.classList.contains('product-card') ||
                entry.target.classList.contains('advantage-item') ||
                entry.target.classList.contains('gallery-item')) {
                const delay = entry.target.dataset.delay || 0;
                entry.target.style.transitionDelay = `${delay}ms`;
            }
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

// Apply staggered delays
document.querySelectorAll('.trust-card, .product-card, .advantage-item, .gallery-item').forEach((card, index) => {
    card.dataset.delay = (index % 4) * 100;
    animationObserver.observe(card);
});

// Observe other elements
animateElements.forEach(element => {
    if (!element.classList.contains('trust-card') && 
        !element.classList.contains('product-card') && 
        !element.classList.contains('advantage-item') && 
        !element.classList.contains('gallery-item')) {
        animationObserver.observe(element);
    }
});

// Premium Gallery Lightbox
let currentImageIndex = 0;
const galleryItems = Array.from(galleryImages);

galleryImages.forEach((image, index) => {
    image.addEventListener('click', () => {
        currentImageIndex = index;
        
        const imageSrc = image.getAttribute('data-src');
        const title = image.getAttribute('data-title');
        const desc = image.getAttribute('data-desc');
        
        // Set lightbox content
        lightboxImage.src = imageSrc;
        lightboxImage.alt = title;
        lightboxTitle.textContent = title;
        lightboxDesc.textContent = desc;
        
        // Show lightbox with animation
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add keyboard navigation
        document.addEventListener('keydown', handleLightboxKeyboard);
    });
});

// Lightbox Navigation Functions
function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
    updateLightboxImage();
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
    updateLightboxImage();
}

function updateLightboxImage() {
    const image = galleryItems[currentImageIndex];
    const imageSrc = image.getAttribute('data-src');
    const title = image.getAttribute('data-title');
    const desc = image.getAttribute('data-desc');
    
    // Fade out current image
    lightboxImage.style.opacity = '0';
    
    setTimeout(() => {
        lightboxImage.src = imageSrc;
        lightboxImage.alt = title;
        lightboxTitle.textContent = title;
        lightboxDesc.textContent = desc;
        
        // Fade in new image
        lightboxImage.style.opacity = '1';
    }, 200);
}

function handleLightboxKeyboard(e) {
    switch(e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowRight':
            showNextImage();
            break;
        case 'ArrowLeft':
            showPrevImage();
            break;
    }
}

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', handleLightboxKeyboard);
}

lightboxClose.addEventListener('click', closeLightbox);

// Close lightbox when clicking outside the content
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Enhanced Form Submission
if (inquiryForm) {
    inquiryForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(inquiryForm);
        const submitBtn = inquiryForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> در حال ارسال...';
        submitBtn.disabled = true;
        
        try {
            // In a real application, you would send this to a server
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            showNotification('درخواست شما با موفقیت ثبت شد. کارشناسان ما در کمتر از ۲ ساعت با شما تماس خواهند گرفت.', 'success');
            
            // Reset form
            inquiryForm.reset();
            
        } catch (error) {
            showNotification('خطا در ارسال فرم. لطفا مجددا تلاش کنید.', 'error');
        } finally {
            // Reset button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%) translateY(-20px);
        background-color: ${type === 'success' ? 'rgba(76, 175, 80, 0.9)' : 'rgba(244, 67, 54, 0.9)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--radius-md);
        display: flex;
        align-items: center;
        gap: 0.75rem;
        z-index: 3000;
        opacity: 0;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
        box-shadow: var(--shadow-md);
    `;
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(-50%) translateY(0)';
    }, 10);
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-50%) translateY(-20px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(-50%) translateY(-20px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Enhanced Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Parallax Effect for Hero
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-background');
    if (hero) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        hero.style.transform = `translate3d(0, ${rate}px, 0) scale(1.1)`;
    }
});

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    // Set current year in copyright
    const yearElements = document.querySelectorAll('.current-year');
    yearElements.forEach(el => {
        el.textContent = new Date().getFullYear();
    });
    
    // Add loading animation to hero
    setTimeout(() => {
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight) {
                el.classList.add('visible');
            }
        });
    }, 500);
    
    // Initialize tooltips
    initializeTooltips();
    
    console.log('SOHEILI WOOD - Premium UI/UX Loaded');
    console.log('Industrial Luxury Design System Active');
});

// Tooltip System
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(el => {
        const tooltipText = el.getAttribute('data-tooltip');
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = tooltipText;
        
        el.appendChild(tooltip);
        
        el.addEventListener('mouseenter', () => {
            tooltip.style.opacity = '1';
            tooltip.style.transform = 'translate(-50%, 0)';
        });
        
        el.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
            tooltip.style.transform = 'translate(-50%, 10px)';
        });
    });
}

// Add tooltip styles to head
const tooltipStyles = document.createElement('style');
tooltipStyles.textContent = `
    .tooltip {
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translate(-50%, 10px);
        background-color: var(--color-primary);
        color: var(--color-light);
        padding: 0.5rem 1rem;
        border-radius: var(--radius-sm);
        font-size: 0.875rem;
        white-space: nowrap;
        opacity: 0;
        transition: all 0.3s ease;
        pointer-events: none;
        z-index: 1000;
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: var(--shadow-md);
    }
    
    .tooltip::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-width: 6px;
        border-style: solid;
        border-color: var(--color-primary) transparent transparent transparent;
    }
`;
document.head.appendChild(tooltipStyles);

// Performance Optimizations
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Recalculate animations on resize
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight) {
                el.classList.add('visible');
            }
        });
    }, 250);
});

// Lazy Loading for Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
