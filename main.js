// Main file to manage all page operations

// Initialize scroll behavior
window.onload = function() {
  window.scrollTo(0, 0);
};

// Use the correct content container element (make sure your HTML uses id="mainContent")
const contentContainer = document.getElementById('mainContent');

// Page Loading Functionality
async function loadPage(page) {
  try {
    // Fetch the page file (e.g., "home.html", "about.html", etc.)
    const response = await fetch(`${page}.html`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
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
  const navLink = e.target.closest('.nav-link');
  if (navLink) {
    e.preventDefault();
    const page = navLink.dataset.target;
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

// Initial Page Load: Default to "home" if no hash is present
const initialPage = window.location.hash.slice(1) || 'home';
loadPage(initialPage);

// Add other page operations here as needed
