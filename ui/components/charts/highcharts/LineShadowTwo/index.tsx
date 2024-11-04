import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export const LineShadowTwo: React.FC<{
  data: number[];
  percent: number;
  height?: number;
  margin?: number | number[] | null[];
}> = ({ data, percent, height, margin }) => {
  const color = percent >= 0 ? "#00BC84" : "#FF4874";

  const options = {
    chart: {
      margin: margin,
      height: height,
      zoomType: "xy",
      backgroundColor: "transparent",
    },

    xAxis: [
      {
        minPadding: 0,
        categories: [],
        labels: {
          enabled: false,
        },
        lineWidth: 0,
      },
    ],

    yAxis: [
      {
        title: "",
        labels: {
          enabled: false,
        },
        gridLineWidth: 0,
      },
    ],

    series: [
      {
        name: "income",
        type: "areaspline",
        pointPlacement: "on",
        data: data,
        color: color,
        shadow: {
          color: "rgba(0, 0, 0, 0.25)",
          width: 4,
          opacity: 1,
          offsetX: 4,
          offsetY: 4,
        },
        marker: {
          enabled: false,
          states: {
            hover: {
              radius: 4,
              // lineWidth: 2.5,
            },
          },
        },
        states: {
          hover: {
            halo: {
              size: 7,
            },
          },
        },
        fillOpacity: 0,
        lineWidth: 2,

        onPoint: {
          connectorOptions: {
            width: 0,
          },
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
    title: {
      text: "",
    },
    subtitle: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};
