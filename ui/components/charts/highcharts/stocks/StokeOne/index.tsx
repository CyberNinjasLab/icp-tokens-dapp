import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../../../../store";
import Highcharts from "highcharts/highstock";
import HighchartsReact, {
  HighchartsReactRefObject,
  HighchartsReactProps,
} from "highcharts-react-official";

import HighchartsIndicators from "highcharts/indicators/indicators-all";
import HighchartsAccessibility from "highcharts/modules/accessibility";
import HighchartsDragPanes from "highcharts/modules/drag-panes";
import HighchartsAnnotations from "highcharts/modules/annotations-advanced";
import HighchartsFullScreen from "highcharts/modules/full-screen";
import HighchartsStockTools from "highcharts/modules/stock-tools";
import HighchartsHeikinAshi from "highcharts/modules/heikinashi";
import HighchartsHollowCandlestick from "highcharts/modules/hollowcandlestick";

HighchartsAccessibility(Highcharts);
HighchartsDragPanes(Highcharts);
HighchartsIndicators(Highcharts);
HighchartsAnnotations(Highcharts);
HighchartsFullScreen(Highcharts);
HighchartsStockTools(Highcharts);
HighchartsHeikinAshi(Highcharts);
HighchartsHollowCandlestick(Highcharts);

import "./style.scss";

import { themeChart } from "../../theme";

const colorTemplate = "{#ge point.open point.close}#ff6e6e{else}#51af7b{/ge}";

export const StockOne: React.FC = (props: HighchartsReactProps) => {
  const theme = useAppSelector((state) => state.theme.theme);
  const chartComponentRef = useRef<HighchartsReactRefObject>(null);

  const [ohlc, setOhlc] = useState<number[][]>([]);
  const [volume, setVolume] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://demo-live-data.highcharts.com/aapl-ohlcv.json");
      const data = await response.json();

      const ohlcTemp = [];
      const volumeTemp = [];
      const dataLength = data.length;

      for (let i = 0; i < dataLength; i += 1) {
        ohlcTemp.push([
          data[i][0], // the date
          data[i][1], // open
          data[i][2], // high
          data[i][3], // low
          data[i][4], // close
        ]);

        volumeTemp.push([
          data[i][0], // the date
          data[i][5], // the volume
          data[i][1] < data[i][4] ? "highcharts-point-up" : "highcharts-point-down",
        ]);
      }

      setOhlc(ohlcTemp);
      setVolume(volumeTemp);
    };

    fetchData();
  }, []);

  const options: Highcharts.Options = {
    chart: {
      styledMode: false,
      height: 730,
      marginRight: 50,
      backgroundColor: "transparent",
      style: {
        fontFamily: "Poppins",
      },
    },

    lang: {
      accessibility: {
        defaultChartTitle: "AAPL Stock Price",
      },
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
      crosshair: {
        className: "highcharts-crosshair-custom",
      },
      lineWidth: 0,
      tickLength: 0,
      labels: {
        x: -10,
        style: {
          color: themeChart[theme]["titleColor"],
          fontSize: "13",
        },
      },
    },

    yAxis: [
      {
        title: {
          text: "",
        },
        crosshair: {
          snap: false,
          className: "highcharts-crosshair-custom",
          label: {
            enabled: true,
            format: "{value:.2f}",
          },
        },
        labels: {
          align: "left",
          style: {
            color: themeChart[theme]["titleColor"],
            fontSize: "13",
          },
        },
        height: "70%",
      },
      {
        title: {
          text: "volume",
        },
        crosshair: {
          className: "highcharts-crosshair-custom",
          snap: false,
          label: {
            format: "{#if value ge 1000000} {(divide value 1000000):.2f} M {else} {value} {/if}",
            enabled: true,
          },
        },
        labels: {
          align: "left",
          style: {
            color: themeChart[theme]["titleColor"],
            fontSize: "13",
          },
        },
        top: "70%",
        height: "30%",
        offset: 0,
      },
    ],

    tooltip: {
      split: false,
      shared: true,
      headerShape: "callout",
      shadow: false,
      format: `<span style="font-size: 1.4em">{point.series.name}</span></br>
      O <span style="color:${colorTemplate}";>{point.open}</span>
      H <span style="color:${colorTemplate}";>{point.high}</span>
      L <span style="color:${colorTemplate}";>{point.low}</span>
      C <span style="color:${colorTemplate}";>{point.close}
      {(subtract point.open point.close):.2f}
      {(multiply (divide (subtract point.open point.close) point.close) 100):.2f}%
      </span>
      <br>
      Volume: <span style="color:${colorTemplate}";>{points.1.y}</span>`,
      positioner: function () {
        return { x: 65, y: 5 };
      },

      style: {
        color: themeChart[theme]["tooltipTextColor"][1],
      },
    },

    series: [
      {
        type: "candlestick",
        id: "aapl-ohlc",
        name: "AAPL Stock Price",
        lastPrice: {
          enabled: true,
          label: {
            enabled: true,
            align: "left",
          },
        },
        data: ohlc,
      },
      {
        type: "column",
        lastPrice: {
          enabled: true,
          label: {
            format:
              "{#if value ge 1000000} " + "{(divide value 1000000):.2f} M {else} {value} {/if}",
            enabled: true,
            align: "left",
          },
        },
        keys: ["x", "y", "className"],
        id: "aapl-volume",
        name: "AAPL Volume",
        data: volume,
        yAxis: 1,
        borderRadius: 3,
      },
    ],

    rangeSelector: {
      selected: 1,
      buttonSpacing: 2,
      allButtonsEnabled: true,
      inputEnabled: true,
      verticalAlign: "bottom",
      buttonPosition: {
        align: "left",
      },
      inputPosition: {
        align: "right",
        x: 0,
      },
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

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 800,
          },
          chartOptions: {
            rangeSelector: {
              inputEnabled: false,
            },
          },
        },
      ],
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
      xAxis: {
        labels: {
          enabled: false,
        },
        gridLineColor: "red",
      },
      series: {
        type: "area",
        stacking: "normal",
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: themeChart[theme]["fillColor"],
        },
        color: {
          linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
          stops: themeChart[theme]["lineColor"],
        },
        lineWidth: 1,
        dataGrouping: {
          enabled: true,
          forced: true,
        },
      },
    },

    scrollbar: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
  };
  return (
    <div className="stoke-one">
      <figure className="highcharts-figure">
        <div
          id="container"
          className={`chart ${theme.startsWith("d") ? "highcharts-dark" : "highcharts-light"}`}
        >
          <HighchartsReact
            highcharts={Highcharts}
            constructorType={"stockChart"}
            key={theme}
            ref={chartComponentRef}
            options={options}
            {...props}
          />
        </div>
      </figure>
    </div>
  );
};
