const humburgerButton = document.querySelector('.humburger-button');
const navbar = document.querySelector('.navbar');
const overlay = document.querySelector('.overlay');
const body = document.querySelector('body');
const activeMenuItem = document.querySelector('.active a');

// Stop animation on resize
let resizeTimer;
window.addEventListener("resize", () => {
  document.body.classList.add("resize-animation-stopper");
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.body.classList.remove("resize-animation-stopper");
  }, 1000);
});


activeMenuItem.addEventListener('click', (e) => {
  e.preventDefault();
  if (window.innerWidth < 768 && body.style.overflow !== '') {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    navbar.classList.toggle('active');
    overlay.classList.toggle('show');
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
  body.style.overflow === '' ? body.style.overflow = 'hidden' : body.style.overflow = '';
});


overlay.addEventListener('click', () => {
  navbar.classList.toggle('active');
  overlay.classList.toggle('show');
  body.style.overflow === '' ? body.style.overflow = 'hidden' : body.style.overflow = '';
});

// Slider

let items = document.querySelectorAll('.slider .slider-content .slide');
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
	currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
	isEnabled = false;
	items[currentItem].classList.add(direction);
	items[currentItem].addEventListener('animationend', function() {
		this.classList.remove('active-slide', direction);
	});
}

function showItem(direction) {
	items[currentItem].classList.add('next', direction);
	items[currentItem].addEventListener('animationend', function() {
		this.classList.remove('next', direction);
		this.classList.add('active-slide');
		isEnabled = true;
	});
}

function nextItem(n) {
	hideItem('to-left');
	changeCurrentItem(n + 1);
	showItem('from-right');
}

function previousItem(n) {
	hideItem('to-right');
	changeCurrentItem(n - 1);
	showItem('from-left');
}

document.querySelector('.control .prev').addEventListener('click', function() {
	if (isEnabled) {
		previousItem(currentItem);
	}
});

document.querySelector('.control .next').addEventListener('click', function() {
	if (isEnabled) {
		nextItem(currentItem);
	}
});
