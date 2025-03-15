/*
Pacific Force Esports Team Website
Main JavaScript File - Optimized Version
*/

// Register service worker for offline capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/js/sw.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    });
}

// Add preload class to body to prevent transition flashes during initial load
document.body.classList.add('preload');

document.addEventListener('DOMContentLoaded', function() {
    // Remove preload class after a short delay
    setTimeout(function() {
        document.body.classList.remove('preload');
    }, 300);
    
    // Mobile Menu Toggle - Optimized
    initMobileMenu();
    
    // Optimized Sticky Header
    initStickyHeader();
    
    // Smooth Scrolling for Anchor Links
    initSmoothScrolling();
    
    // Newsletter Form Submission
    initNewsletterForm();
    
    // Lazy load images
    initLazyLoading();
    
    // Animate elements when they come into view using Intersection Observer
    initAnimations();
    
    // Initialize team page tabs
    initTeamTabs();
    
    // Initialize FAQ functionality
    initFAQ();
    
    // Initialize scroll to top button
    initScrollToTop();
    
    // Initialize scroll progress indicator
    initScrollProgress();
});

// Initialize mobile menu
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;
    let menuOverlay;
    
    // Create menu overlay if it doesn't exist
    if (!document.querySelector('.menu-overlay')) {
        menuOverlay = document.createElement('div');
        menuOverlay.className = 'menu-overlay';
        body.appendChild(menuOverlay);
    } else {
        menuOverlay = document.querySelector('.menu-overlay');
    }
    
    if (mobileMenuToggle && mainNav) {
        // Toggle mobile menu
        mobileMenuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMobileMenu();
        });
        
        // Handle overlay click to close menu
        menuOverlay.addEventListener('click', function() {
            closeMobileMenu();
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mainNav.contains(event.target) && 
                !mobileMenuToggle.contains(event.target) && 
                mainNav.classList.contains('active')) {
                closeMobileMenu();
            }
        });
        
        // Close menu on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mainNav.classList.contains('active')) {
                closeMobileMenu();
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }
    
    // Toggle mobile menu function
    function toggleMobileMenu() {
        const isActive = mainNav.classList.contains('active');
        
        mainNav.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        mobileMenuToggle.setAttribute('aria-expanded', !isActive);
        
        // Toggle body scroll
        if (!isActive) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
        
        // Change icon based on menu state
        const icon = mobileMenuToggle.querySelector('i');
        if (icon) {
            if (!isActive) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    }
    
    // Close mobile menu function
    function closeMobileMenu() {
        mainNav.classList.remove('active');
        menuOverlay.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
        
        // Reset icon
        const icon = mobileMenuToggle.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
}

// Initialize sticky header
function initStickyHeader() {
    const header = document.querySelector('header');
    
    if (header) {
        // Apply sticky class immediately if needed
        const isInnerPage = !document.querySelector('.hero');
        
        if (isInnerPage || window.scrollY > 50) {
            header.classList.add('sticky');
        }
        
        // Use more efficient scroll handling with requestAnimationFrame
        let ticking = false;
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    if (window.scrollY > 50) {
                        header.classList.add('sticky');
                    } else {
                        header.classList.remove('sticky');
                    }
                    ticking = false;
                });
                
                ticking = true;
            }
        });
    }
}

// Initialize smooth scrolling
function initSmoothScrolling() {
    const mainNav = document.querySelector('.main-nav');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (mainNav && mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    const icon = mobileMenuToggle.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
                
                // Scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for header
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize newsletter form
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // In a real implementation, you would send this to your backend
                // For now, we'll just show a success message
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            }
        });
    }
}

// Initialize lazy loading for images
function initLazyLoading() {
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        // Load all images immediately
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.classList.add('loaded');
        });
    }
}

// Initialize animations using Intersection Observer
function initAnimations() {
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const elements = document.querySelectorAll('.game-card, .news-card, .match-card, .sponsor-item, .mission-box, .vision-box, .values-box, .leader-card, .info-item, .faq-item');
        
        const animationObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '0px',
            threshold: 0.1
        });
        
        elements.forEach(element => {
            animationObserver.observe(element);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        const elements = document.querySelectorAll('.game-card, .news-card, .match-card, .sponsor-item, .mission-box, .vision-box, .values-box, .leader-card, .info-item, .faq-item');
        
        // Add animation class to all elements immediately
        elements.forEach(element => {
            element.classList.add('animate');
        });
    }
}

// Initialize team page tabs with accessibility
function initTeamTabs() {
    const tabs = document.querySelectorAll('.tab[data-tab]');
    
    if (tabs.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Get the target roster
                const targetId = this.getAttribute('data-tab');
                const targetRoster = document.getElementById(targetId + '-roster');
                
                if (!targetRoster) return;
                
                // Update tab states
                tabs.forEach(t => {
                    t.classList.remove('active');
                    t.setAttribute('aria-selected', 'false');
                });
                
                this.classList.add('active');
                this.setAttribute('aria-selected', 'true');
                
                // Update roster visibility
                document.querySelectorAll('.team-roster').forEach(roster => {
                    roster.classList.remove('active');
                });
                
                targetRoster.classList.add('active');
                
                // Save active tab preference in localStorage
                localStorage.setItem('activeTeamTab', targetId);
            });
            
            // Add keyboard navigation
            tab.addEventListener('keydown', function(e) {
                // Handle arrow keys for tab navigation
                if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                    e.preventDefault();
                    
                    const tabList = Array.from(tabs);
                    const currentIndex = tabList.indexOf(this);
                    let newIndex;
                    
                    if (e.key === 'ArrowLeft') {
                        newIndex = currentIndex > 0 ? currentIndex - 1 : tabList.length - 1;
                    } else {
                        newIndex = currentIndex < tabList.length - 1 ? currentIndex + 1 : 0;
                    }
                    
                    tabList[newIndex].focus();
                    tabList[newIndex].click();
                }
            });
        });
        
        // Activate the first tab by default if no tab is active
        if (!document.querySelector('.tab.active') && tabs.length > 0) {
            tabs[0].click();
        }
    }
}

// Add FAQ functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        // Hide answers initially
        if (answer) {
            answer.style.display = 'none';
        }
        
        if (question) {
            question.addEventListener('click', function() {
                item.classList.toggle('active');
                
                if (answer) {
                    if (answer.style.display === 'none') {
                        answer.style.display = 'block';
                        question.setAttribute('aria-expanded', 'true');
                    } else {
                        answer.style.display = 'none';
                        question.setAttribute('aria-expanded', 'false');
                    }
                }
            });
            
            // Add keyboard accessibility
            question.setAttribute('tabindex', '0');
            question.setAttribute('aria-expanded', 'false');
            
            question.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    question.click();
                }
            });
        }
    });
}

// Initialize scroll to top button
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    if (scrollToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (!scrollToTopBtn.classList.contains('visible') && window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else if (scrollToTopBtn.classList.contains('visible') && window.pageYOffset <= 300) {
                scrollToTopBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top when button is clicked
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Handle keyboard navigation
        scrollToTopBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Initialize scroll progress indicator
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;
    
    function updateScrollProgress() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    }
    
    // Update on scroll
    window.addEventListener('scroll', updateScrollProgress);
    
    // Initial update
    updateScrollProgress();
}

// Add performance metrics logging (for development)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.addEventListener('load', function() {
        // Log performance metrics
        setTimeout(function() {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log('Page load time: ' + pageLoadTime + 'ms');
        }, 0);
    });
} 