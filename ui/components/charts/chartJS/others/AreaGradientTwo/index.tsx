import { themeChart } from "../../theme";
import { Chart, ScriptableChartContext, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import { CommonIcons } from "../../../../../common";

Chart.register(...registerables);

import "./style.scss";
import { changeRGBAOpacity } from "../../../../../utils";
import { useAppSelector } from "../../../../../store";

interface themes {
  [key: string]: {
    backgroundAreaGradient: string[];
    fillColor: string[];
  };
}

export const themeChartLocalSetting: themes = {
  "light-blue": {
    backgroundAreaGradient: ["rgba(115, 168, 248, 0.3)", "rgb(255, 255, 255)"],
    fillColor: ["rgba(115, 168, 248)", "rgba(58, 87, 232)"],
  },
  "dark-blue": {
    backgroundAreaGradient: ["rgb(115, 168, 248, 0.3)", "#0E0E1F"],
    fillColor: ["rgba(115, 168, 248)", "rgba(58, 87, 232)"],
  },
  "light-green": {
    backgroundAreaGradient: ["#66E2AD", "#FFFFFF"],
    fillColor: ["rgb(122, 229, 181)", "rgb(15, 125, 84)"],
  },
  "dark-green": {
    backgroundAreaGradient: ["#66E2AD", "#FFFFFF"],
    fillColor: ["rgb(122, 229, 181)", "rgb(15, 125, 84)"],
  },
  "light-orange": {
    backgroundAreaGradient: ["#66E2AD", "#FFFFFF"],
    fillColor: ["rgb(255, 137, 29)", "rgb(255, 137, 29)"],
  },
  "dark-orange": {
    backgroundAreaGradient: ["rgb(67, 252, 255, 0.1)", "rgb(67, 252, 255, 0)"],
    fillColor: ["rgb(37, 165, 14)", "rgb(37, 165, 14)"],
  },
};

const value = [
  [910, 641, 712, 682, 922, 711, 980],
  [1457, 1747, 1872, 1655, 1935, 2070, 1715],
];

export const AreaGradientTwo: React.FC = () => {
  const theme = useAppSelector((state) => state.theme.theme);

  const generateBackground = (context: ScriptableChartContext) => {
    const gradientBg = context.chart.ctx.createLinearGradient(0, 20, 0, 120);

    gradientBg.addColorStop(0, themeChartLocalSetting[theme]["fillColor"][0]);
    gradientBg.addColorStop(1, themeChartLocalSetting[theme]["fillColor"][1]);
    return gradientBg;
  };

  function convertValueToText(value: number) {
    if (value === 0) {
      return 0;
    }
    if (value >= 1000) {
      const thousands = value / 1000;
      return thousands.toFixed(1) + "K";
    } else {
      return value;
    }
  }

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        type: "line",
        label: "Accruals",
        data: value[0],
        backgroundColor: (context: ScriptableChartContext) => {
          const bgColor = ["rgb(250, 84, 77, 0)", "rgba(250, 83, 77,0.3)"];

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
        borderColor: "#FA544D",
        borderWidth: 1.5,
        pointBackgroundColor: themeChart[theme]["gridLineColor"],
        pointBorderColor: "#FA544D",
        tension: 0,
        radius: 3,
        fill: true,
      },
      {
        type: "line",
        label: "Investments",
        data: value[1],
        borderColor: generateBackground,
        backgroundColor: (context: ScriptableChartContext) => {
          if (!context.chart.chartArea) {
            return;
          }
          const {
            ctx,
            chartArea: { top, bottom },
          } = context.chart;
          const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
          gradientBg.addColorStop(
            0,
            changeRGBAOpacity(themeChartLocalSetting[theme]["fillColor"][1], 0.25)
          );
          gradientBg.addColorStop(
            1,
            changeRGBAOpacity(themeChartLocalSetting[theme]["fillColor"][0], 0)
          );

          return gradientBg;
        },
        fill: true,
        borderWidth: 1,
        pointBorderWidth: 1.5,
        pointBackgroundColor: themeChart[theme]["gridLineColor"],
        pointBorderColor: generateBackground,
        tension: 0,
        order: 1,
        radius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    categoryPercentage: 0.4,
    interaction: {
      intersect: false,
      mode: "index",
    },
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
          color: themeChart[theme]["borderColor"],
          lineWidth: 1,
          tickColor: "transparent",
        },
        border: {
          color: "transparent",
          dash: [1, 2],
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
          color: themeChart[theme]["borderColor"],
          lineWidth: 1,
          tickColor: "transparent",
        },
      },
    },
    plugins: {
      tooltip: {
        intersect: false,
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
          label: (tooltipItem: any) => `${tooltipItem.dataset.label}   ${"€" + tooltipItem.raw}`,
        },
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="area-gradient-two box ">
      <h2>Investments & accruals</h2>

      <div style={{ height: "255px" }}>
        {/*//@ts-ignore*/}
        <Line data={data} options={options} />
      </div>

      <div
        className="area-gradient-two__footer"
        style={
          {
            "--color-investment": themeChartLocalSetting[theme]["fillColor"][0],
          } as React.CSSProperties
        }
      >
        <div className="area-gradient-two__wrapper">
          <div className="area-gradient-two__name">Investments</div>
          <div className="area-gradient-two__amount">$ 245 347.00</div>
        </div>
        <div className="area-gradient-two__wrapper ">
          <div className="area-gradient-two__name">Accruals</div>
          <div className="area-gradient-two__amount">$ 122 348.00</div>
        </div>
        <a href="./test.xlsx" download>
          <CommonIcons name="download" />
        </a>
      </div>
    </div>
  );
};
