import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import "./style.scss";
import { CryptoIcons } from "../../../../../../common";
import { themeProps } from "./theme";

interface LineAndColumnProps {
  data: number[][];
  theme: themeProps;
  nameTooltip?: string;
}

export const Charts: React.FC<LineAndColumnProps> = ({ data, theme, nameTooltip }) => {
  const [tooltipLine, setTooltipLine] = React.useState({
    x: 0,
    y: 32,
    value: 0,
  });
  const [tooltipBar, setTooltipBar] = React.useState({
    x: 0,
    y: 108,
    value: 0,
  });
  const [width, setWidth] = React.useState(0);

  /* These changes set limits on moving beyond the tooltip boundaries */
  const percentFromWidthChartForLine = (width / 100) * 4;
  const percentFromWidthChartForBar = (width / 100) * 9;

  /* These conditions help restrict the tooltip from going beyond its boundaries */
  const limitMovingTooltipRightLine =
    tooltipLine.x > width - percentFromWidthChartForLine
      ? width - percentFromWidthChartForLine
      : tooltipLine.x < percentFromWidthChartForLine
      ? percentFromWidthChartForLine
      : tooltipLine.x;

  const limitMovingTooltipRightBar =
    tooltipBar.x > width - percentFromWidthChartForBar
      ? width - percentFromWidthChartForBar
      : tooltipBar.x < percentFromWidthChartForBar
      ? percentFromWidthChartForBar
      : tooltipBar.x;

  /* These two similar functions help in moving the tooltip to the top of the chart */
  const [eventsStateTooltipBar] = React.useState({
    mouseOver: function (this: Highcharts.Point) {
      const chart = this.series.chart;
      setWidth(chart.plotWidth);

      if (this.plotX && this.plotY) {
        setTooltipBar({
          x: this.plotX + chart.plotLeft,
          y: this.plotY + chart.plotTop,
          value: this.x,
        });
        setTooltipLine((prev) => ({
          ...prev,
          x: this.plotX ? this.plotX + chart.plotLeft : 0,
          value: this.x,
        }));
      }
    },
  });

  const [eventsStateTooltipLine] = React.useState({
    mouseOver: function (this: Highcharts.Point) {
      const chart = this.series.chart;
      setWidth(chart.plotWidth);

      if (this.plotX && this.plotY) {
        setTooltipLine({
          x: this.plotX + chart.plotLeft,
          y: this.plotY + chart.plotTop,
          value: this.x,
        });
        setTooltipBar((prev) => ({
          ...prev,
          x: this.plotX ? this.plotX + chart.plotLeft : 0,
          value: this.x,
        }));
      }
    },
  });

  /* Main options which you can change using the Highcharts API - https://api.highcharts.com/highcharts/ */
  const options = {
    chart: {
      height: 150,
      margin: 0,
      marginTop: 10,
      zoomType: "xy",
      backgroundColor: "transparent",
    },
    title: {
      text: "",
      align: "left",
    },
    xAxis: [
      {
        labels: {
          enabled: false,
        },
        categories: [],
        crosshair: true,

        lineWidth: 0,
      },
    ],
    yAxis: [
      {
        labels: {
          enabled: false,
        },
        title: {
          enabled: false,
        },
        gridLineWidth: 0,
        max: 20,
        /* Be careful. To position the line chart from the top, you need to set a negative value. The more you want it to be positioned from the top, the greater the negative value you need to set. */
        min: -100,
      },
      {
        opposite: true,
        gridLineWidth: 0,
        minPadding: 0,
        maxPadding: 0,
        max: 90000,
        min: 0,
      },
    ],
    legend: {
      enabled: false,
    },
    series: [
      {
        name: "",
        type: "spline",
        data: data[0],
        color: theme["lineColor"],
        lineWidth: 3,
        marker: {
          enabled: false,
        },
        shadow: {
          color: theme["lineColor"]["stops"][1][1],
          width: 15,
          opacity: 1,
          offsetX: 4,
          offsetY: 4,
        },
        onPoint: {
          connectorOptions: {
            width: 0,
          },
        },
        point: {
          events: eventsStateTooltipLine,
        },
        hight: "30%",
      },
      {
        name: "",
        type: "column",
        yAxis: 1,
        data: data[1],
        borderRadius: 0,
        borderColor: "transparent",
        borderWidth: 1,
        color: theme["fillColor"],
        groupPadding: 0,
        point: {
          events: eventsStateTooltipBar,
        },
      },
    ],
    exporting: {
      buttons: {
        contextButton: {
          enabled: false,
        },
      },
    },
    subtitle: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      shared: true,
    },
  };

  return (
    <div className="line-and-column" style={{ position: "relative" }}>
      <HighchartsReact highcharts={Highcharts} options={options} />

      {/* These tooltips, as you can see, are set with properties display: position */}
      {tooltipLine.x > 0 && (
        <div
          className="tooltip-custom-line"
          style={{
            top: tooltipLine.y / 5 + -35,
            left: limitMovingTooltipRightLine,
          }}
        >
          <h4>{options.series[0].data[tooltipLine.value]} %</h4>
          <h6>{nameTooltip}</h6>
        </div>
      )}

      {tooltipBar.x > 0 && (
        <div
          className="tooltip-custom-bar"
          style={{
            top: tooltipBar.y / 8 + 60,
            left: limitMovingTooltipRightBar,
          }}
        >
          <CryptoIcons name="eth" size="17" />
          <h4>{options.series[1].data[tooltipBar.value]} ETH</h4>
        </div>
      )}
    </div>
  );
};
