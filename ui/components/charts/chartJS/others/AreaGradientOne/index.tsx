import { Chart, ScriptableChartContext, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import { CommonIcons } from "../../../../../common";

Chart.register(...registerables);

import "./style.scss";
import { themeChart } from "../../theme";
import { changeRGBAOpacity } from "../../../../../utils";
import { useAppSelector } from "../../../../../store";

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

export const AreaGradientOne: React.FC = () => {
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
        label: "Referral commissions",
        data: value,
        borderColor: generateBackground,
        backgroundColor: (context: ScriptableChartContext) => {
          const bgColor = themeChart[theme]["backgroundAreaGradient"];
          if (!context.chart.chartArea) {
            return;
          }
          const {
            ctx,
            chartArea: { top, bottom },
          } = context.chart;
          const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
          gradientBg.addColorStop(0, changeRGBAOpacity(themeChart[theme]["fillColor"][1], 0.25));
          gradientBg.addColorStop(1, changeRGBAOpacity(themeChart[theme]["fillColor"][0], 0));

          return gradientBg;
        },
        fill: true,
        borderWidth: 1,
        pointBorderWidth: 1.5,
        pointBackgroundColor: themeChart[theme]["tooltipBackgroundColor"],
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
        max: 800,
        beginAtZero: true,
        ticks: {
          color: themeChart[theme]["titleColor"],
          font: {
            size: 8,
            family: "Poppins",
          },
          callback: (value: number) => {
            return "€" + value;
          },
        },
        grid: {
          color: "#ffffff",
          lineWidth: 0,
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
            `${tooltipItem.label}                     ${"€" + tooltipItem.raw}`,
        },
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="area-gradient-one box ">
      <h2>Referral commissions</h2>

      <div style={{ height: "145px" }}>
        {/*//@ts-ignore*/}
        <Bar data={data} options={options} plugins={[plugin]} />
      </div>

      <div className="area-gradient-one__footer">
        <div className="area-gradient-one__item box-2">
          <div className="area-gradient-one__icon">
            <CommonIcons name="increase-percent" />
          </div>
          <div className="area-gradient-one__title">
            <div className="c-text-sec">Today</div>
            <div>€ 342.00</div>
          </div>
        </div>

        <div className="area-gradient-one__item box-2">
          <div className="area-gradient-one__icon">
            <CommonIcons name="increase-percent" />
          </div>
          <div className="area-gradient-one__title">
            <div className="c-text-sec">This week</div>
            <div>€ 3987.00</div>
          </div>
        </div>
      </div>
    </div>
  );
};
