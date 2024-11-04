import React from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

interface MarketDepthProps {
  data: {
    bids: number[][];
    asks: number[][];
  };
}

export const MarketDepth: React.FC<MarketDepthProps> = ({ data }) => {
  const options = {
    chart: {
      height: 600,
      type: "area",
      zoomType: "xy",
    },
    title: {
      text: "",
    },
    xAxis: {
      minPadding: 0,
      maxPadding: 0,
      lineWidth: 0,
      labels: {
        style: {
          color: "#9BAECA",
        },
      },
      tickColor: "#9BAECA",
      plotLines: [
        {
          color: "#9BAECA",
          value: 0.1523,
          width: 1,
          label: {
            text: "",
            rotation: 90,
          },
        },
      ],
      title: {
        text: "",
      },
    },
    yAxis: [
      {
        lineWidth: 0,
        gridLineWidth: 0,
        title: null,
        tickWidth: 1,
        tickLength: 5,
        tickPosition: "inside",
        tickColor: "#9BAECA",
        labels: {
          align: "left",
          x: 8,
          style: {
            color: "#9BAECA",
          },
        },
      },
      {
        opposite: true,
        linkedTo: 0,
        lineWidth: 0,
        gridLineWidth: 0,
        title: null,
        tickWidth: 1,
        tickLength: 5,
        tickPosition: "inside",
        tickColor: "#9BAECA",
        labels: {
          align: "right",
          x: -8,
          style: {
            color: "#9BAECA",
          },
        },
      },
    ],
    legend: {
      enabled: false,
    },
    plotOptions: {
      area: {
        stacking: "normal",
        fillOpacity: 0.2,
        lineWidth: 1,
        step: "center",
        animation: {
          duration: 2000,
        },
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size=10px;">Price: {point.key}</span><br/>',
      valueDecimals: 2,
    },
    series: [
      {
        name: "Bids",
        data: data.bids,
        color: "#23A36A",
        fillColor: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [0, "#23A36A"],
            [1, "#fff"],
          ],
        },
        zIndex: 1,
      },
      {
        name: "Asks",
        data: data.asks,
        color: "#FF6F6F",
        fillColor: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [0, "#FF6F6F"],
            [1, "#fff"],
          ],
        },
      },
    ],

    credits: {
      enabled: false,
    },
  };

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
};
