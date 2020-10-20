// Initial data

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
  'Суббота'],
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'];
let images = new Array(24).fill('');
let base = 'assets/img/',
  prevHour = -1,
  i = 0,
  partOfDay = ['night', 'morning', 'day', 'evening'];

// Create image collection
images = images.map( (it, ind) => {
    return it = `${partOfDay[Math.trunc(ind / 6)]}/${addZero(Math.floor(Math.random() * (20 + 1)))}.jpg`;
  });

// DOM Elements

const time = document.getElementById('time'),
  greeting = document.getElementById('greeting'),
  name = document.getElementById('name'),
  focus = document.getElementById('focus'),
  changeImg = document.querySelector('.change-img'),
  blockquote = document.querySelector('blockquote'),
  figcaption = document.querySelector('figcaption'),
  changeQuote = document.querySelector('.change-quote'),
  weatherIcon = document.querySelector('.weather-icon'),
  temperature = document.querySelector('.temperature'),
  weatherDescription = document.querySelector('.weather-description'),
  city = document.querySelector('.city');

// Show Time
function showTime() {
  // let today = new Date(2020, 06, 10, 0, 33, 30),
  let today = new Date(),
    day = today.getDay(),
    date = today.getDate(),
    month = today.getMonth(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  if (prevHour != hour) {
    setBgGreet(hour);
    prevHour = hour;
  }


  // Output Time
  time.innerHTML = `<span class="date">${days[day]}, ${months[month]} ${date}</span>
    ${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;

  setTimeout(showTime, 1000);
}

// Add Zero
function addZero(n) {
  return (n < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet(hour) {
  if (hour < 6) {
    getImage(hour);
    greeting.textContent = 'Good Night,';
  } else if (hour < 12) {
    getImage(hour);
    greeting.textContent = 'Good Morning,';
  } else if (hour < 18) {
    getImage(hour);
    greeting.textContent = 'Good Afternoon,';
  } else {
    getImage(hour);
    greeting.textContent = 'Good Evening,';
  }
}

// Set Name
function setLocalData(e) {
  if (e.target.innerText === '') {
    if (e.type === 'blur' || e.which == 13 || e.keyCode == 13) {
      e.target.innerText = localStorage.getItem(e.target.id);
    } else {
      return;
    }
  }
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem(e.target.id, e.target.innerText);
      e.target.blur();
    }
  } else {
    localStorage.setItem(e.target.id, e.target.innerText);
  }
}

// Get Name
function getLocalData(id, el) {
  if (localStorage.getItem(id) === null) {
    el.textContent = `[Enter ${id}]`
  } else {
    el.textContent = localStorage.getItem(id);
  }
}

// Clear and restore data
function clearData(e) {
  if (localStorage.getItem(e.target.id) === null) {
    localStorage.setItem(e.target.id, e.target.innerText);
  }
  e.target.innerText = '';
}

// Change images
function viewBgImage(src) {
  const body = document.querySelector('body');
  const img = document.createElement('img');
  img.src = src;
  img.onload = () => {
    body.style.backgroundImage = `url(${src})`;
  };
}

function getImage(hour) {
  let index;
  if (hour.type === 'click') {
    index = i % images.length;
  } else {
    index = hour;
    i = index;
  }

  const imageSrc = base + images[index];
  viewBgImage(imageSrc);
  i++;
}

// Change blockquote
async function getQuote() {
  const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;
  const res = await fetch(url);
  const data = await res.json();
  blockquote.textContent = data.quoteText;
  figcaption.textContent = data.quoteAuthor;
}

//Weather Widget
async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  weatherIcon.className = 'weather-icon owf'
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp}`;
  weatherDescription.textContent = `${data.weather[0].description}`
}

function setCity(e) {
  if (e.code === 'Enter') {
    getWeather();
    city.blur();
  }
}


// EventListeners
name.addEventListener('focus', clearData);
name.addEventListener('keypress', setLocalData);
name.addEventListener('blur', setLocalData);
focus.addEventListener('focus', clearData);
focus.addEventListener('keypress', setLocalData);
focus.addEventListener('blur', setLocalData);
changeImg.addEventListener('click', getImage);
changeQuote.addEventListener('click', getQuote);
document.addEventListener('DOMContentLoaded', getQuote);
// document.addEventListener('DOMContentLoaded', getWeather);
// city.addEventListener('keypress', setCity);



// Run
showTime();
getLocalData('name', name);
getLocalData('focus', focus);