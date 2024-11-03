import React from "react";
import { useAppSelector } from "../../../../../store";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ScriptableChartContext,
} from "chart.js";

import { Radar } from "react-chartjs-2";
import { changeRGBAOpacity } from "../../../../../utils";
import { themeChart } from "../../theme";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface ChartProps {
  data: number[];
}

export const Chart: React.FC<ChartProps> = ({ data }) => {
  const theme = useAppSelector((state) => state.theme.theme);

  const generateBackground = (context: ScriptableChartContext) => {
    const gradientBg = context.chart.ctx.createLinearGradient(0, 0, 0, 300);

    gradientBg.addColorStop(0, changeRGBAOpacity(themeChart[theme]["fillColor"][0], 0.5));
    gradientBg.addColorStop(1, changeRGBAOpacity(themeChart[theme]["fillColor"][1], 0.5));
    return gradientBg;
  };

  const generateBorder = (context: ScriptableChartContext) => {
    const gradientBg = context.chart.ctx.createLinearGradient(0, 0, 0, 300);

    gradientBg.addColorStop(0, changeRGBAOpacity(themeChart[theme]["fillColor"][0], 1));
    gradientBg.addColorStop(1, changeRGBAOpacity(themeChart[theme]["fillColor"][1], 1));
    return gradientBg;
  };

  const dataChar = {
    labels: [
      "Loan amount",
      "Interest rate",
      "Duration",
      "Investment product",
      "Asset class",
      "Location",
    ],

    datasets: [
      {
        data: data,
        backgroundColor: generateBackground,
        borderColor: generateBorder,
        borderWidth: 1,
        radius: 2,
        pointBorderWidth: 1.5,
        pointBackgroundColor: "#fff",
        pointBorderColor: generateBorder,
        pointHoverBackgroundColor: "#fff",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        intersect: false,
        position: "average",
        backgroundColor: themeChart[theme]["tooltipBackgroundColor"],
        titleColor: themeChart[theme]["tooltipTextColor"][0],
        bodyColor: themeChart[theme]["tooltipTextColor"][1],
        borderColor: themeChart[theme]["borderColor"],
        bodySpacing: 8,
        borderWidth: 1,
        titleAlign: "left",
        bodyAlign: "left",
        displayColors: false,
        callbacks: {
          title: (tooltipItems: any) => tooltipItems[0].dataset.label,
          label: (tooltipItem: any) => `${tooltipItem.raw}/10`,
        },
      },
    },

    dataset: [
      {
        backgroundColor: "green",
      },
    ],

    scales: {
      r: {
        beginAtZero: true,
        min: 0,
        max: 10,
        pointLabels: {
          color: themeChart[theme]["titleColor"],
          font: {
            size: 11,
            family: "Poppins",
          },
        },
        ticks: {
          display: false,
        },
        grid: {
          color: themeChart[theme]["gridLineColor"][1],
        },
        angleLines: {
          color: themeChart[theme]["gridLineColor"][1],
        },
      },
    },
  };

  //@ts-ignore
  return <Radar data={dataChar} options={options} />;
};
