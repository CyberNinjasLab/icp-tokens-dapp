import { Chart, ScriptableChartContext, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";

Chart.register(...registerables);

import "./style.scss";
import { useAppSelector } from "../../../../../store";
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

const value = [
  [300, 200, 400, 400, 500, 200, 600, 450, 680, 150, 400, 580],
  [300, 1000, 1000, 700, 500, 500, 900, 750, 480, 650, 700, 400],
  [900, 800, 700, 600, 1000, 800, 700, 950, 400, 550, 500, 780],
];

export const ColumnAndLineThree: React.FC = () => {
  const theme = useAppSelector((state) => state.theme.theme);

  const generateBackground = (context: ScriptableChartContext) => {
    const gradientBg = context.chart.ctx.createLinearGradient(0, 20, 0, 120);

    gradientBg.addColorStop(0, themeChart[theme]["fillColor"][0]);
    gradientBg.addColorStop(1, themeChart[theme]["fillColor"][1]);
    return gradientBg;
  };

  const dataAmount = [
    {
      title: "Visited",
      count: 7580,
      color: "#4E7CFF",
    },
    {
      title: "Registered",
      count: 9660,
      color: "#FA544D",
    },
    {
      title: "Funded",
      count: 5660,
      color: `linear-gradient(180.00deg, ${themeChart[theme]["fillColor"][0]},${themeChart[theme]["fillColor"][1]}`,
    },
  ];

  const data = {
    labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
    datasets: [
      {
        type: "bar",
        label: dataAmount[2].title,
        data: value[0],
        backgroundColor: generateBackground,
        borderRadius: 2,
        order: 2,
      },
      {
        type: "bar",
        label: dataAmount[1].title,
        data: value[1],
        backgroundColor: dataAmount[1].color,
        borderRadius: 2,
        order: 2,
      },
      {
        type: "bar",
        label: dataAmount[0].title,
        data: value[2],
        backgroundColor: dataAmount[0].color,
        borderRadius: 2,
        order: 2,
      },
      {
        type: "line",
        label: dataAmount[2].title,
        data: value[0],
        borderColor: generateBackground,
        fill: false,
        borderWidth: 1,
        backgroundColor: "#fff",
        pointBackgroundColor: themeChart[theme]["gridLineColor"],
        pointBorderColor: generateBackground,
        tension: 0.1,
        order: 1,
        radius: 2.5,
      },
      {
        type: "line",
        label: dataAmount[1].title,
        data: value[1],
        borderColor: dataAmount[1].color,
        fill: false,
        borderWidth: 1,
        backgroundColor: "#fff",
        pointBackgroundColor: themeChart[theme]["gridLineColor"],
        pointBorderColor: dataAmount[1].color,
        tension: 0.1,
        order: 1,
        radius: 2.5,
      },
      {
        type: "line",
        label: dataAmount[0].title,
        data: value[2],
        borderColor: dataAmount[0].color,
        fill: false,
        borderWidth: 1,
        backgroundColor: "#fff",
        pointBackgroundColor: themeChart[theme]["gridLineColor"],
        pointBorderColor: dataAmount[0].color,
        tension: 0.1,
        order: 1,
        radius: 2.5,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    categoryPercentage: 0.38,
    scales: {
      y: {
        max: 2500,
        stacked: true,
        beginAtZero: true,
        ticks: {
          color: themeChart[theme]["titleColor"],
          font: {
            size: 8,
            family: "Poppins",
          },
        },
        grid: {
          color: themeChart[theme]["gridLineColor"][0],
          lineWidth: 0.5,
          tickColor: "transparent",
        },
        border: {
          display: false,
        },
      },
      x: {
        stacked: true,
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
          label: (tooltipItem: any) => `${tooltipItem.label}  ${tooltipItem.raw}`,
        },
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="column-and-line-three box">
      <h2>Referral involvement</h2>
      <div style={{ height: "145px" }}>
        {/*//@ts-ignore*/}
        <Bar data={data} options={options} plugins={[plugin]} />
      </div>

      <ul className="column-and-line-three__wrapper">
        {dataAmount.map(({ title, count, color }, i) => {
          return (
            <li key={i} className="column-and-line-three__item box-2">
              <div className="column-and-line-three__bg" style={{ background: color }} />
              <div className="column-and-line-three__title">
                <div>{title}</div>
                <div>{count}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
