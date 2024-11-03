import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../store";
import { fetchHistoryPrice } from "../../../../../store/historyPriceSlice";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { themeChart } from "../../theme";

export const Chart: React.FC = () => {
  const { price: dataState, status } = useAppSelector((state) => state.historyPriceSlice);
  const dispatch = useAppDispatch();

  const theme = useAppSelector((state) => state.theme.theme);

  const newData = dataState.map((item) => [item[0], +item[4]]);

  const [data, setData] = useState<number[][]>([]);

  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchHistoryPrice());
      setData(newData);
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    setData(newData);
    //eslint-disable-next-line
  }, [status]);

  const options = {
    chart: {
      type: "areaspline",
      margin: [null, 0, null, null],
      alignTicks: false,
      height: 325,
      backgroundColor: "transparent",
    },

    title: {
      text: "",
    },

    yAxis: {
      tickInterval: 500,
      opposite: false,
      labels: {
        x: -25,
        enabled: true,
        format: "${value}",
        offset: 20,
        style: {
          fontFamily: "Poppins",
          color: themeChart[theme]["titleColor"],
          fontSize: 13,
        },
      },
      lineWidth: 0,
      gridLineWidth: 0,
      title: {
        text: "",
      },
    },

    xAxis: [
      {
        crosshair: false,
        lineWidth: 0,
        tickLength: 0,
        labels: {
          style: {
            fontFamily: "Poppins",
            color: themeChart[theme]["titleColor"],
            fontSize: 13,
          },
        },
      },
    ],

    series: [
      {
        name: "EUR",
        data: data,
        lineWidth: 2,
        color: {
          linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
          stops: themeChart[theme]["lineColor"],
        },
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
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
        marker: {
          symbol: "circle",
          radius: 2.5,
          fillColor: "#ffffff",
          lineColor: {
            linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 },
            stops: themeChart[theme]["lineColor"],
          },
          lineWidth: 2.5,
        },
        onPoint: {
          connectorOptions: {
            width: 0,
          },
        },
      },
    ],

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 480,
          },
          chartOptions: {
            chart: {
              margin: [null, 0, null, 55],
            },
            yAxis: {
              labels: {
                x: -10,
              },
            },
          },
        },
      ],
    },

    tooltip: {
      split: false,
      headerFormat: "",
      pointFormat: "<tr><td><b>{series.name}</b></td></tr>",
      footerFormat: "<tr><td><b> {point.y}</b></td>",
      padding: 12,
      backgroundColor: themeChart[theme]["tooltipBackgroundColor"],
      style: {
        color: themeChart[theme]["tooltipTextColor"][1],
        fontSize: 11,
      },
      valueDecimals: 0,
      shadow: false,
    },

    rangeSelector: {
      allButtonsEnabled: true,
      selected: 2,
      x: -13,
      inputEnabled: false,
      buttonPosition: {
        align: "right",
      },
      inputPosition: {
        align: "left",
      },
      buttonTheme: {
        height: 22,
        borderRadius: 1,
        fill: "none",
        stroke: "none",
        strokeWidth: 0,
        r: 2,
        style: {
          color: themeChart[theme]["titleColor"],
          fontFamily: "Poppins",
          textTransform: "uppercase",
          fontWeight: 400,
          fontSize: 11,
        },
        states: {
          hover: {
            fill: themeChart[theme]["bgSelector"],
            style: {
              color: "#fff",
            },
          },
          focus: {
            fill: "#73a8f837",
          },
          select: {
            fill: themeChart[theme]["bgSelector"],
            style: {
              color: "#fff",
              fontFamily: "Poppins",
              textTransform: "uppercase",
              fontWeight: 400,
            },
          },
        },
      },
    },

    navigator: {
      enabled: false,
    },

    credits: {
      enabled: false,
    },

    exporting: {
      buttons: {
        contextButton: {
          enabled: false,
        },
      },
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
      {data.length > 0 ? (
        <HighchartsReact highcharts={Highcharts} constructorType={"stockChart"} options={options} />
      ) : (
        <div className="chart-loading">
          <div className="loading" />
        </div>
      )}
    </div>
  );
};
