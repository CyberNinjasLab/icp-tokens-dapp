//@ts-nocheck
import { Chart, ScriptableChartContext, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import { CommonIcons } from "../../../../../common";

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

const value = [900, 500, 1000, 700, 400, 500, 900, 750, 980, 450, 700, 880];

export const ColumnAndLineTwo: React.FC = () => {
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
        type: "bar",
        label: "Investors",
        data: value,
        backgroundColor: generateBackground,
        borderRadius: 2,
        order: 2,
      },
      {
        type: "line",
        label: "Investors",
        data: value,
        borderColor: generateBackground,
        fill: false,
        borderWidth: 1,
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
    <div className="container">
      {/*//@ts-ignore*/}
      <div style={{ height: "125px" }}>
        <Bar data={data} options={options} plugins={[plugin]} />
      </div>

      <div className="investors-data">
        <div className="investors-data__item box-2">
          <div className="investors-data__icon">
            <CommonIcons name="investors-group" />
          </div>
          <div className="investors-data__title">
            <div className="c-text-sec">Daily</div>
            <div>263</div>
          </div>
        </div>

        <div className="investors-data__item box-2">
          <div className="investors-data__icon">
            <CommonIcons name="investors-group" />
          </div>
          <div className="investors-data__title">
            <div className="c-text-sec">Monthly</div>
            <div>712</div>
          </div>
        </div>

        <div className="investors-data__item box-2">
          <div className="investors-data__icon">
            <CommonIcons name="investors-group" />
          </div>
          <div className="investors-data__title">
            <div className="c-text-sec">Yearly</div>
            <div>503</div>
          </div>
        </div>
      </div>
    </div>
  );
};
