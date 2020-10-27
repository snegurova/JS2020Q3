const humburgerButton = document.querySelector('.humburger-button');
const navbar = document.querySelector('.navbar');
const overlay = document.querySelector('.overlay');
const body = document.querySelector('body');
const activeMenuItem = document.querySelector('.active a');
// const activeLogo = document.querySelector('.active-logo');
let petsCard = [];

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
  e.stopPropagation();
  if (window.innerWidth < 768 && body.style.overflow !== '') {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    navbar.classList.toggle('active');
    overlay.classList.toggle('show');
    // overlay.classList.toggle('z-1');
    // petsCard.forEach((it) => it.classList.toggle('z-2'));
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
  e.stopPropagation();
  navbar.classList.toggle('active');
  overlay.classList.toggle('show');
  // overlay.classList.toggle('z-1');
  // petsCard.forEach((it) => it.classList.toggle('z-2'));
  body.style.overflow === '' ? body.style.overflow = 'hidden' : body.style.overflow = '';
});


navbar.addEventListener('click', () => {
  if (window.innerWidth < 768) {
    navbar.classList.toggle('active');
    overlay.classList.toggle('show');
    // overlay.classList.toggle('z-1');
    // petsCard.forEach((it) => it.classList.toggle('z-2'));
    body.style.overflow === '' ? body.style.overflow = 'hidden' : body.style.overflow = '';
  }

});


// Pagination

// Slider items
let pets = []; //8
let fullPetsList = []; //48
let sliderItemsCount = 8;

let setSliderItemsCount = () => {
  if (window.innerWidth >= 1280) {
    sliderItemsCount = 8;
  } else if (window.innerWidth >= 768) {
    sliderItemsCount = 6;
  } else {
    sliderItemsCount = 3;
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
  items = document.querySelectorAll('.slider-content .slide');
  items.forEach((it) => it.classList.remove('active-slide'));
  petCards = document.querySelectorAll('.slide .pets-card');
  petCards.forEach((it) => it.addEventListener('click', closePopup));
  currentItem = 0;
  changeCurrentItem(currentItem);
  items[0].classList.add('active-slide');
  // petsCard = document.querySelectorAll('.pets-card');
}

const createSliderContent = (petsList) => {
  const sliderContent = document.querySelector('.slider-content');
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
      slideHtml += `<div class="pets-card" data-name="${pet.name}">
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
const start = document.querySelector('.control .start');
const prev = document.querySelector('.control .prev');
const page = document.querySelector('.control .page');
const next = document.querySelector('.control .next');
const end = document.querySelector('.control .end');

function changeCurrentItem(n) {
  currentItem = (n + items.length) % items.length;
  if (currentItem === 0) {
    start.disabled = true;
    prev.disabled = true;
  } else {
    start.disabled = false;
    prev.disabled = false;
  }
  if (currentItem === items.length - 1) {
    next.disabled = true;
    end.disabled = true;
  } else {
    next.disabled = false;
    end.disabled = false;
  }
  page.textContent = currentItem + 1;
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

// function firstItem(n) {
//   hideItem('to-left');
//   changeCurrentItem(n + 1);
//   showItem('from-right');
// }

// function lastItem(n) {
//   hideItem('to-right');
//   changeCurrentItem(n - 1);
//   showItem('from-left');
// }

prev.addEventListener('click', function () {
  if (isEnabled) {
    previousItem(currentItem);
  }
});
start.addEventListener('click', function () {
  if (isEnabled) {
    previousItem(1);
  }
});

next.addEventListener('click', function () {
  if (isEnabled) {
    nextItem(currentItem);
  }
});
end.addEventListener('click', function () {
  if (isEnabled) {
    nextItem(items.length - 2);
  }
});


// Popup

let petCards = [];
const popupWrapper = document.querySelector('.popup-wrapper');
const popup = document.querySelector('.popup');
const popupInner = document.querySelector('.popup-inner');
const popupClose = document.querySelector('.popup-btn');
const popupImg = document.querySelector('.popup .img-wrapper img');
const popupName = document.querySelector('.popup-content .name');
const popupBreed = document.querySelector('.popup-content .breed');
const popupDescription = document.querySelector('.popup-content .description');
const popupFeatures = document.querySelector('.popup-content .features');

function closePopup(e) {
  if (e && e.currentTarget.className === 'pets-card') {
    fillPetData(e);
  }
  popupWrapper.classList.toggle('active');
  popupInner.classList.toggle('active');
  body.style.overflow === '' ? body.style.overflow = 'hidden' : body.style.overflow = '';
  body.style.paddingRight === '' ? body.style.paddingRight = '16px' : body.style.paddingRight = '';
}

function fillPetData(e) {
  const currentPet = pets.filter((it) => it.name === e.currentTarget.dataset.name)[0];
  popupImg.setAttribute('src', `${currentPet.img}`);
  popupName.textContent = `${currentPet.name}`;
  popupBreed.textContent = `${currentPet.type} - ${currentPet.breed}`;
  popupDescription.textContent = `${currentPet.description}`;
  popupFeatures.innerHTML = `<li>
                                <span><b>Age: </b>${currentPet.age}</span>
                              </li>
                              <li>
                                <span><b>Inoculations: </b>${currentPet.inoculations}</span>
                              </li>
                              <li>
                                <span><b>Diseases: </b>${currentPet.diseases}</span>
                              </li>
                              <li>
                                <span><b>Parasites:</b> ${currentPet.parasites}</span>
                              </li>`;
}

popupClose.addEventListener('click', () => closePopup());
popup.addEventListener('click', () => closePopup());
popupInner.addEventListener('click', (e) => e.stopPropagation());

popup.addEventListener('mouseover', (e) => {
  if (e.target.className === 'popup') {
    popupClose.classList.add('active');
  } else {
    popupClose.classList.remove('active');
  }
});