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
      if (!email.value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
        showError(email, 'Please enter a valid business email address');
        isValid = false;
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
