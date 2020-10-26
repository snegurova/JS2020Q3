const humburgerButton = document.querySelector('.humburger-button');
const navbar = document.querySelector('.navbar');
const overlay = document.querySelector('.overlay');
const body = document.querySelector('body');
const activeMenuItem = document.querySelector('.active a');
// const activeLogo = document.querySelector('.active-logo');
const petsCard = document.querySelectorAll('.pets-card');



activeMenuItem.addEventListener('click', (e) => {
  e.preventDefault();
  if (window.innerWidth < 768 && body.style.overflow !== '') {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    navbar.classList.toggle('active');
    overlay.classList.toggle('show');
    overlay.classList.toggle('z-1');
    petsCard.forEach((it) => it.classList.toggle('z-1'));
    body.style.overflow = '';
  }
  if (window.innerWidth >= 768) {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

});

humburgerButton.addEventListener('click', (e) => {
  e.preventDefault();
  navbar.classList.toggle('active');
  overlay.classList.toggle('show');
  overlay.classList.toggle('z-1');
  petsCard.forEach((it) => it.classList.toggle('z-1'));
  body.style.overflow === '' ? body.style.overflow = 'hidden' : body.style.overflow = '';
});


overlay.addEventListener('click', () => {
  navbar.classList.toggle('active');
  overlay.classList.toggle('show');
  body.style.overflow === '' ? body.style.overflow = 'hidden' : body.style.overflow = '';
});

