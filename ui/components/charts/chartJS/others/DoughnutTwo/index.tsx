import React from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

import "./style.scss";
import {
  IDataForDifferentChart,
  dataForDifferentChart,
} from "../../../../../pages/charts/charts/data";
import { CommonIcons } from "../../../../../common";

const colors = [
  "#FF45D4",
  "#7EFF45",
  "#F8FF45",
  "#AB45FF",
  "#FA544D",
  "#2bff00",
  "#43FCFF",
  "#4E7CFF",
  "#FFB100",
  "#533691",
];

interface ChartElement {
  datasetIndex: number;
  index: number;
}

const investment = dataForDifferentChart
  .slice(0, 10)
  .map((item: IDataForDifferentChart) => +item.investmentTable.investment * 100);
const title = dataForDifferentChart.slice(0, 10).map((item: any) => item.title);

export const DoughnutTwo: React.FC = () => {
  const [hoverData, setHoverData] = React.useState({
    label: "Luxury Villa",
    color: "#FF45D4",
    value: 953900,
  });

  const handleHover = (value: number) => {
    setHoverData({
      label: title[value],
      color: colors[value],
      value: investment[value],
    });
  };

  const data = {
    labels: title,
    datasets: [
      {
        label: "check",
        data: investment,
        backgroundColor: colors,
        borderWidth: 0,
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    cutout: 37,
    responsive: true,
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: false,
      },
    },
    onHover: function (_: any, elements: ChartElement[]) {
      if (elements.length) {
        const color = data.datasets[0].backgroundColor[elements[0].index];
        const value = data.datasets[0].data[elements[0].index];
        const label = data.labels[elements[0].index];
        setHoverData({ color, value, label });
      }
    },
  };

  const styleBackground = { background: hoverData.color };
  return (
    <div className="doughnut-two">
      <h2>Whole portfolio</h2>

      <div className="both-container">
        <div className="doughnut-chart">
          <div className="doughnut-chart__container">
            <div className="doughnut-chart__chart">
              <Doughnut data={data} options={options} />
            </div>

            <div className="doughnut-chart__circle-outside" />
            <div className="doughnut-chart__circle" />
            <div className="doughnut-chart__color" style={styleBackground} />
            <h4 className="doughnut-chart__amount">€{hoverData.value}</h4>
          </div>
        </div>

        <div className="all-project">
          <div className="all-project__color">
            <div className="all-project__all-name">All</div>
            <div className="all-project__color-item">
              {colors.map((item, i) => {
                const styleBackground = { background: item };
                return (
                  <div
                    key={i}
                    className="color-item"
                    style={styleBackground}
                    onMouseEnter={() => handleHover(i)}
                  ></div>
                );
              })}

              <div className="color-item-hover"></div>
            </div>
          </div>
          <div className="all-project__name">
            <div>Project</div>
            <div>Invested</div>
          </div>
          <div className="all-project__item box-2" style={{ marginTop: "3px" }}>
            <div className="all-project__icon">
              <div className="color-item" style={styleBackground}></div>
            </div>
            <div className="all-project__title">
              <div className="c-text-sec">{hoverData.label}</div>
              <div>€{hoverData.value}</div>
            </div>
          </div>

          <div className="all-project__item box-2" style={{ marginTop: "20px" }}>
            <div className="all-project__icon">
              <CommonIcons name="all-projects" />
            </div>
            <div className="all-project__title">
              <div className="c-text-sec">All projects </div>
              <div>€{"4233300"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
