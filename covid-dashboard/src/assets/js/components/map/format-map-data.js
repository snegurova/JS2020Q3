/* eslint-disable no-console */
const selectors = [
  ['TotalRecovered', 'TotalConfirmed', 'TotalDeaths'],
  ['NewRecovered', 'NewConfirmed', 'NewDeaths'],
];

export default function formatMapData(dataObj, selector) {
  const index = selectors[selector.total ? 0 : 1][Object.values(selector.type).indexOf(true)];
  let formattedData = [];
  Object.keys(dataObj).slice(2)
    .forEach((country) => formattedData
      .push({
        id: dataObj[country].CountryCode,
        value: selector.absolute ? dataObj[country][index]
          : (dataObj[country][index] / dataObj[country].population) * 100000,
      }));
  formattedData = formattedData.filter((el) => el.value !== 0);
  return formattedData;
}
