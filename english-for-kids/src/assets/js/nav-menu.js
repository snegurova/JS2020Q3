const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('nav');
// const navWrapper = document.querySelector('nav-wrapper');
const lineOne = document.querySelector('nav .menu-btn .line--1');
const lineTwo = document.querySelector('nav .menu-btn .line--2');
const lineThree = document.querySelector('nav .menu-btn .line--3');
const link = document.querySelector('nav .nav-links');

function closeMenu() {
  nav.classList.toggle('nav-open');
  lineOne.classList.toggle('line-cross');
  lineTwo.classList.toggle('line-fade-out');
  lineThree.classList.toggle('line-cross');
  link.classList.toggle('fade-in');
}

menuBtn.addEventListener('click', closeMenu);
