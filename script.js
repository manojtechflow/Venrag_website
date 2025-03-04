// Navigation and page handling
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
        page.style.opacity = '0';
    });
    
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        setTimeout(() => {
            targetPage.style.opacity = '1';
        }, 50);
    }
}

// Navigation function for buttons
function navigateTo(pageId) {
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        const transition = document.querySelector('.page-transition');
        
        // Show transition overlay with logo
        transition.style.display = 'flex';
        
        // Hide current page
        document.querySelectorAll('.page').forEach(page => {
            page.style.opacity = '0';
        });
        
        // Wait for animation to complete
        setTimeout(() => {
            // Hide transition overlay
            transition.style.display = 'none';
            
            // Show new page
            showPage(pageId);
        }, 250);
    }
}

// Handle page transitions
document.addEventListener('DOMContentLoaded', function() {
    const transition = document.querySelector('.page-transition');
    const transitionLogo = transition.querySelector('.transition-logo');
    
    // Performance tracking
    const performanceMarks = {
        pageLoadStart: performance.now(),
        transitionComplete: null
    };
    
    // Determine the initial page to show
    const initialPage = localStorage.getItem('currentPage') || 'home';
    
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
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
            page.setAttribute('aria-hidden', 'true');
        });
        
        // Add active class to the target page
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            targetPage.setAttribute('aria-hidden', 'false');
        }
        
        // Save current page to localStorage
        localStorage.setItem('currentPage', pageId);
        
        // Log page transition for analytics
        console.log(`Navigated to page: ${pageId}`);
    }
    
    // Navigation function with transition
    function navigateTo(pageId) {
        // Prevent navigation to current page
        if (document.querySelector(`#${pageId}.active`)) return;
        
        // Accessibility focus management
        const targetLink = document.querySelector(`[data-target="${pageId}"]`);
        if (targetLink) targetLink.focus();
        
        // Show transition overlay with logo
        transition.style.display = 'flex';
        
        // Hide current page
        document.querySelectorAll('.page').forEach(page => {
            page.style.opacity = '0';
        });
        
        // Wait for animation to complete
        setTimeout(() => {
            // Hide transition overlay
            transition.style.display = 'none';
            
            // Show new page
            showPage(pageId);
            
            // Restore page opacity
            document.querySelectorAll('.page').forEach(page => {
                page.style.opacity = '1';
            });
            
            // Performance tracking
            performanceMarks.transitionComplete = performance.now();
            const transitionDuration = performanceMarks.transitionComplete - performanceMarks.pageLoadStart;
            console.log(`Page transition completed in ${transitionDuration.toFixed(2)}ms`);
        }, 250);
    }
    
    // Initial page load transition
    function initialPageLoad() {
        // Performance tracking start
        performanceMarks.pageLoadStart = performance.now();
        
        // Show transition overlay with logo
        transition.style.display = 'flex';
        
        // Hide all pages initially
        document.querySelectorAll('.page').forEach(page => {
            page.style.opacity = '0';
        });
        
        // Wait for animation to complete
        setTimeout(() => {
            // Hide transition overlay
            transition.style.display = 'none';
            
            // Show initial page
            showPage(initialPage);
            
            // Restore page opacity
            document.querySelectorAll('.page').forEach(page => {
                page.style.opacity = '1';
            });
            
            // Performance tracking
            performanceMarks.transitionComplete = performance.now();
            const loadTime = performanceMarks.transitionComplete - performanceMarks.pageLoadStart;
            console.log(`Initial page load completed in ${loadTime.toFixed(2)}ms`);
        }, 250);
    }
    
    // Attach navigation to all nav links
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-target');
            navigateTo(pageId);
        });
    });
    
    // Attach navigation to buttons with onclick
    document.querySelectorAll('button[onclick^="navigateTo"]').forEach(button => {
        button.addEventListener('click', function() {
            const pageId = this.getAttribute('onclick').match(/'([^']*)'/)[1];
            navigateTo(pageId);
        });
    });
    
    // Setup keyboard navigation
    setupKeyboardNavigation();
    
    // Trigger initial page load transition
    initialPageLoad();
    
    // Prevent default anchor behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-target') || this.getAttribute('href').substring(1);
            navigateTo(pageId);
        });
    });
});

// Contact form handling
document.getElementById('contactForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Thank you for your message. We will get back to you soon!');
});