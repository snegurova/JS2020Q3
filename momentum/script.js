// DOM Elements

const time = document.getElementById('time'),
  greeting = document.getElementById('greeting'),
  name = document.getElementById('name'),
  focus = document.getElementById('focus');

// Show Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

    setBgGreet(hour);

    // Set AM or PM
    const amPm = hour >= 12 ? 'PM' : 'AM';

    // 12ht Format
    hour = hour % 12 || 12;

    // Output Time
    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)} ${amPm}`;

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
    greeting.textContent = 'Good Night';
  } else if (hour < 12) {
    document.body.style.backgroundImage = "url('assets/img/morning/01.jpg')";
    greeting.textContent = 'Good Morning';
  } else if (hour < 18) {
    document.body.style.backgroundImage = "url('assets/img/day/01.jpg')";
    greeting.textContent = 'Good Afternoon';
    document.body.style.color = '#fff';

  } else {
    document.body.style.backgroundImage = "url('assets/img/evening/01.jpg')";
    greeting.textContent = 'Good Evening';
    document.body.style.color = '#fff';
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

name.addEventListener('keypress', setLocalData);
name.addEventListener('blur', setLocalData);
focus.addEventListener('keypress', setLocalData);
focus.addEventListener('blur', setLocalData);

// Run
showTime();
getLocalData('name', name);
getLocalData('focus', focus);