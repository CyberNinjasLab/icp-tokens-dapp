import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../store";
import { fetchHistoryPrice } from "../../../../../store/historyPriceSlice";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { themeChart } from "../../theme";

export const Area: React.FC = () => {
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
  }, []);

  useEffect(() => {
    setData(newData);
  }, [status]);

  const options = {
    chart: {
      margin: [20, 75, null, 25],
      alignTicks: false,
      height: 315,
      backgroundColor: "transparent",
    },

    yAxis: {
      tickInterval: 1000,
      opposite: true,
      labels: {
        x: 60,
        enabled: true,
        format: "${value}",
        offset: 0,
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

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            rangeSelector: {
              x: 200,
            },
          },
        },
      ],
    },

    series: [
      {
        type: "area",
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
      x: -95,
      selected: 4,
      buttonSpacing: 3,
      allButtonsEnabled: true,
      inputEnabled: false,
      verticalAlign: "top",
      buttonPosition: {
        align: "right",
      },
      inputPosition: {
        align: "left",
      },
      buttonTheme: {
        width: 36,
        height: 22,
        borderRadius: 1,
        fill: themeChart[theme]["tooltipBackgroundColor"],
        stroke: "none",
        strokeWidth: 1,
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
    title: {
      text: "",
    },
    navigator: {
      enabled: false,
    },
    credits: {
      enabled: false,
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
