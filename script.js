document.addEventListener('DOMContentLoaded', function() {
  // Page Transition Effect
  const transition = document.querySelector('.page-transition');
  if (transition) {
    // Show the overlay (it is already in the HTML)
    transition.style.display = 'flex';
    // Hide the overlay after 500ms
    setTimeout(() => {
      transition.style.display = 'none';
    }, 500);
  }

  // Contact form validation and submission (if present)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      let isValid = true;
      
      // Remove any existing error messages
      document.querySelectorAll('.error-message').forEach(el => el.remove());
      
      const firstName = document.getElementById('firstName');
      const lastName = document.getElementById('lastName');
      const email = document.getElementById('businessEmail');
      const requirements = document.getElementById('requirements');
      const emailConsent = document.getElementById('emailConsent');
      
      // Validate First Name (2-50 letters)
      if (!firstName.value.match(/^[A-Za-z\s]{2,50}$/)) {
        showError(firstName, 'Please enter a valid first name (2-50 letters)');
        isValid = false;
      }
      
      // Validate Last Name (2-50 letters)
      if (!lastName.value.match(/^[A-Za-z\s]{2,50}$/)) {
        showError(lastName, 'Please enter a valid last name (2-50 letters)');
        isValid = false;
      }
      
      // Validate Business Email
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const forbiddenDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'live.com'];
         
      if (!emailRegex.test(email.value)) {
        showError(email, 'Please enter a valid or professional email address');
        isValid = false;
      } else {
        // Extract the domain using optional chaining to avoid errors if "@" is missing
        const domain = email.value.split('@')[1]?.toLowerCase();
        if (!domain || forbiddenDomains.includes(domain)) {
          showError(email, 'Please enter a valid or professional email address');
          isValid = false;
        }
      }
      
      // Validate Requirements (minimum 20 characters)
      if (requirements.value.length < 20) {
        showError(requirements, 'Please provide more details (minimum 20 characters)');
        isValid = false;
      }
      
      // Validate Email Consent
      if (!emailConsent.checked) {
        showError(emailConsent, 'Please accept email communication consent');
        isValid = false;
      }
      
      if (isValid) {
        submitForm(new FormData(contactForm));
      }
    });
  }
  
  function showError(element, message) {
    const error = document.createElement('div');
    error.className = 'error-message';
    error.textContent = message;
    element.parentNode.appendChild(error);
  }
  
  async function submitForm(formData) {
    const submitButton = document.querySelector('.request-demo-btn');
    const originalText = submitButton.innerHTML;
    try {
      submitButton.innerHTML = '<span>Submitting...</span>';
      submitButton.disabled = true;
      // Send the form data to Formspree
      const response = await fetch("https://formspree.io/f/xqapeyzp", {
        method: "POST",
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      });
      if (response.ok) {
        alert('Thank you for your interest! We will contact you soon.');
        document.getElementById('contactForm').reset();
      } else {
        alert('An error occurred. Please try again later.');
      }
      // Simulate form submission delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('Thank you for your interest! We will contact you soon.');
      document.getElementById('contactForm').reset();
    } catch (error) {
      alert('An error occurred. Please try again later.');
    } finally {
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
    }
  }
  
});


let lastScrollTop = 0;
const header = document.querySelector('header');
const footer = document.querySelector('footer');

window.addEventListener('scroll', function () {
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  // Apply blur when scrolling
  if (currentScroll > lastScrollTop) {
    // Scrolling down, apply blur
    header.style.backdropFilter = 'blur(8px)';
    footer.style.backdropFilter = 'blur(8px)';
  } else {
    // Scrolling up, remove blur
    header.style.backdropFilter = 'blur(8px)';
    footer.style.backdropFilter = 'blur(8px)';
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Prevent negative scroll value
});

function toggleMenu() {
  const mobileNav = document.getElementById('mobileNav');
  mobileNav.classList.toggle('active');
  
  // Optional: Toggle hamburger icon animation
  document.querySelector('.menu-icon').classList.toggle('open');
  
  // Initialize Features dropdown state when opening the menu
  if (mobileNav.classList.contains('active')) {
    // When opening the menu, ensure all dropdowns are closed
    const dropdowns = document.querySelectorAll('.features-dropdown');
    dropdowns.forEach(dropdown => {
      if (!dropdown.classList.contains('active')) {
        dropdown.style.display = 'none';
      }
    });
  }
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
  const menu = document.getElementById("mobileNav");
  const menuButton = document.querySelector(".menu-icon");

  if (
    window.innerWidth < 769 && // Only apply on mobile
    menu.style.display === "block" &&
    !menu.contains(event.target) &&
    !menuButton.contains(event.target)
  ) {
    menu.style.display = "none";
  }
});

// Close mobile menu on nav link click (except dropdown toggles)
document.querySelectorAll("#mobileNav .nav-link:not(.dropdown-toggle)").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("mobileNav").style.display = "none";
  });
});

// Toggle Features dropdown in mobile menu
function toggleFeaturesDropdown(event) {
  // Only allow dropdown functionality in mobile menu
  if (!isMobileMenuOpen()) {
    return;
  }
  
  event.preventDefault();
  event.stopPropagation(); // Prevent event bubbling
  
  const dropdownToggle = event.currentTarget;
  const featuresDropdown = dropdownToggle.nextElementSibling;
  
  // Toggle active class on dropdown toggle
  dropdownToggle.classList.toggle('active');
  
  // Toggle the dropdown visibility
  if (featuresDropdown.classList.contains('active')) {
    featuresDropdown.classList.remove('active');
    featuresDropdown.style.display = 'none';
  } else {
    featuresDropdown.classList.add('active');
    featuresDropdown.style.display = 'block';
  }
}

// Helper function to check if mobile menu is open
function isMobileMenuOpen() {
  const mobileNav = document.getElementById('mobileNav');
  return mobileNav && (mobileNav.classList.contains('active') || mobileNav.style.display === 'block');
}

// Tab switching logic
const tabs = document.querySelectorAll('.tab-list .tab');
const contents = document.querySelectorAll('.tab-content');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // deactivate all
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));
    // activate clicked
    tab.classList.add('active');
    document.getElementById(tab.dataset.target).classList.add('active');
  });
});
