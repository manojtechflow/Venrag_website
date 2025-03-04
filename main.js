// Main file to manage all page operations

// Initialize scroll behavior
window.onload = function() {
  window.scrollTo(0, 0);
  };
  
  // Page Loading Functionality
  const contentContainer = document.getElementById('content-container');
  
  async function loadPage(page) {
  try {
  const response = await fetch(`#${page}.html`);
  const html = await response.text();
  contentContainer.innerHTML = html;
  window.scrollTo(0, 0);
  updateActiveNav(page);
  } catch (error) {
  console.error('Error loading page:', error);
  contentContainer.innerHTML = '<p>Error loading page content</p>';
  }
  }
  
  function updateActiveNav(page) {
  document.querySelectorAll('.nav-link').forEach(link => {
  link.classList.remove('active');
  if (link.dataset.target === page) {
  link.classList.add('active');
  }
  });
  }
  
  // Event Delegation for Navigation
  document.addEventListener('click', (e) => {
  if (e.target.closest('.nav-link')) {
  e.preventDefault();
  const page = e.target.closest('.nav-link').dataset.target;
  loadPage(page);
  history.pushState({ page }, '', `#${page}`);
  }
  });
  
  // Handle Browser History
  window.addEventListener('popstate', (e) => {
  if (e.state?.page) {
  loadPage(e.state.page);
  } else {
  loadPage('home');
  }
  });
  
  // Initial Page Load
  const initialPage = window.location.hash.slice(1) || 'home';
  loadPage(initialPage);
  
  // Add other page operations here as needed