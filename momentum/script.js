// Initial data

const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница',
    'Суббота'],
  months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа',
    'Сентября', 'Октября', 'Ноября', 'Декабря'];

// DOM Elements

const time = document.getElementById('time'),
  greeting = document.getElementById('greeting'),
  name = document.getElementById('name'),
  focus = document.getElementById('focus');

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

    setBgGreet(hour);

    // Output Time
    time.innerHTML = `<span class="date">${days[day]}, ${date} ${months[month]}</span>
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
    document.body.style.backgroundImage = "url('assets/img/night/01.jpg')";
    greeting.textContent = 'Доброй Ночи,';
  } else if (hour < 12) {
    document.body.style.backgroundImage = "url('assets/img/morning/01.jpg')";
    greeting.textContent = 'Доброе Утро,';
  } else if (hour < 18) {
    document.body.style.backgroundImage = "url('assets/img/day/01.jpg')";
    greeting.textContent = 'Добрый День,';

  } else {
    document.body.style.backgroundImage = "url('assets/img/evening/01.jpg')";
    greeting.textContent = 'Добрый Вечер,';
  }
}

// Set Name
function setLocalData(e) {
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
function clearRestoreData(e) {
  let value = e.target.innerText;
  e.target.innerText = '';
  setTimeout(() => {
    if (e.target.innerText === '') {
      e.target.innerText = value;
      e.target.blur();
    }
  }, 5000);
}

name.addEventListener('focus', clearRestoreData);
name.addEventListener('keypress', setLocalData);
name.addEventListener('blur', setLocalData);
focus.addEventListener('focus', clearRestoreData);
focus.addEventListener('keypress', setLocalData);
focus.addEventListener('blur', setLocalData);

// Run
showTime();
getLocalData('name', name);
getLocalData('focus', focus);