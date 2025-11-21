// Mobile Video Fix Script
document.addEventListener('DOMContentLoaded', function() {
    // Function to handle video playback on mobile
    function initMobileVideos() {
        const videos = document.querySelectorAll('video');
        
        videos.forEach(video => {
            // Set video attributes for mobile compatibility
            video.setAttribute('playsinline', 'true');
            video.setAttribute('webkit-playsinline', 'true');
            video.setAttribute('muted', 'true');
            video.setAttribute('autoplay', 'true');
            video.setAttribute('loop', 'true');
            video.muted = true;
            video.autoplay = true;
            video.loop = true;
            video.playsInline = true;
            
            // Force play on mobile devices
            const playVideo = () => {
                video.play().catch(e => {
                    console.log('Video autoplay failed:', e);
                    // Fallback: try to play on user interaction
                    document.addEventListener('touchstart', () => {
                        video.play().catch(console.log);
                    }, { once: true });
                });
            };
            
            // Try to play immediately
            playVideo();
            
            // Ensure video plays when it's loaded
            video.addEventListener('loadeddata', playVideo);
            video.addEventListener('canplay', playVideo);
            
            // Handle visibility change (when user switches tabs)
            document.addEventListener('visibilitychange', () => {
                if (!document.hidden) {
                    playVideo();
                }
            });
        });
    }
    
    // Initialize videos
    initMobileVideos();
    
    // Re-initialize if new videos are added dynamically
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                initMobileVideos();
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    // Mobile menu toggle function
    window.toggleMenu = function() {
        const mobileNav = document.getElementById('mobileNav');
        const menuIcon = document.querySelector('.menu-icon i');
        
        if (mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        } else {
            mobileNav.classList.add('active');
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
        }
    };
    
    // Features dropdown toggle
    window.toggleFeaturesDropdown = function(event) {
        event.preventDefault();
        const dropdown = event.target.nextElementSibling;
        const toggle = event.target;
        
        if (dropdown.classList.contains('active')) {
            dropdown.classList.remove('active');
            toggle.classList.remove('active');
        } else {
            dropdown.classList.add('active');
            toggle.classList.add('active');
        }
    };
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const mobileNav = document.getElementById('mobileNav');
        const menuIcon = document.querySelector('.menu-icon');
        
        if (!mobileNav.contains(event.target) && !menuIcon.contains(event.target)) {
            mobileNav.classList.remove('active');
            document.querySelector('.menu-icon i').classList.remove('fa-times');
            document.querySelector('.menu-icon i').classList.add('fa-bars');
        }
    });
    
    // Smooth scrolling for anchor links
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
    
    // Hero CTA button functionality
    const heroCTA = document.querySelector('.hero-cta');
    if (heroCTA) {
        heroCTA.addEventListener('click', function() {
            const servicesSection = document.getElementById('services');
            if (servicesSection) {
                servicesSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer2 = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe service cards for animations
    document.querySelectorAll('.service-card').forEach(card => {
        observer2.observe(card);
    });
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Re-initialize videos after resize
            initMobileVideos();
        }, 250);
    });
});

// Additional mobile-specific fixes
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.body.classList.add('mobile-device');
    
    // Prevent zoom on input focus (iOS)
    document.addEventListener('touchstart', function() {}, true);
    
    // Handle orientation change
    window.addEventListener('orientationchange', function() {
        setTimeout(function() {
            // Re-initialize videos after orientation change
            document.querySelectorAll('video').forEach(video => {
                video.play().catch(console.log);
            });
        }, 500);
    });
}