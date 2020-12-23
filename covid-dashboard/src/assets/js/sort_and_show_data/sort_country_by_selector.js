// selector =>
// NewConfirmed || NewDeaths || NewRecovered ||
// TotalConfirmed || TotalDeaths || TotalRecovered
// population -------------- на всякий случай
// flag = true (descending sort )
// addDataSelector => add return data
// eslint-disable-next-line max-len
export default function getCountriesSortedBySelector(data, selectorSort, flag = true, addDataSelector) {
  const arr = Object.entries(data).slice(0, 1).concat(Object.entries(data).slice(2));
  arr.sort((a, b) => (flag
    ? b[1][selectorSort] - a[1][selectorSort] : a[1][selectorSort] - b[1][selectorSort]));
  return addDataSelector
    ? arr.map((el) => [el[0], el[1][selectorSort]].concat(el[1][addDataSelector]))
    : arr.map((el) => [el[0], el[1][selectorSort]]);
}
