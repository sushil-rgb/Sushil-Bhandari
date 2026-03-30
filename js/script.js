// ============================================================
//  EmailJS Config
// ============================================================
window.__ENV__ = {
  EMAILJS_PUBLIC_KEY:  'PUBLIC_KEY',
  EMAILJS_SERVICE_ID:  'SERVICE_ID',
  EMAILJS_TEMPLATE_ID: 'TEMPLATE_ID'
};

var EMAILJS_PUBLIC_KEY  = (window.__ENV__ && window.__ENV__.EMAILJS_PUBLIC_KEY)  || '';
var EMAILJS_SERVICE_ID  = (window.__ENV__ && window.__ENV__.EMAILJS_SERVICE_ID)  || '';
var EMAILJS_TEMPLATE_ID = (window.__ENV__ && window.__ENV__.EMAILJS_TEMPLATE_ID) || '';

// ============================================================
//  Typing animation
// ============================================================
var text = '👋 Hey there! I\'m Sushil, your go-to guy for web scraping and automation. Let\'s connect and discuss your project requirements. Contact me below. Cheers!';

var typingElement = document.getElementById('typingText');
var socialLinks   = document.getElementById('socialLinks');
var skipButton    = document.getElementById('skipButton');
var charIndex     = 0;
var skipAnimation = false;

function adjustSkipButtonPosition() {
  if (!skipButton) return;
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
     'borderRadius','padding','fontSize','backdropFilter'].forEach(function(p) {
      skipButton.style[p] = '';
    });
  }
}

function showFinalState() {
  if (typingElement) typingElement.innerHTML = text.replace(/\n/g, '<br>');
  if (socialLinks) {
    socialLinks.style.opacity   = '1';
    socialLinks.style.transform = 'translateY(0)';
  }
  if (skipButton) skipButton.classList.add('hidden');

  setTimeout(function() {
    var projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.style.opacity   = '1';
      projectsSection.style.transform = 'translateY(0)';
    }
  }, 500);
}

function typeWriter() {
  if (skipAnimation) { showFinalState(); return; }
  if (!typingElement) return;

  if (charIndex < text.length) {
    typingElement.innerHTML = text.slice(0, charIndex + 1) + '<span class="typing-cursor">|</span>';
    charIndex++;

    var ch = text.charAt(charIndex - 1);
    var delay = 50;
    if      (ch === '.' || ch === '!' || ch === '?') delay = 800;
    else if (ch === ',' || ch === ';')               delay = 400;
    else if (ch === '\n')                            delay = 600;

    setTimeout(typeWriter, delay);
  } else {
    showFinalState();
  }
}

if (skipButton) {
  skipButton.addEventListener('click', function(e) {
    e.preventDefault(); e.stopPropagation();
    skipAnimation = true;
    showFinalState();
  });
  skipButton.addEventListener('mouseenter', function() {
    if (window.innerWidth <= 768) {
      skipButton.style.background = 'rgba(0,0,0,0.9)';
      skipButton.style.transform  = 'scale(1.05)';
    }
  });
  skipButton.addEventListener('mouseleave', function() {
    if (window.innerWidth <= 768) {
      skipButton.style.background = 'rgba(0,0,0,0.8)';
      skipButton.style.transform  = 'scale(1)';
    }
  });
}

// ============================================================
//  Init EmailJS after page fully loads
// ============================================================
window.addEventListener('load', function() {
  if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY) {
    emailjs.init(EMAILJS_PUBLIC_KEY);
    console.log('EmailJS initialized ✅');
  } else {
    console.error('EmailJS failed to initialize ❌', {
      emailjsLoaded: typeof emailjs,
      publicKey: EMAILJS_PUBLIC_KEY ? 'present' : 'missing'
    });
  }
});

