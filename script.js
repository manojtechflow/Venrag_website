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
  var menu = document.getElementById("navMenu");
  if (menu.style.display === "block") {
    menu.style.display = "none";
  } else {
    menu.style.display = "block";
  }
}