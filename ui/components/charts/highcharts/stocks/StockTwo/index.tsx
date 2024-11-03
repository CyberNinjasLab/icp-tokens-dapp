import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../../../../store";
import Highcharts from "highcharts/highstock";
import HighchartsReact, {
  HighchartsReactRefObject,
  HighchartsReactProps,
} from "highcharts-react-official";

import HighchartsIndicators from "highcharts/indicators/indicators";
import HighchartsAccessibility from "highcharts/modules/accessibility";
import HighchartsDragPanes from "highcharts/modules/drag-panes";
import HighchartsAnnotations from "highcharts/modules/annotations-advanced";
import HighchartsFullScreen from "highcharts/modules/full-screen";
import HighchartsStockTools from "highcharts/modules/stock-tools";
import HighchartsHeikinAshi from "highcharts/modules/heikinashi";
import HighchartsPriceIndicator from "highcharts/modules/price-indicator";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsIchimokuKinkoHyo from "highcharts/indicators/ichimoku-kinko-hyo";

HighchartsAccessibility(Highcharts);
HighchartsDragPanes(Highcharts);
HighchartsIndicators(Highcharts);
HighchartsAnnotations(Highcharts);
HighchartsFullScreen(Highcharts);
HighchartsStockTools(Highcharts);
HighchartsHeikinAshi(Highcharts);
HighchartsPriceIndicator(Highcharts);
HighchartsExporting(Highcharts);
HighchartsIchimokuKinkoHyo(Highcharts);

import "./style.scss";
import { themeChart } from "../../theme";

export const StockTwo: React.FC = (props: HighchartsReactProps) => {
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

      let previousCandleClose = 0;
      for (let i = 0; i < dataLength; i += 1) {
        ohlcTemp.push([
          data[i][0], // the date
          data[i][1], // open
          data[i][2], // high
          data[i][3], // low
          data[i][4], // close
        ]);

        volumeTemp.push({
          x: data[i][0], // the date
          y: data[i][5], // the volume
          color: data[i][4] > previousCandleClose ? "#4abb78" : "#ff4866",
          labelColor: data[i][4] > previousCandleClose ? "#51a958" : "#ea3d3d",
        });
        previousCandleClose = data[i][4];
      }

      setOhlc(ohlcTemp);
      setVolume(volumeTemp);
    };

    fetchData();
  }, []);

  const options: Highcharts.Options = {
    chart: {
      backgroundColor: "transparent",
      height: 600,
      marginRight: 50,
      style: {
        fontFamily: "Poppins",
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

    rangeSelector: {
      enabled: false,
    },

    navigator: {
      enabled: false,
    },

    title: {
      text: "",
    },

    plotOptions: {
      series: {
        marker: {
          enabled: false,
          states: {
            hover: {
              enabled: false,
            },
          },
        },
      },
      candlestick: {
        color: "#ea3d3d",
        upColor: "#51a958",
        upLineColor: "#51a958",
        lineColor: "#ea3d3d",
      },
    },

    yAxis: [
      {
        gridLineColor: themeChart[theme]["gridLineColor"],
        labels: {
          align: "left",
          style: {
            color: themeChart[theme]["titleColor"],
            fontSize: "13",
          },
        },
        height: "70%",
        crosshair: {
          snap: false,
        },
        accessibility: {
          description: "price",
        },
      },
      {
        gridLineColor: themeChart[theme]["gridLineColor"],
        labels: {
          align: "right",

          style: {
            color: themeChart[theme]["titleColor"],
            fontSize: "13",
          },
        },
        top: "70%",
        height: "30%",
        accessibility: {
          description: "volume",
        },
      },
    ],

    xAxis: {
      lineWidth: 0,
      tickLength: 0,
      labels: {
        style: {
          color: themeChart[theme]["titleColor"],
          fontSize: "13",
        },
      },
    },

    tooltip: {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      style: {
        color: "#cdcdc9",
      },
      shared: true,
      split: false,
      useHTML: true,
      shadow: false,
      positioner: function () {
        return { x: 50, y: 10 };
      },
    },

    series: [
      {
        type: "candlestick",
        id: "aapl",
        name: "AAPL Stock Price",
        data: ohlc,
        tooltip: {
          valueDecimals: 2,
          pointFormat:
            '<b>O</b> <span style="color: {point.color}">' +
            "{point.open} </span>" +
            '<b>H</b> <span style="color: {point.color}">' +
            "{point.high}</span><br/>" +
            '<b>L</b> <span style="color: {point.color}">{point.low} ' +
            "</span>" +
            '<b>C</b> <span style="color: {point.color}">' +
            "{point.close}</span><br/>",
        },
      },
      {
        type: "column",
        name: "Volume",
        data: volume,
        yAxis: 1,
        borderRadius: 0,
        groupPadding: 0.1,
        pointPadding: 0,
        tooltip: {
          pointFormat:
            '<b>Volume</b> <span style="color: ' + '{point.labelColor}">{point.y}</span><br/>',
        },
      },
      {
        type: "ikh",
        linkedTo: "aapl",
        tooltip: {
          pointFormat: `<br/>
                    <span style="color: #ffe6a1;">IKH</span>
                    <br/>
                    tenkan sen: <span
                    style="color:{series.options.tenkanLine.styles.lineColor}">
                    {point.tenkanSen:.3f}</span><br/>
                    kijun sen: <span
                    style="color:{series.options.kijunLine.styles.lineColor}">
                    {point.kijunSen:.3f}</span><br/>
                    chikou span: <span
                    style="color:{series.options.chikouLine.styles.lineColor}">
                    {point.chikouSpan:.3f}</span><br/>
                    senkou span A: <span
                    style="color:{series.options.senkouSpanA.styles.lineColor}">
                    {point.senkouSpanA:.3f}</span><br/>
                    senkou span B: <span
                    style="color:{series.options.senkouSpanB.styles.lineColor}">
                    {point.senkouSpanB:.3f}</span><br/>`,
        },
        tenkanLine: {
          styles: {
            lineColor: "#12dbd1",
          },
        },
        kijunLine: {
          styles: {
            lineColor: "#de70fa",
          },
        },
        chikouLine: {
          styles: {
            lineColor: "#728efd",
          },
        },
        senkouSpanA: {
          styles: {
            lineColor: "#2ad156",
          },
        },
        senkouSpanB: {
          styles: {
            lineColor: "#fca18d",
          },
        },
        senkouSpan: {
          color: "rgba(255, 255, 255, 0.3)",
          negativeColor: "rgba(237, 88, 71, 0.2)",
        },
      },
    ],
    scrollbar: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
  };

  return (
    <div className="stock-two">
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
    </div>
  );
};
