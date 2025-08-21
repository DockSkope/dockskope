// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function () {
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
                    background: white;
                    border-top: 1px solid #e5e7eb;
                    padding: 1rem;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                    z-index: 999;
                    transform: translateY(-100%);
                    transition: transform 0.3s ease;
                `;

        // Clone navigation items
        const navItems = navMenu.cloneNode(true);
        navItems.style.cssText = `
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                `;

        const buttonItems = navButtons.cloneNode(true);
        buttonItems.style.cssText = `
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    margin-top: 1rem;
                `;

        mobileMenu.appendChild(navItems);
        mobileMenu.appendChild(buttonItems);
        document.body.appendChild(mobileMenu);

        // Show mobile menu
        setTimeout(() => {
          mobileMenu.style.transform = 'translateY(0)';
        }, 10);
      } else {
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenu.style.transform === 'translateY(0px)') {
          mobileMenu.style.transform = 'translateY(-100%)';
          setTimeout(() => {
            mobileMenu.remove();
          }, 300);
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
        }, 300);
      }
    }
  });

  // Smooth scrolling for anchor links
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
      }
    });
  });

  // Navbar background on scroll
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(10px)';
      } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
      }
    });
  }

  // Dashboard mockup tab functionality
  const sidebarItems = document.querySelectorAll('.sidebar-item');
  const mockupTabs = document.querySelectorAll('.mockup-tab');

  sidebarItems.forEach((item) => {
    item.addEventListener('click', function () {
      const tabName = this.getAttribute('data-tab');

      // Remove active class from all sidebar items and tabs
      sidebarItems.forEach((si) => si.classList.remove('active'));
      mockupTabs.forEach((tab) => tab.classList.remove('active'));

      // Add active class to clicked item and corresponding tab
      this.classList.add('active');
      const targetTab = document.getElementById(tabName + '-tab');
      if (targetTab) {
        targetTab.classList.add('active');
      }
    });
  });

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document
    .querySelectorAll('.feature-card, .step, .pricing-card')
    .forEach((el) => {
      observer.observe(el);
    });

  // Animated counter for stats
  function animateCounter(element, target, duration = 2000) {
    let start = 0;

    // Handle special cases like infinity symbol
    if (target === '∞' || target === 'infinity') {
      element.textContent = '∞';
      return;
    }

    // Ensure target is a valid number
    if (isNaN(target) || target <= 0) {
      element.textContent = target.toString();
      return;
    }

    const increment = target / (duration / 16);

    function updateCounter() {
      start += increment;
      if (start < target) {
        element.textContent = Math.floor(start);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    }

    updateCounter();
  }

  // Animate stats when they come into view
  const statsObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const statNumber = entry.target.querySelector('.stat-number');
          if (statNumber) {
            const text = statNumber.textContent;

            // Handle special cases
            if (text.includes('∞') || text.includes('infinity')) {
              statNumber.textContent = '∞';
            } else {
              const target = parseInt(text.replace(/[^\d]/g, ''));
              if (!isNaN(target) && target > 0) {
                animateCounter(statNumber, target);
              }
            }
          }
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('.hero-stats .stat').forEach((stat) => {
    statsObserver.observe(stat);
  });

  // Form handling for demo requests
  const demoForms = document.querySelectorAll('form[data-form="demo"]');
  demoForms.forEach((form) => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      // Show loading state
      submitBtn.classList.add('loading');
      submitBtn.textContent = 'Sending...';

      // Simulate form submission
      setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.textContent = 'Thank you!';
        submitBtn.style.background = '#10b981';

        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.style.background = '';
          form.reset();
        }, 2000);
      }, 1500);
    });
  });

  // Pricing toggle (if you want to add monthly/yearly pricing)
  const pricingToggle = document.querySelector('.pricing-toggle');
  if (pricingToggle) {
    pricingToggle.addEventListener('change', function () {
      const isYearly = this.checked;
      const prices = document.querySelectorAll('.price .amount');
      const periods = document.querySelectorAll('.price .period');

      prices.forEach((price, index) => {
        const monthlyPrice = parseInt(price.textContent);
        if (isYearly) {
          const yearlyPrice = Math.floor(monthlyPrice * 10); // 2 months free
          price.textContent = yearlyPrice;
          periods[index].textContent = '/year';
        } else {
          // Reset to monthly prices (you'd need to store original values)
          periods[index].textContent = '/month';
        }
      });
    });
  }

  // Parallax effect for hero section
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', function () {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      hero.style.transform = `translateY(${rate}px)`;
    });
  }

  // Add hover effects to dashboard preview
  const dashboardPreview = document.querySelector('.dashboard-preview');
  if (dashboardPreview) {
    dashboardPreview.addEventListener('mouseenter', function () {
      this.style.transform = 'scale(1.02)';
      this.style.transition = 'transform 0.3s ease';
    });

    dashboardPreview.addEventListener('mouseleave', function () {
      this.style.transform = 'scale(1)';
    });
  }

  // Animate chart lines
  const chartLines = document.querySelectorAll('.chart-line');
  chartLines.forEach((line, index) => {
    setTimeout(() => {
      line.style.width = '100%';
      line.style.transition = 'width 1s ease';
    }, index * 200);
  });

  // Add typing effect to hero title
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    };

    // Start typing effect when page loads
    setTimeout(typeWriter, 500);
  }

  // Newsletter subscription
  const newsletterForm = document.querySelector('form[data-form="newsletter"]');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const email = this.querySelector('input[type="email"]').value;
      const submitBtn = this.querySelector('button[type="submit"]');

      if (email) {
        submitBtn.textContent = 'Subscribed!';
        submitBtn.style.background = '#10b981';

        setTimeout(() => {
          submitBtn.textContent = 'Subscribe';
          submitBtn.style.background = '';
          this.reset();
        }, 2000);
      }
    });
  }

  // Add loading states to buttons
  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      if (this.classList.contains('btn-loading')) {
        e.preventDefault();
        return;
      }

      // Add loading state for certain buttons
      if (
        this.textContent.includes('Get Started') ||
        this.textContent.includes('Start Free Trial')
      ) {
        this.classList.add('btn-loading');
        this.textContent = 'Loading...';

        setTimeout(() => {
          this.classList.remove('btn-loading');
          this.textContent =
            this.getAttribute('data-original-text') || 'Get Started';
        }, 2000);
      }
    });
  });

  // Store original button text
  document.querySelectorAll('.btn').forEach((btn) => {
    btn.setAttribute('data-original-text', btn.textContent);
  });

  // Add scroll progress indicator
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #3b82f6, #10b981);
        z-index: 1001;
        transition: width 0.1s ease;
    `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  });

  // Add keyboard navigation
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      const mobileMenu = document.querySelector('.mobile-menu');
      if (mobileMenu) {
        mobileMenu.style.transform = 'translateY(-100%)';
        setTimeout(() => {
          mobileMenu.remove();
        }, 300);
      }
    }
  });

  // Performance optimization: Lazy load images
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));

  // Animate hero visual elements
  function animateHeroVisual() {
    // Animate network bar
    const networkBar = document.querySelector('.network-bar');
    if (networkBar) {
      setTimeout(() => {
        networkBar.style.width = '75%';
      }, 1000);
    }

    // Animate chart lines
    const chartLines = document.querySelectorAll('.chart-line');
    chartLines.forEach((line, index) => {
      setTimeout(() => {
        line.style.width = line.style.width || '100%';
      }, 1500 + index * 200);
    });

    // Animate alert notification
    const alertNotification = document.querySelector('.alert-notification');
    if (alertNotification) {
      setTimeout(() => {
        alertNotification.style.transform = 'translateY(-2px)';
        setTimeout(() => {
          alertNotification.style.transform = 'translateY(0)';
        }, 200);
      }, 2000);
    }

    // Animate container cards
    const containerCards = document.querySelectorAll(
      '.hero-visual .container-card'
    );
    containerCards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 500 + index * 150);
    });
  }

  // Initialize hero visual animations
  setTimeout(animateHeroVisual, 500);

  console.log('DockSkope website loaded successfully! 🐳');
});

// Add some fun easter eggs
document.addEventListener('keydown', function (e) {
  // Konami code easter egg
  if (
    e.key === 'ArrowUp' ||
    e.key === 'ArrowDown' ||
    e.key === 'ArrowLeft' ||
    e.key === 'ArrowRight'
  ) {
    console.log('🎮 Konami code detected!');
  }
});

// Add console styling
console.log(
  '%c🐳 Welcome to DockSkope!',
  'color: #3b82f6; font-size: 20px; font-weight: bold;'
);
console.log(
  '%cMonitor your Docker containers like never before!',
  'color: #6b7280; font-size: 14px;'
);
