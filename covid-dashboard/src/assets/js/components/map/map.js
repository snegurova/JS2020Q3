/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-console */
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodataWorldLow from '@amcharts/amcharts4-geodata/worldLow';

const map = am4core.create('map', am4maps.MapChart);
map.geodata = am4geodataWorldLow;

map.projection = new am4maps.projections.Miller();

const polygonSeries = new am4maps.MapPolygonSeries();
polygonSeries.useGeodata = true;
map.series.push(polygonSeries);

map.zoomControl = new am4maps.ZoomControl();
map.zoomControl.align = 'left';
map.zoomControl.marginLeft = 15;
map.zoomControl.valign = 'middle';

// Configure series
const polygonTemplate = polygonSeries.mapPolygons.template;
polygonTemplate.tooltipText = '{name}: {value}';
polygonTemplate.cursorOverStyle = am4core.MouseCursorStyle.pointer;
// polygonTemplate.fill = am4core.color('#DFE0EB');
polygonSeries.dataFields.id = 'id';
polygonSeries.exclude = ['AQ'];

map.smallMap = new am4maps.SmallMap();
map.smallMap.valign = 'top';
map.smallMap.series.push(polygonSeries);

// Create hover state and set alternative fill color
const hoverState = polygonTemplate.states.create('hover');
hoverState.properties.fill = am4core.color('#F2C94C');

// Set min/max fill color for each area
polygonSeries.heatRules.push({
  property: 'fill',
  target: polygonSeries.mapPolygons.template,
  min: am4core.color('#ffffff'),
  max: am4core.color('#F2C94C'),
  logarithmic: true,
});

function drawMap(data, color) {
  polygonSeries.data = data;
  polygonSeries.invalidateData();
  if (color) {
    hoverState.properties.fill = am4core.color(color);
    polygonSeries.heatRules.removeIndex(0);
    polygonSeries.heatRules.push({
      property: 'fill',
      target: polygonSeries.mapPolygons.template,
      min: am4core.color('#ffffff'),
      max: am4core.color(color),
      logarithmic: true,
    });
  }
}

// Set up heat legend
const heatLegend = map.createChild(am4maps.HeatLegend);
heatLegend.series = polygonSeries;
heatLegend.align = 'right';
heatLegend.valign = 'bottom';
heatLegend.height = am4core.percent(60);
heatLegend.orientation = 'vertical';
heatLegend.valign = 'middle';
heatLegend.markerCount = 10;
heatLegend.marginRight = am4core.percent(4);
heatLegend.valueAxis.renderer.opposite = true;
heatLegend.valueAxis.renderer.dx = -25;
heatLegend.valueAxis.strictMinMax = false;
heatLegend.valueAxis.fontSize = 9;
heatLegend.valueAxis.logarithmic = true;

// heat legend behavior
function handleHover(column) {
  // eslint-disable-next-line no-restricted-globals
  if (!isNaN(column.dataItem.value)) {
    heatLegend.valueAxis.showTooltipAt(column.dataItem.value);
  } else {
    heatLegend.valueAxis.hideTooltip();
  }
}

polygonSeries.mapPolygons.template.events.on('over', (e) => {
  handleHover(e.target);
});

polygonSeries.mapPolygons.template.events.on('hit', function (event) {
  handleHover(event.target);
});

// eslint-disable-next-line no-unused-vars
polygonSeries.mapPolygons.template.events.on('out', function (event) {
  heatLegend.valueAxis.hideTooltip();
});

const colors = ['#219653', '#F2C94C', '#EB5757'];

function getColor(selector) {
  return colors[Object.values(selector.type).indexOf(true)];
}

export {
  polygonTemplate, polygonSeries, map, drawMap, getColor,
};
