// ============================================================
//  EmailJS Config
// ============================================================
const EMAILJS_PUBLIC_KEY  = '0TG7vPor4-_mntTID';   // Account > API Keys
const EMAILJS_SERVICE_ID  = 'service_indap4m';   // Email Services tab
const EMAILJS_TEMPLATE_ID = 'template_rqt7rlq';  // Email Templates tab

// ============================================================
//  Typing animation
// ============================================================
const text = `👋 Hey there! I'm Sushil, your go-to guy for web scraping and automation. Let's connect and discuss your project requirements. Contact me below. Cheers!`;

const typingElement = document.getElementById('typingText');
const socialLinks   = document.getElementById('socialLinks');
const skipButton    = document.getElementById('skipButton');
let charIndex     = 0;
let skipAnimation = false;

function adjustSkipButtonPosition() {
  if (window.innerWidth <= 768) {
    Object.assign(skipButton.style, {
      position: 'fixed', top: '20px', right: '20px', zIndex: '1000',
      background: 'rgba(0,0,0,0.8)', color: 'white',
      border: '1px solid rgba(255,255,255,0.3)', borderRadius: '8px',
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

function typeWriter() {
  if (skipAnimation) { showFinalState(); return; }

  if (charIndex < text.length) {
    typingElement.innerHTML = text.slice(0, charIndex + 1) + '<span class="typing-cursor">|</span>';
    charIndex++;

    const ch = text.charAt(charIndex - 1);
    let delay = 50;
    if      (ch === '.' || ch === '!' || ch === '?') delay = 800;
    else if (ch === ',' || ch === ';')               delay = 400;
    else if (ch === '\n')                            delay = 600;

    setTimeout(typeWriter, delay);
  } else {
    showFinalState();
  }
}

function showFinalState() {
  typingElement.innerHTML = text.replace(/\n/g, '<br>');
  socialLinks.style.opacity   = '1';
  socialLinks.style.transform = 'translateY(0)';
  skipButton.classList.add('hidden');

  setTimeout(() => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.style.opacity   = '1';
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
  if (window.innerWidth <= 768) { skipButton.style.background = 'rgba(0,0,0,0.9)'; skipButton.style.transform = 'scale(1.05)'; }
});
skipButton.addEventListener('mouseleave', () => {
  if (window.innerWidth <= 768) { skipButton.style.background = 'rgba(0,0,0,0.8)'; skipButton.style.transform = 'scale(1)'; }
});

// ============================================================
//  Form Submission via EmailJS
// ============================================================
async function handleFormSubmit(e) {
  e.preventDefault();

  const form       = document.getElementById('demoForm');
  const submitBtn  = document.getElementById('submitBtn');
  const submitText = document.getElementById('submitText');
  const formSuccess = document.getElementById('formSuccess');
  const formError   = document.getElementById('formError');

  // Hide any previous error
  formError.style.display = 'none';

  // Read form values
  const name         = document.getElementById('clientName').value.trim();
  const contact      = document.getElementById('clientContact').value.trim();
  const url          = document.getElementById('targetUrl').value.trim();
  const fields       = document.getElementById('dataFields').value.trim();
  const requirements = document.getElementById('requirements').value.trim();
  // const freeTrial    = document.getElementById('freeTrial').checked;

  // Show loading state
  submitBtn.disabled      = true;
  submitText.textContent  = 'Sending... ⏳';

  // Template variables — these must match the {{variable}} names in your EmailJS template
  const templateParams = {
    from_name:    name,
    from_contact: contact,
    target_url:   url,
    data_fields:  fields       || 'Not specified',
    // free_trial:   freeTrial    ? 'Yes — 500 records requested' : 'No',
    requirements: requirements || 'None provided',
    reply_to:     contact.includes('@') ? contact : 'sushil.bhandari002@gmail.com',
  };

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);

    // Show success, hide form
    form.style.display          = 'none';
    formSuccess.style.display   = 'block';

  } catch (err) {
    console.error('EmailJS error:', err);
    submitBtn.disabled     = false;
    submitText.textContent = 'Send My Request 🚀';
    formError.textContent  = '⚠️ Something went wrong. Please email me directly at sushil.bhandari002@gmail.com';
    formError.style.display = 'block';
  }
}

// ============================================================
//  Footer year
// ============================================================
const yearElement = document.getElementById('year');
if (yearElement) yearElement.textContent = new Date().getFullYear();

// ============================================================
//  Smooth scrolling
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ============================================================
//  Scroll-triggered animations (IntersectionObserver)
// ============================================================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

// Projects section
const projectsSection = document.getElementById('projects');
if (projectsSection) {
  Object.assign(projectsSection.style, { opacity: '0', transform: 'translateY(30px)', transition: 'all 0.8s ease-out' });
}

// Project cards — staggered
document.querySelectorAll('.project-card').forEach((card, i) => {
  Object.assign(card.style, { opacity: '0', transform: 'translateY(30px)', transition: `all 0.6s ease-out ${i * 0.1}s` });
  observer.observe(card);
});

// Service cards — staggered
document.querySelectorAll('.service-card').forEach((card, i) => {
  Object.assign(card.style, { opacity: '0', transform: 'translateY(24px)', transition: `all 0.5s ease-out ${i * 0.08}s` });
  observer.observe(card);
});

// Demo section wrapper
const demoWrapper = document.querySelector('.demo-wrapper');
if (demoWrapper) {
  Object.assign(demoWrapper.style, { opacity: '0', transform: 'translateY(24px)', transition: 'all 0.7s ease-out' });
  observer.observe(demoWrapper);
}

// ============================================================
//  Project card hover (desktop only)
// ============================================================
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    if (window.innerWidth > 768) card.style.transform = 'translateY(-8px) scale(1.02)';
  });
  card.addEventListener('mouseleave', () => {
    if (window.innerWidth > 768) card.style.transform = 'translateY(0) scale(1)';
  });
});

// ============================================================
//  Mobile check
// ============================================================
function checkMobile() {
  adjustSkipButtonPosition();
  document.body.classList.toggle('mobile-view', window.innerWidth <= 768);
}
window.addEventListener('resize', checkMobile);
window.addEventListener('orientationchange', () => setTimeout(checkMobile, 100));

// ============================================================
//  Init
// ============================================================
adjustSkipButtonPosition();
checkMobile();
setTimeout(typeWriter, 1000);
window.addEventListener('load', () => { document.body.style.opacity = '1'; });