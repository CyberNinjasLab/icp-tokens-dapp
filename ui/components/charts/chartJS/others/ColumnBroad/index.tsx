//@ts-nocheck
import React from "react";
import { useTimer } from "../../../../../hooks";
import { useAppSelector } from "../../../../../store";
import { Chart, ScriptableChartContext, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import { themeChart } from "../../theme";

Chart.register(...registerables);

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
      const segment = width / labels.length - 6;

      if (pluginOptions.barColor) {
        ctx.fillStyle = pluginOptions.barColor;

        for (let i = 0; i < labels.length; i++) {
          ctx.fillRect(x.getPixelForValue(i) - segment / 2, top, segment, height);
        }
      }
    }
  },
};

export const ColumnBroad: React.FC<{ height?: number }> = ({ height }) => {
  const theme = useAppSelector((state) => state.theme.theme);
  const timer = useTimer(500);

  const generateBackground = (context: ScriptableChartContext) => {
    const gradientBg = context.chart.ctx.createLinearGradient(0, 20, 0, 120);

    gradientBg.addColorStop(0, themeChart[theme]["fillColor"][0]);
    gradientBg.addColorStop(1, themeChart[theme]["fillColor"][1]);
    return gradientBg;
  };

  const [value, setValue] = React.useState([1700, 500, 2300, 900]);

  React.useEffect(() => {
    if (!timer) {
      setValue([1700, 500, 2300, 900]);
    }
  }, [timer]);

  function convertValueToText(value: number) {
    if (value === 0) {
      return 0;
    }
    if (value >= 1000) {
      const thousands = value / 1000;
      return "€" + thousands.toFixed(1) + "k";
    } else {
      return "€" + value;
    }
  }

  const data = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        type: "bar",
        label: "Quarterly income",
        data: value,
        backgroundColor: generateBackground,
        borderRadius: 3,
        order: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    categoryPercentage: 0.6,
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
            return convertValueToText(value);
          },
        },
        grid: {
          display: false,
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
            `${tooltipItem.label}                ${convertValueToText(tooltipItem.raw)}`,
        },
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="container" style={{ height: height + "px" }}>
      {/*//@ts-ignore*/}
      <Bar data={data} options={options} plugins={[plugin]} />
    </div>
  );
};
