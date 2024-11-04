import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useAppSelector } from "../../../../../store";
import { themeChart } from "../../theme";

export const LineFillShadow: React.FC<{
  data: number[];
  color?: string;
  height?: number;
  type?: "area" | "areaspline";
  lineWidth?: number;
  themeColor?: boolean;
}> = ({ data, color, height, type, lineWidth, themeColor }) => {
  const theme = useAppSelector((state) => state.theme.theme);

  const changeRGBAColor = (color = "rgba(96, 175, 255)", opacity: number = 1) => {
    return `${color.slice(0, -1)}, ${opacity})`;
  };

  const options = {
    chart: {
      margin: [0, 0, 0, 0],
      height: height,
      zoomType: "xy",
      backgroundColor: "transparent",
    },
    title: {
      text: "",
      align: "left",
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
        type: type ? type : "areaspline",
        pointPlacement: "on",
        data: data,
        color: themeColor
          ? {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1,
              },
              stops: themeChart[theme]["lineColor"],
            }
          : color,
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: themeColor
            ? [
                [0, themeChart[theme]["fillColor"][0]["1"]],
                [1, themeChart[theme]["fillColor"][1]["1"]],
              ]
            : [
                [0, changeRGBAColor(color, 0.27)],
                [1, changeRGBAColor(color, 0)],
              ],
        },
        fillOpacity: 0,
        lineWidth: lineWidth ? lineWidth : 2,
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
    legend: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
    },
  };

  return <HighchartsReact key={theme} highcharts={Highcharts} options={options} />;
};
