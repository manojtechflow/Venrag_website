// Custom Cursor
const cursor = document.querySelector('.custom-cursor');
const cursorDot = document.querySelector('.custom-cursor-dot');

if (cursor && cursorDot) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });
}

// Mobile Loading Screen
document.addEventListener('DOMContentLoaded', function() {
  const transition = document.querySelector('.page-transition');
  if (transition) {
    // Show loading overlay
    transition.style.display = 'flex';
    // Hide after 1000ms
    setTimeout(() => {
      transition.style.display = 'none';
    }, 700);
  }
  
  // Observe stat items
  const statItems = document.querySelectorAll('.stat-item');
  if (statItems.length > 0 && typeof statsObserver !== 'undefined') {
    statItems.forEach(el => {
      statsObserver.observe(el);
    });
  }
});

// Touch-only debounce to prevent accidental double taps / double navigation on mobile
(function(){
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0);
    const smallScreen = window.innerWidth && window.innerWidth <= 768;
    if (!isTouch && !smallScreen) return;

    let navLock = false;
    document.addEventListener('click', function(e){
        const el = e.target.closest('a, button');
        if (!el) return;
        if (navLock) {
            e.preventDefault();
            e.stopImmediatePropagation();
            return;
        }
        // lock when a navigation is triggered, short timeout
        if ((el.tagName === 'A' && el.href) || el.tagName === 'BUTTON') {
            navLock = true;
            setTimeout(() => { navLock = false; }, 700);
        }
    }, true);
})();

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements that should animate in
document.querySelectorAll('.service-card, .testimonial-card, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// Stats counter animation
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
      entry.target.classList.add('animated');
      const valueElement = entry.target.querySelector('.stat-value');
      if (valueElement) {
        const originalText = valueElement.textContent;
        
        if (originalText.includes('10M+')) {
          animateValue(valueElement, 0, 10, 2000, 'M+');
        } else if (originalText.includes('99.8%')) {
          animateValue(valueElement, 0, 99.8, 2000, '%');
        } else if (originalText.includes('500+')) {
          animateValue(valueElement, 0, 500, 2000, '+');
        } else if (originalText.includes('24/7')) {
          valueElement.textContent = '24/7';
        }
      }
    }
  });
}, { threshold: 0.5 });

function animateValue(element, start, end, duration, suffix) {
  const increment = (end - start) / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= end) {
      current = end;
      clearInterval(timer);
    }
    
    if (suffix === '%') {
      element.textContent = current.toFixed(1) + suffix;
    } else {
      element.textContent = Math.floor(current) + suffix;
    }
  }, 16);
}

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Form submitted! (This is a demo - connect to your backend)');
    });
}

// Video play button
const videoWrapper = document.querySelector('.video-wrapper');
if (videoWrapper) {
    videoWrapper.addEventListener('click', () => {
        alert('Video would play here (connect your video source)');
    });
}

// Mobile Menu Toggle
function toggleMenu() {
  const mobileNav = document.getElementById('mobileNav');
  mobileNav.classList.toggle('active');
  
  // Prevent body scrolling when menu is open
  if (mobileNav.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
  const menu = document.getElementById("mobileNav");
  const menuButton = document.querySelector(".menu-icon");

  if (
    window.innerWidth < 769 && // Only on mobile
    menu.style.display === "block" &&
    !menu.contains(event.target) &&
    !menuButton.contains(event.target)
  ) {
    menu.style.display = "none";
  }
});

// Toggle features dropdown in mobile menu
function toggleFeaturesDropdown(event) {
  event.preventDefault();
  event.stopPropagation();
  
  const dropdownToggle = event.currentTarget;
  const dropdown = dropdownToggle.nextElementSibling;
  
  if (dropdown) {
    dropdown.classList.toggle('active');
    dropdownToggle.classList.toggle('active');
  }
}

//  Wave 3D Effect for Services
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    
    scrollTimeout = setTimeout(() => {
        const serviceCards = document.querySelectorAll('.service-card');
        
        if (serviceCards.length > 0) {
            serviceCards.forEach((card, index) => {
                try {
                    const rect = card.getBoundingClientRect();
                    const progress = (window.innerHeight - rect.top) / window.innerHeight;
                    
                    if (progress > 0 && progress < 1.5) {
                        const wave = Math.sin(progress * Math.PI) * 20;
                        const rotate = progress * 15 - 7.5;
                        const scale = 0.9 + (Math.sin(progress * Math.PI) * 0.2);
                        
                        // Apply transform only to card content, not the entire card
                        const cardContent = card.querySelector('.service-content');
                        const cardNumber = card.querySelector('.service-number');
                        
                        if (cardContent) {
                            cardContent.style.transform = `translateX(${wave}px) rotateY(${rotate}deg) scale(${scale})`;
                        }
                        if (cardNumber) {
                            cardNumber.style.transform = `translateX(${wave * 0.5}px) rotateY(${rotate * 0.5}deg)`;
                        }
                    }
                } catch (error) {
                    console.warn('Error in service card animation:', error);
                }
            });
        }
    }, 16); // Throttle to ~60fps
});

