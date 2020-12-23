import Chart from 'chart.js';

const activeSwitch = [{
  color: '#219653',
},
{
  color: '#F2C94C',
},
{
  color: '#FF0000',
}];

class CovidChart {
  constructor() {
    this.covidData = {};
    this.population = 0;
    this.recovered = document.querySelector('#switch-recovered');
    this.newCases = document.querySelector('#switch-confirmed');
    this.deaths = document.querySelector('#switch-deaths');

    this.canvas = document.querySelector('.covid-chart');
    this.canvas.style.width = '100%';

    this.todayTotal = document.querySelector('#chart-today-total');
    this.absolute100k = document.querySelector('#chart-absolute-100k');

    this.state = {
      isTotal: true,
      is100k: false,
      switches: [0, 1, 0],
    };

    const { color } = activeSwitch[this.state.switches
      .filter((elem) => elem === 1)[0]];

    const data = {
      labels: ['', ''],
      datasets: [{
        data: [0, 0],
        backgroundColor: `${color}`,
        borderColor: `${color}`,
        borderWidth: 1,
        lineTension: 0,
      }],
    };

    const options = {
      legend: {
        display: false,
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
          },
        }],
      },
    };

    this.myLineChart = new Chart(this.canvas, {
      type: 'line',
      data,
      options,
    });
    this.addListeners();
  }

  addListeners() {
    this.recovered.addEventListener('click', this.onRecoveredClick.bind(this));
    this.newCases.addEventListener('click', this.onNewCasesClick.bind(this));
    this.deaths.addEventListener('click', this.onDeathsClick.bind(this));
    this.todayTotal.addEventListener('click', this.onTodayTotalClick.bind(this));
    this.absolute100k.addEventListener('click', this.onAbsolute100kClick.bind(this));
  }

  updateChart() {
    const idx = this.state.switches.findIndex((elem) => elem === 1);
    let data = {};
    switch (idx) {
      case 0:
        data = this.covidData.recovered;
        break;
      case 1:
        data = this.covidData.cases;
        break;
      default:
        data = this.covidData.deaths;
    }
    let values = Object.values(data);
    const keys = Object.keys(data);
    if (!this.state.isTotal) {
      values = values.map((elem, i, arr) => ((i) ? elem - arr[i - 1] : 0));
    }
    if (this.state.is100k) {
      values = values.map((elem) => ((elem * 100000) / this.population).toFixed(1));
    }
    this.myLineChart.data.labels = keys;
    this.myLineChart.data.datasets[0].data = values;
    this.myLineChart.data.datasets[0].backgroundColor = activeSwitch[idx].color;
    this.myLineChart.data.datasets[0].borderColor = activeSwitch[idx].color;
    this.myLineChart.update();
  }

  onRecoveredClick() {
    this.state.switches = [1, 0, 0];
    this.updateChart();
  }

  onNewCasesClick() {
    this.state.switches = [0, 1, 0];
    this.updateChart();
  }

  onDeathsClick() {
    this.state.switches = [0, 0, 1];
    this.updateChart();
  }

  onTodayTotalClick() {
    this.state.isTotal = !this.state.isTotal;
    this.updateChart();
  }

  onAbsolute100kClick() {
    this.state.is100k = !this.state.is100k;
    this.updateChart();
  }

  getState() {
    return this.state;
  }

  setState(state) {
    this.state = state;
  }

  updateData(obj, population) {
    this.covidData = obj;
    this.population = population;
    this.updateChart();
  }

  checkRecovered() {
    this.state.switches = [1, 0, 0];
    this.recovered.checked = true;
    this.updateChart();
  }

  checkConfirmed() {
    this.state.switches = [0, 1, 0];
    this.newCases.checked = true;
    this.updateChart();
  }

  checkDeaths() {
    this.state.switches = [0, 0, 1];
    this.deaths.checked = true;
    this.updateChart();
  }

  toggleTodayTotal() {
    this.state.isTotal = !this.state.isTotal;
    this.todayTotal.checked = !this.todayTotal.checked;
    this.updateChart();
  }

  toggleAbsolute100k() {
    this.state.is100k = !this.state.is100k;
    this.absolute100k.checked = !this.absolute100k.checked;
    this.updateChart();
  }
}

export default CovidChart;
