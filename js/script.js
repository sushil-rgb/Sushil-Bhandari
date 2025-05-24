const text = `👋 Hey there! I'm Sushil, your go-to guy for web scraping and automation. Let's connect and discuss your project requirements. Contact me below. Cheers!`;

    const typingElement = document.getElementById('typingText');
    const socialLinks = document.getElementById('socialLinks');
    const skipButton = document.getElementById('skipButton');
    let charIndex = 0;
    let skipAnimation = false;

    function typeWriter() {
      if (skipAnimation) {
        showFinalState();
        return;
      }

      if (charIndex < text.length) {
        typingElement.innerHTML = text.slice(0, charIndex + 1) + '<span class="typing-cursor">|</span>';
        charIndex++;

        const currentChar = text.charAt(charIndex - 1);
        let delay = 50;

        if (currentChar === '.' || currentChar === '!' || currentChar === '?') {
          delay = 800;
        } else if (currentChar === ',' || currentChar === ';') {
          delay = 400;
        } else if (currentChar === '\n') {
          delay = 600;
        }

        setTimeout(typeWriter, delay);
      } else {
        showFinalState();
      }
    }

    function showFinalState() {
      typingElement.innerHTML = text.replace(/\n/g, '<br>');
      socialLinks.style.opacity = '1';
      socialLinks.style.transform = 'translateY(0)';
      skipButton.classList.add('hidden');

      // Trigger projects section animation
      setTimeout(() => {
        const projectsSection = document.getElementById('projects');
        projectsSection.style.opacity = '1';
        projectsSection.style.transform = 'translateY(0)';
      }, 500);
    }

    // Skip button functionality
    skipButton.addEventListener('click', () => {
      skipAnimation = true;
      showFinalState();
    });

    // Start typing animation after page load
    setTimeout(() => {
      typeWriter();
    }, 1000);

    // Set current year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Add scroll-triggered animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Initially hide projects section for animation
    const projectsSection = document.getElementById('projects');
    projectsSection.style.opacity = '0';
    projectsSection.style.transform = 'translateY(30px)';
    projectsSection.style.transition = 'all 0.8s ease-out';

    // Observe project cards for staggered animation
    document.querySelectorAll('.project-card').forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
      observer.observe(card);
    });

    // Add parallax effect to background
    let ticking = false;

    function updateParallax() {
      const scrolled = window.pageYOffset;
      const parallax = document.querySelector('.bg-animation::before');

      if (parallax) {
        const yPos = -(scrolled * 0.5);
        parallax.style.transform = `translateY(${yPos}px)`;
      }

      ticking = false;
    }

    function requestTick() {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }

    window.addEventListener('scroll', requestTick);

    // Add hover effects for project cards
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
      });
    });

    // Enhanced loading animation
    window.addEventListener('load', () => {
      document.body.style.opacity = '1';
      document.body.style.transform = 'translateY(0)';
    });

    // Add mobile menu toggle (for future enhancement)
    const navToggle = document.createElement('button');
    navToggle.innerHTML = '☰';
    navToggle.className = 'nav-toggle';
    navToggle.style.display = 'none';

    // Mobile responsiveness check
    function checkMobile() {
      if (window.innerWidth <= 768) {
        navToggle.style.display = 'block';
      } else {
        navToggle.style.display = 'none';
      }
    }

    window.addEventListener('resize', checkMobile);
    checkMobile();