/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-console */
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodataWorldLow from '@amcharts/amcharts4-geodata/worldLow';

class CovidMap {
  constructor(data) {
    this.data = data;
    this.map = am4core.create('map', am4maps.MapChart);
    this.map.geodata = am4geodataWorldLow;

    this.map.projection = new am4maps.projections.Miller();

    this.polygonSeries = new am4maps.MapPolygonSeries();
    this.polygonSeries.useGeodata = true;
    this.map.series.push(this.polygonSeries);

    this.map.zoomControl = new am4maps.ZoomControl();
    this.map.zoomControl.align = 'left';
    this.map.zoomControl.marginLeft = 15;
    this.map.zoomControl.valign = 'middle';

    // Configure series
    this.polygonTemplate = this.polygonSeries.mapPolygons.template;
    this.polygonTemplate.tooltipText = '{name}: {value}';
    this.polygonTemplate.cursorOverStyle = am4core.MouseCursorStyle.pointer;
    // polygonTemplate.fill = am4core.color('#DFE0EB');
    this.polygonSeries.dataFields.id = 'id';
    this.polygonSeries.exclude = ['AQ'];

    this.map.smallMap = new am4maps.SmallMap();
    this.map.smallMap.valign = 'top';
    this.map.smallMap.series.push(this.polygonSeries);

    // Create hover state and set alternative fill color
    this.hoverState = this.polygonTemplate.states.create('hover');
    this.hoverState.properties.fill = am4core.color('#219653');

    // Set min/max fill color for each area
    this.polygonSeries.heatRules.push({
      property: 'fill',
      target: this.polygonSeries.mapPolygons.template,
      min: am4core.color('#ffffff'),
      max: am4core.color('#219653'),
      logarithmic: true,
    });

    // Set up heat legend
    this.heatLegend = this.map.createChild(am4maps.HeatLegend);
    this.heatLegend.series = this.polygonSeries;
    this.heatLegend.align = 'right';
    this.heatLegend.valign = 'bottom';
    this.heatLegend.height = am4core.percent(60);
    this.heatLegend.orientation = 'vertical';
    this.heatLegend.valign = 'middle';
    this.heatLegend.markerCount = 10;
    this.heatLegend.marginRight = am4core.percent(4);
    this.heatLegend.valueAxis.renderer.opposite = true;
    this.heatLegend.valueAxis.renderer.dx = -25;
    this.heatLegend.valueAxis.strictMinMax = false;
    this.heatLegend.valueAxis.fontSize = 9;
    this.heatLegend.valueAxis.logarithmic = true;

    this.polygonSeries.data = this.data;

    this.polygonSeries.mapPolygons.template.events.on('over', (e) => {
      this.handleHover(e.target);
    });

    this.polygonSeries.mapPolygons.template.events.on('hit', (event) => {
      this.handleHover(event.target);
    });

    // eslint-disable-next-line no-unused-vars
    this.polygonSeries.mapPolygons.template.events.on('out', (event) => {
      this.handleOut();
    });
  }

  drawMap(data, color) {
    this.polygonSeries.data = data;
    if (color) {
      this.polygonSeries.heatRules.removeIndex(0);
      this.polygonSeries.heatRules.push({
        property: 'fill',
        target: this.polygonSeries.mapPolygons.template,
        min: am4core.color('#ffffff'),
        max: am4core.color(color),
        logarithmic: true,
      });
    }

    console.log(this.polygonSeries.dataFields);
    console.log(this.polygonSeries.data);
  }

  // heat legend behavior
  handleHover(column) {
    console.log(column.dataItem.value);
    // eslint-disable-next-line no-restricted-globals
    if (!isNaN(column.dataItem.value)) {
      this.heatLegend.valueAxis.showTooltipAt(column.dataItem.value);
    } else {
      this.heatLegend.valueAxis.hideTooltip();
    }
  }

  handleOut() {
    this.heatLegend.valueAxis.hideTooltip();
  }
}

export default CovidMap;
