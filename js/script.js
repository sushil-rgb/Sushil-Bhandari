const skipButton = document.getElementById('skipButton');
let skipAnimation = false;

// Event listener for the skip button


const text = `👋 Hey there! I'm Sushil, your go-to guy for web scraping and automation. Let's connect and discuss your project requirements. Contact me below. Cheers!`;

const typingText = document.getElementById('typing-text');
const socialIconsContainer = document.getElementById('social-icons-container');
const icons = socialIconsContainer.getElementsByClassName('icon');
const projectsSection = document.getElementById('projects');
const projectContainer = document.getElementById('project-container');
let charIndex = 0;

function type() {
  // Check if skipAnimation is true
  if (skipAnimation) {
    showFinalState();
    return;
  }

  typingText.innerHTML = text.slice(0, charIndex);
  charIndex++;

  if (charIndex <= text.length) {
    const currentChar = text.charAt(charIndex - 1);
    const nextChar = text.charAt(charIndex);

    // Adjust typing speed and delay for line breaks
    const delay = (currentChar === '<' && nextChar === 'b' && text.charAt(charIndex + 2) === 'r' && text.charAt(charIndex + 3) === '>') ? 1000 : 50;

    setTimeout(type, delay);
  } else {
    showFinalState();
    skipButton.classList.add('hidden'); // Hide the button
  }
}

function showFinalState() {
  typingText.style.opacity = '1';
  typingText.innerHTML = text; // Show the entire text immediately
  fadeInProjectsSection();
  Array.from(icons).forEach((icon) => {
    icon.style.animation = 'fade-in 1s ease-in forwards';
  });
}

skipButton.addEventListener('click', () => {
  skipAnimation = true;
  showFinalState();
  skipButton.classList.add('hidden'); // Hide the button
  socialIconsContainer.style.opacity = '1'; // Show the social media icons
});

function fadeInProjectsSection() {
  projectsSection.style.opacity = '0';
  projectsSection.style.display = 'block';

  let opacity = 0;
  const intervalId = setInterval(function() {
    opacity += 0.1;
    projectsSection.style.opacity = opacity.toString();

    if (opacity >= 1) {
      clearInterval(intervalId);
      setTimeout(() => {
        projectContainer.style.opacity = '1'; // Show the project container with a delay
      }, 500); // Delay in milliseconds before showing the project container
    }
  }, 100);
}

setTimeout(() => {
  typingText.style.opacity = '1'; // Show the text initially
  type();
}, 1000); // Delay before starting the animation

