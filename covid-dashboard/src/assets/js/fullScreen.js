const country = document.querySelector('.country');
const countryFullScreenBtn = country.querySelector('.js-toggle-fullscreen-btn');
countryFullScreenBtn.addEventListener('click', () => {
  countryFullScreenBtn.classList.toggle('on');
  countryFullScreenBtn.blur();
  country.classList.toggle('fullscreen');
});

const table = document.querySelector('.table');
const tableFullScreenBtn = table.querySelector('.js-toggle-fullscreen-btn');
tableFullScreenBtn.addEventListener('click', () => {
  tableFullScreenBtn.classList.toggle('on');
  tableFullScreenBtn.blur();
  table.classList.toggle('fullscreen');
});

const chart = document.querySelector('.chart');
const chartFullScreenBtn = chart.querySelector('.js-toggle-fullscreen-btn');
chartFullScreenBtn.addEventListener('click', () => {
  chartFullScreenBtn.classList.toggle('on');
  chartFullScreenBtn.blur();
  chart.classList.toggle('fullscreen');
});

const map = document.querySelector('.map');
const mapFullScreenBtn = map.querySelector('.js-toggle-fullscreen-btn');
mapFullScreenBtn.addEventListener('click', () => {
  mapFullScreenBtn.classList.toggle('on');
  mapFullScreenBtn.blur();
  map.classList.toggle('fullscreen');
});
