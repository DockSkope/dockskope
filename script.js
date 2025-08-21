// Enhanced UI Interactions
document.addEventListener('DOMContentLoaded', function () {
  // Enhanced Mobile Navigation Toggle
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navButtons = document.querySelector('.nav-buttons');

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      // Create mobile menu if it doesn't exist
      if (!document.querySelector('.mobile-menu')) {
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        mobileMenu.style.cssText = `
          position: fixed;
          top: 80px;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(20px);
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          padding: 2rem 1rem;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
          z-index: 999;
          transform: translateY(-100%);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        `;

        // Clone navigation items
        const navItems = navMenu.cloneNode(true);
        navItems.style.cssText = `
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        `;

        const buttonItems = navButtons.cloneNode(true);
        buttonItems.style.cssText = `
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 2rem;
        `;

        mobileMenu.appendChild(navItems);
        mobileMenu.appendChild(buttonItems);
        document.body.appendChild(mobileMenu);

        // Show mobile menu with animation
        setTimeout(() => {
          mobileMenu.style.transform = 'translateY(0)';
        }, 10);
      } else {
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenu.style.transform === 'translateY(0px)') {
          mobileMenu.style.transform = 'translateY(-100%)';
          setTimeout(() => {
            mobileMenu.remove();
          }, 400);
        } else {
          mobileMenu.style.transform = 'translateY(0)';
        }
      }
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', function (e) {
    if (
      !e.target.closest('.nav-container') &&
      !e.target.closest('.mobile-menu')
    ) {
      const mobileMenu = document.querySelector('.mobile-menu');
      if (mobileMenu) {
        mobileMenu.style.transform = 'translateY(-100%)';
        setTimeout(() => {
          mobileMenu.remove();
        }, 400);
      }
    }
  });

  // Enhanced Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth',
        });
        
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
        });
        this.classList.add('active');
      }
    });
  });

  // Enhanced Navbar Background on Scroll
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function () {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      
      // Hide/show navbar on scroll
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        navbar.style.transform = 'translateY(-100%)';
      } else {
        navbar.style.transform = 'translateY(0)';
      }
      
      lastScrollY = currentScrollY;
    });
  }

  // Enhanced Animated Counters
  const counters = document.querySelectorAll('.stat-number');
  const animateCounters = () => {
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target') || counter.textContent);
      const increment = target / 100;
      let current = 0;
      
      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.textContent = Math.ceil(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };
      
      updateCounter();
    });
  };

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        
        // Animate counters when stats section is visible
        if (entry.target.classList.contains('hero-stats')) {
          animateCounters();
        }
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document.querySelectorAll('.hero-stats, .architecture-card, .feature-card, .get-started-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
  });

  // Enhanced Dashboard Mockup Interactions
  const sidebarItems = document.querySelectorAll('.sidebar-item');
  const mockupTabs = document.querySelectorAll('.mockup-tab');

  sidebarItems.forEach(item => {
    item.addEventListener('click', function() {
      const targetTab = this.getAttribute('data-tab');
      
      // Update active states
      sidebarItems.forEach(si => si.classList.remove('active'));
      mockupTabs.forEach(tab => tab.classList.remove('active'));
      
      this.classList.add('active');
      document.getElementById(targetTab).classList.add('active');
      
      // Add click animation
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    });
  });

  // Enhanced Button Hover Effects
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px) scale(1.02)';
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });

  // Enhanced Card Hover Effects
  document.querySelectorAll('.architecture-card, .feature-card, .get-started-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });

  // Parallax Effect for Hero Background
  const heroBackground = document.querySelector('.hero-background');
  if (heroBackground) {
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      heroBackground.style.transform = `translateY(${rate}px)`;
    });
  }

  // Enhanced Loading Animation
  const loadingElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .hero-buttons');
  loadingElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.2}s`;
    
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 100 + (index * 200));
  });

  // Enhanced Form Interactions
  document.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      if (!this.value) {
        this.parentElement.classList.remove('focused');
      }
    });
  });

  // Enhanced Scroll Progress Indicator
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: var(--gradient-primary);
    z-index: 1001;
    transition: width 0.1s ease;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  });

  // Enhanced Keyboard Navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const mobileMenu = document.querySelector('.mobile-menu');
      if (mobileMenu) {
        mobileMenu.style.transform = 'translateY(-100%)';
        setTimeout(() => {
          mobileMenu.remove();
        }, 400);
      }
    }
  });

  // Enhanced Touch Interactions for Mobile
  let touchStartY = 0;
  let touchEndY = 0;

  document.addEventListener('touchstart', function(e) {
    touchStartY = e.changedTouches[0].screenY;
  });

  document.addEventListener('touchend', function(e) {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe up - could trigger some action
        console.log('Swipe up detected');
      } else {
        // Swipe down - could trigger some action
        console.log('Swipe down detected');
      }
    }
  }

  // Enhanced Performance Monitoring
  let frameCount = 0;
  let lastTime = performance.now();

  function checkPerformance() {
    frameCount++;
    const currentTime = performance.now();
    
    if (currentTime >= lastTime + 1000) {
      const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
      frameCount = 0;
      lastTime = currentTime;
      
      // Log FPS for debugging (remove in production)
      if (fps < 30) {
        console.warn('Low FPS detected:', fps);
      }
    }
    
    requestAnimationFrame(checkPerformance);
  }
  
  checkPerformance();

  // Enhanced Accessibility
  document.addEventListener('keydown', function(e) {
    // Skip to main content
    if (e.key === 'Tab' && e.shiftKey && e.altKey) {
      e.preventDefault();
      const mainContent = document.querySelector('main') || document.querySelector('.hero');
      if (mainContent) {
        mainContent.focus();
      }
    }
  });

  // Enhanced Error Handling
  window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Could send to analytics service here
  });

  // Enhanced Console Welcome
  console.log(
    '%c🐳 Welcome to DockSkope!',
    'color: #0db7ed; font-size: 20px; font-weight: bold;'
  );
  console.log(
    '%cReady to monitor your Docker containers with style! 🚀',
    'color: #10b981; font-size: 14px;'
  );
});
