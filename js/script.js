const text = `👋 Hey there! I'm Sushil, your go-to guy for web scraping and automation. Let's connect and discuss your project requirements. Contact me below. Cheers!`;

const typingElement = document.getElementById('typingText');
const socialLinks = document.getElementById('socialLinks');
const skipButton = document.getElementById('skipButton');
let charIndex = 0;
let skipAnimation = false;

// Mobile-responsive skip button positioning
function adjustSkipButtonPosition() {
  if (window.innerWidth <= 768) {
    // Mobile positioning - move skip button to avoid hero avatar overlap
    skipButton.style.position = 'fixed';
    skipButton.style.top = '20px';
    skipButton.style.right = '20px';
    skipButton.style.zIndex = '1000';
    skipButton.style.background = 'rgba(0, 0, 0, 0.8)';
    skipButton.style.color = 'white';
    skipButton.style.border = '1px solid rgba(255, 255, 255, 0.3)';
    skipButton.style.borderRadius = '8px';
    skipButton.style.padding = '8px 12px';
    skipButton.style.fontSize = '14px';
    skipButton.style.cursor = 'pointer';
    skipButton.style.backdropFilter = 'blur(10px)';
    skipButton.style.transition = 'all 0.3s ease';
  } else {
    // Desktop positioning - reset to original styles
    skipButton.style.position = '';
    skipButton.style.top = '';
    skipButton.style.right = '';
    skipButton.style.zIndex = '';
    skipButton.style.background = '';
    skipButton.style.color = '';
    skipButton.style.border = '';
    skipButton.style.borderRadius = '';
    skipButton.style.padding = '';
    skipButton.style.fontSize = '';
    skipButton.style.backdropFilter = '';
  }
}

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
    if (projectsSection) {
      projectsSection.style.opacity = '1';
      projectsSection.style.transform = 'translateY(0)';
    }
  }, 500);
}

// Skip button functionality with improved mobile handling
skipButton.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  skipAnimation = true;
  showFinalState();
});

// Add hover effects for skip button on mobile
skipButton.addEventListener('mouseenter', () => {
  if (window.innerWidth <= 768) {
    skipButton.style.background = 'rgba(0, 0, 0, 0.9)';
    skipButton.style.transform = 'scale(1.05)';
  }
});

skipButton.addEventListener('mouseleave', () => {
  if (window.innerWidth <= 768) {
    skipButton.style.background = 'rgba(0, 0, 0, 0.8)';
    skipButton.style.transform = 'scale(1)';
  }
});

// Initialize skip button positioning
adjustSkipButtonPosition();

// Start typing animation after page load
setTimeout(() => {
  typeWriter();
}, 1000);

// Set current year
const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

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
if (projectsSection) {
  projectsSection.style.opacity = '0';
  projectsSection.style.transform = 'translateY(30px)';
  projectsSection.style.transition = 'all 0.8s ease-out';
}

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
  const parallaxElements = document.querySelectorAll('.bg-animation::before');

  parallaxElements.forEach(parallax => {
    if (parallax) {
      const yPos = -(scrolled * 0.5);
      parallax.style.transform = `translateY(${yPos}px)`;
    }
  });

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
    if (window.innerWidth > 768) { // Only on desktop
      card.style.transform = 'translateY(-8px) scale(1.02)';
    }
  });

  card.addEventListener('mouseleave', () => {
    if (window.innerWidth > 768) { // Only on desktop
      card.style.transform = 'translateY(0) scale(1)';
    }
  });
});

// Enhanced loading animation
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
  document.body.style.transform = 'translateY(0)';
});

// Mobile responsiveness check with skip button positioning
function checkMobile() {
  adjustSkipButtonPosition();

  // Additional mobile optimizations can be added here
  if (window.innerWidth <= 768) {
    // Mobile-specific optimizations
    document.body.classList.add('mobile-view');
  } else {
    document.body.classList.remove('mobile-view');
  }
}

// Listen for window resize to adjust skip button position
window.addEventListener('resize', checkMobile);
window.addEventListener('orientationchange', () => {
  setTimeout(checkMobile, 100); // Small delay for orientation change
});

// Initial mobile check
checkMobile();