import { useEffect, useRef, useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import HighchartsIndicators from "highcharts/indicators/indicators";
import HighchartsAccessibility from "highcharts/modules/accessibility";
import HighchartsExporting from "highcharts/modules/exporting";

import { useAppSelector } from "../../../../../store";
import { themeChart } from "../../theme";
import { data } from "./data";

import "./style.scss";

HighchartsExporting(Highcharts);
HighchartsIndicators(Highcharts);
HighchartsAccessibility(Highcharts);

type SeriesOptionsTypeWithData = {
  data: [number[]];
} & Highcharts.SeriesOptionsType;

const color = "#FF7F7F";
const colorUp = "#7acf7a";

export const StockDynamic = () => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const theme = useAppSelector((state) => state.theme.theme);

  const pointValueRef = useRef({ pointValue: false });

  const [options] = useState({
    chart: {
      backgroundColor: "transparent",
      height: 400,
    },

    exporting: {
      buttons: {
        contextButton: {
          theme: {
            fill: "transparent",
          },
        },
      },
    },

    xAxis: {
      gridLineColor: themeChart[theme]["gridLineColor"],
      overscroll: 500000,
      range: 4 * 200000,
      gridLineWidth: 1,
      lineWidth: 0,
      tickLength: 0,
      labels: {
        style: {
          color: themeChart[theme]["titleColor"],
          fontSize: "13",
        },
      },
    },

    yAxis: {
      gridLineColor: themeChart[theme]["gridLineColor"],
      labels: {
        style: {
          color: themeChart[theme]["titleColor"],
          fontSize: "13",
        },
      },
    },

    rangeSelector: {
      buttons: [
        { type: "minute", count: 15, text: "15m" },
        { type: "hour", count: 1, text: "1h" },
        { type: "all", count: 1, text: "All" },
      ],
      selected: 1,
      buttonSpacing: 2,
      allButtonsEnabled: true,
      inputEnabled: false,
      verticalAlign: "top",
      buttonTheme: {
        width: 34,
        height: 24,
        borderRadius: 1,
        fill: "transparent",
        stroke: "none",
        strokeWidth: 1,
        r: 4,
        style: {
          color: themeChart[theme]["titleColor"],
          fontFamily: "Poppins",
          textTransform: "uppercase",
          fontWeight: "400",
          fontSize: "13",
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
      height: 40,
      margin: 10,
      outlineWidth: 0,
      maskFill: themeChart[theme]["maskFillColor"],
      handles: {
        width: 11,
        height: 16,
        borderRadius: 6,
        symbols: themeChart[theme]["iconNavigatorButtons"],
      },
      maskInside: false,
      series: {
        type: "candlestick",
        dataGrouping: {
          approximation: "ohlc",
          units: [["minute", [30]]],
        },
      },
      xAxis: {
        gridLineWidth: 0,
        labels: {
          style: {
            color: "#c5c7c9",
            opacity: 1,
            textOutline: "0",
          },
        },
      },
    },

    series: [
      {
        type: "candlestick",
        color: color,
        upColor: colorUp,
        lineColor: color,
        upLineColor: colorUp,
        lastPrice: {
          enabled: true,
          color: color,
          label: {
            enabled: true,
            backgroundColor: color,
          },
        },
        data: data,
      },
    ],

    title: {
      text: "",
    },
    scrollbar: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
  });

  function getNewPoint(i: number, data: number[][]) {
    const lastPoint = data[data.length - 1];

    if (i === 0 || i % 10 === 0) {
      return [lastPoint[0] + 60000, lastPoint[4], lastPoint[4], lastPoint[4], lastPoint[4]];
    }

    const updatedLastPoint = data[data.length - 1],
      newClose = Highcharts.correctFloat(
        lastPoint[4] + Highcharts.correctFloat(Math.random() - 0.5, 2),
        4
      );
    pointValueRef.current.pointValue = updatedLastPoint[4] > newClose;

    return [
      updatedLastPoint[0],
      data[data.length - 2][4],
      newClose >= updatedLastPoint[2] ? newClose : updatedLastPoint[2],
      newClose <= updatedLastPoint[3] ? newClose : updatedLastPoint[3],
      newClose,
    ];
  }

  useEffect(() => {
    if (chartComponentRef.current) {
      const series = chartComponentRef.current.chart.series[0];

      let i = 0;

      const updateInterval = setInterval(() => {
        const options = series.options as SeriesOptionsTypeWithData;
        const data = options?.data || [];

        const newPoint = getNewPoint(i, data);
        const lastPoint = data[data.length - 1];
        const colorLabel = pointValueRef.current.pointValue ? color : colorUp;

        if (lastPoint[0] !== newPoint[0]) {
          series.addPoint(newPoint);
        } else {
          data[data.length - 1] = newPoint;
          series.setData(data);

          series.update({
            lastPrice: {
              color: colorLabel,
              label: {
                backgroundColor: colorLabel,
              },
            },
          } as SeriesOptionsTypeWithData);
        }

        i++;
      }, 333);

      return () => {
        clearInterval(updateInterval);
      };
    }
  }, []);

  useEffect(() => {
    if (chartComponentRef.current) {
      chartComponentRef.current.chart.update({
        xAxis: {
          gridLineColor: themeChart[theme]["gridLineColor"],
          labels: {
            style: {
              color: themeChart[theme]["titleColor"],
            },
          },
        },
        yAxis: {
          gridLineColor: themeChart[theme]["gridLineColor"],
          labels: {
            style: {
              color: themeChart[theme]["titleColor"],
            },
          },
        },
        rangeSelector: {
          buttonTheme: {
            style: {
              color: themeChart[theme]["titleColor"],
            },
            states: {
              hover: {
                fill: themeChart[theme]["bgSelector"],
                style: {
                  color: "#fff",
                },
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
          maskFill: themeChart[theme]["maskFillColor"],
        },
      });
    }
  }, [theme]);

  return (
    <div className="stock-dynamic ">
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={options}
        ref={chartComponentRef}
      />
    </div>
  );
};
