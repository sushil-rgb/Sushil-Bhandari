const text = `👋 Hey there! I'm Sushil, your go-to guy for web scraping and automation. If you've got a project in mind, let's connect and discuss your requirements. Feel free to reach out using the contact details below. Cheers!`;

const typingText = document.getElementById('typing-text');
let charIndex = 0;

function type() {
  typingText.innerHTML = text.slice(0, charIndex);
  charIndex++;

  if (charIndex <= text.length) {
    const currentChar = text.charAt(charIndex - 1);
    const nextChar = text.charAt(charIndex);

    // Adjust typing speed and delay for line breaks
    const delay = (currentChar === '<' && nextChar === 'br' && text.charAt(charIndex + 2) === '>') ? 1000 : 50;

    setTimeout(type, delay);
  }
}

setTimeout(() => {
  typingText.style.opacity = '1'; // Show the text initially
  type();
}, 1000); // Delay before starting the animation


const headingText = "Projects";
const typingHeading = document.getElementById('typing-heading');
let charIndex1 = 0;

function typeHeading() {
  typingHeading.innerHTML = headingText.slice(0, charIndex1);
  charIndex1++;

  if (charIndex1 <= headingText.length) {
    setTimeout(typeHeading, 50); // Adjust typing speed here
  } else {
    typingHeading.style.borderRight = 'none'; // Remove the border-right to hide the cursor
  }
}

typeHeading();


const animationHeading = document.getElementById('animation-heading');

animationHeading.style.animationPlayState = 'paused';

window.addEventListener('scroll', function () {
  if (isElementInViewport(animationHeading)) {
    animationHeading.style.animationPlayState = 'running';
  }
});

function isElementInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}


