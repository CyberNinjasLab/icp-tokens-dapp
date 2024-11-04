import React from "react";

import Highcharts from "highcharts";
import variablePie from "highcharts/modules/variable-pie";
import HighchartsReact from "highcharts-react-official";

import "./style.scss";
import { useAppSelector } from "../../../../../store";
import { themeChart } from "../../theme";

variablePie(Highcharts);

const skeleton = true;

export const PieTwo: React.FC = () => {
  return (
    <div className="pie-two box">
      <h2>Gender ratio</h2>

      <div className="container">
        <div className="chart-polar-wrapper">
          <Pie />
        </div>

        <div className="ratio-panel-info__wrapper">
          <div className="ratio-panel-info box-2">
            <div className="ratio-panel-info__icon" style={{ background: "#FA544D" }}></div>
            <div className="ratio-panel-info__title">
              <div>Male</div>
              <div>{skeleton ? "2736" : "0"}</div>
            </div>
          </div>

          <div className="ratio-panel-info box-2">
            <div className="ratio-panel-info__icon"></div>

            <div className="ratio-panel-info__title">
              <div>Female</div>
              <div>{skeleton ? "947" : "0"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Pie = () => {
  const theme = useAppSelector((state) => state.theme.theme);

  const [value] = React.useState([
    {
      name: "Male",
      y: 2736,
      z: 2736,
    },
    {
      name: "Female",
      y: 947,
      z: 947,
    },
  ]);

  const options = {
    chart: {
      type: "variablepie",
      width: 115,
      height: 115,
      spacing: [0, 0, 0, 0],
      backgroundColor: "transparent",
      borderColor: themeChart[theme]["borderColor"],
      borderWidth: 1,
      borderRadius: 100,
    },
    title: {
      text: "",
      align: "left",
    },

    tooltip: {
      backgroundColor: themeChart[theme]["tooltipBackgroundColor"],
      headerFormat: "",
      pointFormat: `<b style='color:${themeChart[theme]["titleColor"]}'>{point.name}</b><br/> 
        <span style="color:{point.color}; margin-top: 10px;">&#9724;</span> Pie:<b style="color:${themeChart[theme]["titleColor"]}"> {point.y}</b>`,
      style: {
        color: "#9BAECA",
      },
    },
    plotOptions: {
      variablepie: {
        maxPointSize: 100,
        dataLabels: {
          enabled: false,
        },
      },
    },
    series: [
      {
        minPointSize: 18,
        innerSize: "16%",
        zMin: 0,
        name: "countries",
        borderRadius: 0,
        borderColor: themeChart[theme]["borderColor"],
        data: value,
        colors: [
          {
            linearGradient: {
              cx: 0.5,
              cy: 0.3,
              r: 0.7,
            },
            stops: themeChart[theme]["lineColor"],
          },
          "#FA544D",
        ],
        dataLabels: {
          enabled: false,
        },
      },
    ],
    exporting: {
      buttons: {
        contextButton: {
          enabled: false,
        },
      },
    },
    credits: {
      enabled: false,
    },
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};
