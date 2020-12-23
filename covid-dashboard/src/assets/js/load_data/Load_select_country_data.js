/* eslint-disable no-param-reassign */
// return Object {
//   '2020-12-13T00:00:00Z': {
//     Active: 381841
//     Confirmed: 918444
//     Deaths: 15691
//     Recovered: 520912
//   },
//   '2020-12-14T00:00:00Z': {
//     Active: 383428
//     Confirmed: 925321
//     Deaths: 15792
//     Recovered: 526101
//   },
// }

export default function getSelectCountryData(country) {
  return fetch(`https://api.covid19api.com/country/${country}`)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((el, i) => {
        delete el.Country;
        delete el.CountryCode;
        delete el.Lat;
        delete el.Lon;
        delete el.Province;
        delete el.City;
        delete el.CityCode;
        data[el.Date] = el;
        delete data[el.Date].Date;
        delete data[i];
      });
      return data;
    })
    .catch(() => false);
}
