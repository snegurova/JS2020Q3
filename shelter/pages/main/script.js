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

// Slider items
let pets = []; //8
let fullPetsList = []; //48
let sliderItemsCount = 3;

let setSliderItemsCount = () => {
  if (window.innerWidth >= 1280) {
    sliderItemsCount = 3;
  } else if (window.innerWidth >= 768) {
    sliderItemsCount = 2;
  } else {
    sliderItemsCount = 1;
  }
  request();
}

['resize', 'load'].forEach(evt =>
  window.addEventListener(evt, setSliderItemsCount)
);

const request = async () => {
  const src = '../../assets/json/pets.json'
  const res = await fetch(src);
  pets = await res.json();

  fullPetsList = (() => {
    let tempArr = [];
    for (let i = 0; i < 6; i++) {
      const newPets = pets;

      for (let j = pets.length; j > 0; j--) {
        let randInd = Math.floor(Math.random() * j);
        const randElem = newPets.splice(randInd, 1)[0];
        newPets.push(randElem);
      }

      tempArr = [...tempArr, ...newPets];
    }

    return tempArr;
  })();

  fullPetsList = sort863(fullPetsList);

  createSliderContent(fullPetsList);
  items = document.querySelectorAll('.slider .slider-content .slide');
  items.forEach((it) => it.classList.remove('active-slide'));
  currentItem = 0;
  items[0].classList.add('active-slide');
}

const createSliderContent = (petsList) => {
  const sliderContent = document.querySelector(".slider-content");
  const slides = createSlides(petsList);
  // slides.forEach((slide) => sliderContent.innerHTML += slide);
  sliderContent.innerHTML = slides;
}

createSlides = (petsList) => {
  let slides = '';
  for (let i = 0; i < (petsList.length / sliderItemsCount); i++) {
    const stepList = petsList.slice(i * sliderItemsCount, (i * sliderItemsCount) + sliderItemsCount);

    let slideHtml = '<div class="slide">';
    // for (let j = 0; j < sliderItemsCount; j++) {
    stepList.forEach((pet, ind) => {
      slideHtml += `<div class="pets-card">
        <div class="pets-card-inner">
          <img src="${pet.img}" alt="${pet.name}">
          <h4>${pet.name}</h4>
          <a href="#" class="btn btn-secondary">Learn more</a>
        </div>
      </div>`;
    });
    // }
    slides += slideHtml + '</div>';
  }

  return slides;
}


request();

const sort863 = (list) => {
  let unique8List = [];
  let length = list.length;
  for (let i = 0; i < length / 8; i++) {
    const uniqueStepList = [];
    for (j = 0; j < list.length; j++) {
      if (uniqueStepList.length >= 8) {
        break;
      }
      const isUnique = !uniqueStepList.some((item) => {
        return item.name === list[j].name;
      });
      if (isUnique) {
        uniqueStepList.push(list[j]);
        list.splice(j, 1);
        j--;
      }
    }
    unique8List = [...unique8List, ...uniqueStepList];
  }
  list = unique8List;


  list = sort6recursively(list);

  return list;
}

const sort6recursively = (list) => {
  const length = list.length;

  for (let i = 0; i < (length / 6); i++) {
    const stepList = list.slice(i * 6, (i * 6) + 6);

    for (let j = 0; j < 6; j++) {
      const duplicatedItem = stepList.find((item, ind) => {
        return item.name === stepList[j].name && (ind !== j);
      });

      if (duplicatedItem !== undefined) {
        const ind = (i * 6) + j;
        const which8OfList = Math.trunc(ind / 8);

        list.splice(which8OfList * 8, 0, list.splice(ind, 1)[0]);

        sort6recursively(list);
      }
    }
  }

  return list;
}



// Slider

let items = [];
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
  currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
  isEnabled = false;
  items[currentItem].classList.add(direction);
  items[currentItem].addEventListener('animationend', function () {
    this.classList.remove('active-slide', direction);
  });
}

function showItem(direction) {
  items[currentItem].classList.add('next', direction);
  items[currentItem].addEventListener('animationend', function () {
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

document.querySelector('.control .prev').addEventListener('click', function () {
  if (isEnabled) {
    previousItem(currentItem);
  }
});

document.querySelector('.control .next').addEventListener('click', function () {
  if (isEnabled) {
    nextItem(currentItem);
  }
});
