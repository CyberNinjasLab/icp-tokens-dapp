import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export function ChartShadowSecond({ dataAssets, cutout }) {
  const data = {
    labels: false,
    datasets: [
      {
        label: "",
        data: dataAssets.map((item) => item.percent),
        backgroundColor: dataAssets.map((item) => item.style.background),
        cutout: cutout - 2,
        borderRadius: 10,
        borderDashOffset: 3,
        borderWidth: 0,
        spacing: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    layout: {
      padding: 3,
    },
    plugins: {
      tooltip: {
        enabled: false,
      },
    },
  };

  return <Doughnut data={data} options={options} />;
}
