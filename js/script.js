const text = `👋 Hey there! I'm Sushil, your go-to guy for web scraping and automation. Let's connect and discuss your project requirements. Contact me below. Cheers!`;

const typingElement = document.getElementById('typingText');
const socialLinks = document.getElementById('socialLinks');
const skipButton = document.getElementById('skipButton');
let charIndex = 0;
let skipAnimation = false;

// ── Skip button mobile positioning ──
function adjustSkipButtonPosition() {
  if (window.innerWidth <= 768) {
    Object.assign(skipButton.style, {
      position: 'fixed', top: '20px', right: '20px', zIndex: '1000',
      background: 'rgba(0, 0, 0, 0.8)', color: 'white',
      border: '1px solid rgba(255, 255, 255, 0.3)', borderRadius: '8px',
      padding: '8px 12px', fontSize: '14px', cursor: 'pointer',
      backdropFilter: 'blur(10px)', transition: 'all 0.3s ease',
    });
  } else {
    ['position','top','right','zIndex','background','color','border',
     'borderRadius','padding','fontSize','backdropFilter'].forEach(p => {
      skipButton.style[p] = '';
    });
  }
}

// ── Typewriter ──
function typeWriter() {
  if (skipAnimation) { showFinalState(); return; }

  if (charIndex < text.length) {
    typingElement.innerHTML = text.slice(0, charIndex + 1) + '<span class="typing-cursor">|</span>';
    charIndex++;

    const ch = text.charAt(charIndex - 1);
    let delay = 50;
    if (ch === '.' || ch === '!' || ch === '?') delay = 800;
    else if (ch === ',' || ch === ';') delay = 400;
    else if (ch === '\n') delay = 600;

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

  setTimeout(() => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.style.opacity = '1';
      projectsSection.style.transform = 'translateY(0)';
    }
  }, 500);
}

skipButton.addEventListener('click', (e) => {
  e.preventDefault(); e.stopPropagation();
  skipAnimation = true;
  showFinalState();
});

skipButton.addEventListener('mouseenter', () => {
  if (window.innerWidth <= 768) {
    skipButton.style.background = 'rgba(0,0,0,0.9)';
    skipButton.style.transform = 'scale(1.05)';
  }
});
skipButton.addEventListener('mouseleave', () => {
  if (window.innerWidth <= 768) {
    skipButton.style.background = 'rgba(0,0,0,0.8)';
    skipButton.style.transform = 'scale(1)';
  }
});

// ── Demo Form Submission ──
function handleFormSubmit(e) {
  e.preventDefault();

  const form = document.getElementById('demoForm');
  const submitBtn = document.getElementById('submitBtn');
  const submitText = document.getElementById('submitText');
  const formSuccess = document.getElementById('formSuccess');

  // Grab values
  const name = document.getElementById('clientName').value.trim();
  const contact = document.getElementById('clientContact').value.trim();
  const url = document.getElementById('targetUrl').value.trim();
  const fields = document.getElementById('dataFields').value.trim();
  const requirements = document.getElementById('requirements').value.trim();
  const freeTrial = document.getElementById('freeTrial').checked;

  // Build mailto body
  const subject = encodeURIComponent(`[Scraping Request] ${name} — Free Trial`);
  const body = encodeURIComponent(
    `Hi Sushil,\n\n` +
    `Name: ${name}\n` +
    `Contact: ${contact}\n` +
    `Target URL: ${url}\n` +
    `Data Fields: ${fields || 'Not specified'}\n` +
    `Free Trial (500 records): ${freeTrial ? 'Yes' : 'No'}\n\n` +
    `Requirements:\n${requirements || 'None provided'}\n\n` +
    `---\nSent via portfolio contact form.`
  );

  // Disable button during "sending"
  submitBtn.disabled = true;
  submitText.textContent = 'Sending... ⏳';

  // Open mailto (fallback — works without a backend)
  setTimeout(() => {
    window.location.href = `mailto:sushil.bhandari002@gmail.com?subject=${subject}&body=${body}`;

    // Show success state
    form.style.display = 'none';
    formSuccess.style.display = 'block';

    // Re-enable after 3s in case user comes back
    setTimeout(() => {
      submitBtn.disabled = false;
      submitText.textContent = 'Send My Request 🚀';
    }, 3000);
  }, 600);
}

// ── Year ──
const yearElement = document.getElementById('year');
if (yearElement) yearElement.textContent = new Date().getFullYear();

// ── Smooth scrolling ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ── Intersection Observer for scroll animations ──
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Projects section fade-in
const projectsSection = document.getElementById('projects');
if (projectsSection) {
  projectsSection.style.opacity = '0';
  projectsSection.style.transform = 'translateY(30px)';
  projectsSection.style.transition = 'all 0.8s ease-out';
}

// Project cards staggered
document.querySelectorAll('.project-card').forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
  observer.observe(card);
});

// Service cards staggered
document.querySelectorAll('.service-card').forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(24px)';
  card.style.transition = `all 0.5s ease-out ${index * 0.08}s`;
  observer.observe(card);
});

// Demo section elements
const demoWrapper = document.querySelector('.demo-wrapper');
if (demoWrapper) {
  demoWrapper.style.opacity = '0';
  demoWrapper.style.transform = 'translateY(24px)';
  demoWrapper.style.transition = 'all 0.7s ease-out';
  observer.observe(demoWrapper);
}

// ── Project card hover (desktop only) ──
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    if (window.innerWidth > 768) card.style.transform = 'translateY(-8px) scale(1.02)';
  });
  card.addEventListener('mouseleave', () => {
    if (window.innerWidth > 768) card.style.transform = 'translateY(0) scale(1)';
  });
});

// ── Parallax ──
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => { ticking = false; });
    ticking = true;
  }
});

// ── Mobile check ──
function checkMobile() {
  adjustSkipButtonPosition();
  if (window.innerWidth <= 768) document.body.classList.add('mobile-view');
  else document.body.classList.remove('mobile-view');
}

window.addEventListener('resize', checkMobile);
window.addEventListener('orientationchange', () => setTimeout(checkMobile, 100));

// ── Init ──
adjustSkipButtonPosition();
checkMobile();
setTimeout(typeWriter, 1000);

window.addEventListener('load', () => {
  document.body.style.opacity = '1';
  document.body.style.transform = 'translateY(0)';
});