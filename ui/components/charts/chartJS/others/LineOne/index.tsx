import React from "react";
import { useAppSelector } from "../../../../../store";
import { Chart, ScriptableChartContext, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import { CommonIcons } from "../../../../../common";

Chart.register(...registerables);

import "./style.scss";
import { themeChart } from "../../theme";

const plugin = {
  id: "backgroundBar",
  beforeDraw: (chart: Chart, args: object, pluginOptions?: { barColor: string }) => {
    if (!pluginOptions) {
      return;
    }

    const {
      data,
      ctx,
      //eslint-disable-next-line
      chartArea: { top, bottom, left, right, width, height },
      //eslint-disable-next-line
      scales: { x, y },
    } = chart;

    ctx.save();

    const labels = data.labels;

    if (labels) {
      const segment = width / labels.length - 4;

      if (pluginOptions.barColor) {
        ctx.fillStyle = pluginOptions.barColor;

        for (let i = 0; i < labels.length; i++) {
          ctx.fillRect(x.getPixelForValue(i) - segment / 2, top, segment, height);
        }
      }
    }
  },
};

const value = [357, 547, 472, 555, 555, 325, 615, 407, 555, 445, 488, 442];

function convertValueToText(value: number, toFixed: number) {
  if (value === 0) {
    return "0";
  } else if (value >= 1 && value <= 1000) {
    const percentage = (value / 1000) * 10;
    return percentage.toFixed(toFixed) + "%";
  } else {
    return "";
  }
}

export const LineOne: React.FC = () => {
  const theme = useAppSelector((state) => state.theme.theme);

  const generateBackground = (context: ScriptableChartContext) => {
    const gradientBg = context.chart.ctx.createLinearGradient(0, 20, 0, 120);

    gradientBg.addColorStop(0, themeChart[theme]["fillColor"][0]);
    gradientBg.addColorStop(1, themeChart[theme]["fillColor"][1]);
    return gradientBg;
  };

  const data = {
    labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
    datasets: [
      {
        type: "line",
        label: "Interest",
        data: value,
        borderColor: generateBackground,
        fill: false,
        borderWidth: 1,
        pointBorderWidth: 1.5,
        pointBackgroundColor: themeChart[theme]["gridLineColor"],
        pointBorderColor: generateBackground,
        tension: 0.3,
        order: 1,
        radius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    categoryPercentage: 0.4,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: themeChart[theme]["titleColor"],
          font: {
            size: 8,
            family: "Poppins",
          },
          callback: (value: number) => {
            return convertValueToText(value, 0);
          },
        },
        grid: {
          color: themeChart[theme]["gridLineColor"][0],
          lineWidth: 1,
          tickColor: "transparent",
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
            size: 8,
            family: "Poppins",
          },
        },
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
    },
    plugins: {
      backgroundBar: {
        barColor: "rgba(155, 174, 202, 0.05)",
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
          label: (tooltipItem: any) =>
            `${tooltipItem.label} ${convertValueToText(tooltipItem.raw, 1)}`,
        },
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="container">
      <div style={{ height: "125px" }}>
        {/*//@ts-ignore*/}
        <Bar data={data} options={options} plugins={[plugin]} />
      </div>

      <div className="line-one">
        <div className="line-one__item box-2">
          <div className="line-one__icon">
            <CommonIcons name="last-month" />
          </div>
          <div className="line-one__title">
            <div className="c-text-sec">Last month</div>
            <div>5.7%</div>
          </div>
        </div>
      </div>
    </div>
  );
};
