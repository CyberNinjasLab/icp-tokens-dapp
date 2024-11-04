import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export const LineShadow: React.FC<{ data: number[]; percent: number }> = ({
  data = [],
  percent,
}) => {
  const color = percent >= 0 ? "#00BC84" : "#ff6f6f";

  const options = {
    chart: {
      margin: [0, 0, null, 0],
      height: 70,
      zoomType: "xy",
      backgroundColor: "transparent",
    },
    title: {
      text: "",
      align: "left",
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
          color: color,
          width: 5,
          opacity: 1,
          offsetX: 0,
          offsetY: 0,
        },
        fillOpacity: 0,
        lineWidth: 2,
        marker: {
          enabled: false,
        },
        onPoint: {
          connectorOptions: {
            width: 0,
          },
        },
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};
