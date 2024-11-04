import React from "react";
import { useAppSelector } from "../../../../store";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  LineController,
  ScriptableChartContext,
} from "chart.js";
import { themeChart } from "./theme";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  LineController
);

export const LineChart: React.FC<{ dataArr: number[]; border?: boolean }> = ({
  dataArr,
  border,
}) => {
  const theme = useAppSelector((state) => state.theme.theme);

  const generateGradientBackground = (context: ScriptableChartContext) => {
    const bgColor = themeChart[theme]["lineColor"];
    const gradientBg = context.chart.ctx.createLinearGradient(0, 0, 0, context.chart.height);

    gradientBg.addColorStop(0, bgColor[0]);
    gradientBg.addColorStop(1, bgColor[1]);
    return gradientBg;
  };

  function convertValueToText(value: number) {
    return value + "K";
  }

  const data = {
    labels: ["9:00", "11:00", "18:30", "21:00", "23:30", "01:00", "04:00", "07:00"],
    datasets: [
      {
        type: "line",
        label: "",
        data: dataArr,
        borderColor: generateGradientBackground,
        borderWidth: 1,
        tension: 0.4,
        order: 1,
        radius: 0,
        fill: true,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: generateGradientBackground,
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 1,
        backgroundColor: (context: ScriptableChartContext) => {
          const bgColor = themeChart[theme]["fillColor"];
          if (!context.chart.chartArea) {
            return;
          }
          const {
            ctx,
            chartArea: { top, bottom },
          } = context.chart;
          const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);

          gradientBg.addColorStop(0, bgColor[1]);
          gradientBg.addColorStop(1, bgColor[0]);

          return gradientBg;
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    categoryPercentage: 0.4,

    interaction: {
      intersect: false,
    },

    animation: {
      easing: "easeInOutQuad",
      duration: 700,
    },

    scales: {
      y: {
        min: 0.5,
        max: 4.5,
        beginAtZero: true,
        ticks: {
          padding: 10,
          stepSize: 0.5,
          color: themeChart[theme]["titleColor"],
          font: {
            size: 18,
            family: "Poppins",
            weight: 400,
          },
          callback: (value: number) => {
            return convertValueToText(value);
          },
        },
        grid: {
          color: border ? "transparent" : themeChart[theme]["gridLineColor"],
          borderColor: "rgba(255, 255, 255, 0.1)",
        },
        border: {
          display: false,
        },
      },
      x: {
        beginAtZero: true,
        ticks: {
          color: themeChart[theme]["titleColor"],
          font: {
            size: 18,
            family: "Poppins",
            weight: 400,
          },
        },
        grid: {
          display: false,
        },
        border: {
          display: border ? false : true,
        },
      },
    },

    plugins: {
      tooltip: {
        yAlign: "bottom",
        callbacks: {
          labelTextColor: function () {
            return themeChart[theme]["tooltipTitleColor"];
          },
          title: () => "",
          label: function (context: any) {
            const label = context.parsed.y * 1000 || "0K";
            const eur = "€ " + label;

            return eur;
          },
        },
        bodyFont: {
          size: 14,
        },
        caretPadding: 15,
        backgroundColor: themeChart[theme]["gridLineColor"],
        borderColor: generateGradientBackground,
        borderWidth: 1,
        displayColors: false,
        padding: {
          left: 12,
          right: 12,
          top: 8,
          bottom: 6,
        },
        titleMarginBottom: 0,
        labelFont: {
          font: {
            size: 20,
          },
        },
      },
      legend: {
        display: false,
      },
    },

    pointLabels: {
      color: "#af8181",
    },
  };

  //@ts-ignore
  return <Line data={data} options={options} />;
};
