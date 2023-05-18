const text = `👋 Hey there! I'm Sushil, your go-to guy for web scraping and automation. If you've got a project in mind, let's connect and discuss your requirements. 
Feel free to reach out using the contact details below. Cheers!`;

const typingText = document.getElementById('typing-text');
const socialIconsContainer = document.getElementById('social-icons-container');
const icons = socialIconsContainer.getElementsByClassName('icon');
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
  } else {
    socialIconsContainer.style.opacity = '1';
    Array.from(icons).forEach((icon) => {
      icon.style.animation = 'fade-in 1s ease-in forwards';
    });
  }
}

setTimeout(() => {
  typingText.style.opacity = '1'; // Show the text initially
  type();
}, 1000); // Delay before starting the animation

