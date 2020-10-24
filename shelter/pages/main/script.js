const humburgerButton = document.querySelector('.humburger-button');
const navbar = document.querySelector('.navbar');
const overlay = document.querySelector('.overlay');
const body = document.querySelector('body');

humburgerButton.addEventListener('click', () => {
  navbar.classList.toggle('active');
  navbar.classList.toggle('closed');
  overlay.classList.toggle('show');
  body.style.overflow === '' ? body.style.overflow = 'hidden' : body.style.overflow = '';

});
overlay.addEventListener('click', () => {
  navbar.classList.toggle('active');
  navbar.classList.toggle('closed');
  overlay.classList.toggle('show');
  body.style.overflow === '' ? body.style.overflow = 'hidden' : body.style.overflow = '';
});

