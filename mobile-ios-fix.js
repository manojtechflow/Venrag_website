// iOS and Mobile Video Fix
document.addEventListener('DOMContentLoaded', function() {
    // Mobile device detection
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    if (isMobile) {
        document.body.classList.add('mobile-device');
        
        // Fix videos for mobile
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            // Set attributes for mobile compatibility
            video.setAttribute('playsinline', 'true');
            video.setAttribute('webkit-playsinline', 'true');
            video.setAttribute('muted', 'true');
            video.setAttribute('autoplay', 'true');
            video.setAttribute('loop', 'true');
            video.muted = true;
            video.autoplay = true;
            video.loop = true;
            video.playsInline = true;
            
            // Disable video controls completely
            video.controls = false;
            video.disablePictureInPicture = true;
            video.style.pointerEvents = 'none';
            
            // Force play
            const playVideo = () => {
                video.play().catch(e => {
                    console.log('Video autoplay failed');
                });
            };
            
            playVideo();
            video.addEventListener('loadeddata', playVideo);
            video.addEventListener('canplay', playVideo);
            
            // Prevent any interaction with video
            video.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                return false;
            });
            
            video.addEventListener('touchstart', (e) => {
                e.preventDefault();
                e.stopPropagation();
                return false;
            });
        });
        
        // iOS specific fixes
        if (isIOS) {
            // Fix viewport height for iOS Safari
            const setVH = () => {
                const vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh', `${vh}px`);
            };
            
            setVH();
            window.addEventListener('resize', setVH);
            window.addEventListener('orientationchange', () => {
                setTimeout(setVH, 100);
            });
            
            // Prevent zoom on input focus
            const inputs = document.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('focus', () => {
                    input.style.fontSize = '16px';
                });
            });
        }
    }
    
    // Mobile menu functionality
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
    
    // Features dropdown
    window.toggleFeaturesDropdown = function(event) {
        event.preventDefault();
        const dropdown = event.target.nextElementSibling;
        const toggle = event.target;
        
        if (dropdown && dropdown.classList.contains('features-dropdown')) {
            if (dropdown.classList.contains('active')) {
                dropdown.classList.remove('active');
                toggle.classList.remove('active');
            } else {
                dropdown.classList.add('active');
                toggle.classList.add('active');
            }
        }
    };
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const mobileNav = document.getElementById('mobileNav');
        const menuIcon = document.querySelector('.menu-icon');
        
        if (mobileNav && menuIcon && !mobileNav.contains(event.target) && !menuIcon.contains(event.target)) {
            mobileNav.classList.remove('active');
            const icon = document.querySelector('.menu-icon i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
    
    // Hero CTA scroll functionality
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
    
    // Handle orientation change
    window.addEventListener('orientationchange', function() {
        setTimeout(function() {
            // Re-initialize videos after orientation change
            const videos = document.querySelectorAll('video');
            videos.forEach(video => {
                video.play().catch(console.log);
            });
        }, 500);
    });
    
    // Prevent horizontal scroll
    document.addEventListener('touchmove', function(e) {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });
});