import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from "chart.js";
import { useTimer } from "../../../../../hooks";

ChartJS.register(ArcElement, Tooltip, Legend);

const dataLineChart = {
  label: [
    "08-01-2023",
    "08-01-2023",
    "16-01-2023",
    "19-01-2023",
    "22-01-2023",
    "28-01-2023",
    "30-01-2023",
    "13-02-2023",
    "16-02-2023",
    "17-02-2023",
    "17-02-2023",
    "21-02-2023",
    "25-02-2023",
    "04-03-2023",
    "15-03-2023",
    "02-04-2023",
    "04-04-2023",
    "06-04-2023",
    "07-04-2023",
    "07-04-2023",
    "08-04-2023",
    "09-04-2023",
    "13-04-2023",
    "15-04-2023",
    "24-04-2023",
    "25-04-2023",
    "29-04-2023",
    "02-05-2023",
    "17-05-2023",
    "18-05-2023",
    "24-05-2023",
    "26-05-2023",
    "08-06-2023",
    "12-06-2023",
    "14-06-2023",
    "15-06-2023",
    "16-06-2023",
    "21-06-2023",
    "24-06-2023",
    "26-06-2023",
  ],
  y: [
    [
      -12, -9, -7, -6, -10, -10, -3, -6, -4, -12, -3, -11, -14, -9, -13, -9, -3, -4, -2, -1, -3, 4,
      -6, -1, 0, 1, -1, 1, -4, -11, 1, 2, -1, 4, 3, 3, -3, 0, -4, 1,
    ],
    [
      0, 0, 0, -1, -1, -1, -3, -4, -1, -4, -5, -4, -3, -6, -5, -5, -4, -5, -5.5, -5.5, -5.5, -6, -6,
      -12, -11.5, -11.5, -10, -8.5, -9, -10, -10.5, -10, -10, -9, -9, -8, -8, -8, -8.5, -8,
    ],
    [
      1, 1, 1, 1, 1, -0.5, 0.5, -1, 1, 1.5, 1.7, 1.5, 2, 2, 2, 1.7, 1.7, 1.9, 2, 2.5, 1, 1, 1, -3,
      -3, -3, -4, -4, -4, -2, -4, -4, -1, -5, -4, -4, -3.5, -5.5, -5, -5.5,
    ],
  ],
};

export const LineChart: React.FC = () => {
  const loading = useTimer(1000);
  const [dataProps, setDataProps] = React.useState<{
    label: string[];
    y: number[][];
  }>({ label: [""], y: [] });

  React.useEffect(() => {
    if (!loading) {
      setDataProps(dataLineChart);
    }
  }, [loading]);

  const data = {
    labels: dataProps.label,
    datasets: [
      {
        label: "GSE-Financial Index",
        data: dataProps.y[0],
        borderColor: "#5288F0",
        pointBackgroundColor: "#5288F0",
        backgroundColor: "transparent",
        borderWidth: 2,
        radius: 0,
        tension: 0.1,
        fill: true,
      },
      {
        label: "Financial Current Yield",
        data: dataProps.y[1],
        borderColor: "#FF3E3E",
        pointBackgroundColor: "#FF3E3E",
        backgroundColor: "transparent",
        borderWidth: 2,
        radius: 0,
        tension: 0.1,
        fill: true,
      },
      {
        label: "Trade Volume",
        data: dataProps.y[2],
        borderColor: "#E100CB",
        pointBackgroundColor: "#E100CB",
        backgroundColor: "transparent",
        borderWidth: 2,
        radius: 0,
        tension: 0.1,
        fill: true,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    maintainAspectRatio: false,
    responsive: true,
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
          color: "#55557E",
          font: {
            family: "Poppins",
            size: 10,
          },
          callback: (value) => {
            return Number(value).toFixed(1) + "%";
          },
        },
      },
      x: {
        offset: false,
        ticks: {
          color: "#55557E",
          font: {
            family: "Poppins",
            size: 10,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return <Line data={data} options={options} />;
};
