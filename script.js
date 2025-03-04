// Enhanced navigation and page handling for GitHub Pages
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const transition = document.querySelector('.page-transition');
    const pages = document.querySelectorAll('.page');
    
    // Performance tracking
    const performanceMarks = {
        pageLoadStart: performance.now(),
        transitionComplete: null
    };
    
    // Determine the initial page to show based on URL hash or stored preference
    const hash = window.location.hash.slice(1);
    const initialPage = hash || localStorage.getItem('currentPage') || 'home';
    
    // Accessibility and keyboard navigation
    function setupKeyboardNavigation() {
        document.addEventListener('keydown', function(e) {
            if (e.altKey) {
                switch(e.key) {
                    case '1': navigateTo('home'); break;
                    case '2': navigateTo('about'); break;
                    case '3': navigateTo('venrag-chat'); break;
                    case '4': navigateTo('future'); break;
                    case '5': navigateTo('industries'); break;
                    case '6': navigateTo('contact'); break;
                }
            }
        });
    }
    
    // Function to show a specific page
    function showPage(pageId) {
        // Remove active class from all pages
        pages.forEach(page => {
            page.classList.remove('active');
            page.setAttribute('aria-hidden', 'true');
            page.style.opacity = '0';
        });
        
        // Add active class to the target page
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            targetPage.setAttribute('aria-hidden', 'false');
            targetPage.style.opacity = '1';
            
            // Update URL hash
            history.pushState({page: pageId}, '', `#${pageId}`);
            
            // Update active nav link
            updateActiveNav(pageId);
            
            // Save current page to localStorage
            localStorage.setItem('currentPage', pageId);
            
            // Log page transition for analytics
            console.log(`Navigated to page: ${pageId}`);
        } else {
            console.error(`Page with ID '${pageId}' not found`);
        }
    }
    
    // Update the active navigation link
    function updateActiveNav(pageId) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-target') === pageId || link.getAttribute('href') === `#${pageId}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Navigation function with transition
    function navigateTo(pageId) {
        // Prevent navigation to current page
        if (document.querySelector(`#${pageId}.active`)) return;
        
        // Accessibility focus management
        const targetLink = document.querySelector(`[data-target="${pageId}"]`);
        if (targetLink) targetLink.focus();
        
        // Performance tracking start
        const navStart = performance.now();
        
        // Show transition overlay with logo
        transition.style.display = 'flex';
        
        // Hide current page
        pages.forEach(page => {
            page.style.opacity = '0';
        });
        
        // Wait for animation to complete
        setTimeout(() => {
            // Hide transition overlay
            transition.style.display = 'none';
            
            // Show new page
            showPage(pageId);
            
            // Performance tracking
            const navEnd = performance.now();
            console.log(`Page transition completed in ${(navEnd - navStart).toFixed(2)}ms`);
        }, 250);
    }
    
    // Initial page load transition
    function initialPageLoad() {
        // Performance tracking start
        performanceMarks.pageLoadStart = performance.now();
        
        // Show transition overlay with logo
        transition.style.display = 'flex';
        
        // Hide all pages initially
        pages.forEach(page => {
            page.style.opacity = '0';
        });
        
        // Wait for animation to complete
        setTimeout(() => {
            // Hide transition overlay
            transition.style.display = 'none';
            
            // Show initial page
            showPage(initialPage);
            
            // Performance tracking
            performanceMarks.transitionComplete = performance.now();
            const loadTime = performanceMarks.transitionComplete - performanceMarks.pageLoadStart;
            console.log(`Initial page load completed in ${loadTime.toFixed(2)}ms`);
        }, 250);
    }
    
    // Handle browser navigation with back/forward buttons
    window.addEventListener('popstate', (e) => {
        if (e.state?.page) {
            navigateTo(e.state.page);
        } else {
            navigateTo('home');
        }
    });
    
    // Attach navigation to all nav links
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-target') || this.getAttribute('href').substring(1);
            navigateTo(pageId);
        });
    });
    
    // Attach navigation to buttons
    document.querySelectorAll('button[onclick^="navigateTo"]').forEach(button => {
        const onclick = button.getAttribute('onclick');
        if (onclick) {
            button.removeAttribute('onclick');
            button.addEventListener('click', function() {
                const match = onclick.match(/navigateTo\(['"]([^'"]*)['"]\)/);
                if (match && match[1]) {
                    navigateTo(match[1]);
                }
            });
        }
    });
    
    // Prevent default anchor behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-target') || this.getAttribute('href').substring(1);
            navigateTo(pageId);
        });
    });
    
    // Setup keyboard navigation
    setupKeyboardNavigation();
    
    // Trigger initial page load transition
    initialPageLoad();
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Basic form validation
            const name = contactForm.querySelector('#name').value.trim();
            const email = contactForm.querySelector('#email').value.trim();
            const message = contactForm.querySelector('#message').value.trim();
            
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Simulate form submission
            alert('Thank you for your message. We will get back to you soon!');
            contactForm.reset();
        });
    }
    
    // Make navigateTo available globally
    window.navigateTo = navigateTo;
});