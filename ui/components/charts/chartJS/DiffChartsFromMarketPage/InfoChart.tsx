import React from "react";
import {
  Chart as ChartJS,
  ChartData,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const InfoChart: React.FC<{ dataArr?: number[] }> = ({ dataArr }) => {
  const [value, setValue] = React.useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  React.useEffect(() => {
    if (dataArr) {
      setValue(dataArr);
    }
  }, [dataArr]);

  const colorGradient = ["rgba(239, 78, 78, 0.048)", "rgba(239, 78, 78, 0.048)"];

  const chartData: ChartData<"line"> = {
    labels: dataArr,
    datasets: [
      {
        type: "line",
        label: "Line",
        data: value,
        backgroundColor: (context: any) => {
          const bgColor = colorGradient;
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
        borderColor: "#ef4e4e",
        borderWidth: 2,
        tension: 0,
        order: 1,
        //@ts-ignore
        radius: 0,
        fill: true,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    maintainAspectRatio: false,
    responsive: true,
    interaction: {
      intersect: false,
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          display: false,
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
          display: false,
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
      legend: {
        display: false,
      },
    },
  };

  return <Line width={"100%"} data={chartData} options={options} />;
};
