import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { IDataAssets } from "./dataForChart";
import { ValueHover } from ".";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ChartDoughnutMainProps {
  dataAssets: IDataAssets[];
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  cutout: number;
  handleChangeLabel: (value: ValueHover) => void;
}

export const ChartDoughnutMain: React.FC<ChartDoughnutMainProps> = ({
  dataAssets,
  handleMouseEnter,
  handleMouseLeave,
  cutout,
  handleChangeLabel,
}) => {
  const data = {
    labels: dataAssets.map((item) => item.title),
    datasets: [
      {
        label: "",
        data: dataAssets.map((item) => item.percent),
        backgroundColor: dataAssets.map((item) => item.style.background),
        cutout: cutout,
        borderRadius: 10,
        borderDashOffset: 3,
        borderWidth: 0,
        spacing: 3,
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
      legend: {
        display: false,
      },
    },

    onHover: (event: any, elements: any) => {
      if (elements.length > 0) {
        handleMouseEnter();
      } else {
        handleMouseLeave();
      }

      if (elements.length) {
        const label = data.labels[elements[0].index];
        const value = data.datasets[0].data[elements[0].index];
        handleChangeLabel({ title: label, percent: value });
      }
    },
  };

  return <Doughnut data={data} options={options} />;
};
