import React from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

import "./style.scss";

export const PieOne: React.FC = () => {
  const [value, setValue] = React.useState({
    name: "ETC",
    y: 15,
    color: "#FAFF00",
  });

  const options = {
    chart: {
      type: "pie",
      backgroundColor: "transparent",
      height: 205,
      margin: [20, 0, 0, 0],
    },

    title: {
      text: "",
      align: "left",
    },

    subtitle: {
      text: "",
      align: "left",
    },

    tooltip: {
      enabled: false,
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },

    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },

    plotOptions: {
      pie: {
        size: 150,
        cursor: "pointer",
        borderColor: "transparent",
        borderWidth: 0,
        dataLabels: {
          enabled: false,
        },
        point: {
          events: {
            mouseOver: function (event: React.MouseEvent) {
              const pointData = (event.target as any).options;

              setValue(pointData);
            },
          },
        },
      },
    },
    series: [
      {
        innerSize: "87%",
        borderRadius: 100,
        animation: {
          duration: 800,
        },
        colorByPoint: true,
        shadow: {
          color: "rgba(0, 0, 0, 0.25)",
          width: 10,
          opacity: 1,
          offsetX: 0,
          offsetY: 4,
        },
        data: [
          {
            name: "ETC",
            y: 15,
            color: "#FAFF00",
          },
          {
            name: "MATIC",
            y: 11,
            color: "#3EFAC7",
          },
          {
            name: "BTC",
            y: 11,
            color: "#8E5AE7",
          },
          {
            name: "AVAX",
            y: 13,
            color: "#FF55AB",
          },
          {
            name: "BNB",
            y: 20,
            color: "#FF6161",
          },
          {
            name: "OTHERS",
            y: 30,
            color: "#48D3FF",
          },
        ],
      },
    ],
    exporting: {
      buttons: {
        contextButton: {
          enabled: false,
        },
      },
    },
    rangeSelector: {
      enabled: false,
    },
    navigator: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
  };

  return (
    <div className="pie-one box">
      <h2>Token Allocation</h2>
      <div className="container-pie">
        <div className="chart">
          <HighchartsReact
            highcharts={Highcharts}
            constructorType={"stockChart"}
            options={options}
          />

          <div className="data-center">
            <div>{value.name}</div>
            <div>{value.y}%</div>
          </div>
        </div>

        <ul className="under-data">
          {options.series[0].data.map(({ name, y, color }, i) => {
            return (
              <li key={i} onMouseEnter={() => setValue({ name, y, color })}>
                <span style={{ background: color }} />
                {name} {y}%
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
