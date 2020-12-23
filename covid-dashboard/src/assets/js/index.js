/* eslint-disable import/no-duplicates */
/* eslint-disable no-console */
import './fullScreen';

import getLoadCovidData from './load_data/Load_global_data';
import getSelectCountryData from './load_data/Load_select_country_data';
import getStartChartData from './load_data/load_start_chart_data';
import formatMapData from './components/map/format-map-data';

import getCountryChartData from './sort_and_show_data/sort_data_for_chart';
import { selectCountry, changeTableData, showGlobalData } from './sort_and_show_data/show_global_data';
import getCountriesSortedBySelector from './sort_and_show_data/sort_country_by_selector';
import searchCountry from './sort_and_show_data/search_country';

import './components/map/map';
import * as covidMap from './components/map/map';

import '../scss/main.scss';
import CovidChart from './components/chart/covidchart';

// eslint-disable-next-line no-console
console.log('Working!');
// eslint-disable-next-line prefer-const
let currentOutSelector = 'TotalConfirmed';

let globalCovidData;
let countryCovidData;
let startChartData;
let countrySortList;

const dataIndexes = {
  type: {
    recovered: false,
    confirmed: true,
    deaths: false,
  },
  total: true,
  absolute: true,
};

async function initGlobalData() {
  globalCovidData = await getLoadCovidData(); // получаю данные
}
async function initCountyData(currentCountry) {
  countryCovidData = await getSelectCountryData(currentCountry); // получаю данные
}
async function initGlobalChartData() {
  startChartData = await getStartChartData(); // получаю данные
}

const chartContainer = document.querySelector('.chart__wrap');

// eslint-disable-next-line no-unused-vars
const covidChart = new CovidChart(chartContainer);
window.myChart = covidChart;

// периодические обращения к серверу при ошибке глобальных данных для списка
// карты и таблицы
const intervalGlobal = setInterval(() => {
  if (!globalCovidData) {
    initGlobalData();
  }
  if (typeof globalCovidData === 'object') {
    globalCovidData.Global.flag = 'https://s1.iconbird.com/ico/0912/NX11Unfinished/w256h2561348757719InternetReal.png';
    clearInterval(intervalGlobal);
    document.querySelector('.spinner').remove();
    // console.log(globalCovidData); // сюда вставляем функции инициализации

    // eslint-disable-next-line no-use-before-define
    drawMap();

    // [flag = true] по убыванию (умолчание) false - по возрастанию currentOutSelector
    // ['flag'] получить дополнительные данные кроме данных по которым будут сортировка
    // console.log(getCountriesSortedBySelector(globalCovidData, currentOutSelector, true, 'flag'));
    countrySortList = getCountriesSortedBySelector(globalCovidData, currentOutSelector, true, 'flag');
    showGlobalData(countrySortList);
    selectCountry('Global', globalCovidData, document.querySelector('.country__list__item'));
    changeTableData('Global', globalCovidData);
  }
}, 1000);

// периодические обращения к серверу при ошибке глобальных данных для графика
const intervalGlobalChart = setInterval(() => {
  if (!startChartData) {
    initGlobalChartData();
  }
  if (typeof startChartData === 'object') {
    clearInterval(intervalGlobalChart);// они запустятся после получения данных
    covidChart.updateData(startChartData, 7827000000);
  }
}, 1000);

// периодические обращения к серверу при ошибке данных для страны
function changeCountryForChart(currentCountry) {
  const intervalSelectCountry = setInterval(() => {
    if (!countryCovidData) {
      initCountyData(currentCountry);
    }
    if (typeof countryCovidData === 'object') {
      clearInterval(intervalSelectCountry);
      // данные Для графиков
      const dataObj = getCountryChartData(currentCountry, countryCovidData);
      const { population } = globalCovidData[currentCountry];
      covidChart.updateData(dataObj, population);
    }
  }, 2000);
}

// add listeners to static elements
document.querySelector('#country').addEventListener('input', () => searchCountry(countrySortList));

document.querySelector('.wrap').addEventListener('click', (e) => {
  const element = e.target.dataset.country ? e.target : e.target.parentElement;
  if (element.dataset.country) {
    e.stopPropagation();
    selectCountry(element.dataset.country, globalCovidData, element);
    const id = globalCovidData[element.dataset.country].CountryCode;
    if (id === undefined) {
      covidMap.map.goHome();
    } else {
      covidMap.map.zoomToMapObject(covidMap.polygonSeries.getPolygonById(id));
    }
  }
});

document.querySelectorAll('.radio-table').forEach((el) => {
  el.addEventListener('change', () => {
    changeTableData(document.querySelector('.selected').dataset.country, globalCovidData);
    changeCountryForChart(document.querySelector('.selected').dataset.country);
  });
});

document.querySelector('.country__input-reset').addEventListener('click', () => {
  showGlobalData(countrySortList);
  selectCountry('Global', globalCovidData, document.querySelector('.country__list__item'));
  changeTableData('Global', globalCovidData);
  covidMap.map.goHome();
});

// map listeners
covidMap.polygonTemplate.events.on('hit', (ev) => {
  ev.target.series.chart.zoomToMapObject(ev.target);
  let country = '';
  Object.keys(globalCovidData).slice(2).forEach((key) => {
    if (globalCovidData[key].CountryCode === ev.target.dataItem.dataContext.id) {
      country = key;
    }
  });
  changeTableData(country, globalCovidData);
});
document.addEventListener('keyup', (e) => {
  if (e.key === 'Enter' && document.querySelectorAll('.country__list__item').length === 1) {
    const element = document.querySelectorAll('.country__list__item')[0];
    selectCountry(element.dataset.country, globalCovidData, element);
    const id = globalCovidData[element.dataset.country].CountryCode;
    if (id === undefined) {
      covidMap.map.goHome();
    } else {
      covidMap.map.zoomToMapObject(covidMap.polygonSeries.getPolygonById(id));
    }
  }
});

// Map data choosing event

function drawMap() {
  const mapData = formatMapData(globalCovidData, dataIndexes);
  const color = covidMap.getColor(dataIndexes);
  covidMap.drawMap(mapData, color);
}

document.querySelector('.map').addEventListener('click', (e) => {
  e.stopPropagation();
  if (e.target.localName !== 'label') {
    return;
  }
  if (e.target.dataset.type) {
    // eslint-disable-next-line no-return-assign
    Object.keys(dataIndexes.type).forEach((key) => dataIndexes.type[key] = false);
    dataIndexes.type[e.target.dataset.type] = true;
  }
  if (e.target.dataset.total !== '' && e.target.dataset.total !== undefined) {
    dataIndexes.total = e.target.dataset.total === 'true';
  }
  if (e.target.dataset.absolute !== '' && e.target.dataset.absolute !== undefined) {
    dataIndexes.absolute = e.target.dataset.absolute === 'true';
  }

  drawMap();
});
