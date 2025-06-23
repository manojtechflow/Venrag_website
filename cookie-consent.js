/**
 * Cookie Consent Manager for VenRAAG
 * GDPR & UK DPA 2018 Compliant
 */

// Cookie consent configuration
const cookieConsentConfig = {
  // Cookie names
  cookieNames: {
    consent: 'venraag_cookie_consent',
    preferences: 'venraag_cookie_preferences'
  },
  // Cookie categories
  categories: {
    essential: {
      name: 'Essential',
      description: 'Required for the website to function properly. Cannot be disabled.',
      required: true
    },
    analytics: {
      name: 'Analytics',
      description: 'Help us understand how visitors interact with our website.',
      required: false
    },
    marketing: {
      name: 'Marketing',
      description: 'Used to deliver relevant ads and measure their effectiveness.',
      required: false
    },
    preferences: {
      name: 'Preferences',
      description: 'Remember your settings and improve your experience.',
      required: false
    }
  },
  // Cookie expiration in days
  expirationDays: 180
};

// Cookie consent manager
class CookieConsentManager {
  constructor(config) {
    this.config = config;
    this.consentBanner = document.getElementById('cookieConsent');
    this.settingsModal = document.getElementById('cookieSettingsModal');
    this.initialized = false;
    
    // Initialize when DOM is fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.init());
    } else {
      this.init();
    }
  }
  
  // Initialize the cookie consent manager
  init() {
    if (this.initialized) return;
    this.initialized = true;
    
    // Check if consent has been given
    const consent = this.getCookie(this.config.cookieNames.consent);
    
    if (!consent) {
      // Show the consent banner if no consent has been given
      setTimeout(() => {
        this.showConsentBanner();
      }, 1000);
    } else {
      // Apply saved preferences
      this.applyPreferences();
    }
    
    // Set up event listeners
    this.setupEventListeners();
  }
  
  // Show the consent banner
  showConsentBanner() {
    if (this.consentBanner) {
      this.consentBanner.classList.add('active');
    }
  }
  
  // Hide the consent banner
  hideConsentBanner() {
    if (this.consentBanner) {
      this.consentBanner.classList.remove('active');
    }
  }
  
  // Show the settings modal
  showSettingsModal() {
    if (this.settingsModal) {
      this.settingsModal.classList.add('active');
      
      // Update toggle states based on current preferences
      const preferences = this.getPreferences();
      
      Object.keys(this.config.categories).forEach(category => {
        const toggle = document.getElementById(`cookie-toggle-${category}`);
        if (toggle) {
          toggle.checked = preferences[category] === true;
          
          // Disable toggle if category is required
          if (this.config.categories[category].required) {
            toggle.disabled = true;
            toggle.checked = true;
          }
        }
      });
    }
  }
  
  // Hide the settings modal
  hideSettingsModal() {
    if (this.settingsModal) {
      this.settingsModal.classList.remove('active');
    }
  }
  
  // Set up event listeners
  setupEventListeners() {
    // Read more/less functionality for essential cookies
    const readMoreBtn = document.querySelector('.cookie-read-more');
    const readLessBtn = document.querySelector('.cookie-read-less');
    const shortDescription = document.querySelector('.cookie-description-short');
    const fullDescription = document.querySelector('.cookie-description-full');
    
    if (readMoreBtn && readLessBtn && shortDescription && fullDescription) {
      readMoreBtn.addEventListener('click', () => {
        shortDescription.style.display = 'none';
        fullDescription.style.display = 'block';
        readMoreBtn.style.display = 'none';
      });
      
      readLessBtn.addEventListener('click', () => {
        shortDescription.style.display = 'block';
        fullDescription.style.display = 'none';
        readMoreBtn.style.display = 'inline-block';
      });
    }
    
    // Accept all cookies
    const acceptBtn = document.getElementById('acceptCookies');
    if (acceptBtn) {
      acceptBtn.addEventListener('click', () => {
        this.acceptAll();
        this.hideConsentBanner();
      });
    }
    
    // Accept only essential cookies
    const essentialsBtn = document.getElementById('acceptEssentialCookies');
    if (essentialsBtn) {
      essentialsBtn.addEventListener('click', () => {
        this.acceptEssential();
        this.hideConsentBanner();
      });
    }
    
    // Decline all non-essential cookies
    const declineBtn = document.getElementById('declineCookies');
    if (declineBtn) {
      declineBtn.addEventListener('click', () => {
        this.declineAll();
        this.hideConsentBanner();
      });
    }
    
    // Open settings modal
    const settingsBtn = document.getElementById('cookieSettings');
    if (settingsBtn) {
      settingsBtn.addEventListener('click', () => {
        this.showSettingsModal();
      });
    }
    
    // Close settings modal
    const closeBtn = document.getElementById('closeSettings');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.hideSettingsModal();
      });
    }
    
    // Save settings
    const saveBtn = document.getElementById('saveSettings');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        this.saveSettings();
        this.hideSettingsModal();
        this.hideConsentBanner();
      });
    }
    
    // Cookie preferences link in footer
    document.querySelectorAll('.cookie-preferences-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.showSettingsModal();
      });
    });
  }
  
  // Accept all cookies
  acceptAll() {
    const preferences = {};
    
    // Set all categories to true
    Object.keys(this.config.categories).forEach(category => {
      preferences[category] = true;
    });
    
    this.savePreferences(preferences);
    this.setConsentCookie(true);
  }
  
  // Accept only essential cookies
  acceptEssential() {
    const preferences = {};
    
    // Set only required categories to true
    Object.keys(this.config.categories).forEach(category => {
      preferences[category] = this.config.categories[category].required;
    });
    
    this.savePreferences(preferences);
    this.setConsentCookie(true);
  }
  
  // Decline all non-essential cookies
  declineAll() {
    this.acceptEssential();
  }
  
  // Save settings from modal
  saveSettings() {
    const preferences = {};
    
    // Get values from toggles
    Object.keys(this.config.categories).forEach(category => {
      const toggle = document.getElementById(`cookie-toggle-${category}`);
      if (toggle) {
        preferences[category] = toggle.checked;
      } else {
        // If toggle doesn't exist, use required value
        preferences[category] = this.config.categories[category].required;
      }
    });
    
    this.savePreferences(preferences);
    this.setConsentCookie(true);
  }
  
  // Save preferences to cookie
  savePreferences(preferences) {
    this.setCookie(
      this.config.cookieNames.preferences,
      JSON.stringify(preferences),
      this.config.expirationDays
    );
    
    // Apply the preferences
    this.applyPreferences();
  }
  
  // Get current preferences
  getPreferences() {
    const preferences = this.getCookie(this.config.cookieNames.preferences);
    
    if (preferences) {
      try {
        return JSON.parse(preferences);
      } catch (e) {
        console.error('Error parsing cookie preferences:', e);
      }
    }
    
    // Default preferences (only required categories)
    const defaultPreferences = {};
    Object.keys(this.config.categories).forEach(category => {
      defaultPreferences[category] = this.config.categories[category].required;
    });
    
    return defaultPreferences;
  }
  
  // Apply preferences
  applyPreferences() {
    const preferences = this.getPreferences();
    
    // Apply preferences to cookies and scripts
    // This is where you would enable/disable specific cookies or scripts
    // based on the user's preferences
    
    // For example, if Google Analytics is used:
    if (preferences.analytics === false) {
      // Disable Google Analytics
      window['ga-disable-UA-XXXXX-Y'] = true;
    }
  }
  
  // Set consent cookie
  setConsentCookie(hasConsent) {
    this.setCookie(
      this.config.cookieNames.consent,
      hasConsent ? 'true' : 'false',
      this.config.expirationDays
    );
  }
  
  // Helper: Set a cookie
  setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
  }
  
  // Helper: Get a cookie
  getCookie(name) {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    
    return null;
  }
}

// Initialize the cookie consent manager
const cookieConsent = new CookieConsentManager(cookieConsentConfig);

// Expose the cookie consent manager globally
window.cookieConsent = cookieConsent;
