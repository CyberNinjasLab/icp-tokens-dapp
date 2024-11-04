import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
  ActiveElement,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useAppSelector } from "../../../../store";
import { themeChart } from "../theme";

ChartJS.register(ArcElement, Tooltip, Legend, Filler);

export function DoughnutGradient({
  handleChangeLabel,
}: {
  handleChangeLabel: (value: { title: string; percent: number }) => void;
}) {
  const theme = useAppSelector((state) => state.theme.theme);

  const data = {
    labels: ["Ethereum", "BNB Chain", "Polygon", "OKTC", "Arbitrum One"],
    datasets: [
      {
        label: "",
        data: [50, 13, 5, 15, 17],
        backgroundColor: ["#2B7AFF", "#ffce2d", "#AA78FF", "#FF61C0", "#4EDFFF"],
        borderColor: themeChart[theme]["gridLineColor"],
        borderWidth: 2,
        cutout: 65,
      },
    ],
  };

  const options: ChartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: false,
        position: "bottom",
        maxHeight: 80,
        labels: {
          boxWidth: 8,
          boxHeight: 8,
          color: "#2C406E",
        },
      },
    },
    onHover: (_, elements: ActiveElement[]) => {
      if (elements.length) {
        var label = data.labels[elements[0].index];
        var value = data.datasets[0].data[elements[0].index];
        handleChangeLabel({
          title: label,
          percent: value,
        });
      }
    },
  };
  //@ts-ignore
  return <Doughnut data={data} options={options} />;
}