// ============================================================
//  Form Submission via EmailJS
// ============================================================
var demoForm = document.getElementById('demoForm');
if (demoForm) {
  demoForm.addEventListener('submit', function(e) {
    e.preventDefault();

    var submitBtn   = document.getElementById('submitBtn');
    var submitText  = document.getElementById('submitText');
    var formSuccess = document.getElementById('formSuccess');
    var formError   = document.getElementById('formError');

    // Hide any previous error
    if (formError) formError.style.display = 'none';

    // Read form values
    var name         = document.getElementById('clientName').value.trim();
    var contact      = document.getElementById('clientContact').value.trim();
    var url          = document.getElementById('targetUrl').value.trim();
    var fields       = document.getElementById('dataFields').value.trim();
    var requirements = document.getElementById('requirements').value.trim();

    // Show loading state
    if (submitBtn)  submitBtn.disabled     = true;
    if (submitText) submitText.textContent = 'Sending... ⏳';

    var templateParams = {
      from_name:    name,
      from_contact: contact,
      target_url:   url,
      data_fields:  fields       || 'Not specified',
      requirements: requirements || 'None provided',
      reply_to:     contact.indexOf('@') !== -1 ? contact : 'sushil.bhandari002@gmail.com',
    };

    // Guard: EmailJS not configured
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
      if (formError) {
        formError.textContent   = '⚠️ Email service not configured. Please email me directly at sushil.bhandari002@gmail.com';
        formError.style.display = 'block';
      }
      if (submitBtn)  submitBtn.disabled     = false;
      if (submitText) submitText.textContent = 'Send My Request 🚀';
      return;
    }

    // Guard: EmailJS SDK not loaded
    if (typeof emailjs === 'undefined') {
      if (formError) {
        formError.textContent   = '⚠️ Email service failed to load. Please email me directly at sushil.bhandari002@gmail.com';
        formError.style.display = 'block';
      }
      if (submitBtn)  submitBtn.disabled     = false;
      if (submitText) submitText.textContent = 'Send My Request 🚀';
      return;
    }

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
      .then(function() {
        if (demoForm)    demoForm.style.display    = 'none';
        if (formSuccess) formSuccess.style.display = 'block';
      })
      .catch(function(err) {
        console.error('EmailJS send error:', err);
        if (submitBtn)  submitBtn.disabled     = false;
        if (submitText) submitText.textContent = 'Send My Request 🚀';
        if (formError) {
          formError.textContent   = '⚠️ Something went wrong. Please email me directly at sushil.bhandari002@gmail.com';
          formError.style.display = 'block';
        }
      });
  });
}

// ============================================================
//  Footer year
// ============================================================
var yearElement = document.getElementById('year');
if (yearElement) yearElement.textContent = new Date().getFullYear();

// ============================================================
//  Smooth scrolling
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    var target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ============================================================
//  Scroll-triggered animations (IntersectionObserver)
// ============================================================
var observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

var projectsSection = document.getElementById('projects');
if (projectsSection) {
  Object.assign(projectsSection.style, {
    opacity: '0', transform: 'translateY(30px)', transition: 'all 0.8s ease-out'
  });
}

document.querySelectorAll('.project-card').forEach(function(card, i) {
  Object.assign(card.style, {
    opacity: '0', transform: 'translateY(30px)',
    transition: 'all 0.6s ease-out ' + (i * 0.1) + 's'
  });
  observer.observe(card);
});

document.querySelectorAll('.service-card').forEach(function(card, i) {
  Object.assign(card.style, {
    opacity: '0', transform: 'translateY(24px)',
    transition: 'all 0.5s ease-out ' + (i * 0.08) + 's'
  });
  observer.observe(card);
});

var demoWrapper = document.querySelector('.demo-wrapper');
if (demoWrapper) {
  Object.assign(demoWrapper.style, {
    opacity: '0', transform: 'translateY(24px)', transition: 'all 0.7s ease-out'
  });
  observer.observe(demoWrapper);
}

// ============================================================
//  Project card hover (desktop only)
// ============================================================
document.querySelectorAll('.project-card').forEach(function(card) {
  card.addEventListener('mouseenter', function() {
    if (window.innerWidth > 768) card.style.transform = 'translateY(-8px) scale(1.02)';
  });
  card.addEventListener('mouseleave', function() {
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
window.addEventListener('orientationchange', function() { setTimeout(checkMobile, 100); });

// ============================================================
//  Init
// ============================================================
adjustSkipButtonPosition();
checkMobile();
setTimeout(typeWriter, 1000);
window.addEventListener('load', function() { document.body.style.opacity = '1'; });