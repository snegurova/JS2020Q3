const humburgerButton = document.querySelector('.humburger-button');
const navbar = document.querySelector('.navbar');
const overlay = document.querySelector('.overlay');

humburgerButton.addEventListener('click', () => {
  navbar.classList.toggle('active');
  navbar.classList.toggle('closed');
  overlay.classList.toggle('show');
});
overlay.addEventListener('click', () => {
  navbar.classList.toggle('active');
  navbar.classList.toggle('closed');
  overlay.classList.toggle('show');
});

