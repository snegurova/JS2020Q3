/* eslint-disable no-param-reassign */
export default function getStartChartData() {
  return fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=366')
    .then((response) => response.json())
    .then((data) => data)
    .catch(() => false);
}
