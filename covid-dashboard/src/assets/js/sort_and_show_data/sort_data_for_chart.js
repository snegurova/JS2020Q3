export default function getCountryChartData(country, globalData) {
  const cases = {};
  const deaths = {};
  const recovered = {};
  Object.entries(globalData).forEach((el) => {
    cases[el[0].slice(1, 10)] = el[1].Confirmed;
    deaths[el[0].slice(1, 10)] = el[1].Deaths;
    recovered[el[0].slice(1, 10)] = el[1].Recovered;
  });
  return { cases, deaths, recovered };
}
