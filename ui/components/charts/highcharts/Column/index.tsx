import React from "react";
import { useAppSelector } from "../../../../store";
import { useTimer } from "../../../../hooks";

import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

import "./style.scss";
import { themeChart } from "./theme";

export const Column: React.FC = () => {
  const theme = useAppSelector((state) => state.theme.theme);

  const loading = useTimer(1000);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetch("https://demo-live-data.highcharts.com/aapl-v.json")
      .then((res) => res.json())
      .then(
        (result) => setData(result),
        (error) => console.log(error)
      );
  }, []);

  const options = {
    chart: {
      alignTicks: false,
      height: 205,
      backgroundColor: "transparent",
    },

    yAxis: {
      labels: {
        enabled: false,
      },
      gridLineWidth: 0,
    },

    xAxis: [
      {
        lineWidth: 0,
        tickLength: 0,
        labels: {
          style: {
            color: themeChart[theme]["tooltipTextColor"][0],
          },
        },
      },
    ],

    tooltip: {
      split: true,
      style: {
        color: themeChart[theme]["tooltipTextColor"][1],
      },
      backgroundColor: themeChart[theme]["tooltipBackgroundColor"],
    },

    series: [
      {
        type: "column",
        name: "AAPL Stock Volume",
        data: data,
        color: {
          linearGradient: {
            x1: 0,
            x2: 0,
            y1: 0,
            y2: 1,
          },
          stops: themeChart[theme]["fillColor"],
        },
        dataGrouping: {
          units: [
            [
              "week", // unit name
              [1], // allowed multiples
            ],
            ["month", [1, 2, 3, 4, 6]],
          ],
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
    rangeSelector: {
      enabled: false,
    },
    title: {
      text: "",
    },
    navigator: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    scrollbar: {
      enabled: false,
      barBorderRadius: 2,
      buttonsEnabled: false,
      height: 5,
      margin: 0,
      rifleColor: "transparent",
      trackBackgroundColor: "transparent",
      barBackgroundColor: "#4791ff",
      trackBorderRadius: 2,
    },
  };

  return (
    <div id="container-column-chart">
      {loading ? (
        <div className="container-column-chart_loading">
          <ul className="list-1">
            {[...new Array(150)].map((_, i) => (
              <li key={i}></li>
            ))}
          </ul>

          <ul className="list-2">
            {[...new Array(5).fill("00:00")].map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      ) : (
        <HighchartsReact highcharts={Highcharts} constructorType={"stockChart"} options={options} />
      )}
    </div>
  );
};
