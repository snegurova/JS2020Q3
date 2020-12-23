const create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return el;
};

function changeTableData(country, data) {
  const allOrDay = document.querySelector('.one').checked ? 'New' : 'Total';
  const absOr100s = document.querySelector('.one2').checked ? data[country].population / 100000 : 1;

  document.querySelector('.block1_country_info>img').src = data[country].flag;
  document.querySelector('.block1_country_info>h3').textContent = country;
  document.querySelector('.confirmed')
    .textContent = (Math.round((data[country][`${allOrDay}Confirmed`] / absOr100s) * 1000) / 1000).toLocaleString('ru-RU');
  document.querySelector('.deaths')
    .textContent = (Math.round((data[country][`${allOrDay}Deaths`] / absOr100s) * 1000) / 1000).toLocaleString('ru-RU');
  document.querySelector('.recovered')
    .textContent = (Math.round((data[country][`${allOrDay}Recovered`] / absOr100s) * 1000) / 1000).toLocaleString('ru-RU');
}

function selectCountry(country, data, element) {
  document.querySelectorAll('.country__list__item').forEach((el) => {
    el.classList.remove('selected');
  });
  element.classList.add('selected');
  changeTableData(country, data);
}

function showGlobalData(arr) {
  document.querySelector('.country__list').remove();
  const countryList = create('div', 'country__list');

  arr.forEach((el) => {
    const [country, select, flag] = [...el];
    const countryFlag = create('img', 'country__list__item-flag');
    countryFlag.src = flag;
    const countryName = create('div', 'country__list__item-name');
    countryName.textContent = country;
    const countryAmount = create('div', 'country__list__item-amount');
    countryAmount.textContent = Number(select).toLocaleString('ru-RU');
    const countryListItem = create('div', 'country__list__item');
    countryListItem.dataset.country = country;
    countryListItem.append(countryFlag, countryName, countryAmount);
    countryList.append(countryListItem);
  });

  document.querySelector('.wrap').append(countryList);
}

export { selectCountry, changeTableData, showGlobalData };
