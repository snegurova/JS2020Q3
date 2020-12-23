/* eslint-disable no-param-reassign */
// return Object {
//   Global: {
//     NewConfirmed: 697848
//       NewDeaths: 12481
//       NewRecovered: 489131
//       TotalConfirmed: 69582029
//       TotalDeaths: 1581758
//       TotalRecovered: 44863011
//   },
//   Albania: {
//     Date: "2020-12-12T01:31:13Z"
//     NewConfirmed: 873
//     NewDeaths: 14
//     NewRecovered: 537
//     Slug: "albania"
//     TotalConfirmed: 46061
//     TotalDeaths: 965
//     TotalRecovered: 23609
//     flag: "https://restcountries.eu/data/alb.svg"
//     population: 2886026
//   },
//    { .... }
// }

export default function getLoadCovidData() {
  const getPopulationFlag = fetch('https://restcountries.eu/rest/v2/all?fields=name;population;flag;alpha2Code')
    .then((data) => data.json());

  const getCovidTotalData = fetch('https://api.covid19api.com/summary')
    .then((data) => data.json());

  return Promise.all([getPopulationFlag, getCovidTotalData])
    .then((value) => {
      let globalPopulation = 0;
      value[1].Countries.forEach((el) => {
        value[0].forEach((elem) => {
          globalPopulation += elem.population;
          if (el.CountryCode === elem.alpha2Code) {
            el.flag = elem.flag;
            el.population = elem.population;
          }
        });
        value[1].Global.population = globalPopulation;
        value[1][el.Country] = el;
        delete el.Country;
        delete el.Premium;
      });
      delete value[1].Countries;
      delete value[1].Message;
      return value[1];
    })
    .catch(() => false);
}