// Service Link Scroll Animation - DISABLED TO ENSURE LINKS WORK
// This animation was preventing clicks on service links

// Hero button scroll animation
let heroScrollTimeout;
window.addEventListener('scroll', () => {
    if (heroScrollTimeout) {
        clearTimeout(heroScrollTimeout);
    }
    
    heroScrollTimeout = setTimeout(() => {
        const heroButton = document.querySelector('.hero-cta');
        if (heroButton) {
            try {
                const scrollPosition = window.scrollY;
                if (scrollPosition > 100) {
                    heroButton.style.transform = 'translateY(50px)';
                    heroButton.style.opacity = '0';
                } else {
                    heroButton.style.transform = 'translateY(0)';
                    heroButton.style.opacity = '1';
                }
            } catch (error) {
                console.warn('Error in hero button animation:', error);
            }
        }
    }, 16);
});

// Video scroll effect
function checkVideo() {
    const video = document.querySelector('.scroll-video');
    if (video) {
        const rect = video.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            video.classList.add('enlarged');
        } else {
            video.classList.remove('enlarged');
        }
    }
}

window.addEventListener('scroll', checkVideo);
window.addEventListener('load', checkVideo);
document.addEventListener('DOMContentLoaded', checkVideo);

// Scroll enlarge effect for About page image
function checkScrollEnlarge() {
    const enlargeImage = document.querySelector('.scroll-enlarge');
    if (enlargeImage) {
        const rect = enlargeImage.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
            enlargeImage.classList.add('enlarged');
        } else {
            enlargeImage.classList.remove('enlarged');
        }
    }
}

window.addEventListener('scroll', checkScrollEnlarge);
window.addEventListener('load', checkScrollEnlarge);
document.addEventListener('DOMContentLoaded', checkScrollEnlarge);

// Cookie Consent Functionality
document.addEventListener('DOMContentLoaded', function() {
    const cookieConsent = document.getElementById('cookieConsent');
    const cookieSettingsModal = document.getElementById('cookieSettingsModal');
    const acceptCookiesBtn = document.getElementById('acceptCookies');
    const acceptEssentialBtn = document.getElementById('acceptEssentialCookies');
    const declineCookiesBtn = document.getElementById('declineCookies');
    const cookieSettingsBtn = document.getElementById('cookieSettings');
    const closeSettingsBtn = document.getElementById('closeSettings');
    const saveSettingsBtn = document.querySelector('.cookie-settings-save');

    // Check if user has already made a choice
    if (!localStorage.getItem('cookieConsent')) {
        setTimeout(() => {
            if (cookieConsent) {
                cookieConsent.classList.add('active');
            }
        }, 1000);
    }

    // Accept all cookies
    if (acceptCookiesBtn) {
        acceptCookiesBtn.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'accepted');
            hideCookieBanner();
        });
    }

    // Accept essential cookies only
    if (acceptEssentialBtn) {
        acceptEssentialBtn.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'essential');
            hideCookieBanner();
        });
    }

    // Decline cookies
    if (declineCookiesBtn) {
        declineCookiesBtn.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'declined');
            hideCookieBanner();
        });
    }

    // Open cookie settings
    if (cookieSettingsBtn) {
        cookieSettingsBtn.addEventListener('click', function() {
            if (cookieSettingsModal) {
                cookieSettingsModal.classList.add('active');
            }
        });
    }

    // Close cookie settings
    if (closeSettingsBtn) {
        closeSettingsBtn.addEventListener('click', function() {
            if (cookieSettingsModal) {
                cookieSettingsModal.classList.remove('active');
            }
        });
    }

    // Save cookie settings
    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'customized');
            if (cookieSettingsModal) {
                cookieSettingsModal.classList.remove('active');
            }
            hideCookieBanner();
        });
    }

    // Close modal when clicking outside
    if (cookieSettingsModal) {
        cookieSettingsModal.addEventListener('click', function(e) {
            if (e.target === cookieSettingsModal) {
                cookieSettingsModal.classList.remove('active');
            }
        });
    }

    function hideCookieBanner() {
        if (cookieConsent) {
            cookieConsent.classList.remove('active');
            setTimeout(() => {
                cookieConsent.style.display = 'none';
            }, 400);
        }
    }
});