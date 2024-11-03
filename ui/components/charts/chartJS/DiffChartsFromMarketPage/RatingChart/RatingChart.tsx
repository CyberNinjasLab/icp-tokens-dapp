//@ts-nocheck
import React from "react";
import { useAppSelector } from "../../../../../store";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ScriptableChartContext } from "chart.js";
import { useTimer } from "../../../../../hooks";
import { themeChart } from "../../theme";

ChartJS.register(ArcElement, Tooltip, Legend);

const dataLineChart = {
  x: ["22S", "23S", "24S", "25S", "26S", "27S", "28S", "29S", "30S", "31S", "32S", "33S", "34S"],
  y: [32, 39.97, 39.35, 39.33, 40.27, 40.79, 41.07, 39.56, 42.47, 41.25, 40.5, 41.65, 41.14],
};

export const LineChartRating: React.FC = () => {
  const theme = useAppSelector((state) => state.theme.theme);

  const generateGradientBackground = (context: ScriptableChartContext) => {
    const gradientBg = context.chart.ctx.createLinearGradient(-50, 20, 200, context.chart.height);

    gradientBg.addColorStop(0, "#E100CB");
    gradientBg.addColorStop(1, "#E100CB");
    return gradientBg;
  };

  const loading = useTimer(1000);
  const [dataProps, setDataProps] = React.useState<{
    x: string[];
    y: number[];
  }>({ x: [""], y: [] });

  React.useEffect(() => {
    if (!loading) {
      setDataProps(dataLineChart);
    }
  }, [loading]);

  const allTooltips = theme.startsWith("d") ? "#151429" : "#FFF";

  const data = {
    labels: ["", ...dataProps.x, ""],
    datasets: [
      {
        type: "line",
        label: "",
        data: [null, ...dataProps.y, null],
        borderColor: generateGradientBackground,
        pointBackgroundColor: generateGradientBackground,
        backgroundColor: "transparent",
        borderWidth: 2,
        tension: 0.3,
        order: 3,
        radius: 3,
        fill: true,
      },
    ],
  };

  const alwaysShowTooltip = {
    id: "alwaysShowTooltip",
    afterDatasetsDraw(chart) {
      const { ctx } = chart;

      ctx.save();

      chart.data.datasets.forEach((dataset, i: number) => {
        chart.getDatasetMeta(i).data.forEach((datapoint, index: number) => {
          const { x, y } = datapoint.tooltipPosition();

          const itemText = chart.data.datasets[i].data[index];
          const text = itemText !== null ? itemText + "%" : "";

          ctx.beginPath();
          ctx.fillStyle = itemText !== null ? allTooltips : "transparent";
          const textWidth = ctx.measureText(text).width;
          ctx.stroke();

          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 5;
          ctx.shadowBlur = 5;
          ctx.shadowColor = "rgba(0, 0, 0, 0.15)";
          ctx.roundRect(x - (textWidth + 10) / 2, y - 25, textWidth + 10, 16, 4);
          ctx.fill();
          ctx.shadowColor = "transparent";

          //text
          ctx.font = "Regular 10px Poppins";
          ctx.fillStyle = themeChart[theme]["titleColor"];
          ctx.fillText(text, x - textWidth / 2, y - 14);
        });
      });
    },
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    categoryPercentage: 0.4,
    interaction: {
      intersect: false,
      mode: "index",
    },
    layout: {
      padding: {
        left: 20,
        right: 20,
      },
    },
    scales: {
      y: {
        ticks: {
          color: themeChart[theme]["titleColor"],
          font: {
            family: "Poppins",
            size: 10,
          },
          callback: (value: number) => {
            return value.toFixed(1) + "%";
          },
        },
      },
      x: {
        offset: false,
        ticks: {
          color: themeChart[theme]["titleColor"],
          font: {
            family: "Poppins",
            size: 10,
          },
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";

            if (label) {
              label += "   ";
            }

            if (context.parsed.y !== null) {
              label += context.parsed.y + "%";
            }

            return label;
          },
        },

        styles: { color: "red" },
      },
      legend: {
        display: false,
      },
    },
  };

  return <Line key={theme} data={data} options={options} plugins={[alwaysShowTooltip]} />;
};
