import React from "react";
import { useAppSelector } from "../../../../store";
import { useTimer } from "../../../../hooks";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

import "./style.scss";
import { themeChart } from "../theme";
import skeletonBar from "../../../../assets/svg/skeleton-bar.svg";

interface CandlestickAndBarProps {
  pointWidth: number;
  height?: number;
  yAxisShow?: boolean;
  xAxisShow?: boolean;
  margin?: Array<number | null>;
  numLinesOfLoading: number;
}

export const CandlestickAndBar: React.FC<CandlestickAndBarProps> = ({
  height,
  yAxisShow,
  xAxisShow,
  margin,
  pointWidth,
  numLinesOfLoading,
}) => {
  const theme = useAppSelector((state) => state.theme.theme);

  const loading = useTimer(1000);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetch("https://demo-live-data.highcharts.com/aapl-ohlcv.json")
      .then((res) => res.json())
      .then(
        (result) => setData(result),
        (error) => console.log(error)
      );
  }, []);

  const ohlc = [],
    volume = [],
    dataLength = data.length,
    // set the allowed units for data grouping
    groupingUnits = [
      [
        "week", // unit name
        [1], // allowed multiples
      ],
      ["month", [1, 2, 3, 4, 6]],
    ];

  for (let i = 0; i < dataLength; i += 1) {
    ohlc.push([
      data[i][0], // the date
      data[i][1], // open
      data[i][2], // high
      data[i][3], // low
      data[i][4], // close
    ]);

    const isUpCandle = data[i][4] > data[i][1]; // Check if close is higher than open

    volume.push({
      x: data[i][0], // the date
      y: data[i][5], // the volume
      color: isUpCandle ? "#00BC84" : "#FF6F6F", // Check if close is higher than open
    });
  }

  const options = {
    chart: {
      margin: margin?.length ? margin : [null, 45, null, null],
      height: height,
      backgroundColor: "transparent",
      events: {
        load: function () {
          // Calculate the desired zoom level based on your data
          const newMin = 1656328603700;
          const newMax = 1693451485274;

          // Set the initial zoom level
          //@ts-ignore
          this.xAxis[0].setExtremes(newMin, newMax);
        },
      },
    },

    yAxis: [
      {
        labels: {
          enabled: yAxisShow,
          align: "right",
          x: 50,
          format: "{value}0.00",
          style: {
            color: themeChart[theme]["titleColor"],
          },
        },
        gridLineColor: themeChart[theme]["borderColor"],
        title: {
          text: "",
        },
        height: "90%",
        lineWidth: 0,
        resize: {
          enabled: true,
        },
      },
      {
        labels: {
          enabled: false,
        },
        title: {
          text: "",
        },
        gridLineColor: themeChart[theme]["borderColor"],
        top: "90%",
        height: "10%",
        offset: 0,
        lineWidth: 0,
      },
    ],

    xAxis: [
      {
        lineWidth: 0,
        tickLength: 0,
        labels: {
          enabled: xAxisShow,
          style: {
            color: themeChart[theme]["titleColor"],
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
      crosshairs: {
        dashStyle: "solid",
        width: 0.5,
      },
    },

    series: [
      {
        type: "candlestick",
        name: "AAPL",
        data: ohlc,
        color: "#FF6F6F",
        upColor: "#00BC84",
        lineColor: "#FF6F6F",
        upLineColor: "#00BC84",
        pointWidth: pointWidth,
        dataGrouping: {
          units: groupingUnits,
        },
      },
      {
        type: "column",
        name: "Volume",
        data: volume,
        yAxis: 1,
        borderRadius: 0,
        color: "#FF6F6F",
        dataGrouping: {
          units: groupingUnits,
        },
        pointPadding: 0,
        groupPadding: 0.1,
      },
    ],

    scrollbar: {
      borderBackgroundColor: "transparent",
      trackBackgroundColor: "transparent",
      trackBorderColor: "red",
      trackBorderWidth: 0,
      trackBorderRadius: 2,
      barBorderRadius: 2,
      barBackgroundColor: themeChart[theme]["crosshairs"],
      buttonsEnabled: false,
      rifleColor: "transparent",
      height: 5,
      margin: 0,
    },

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 1024,
          },
          chartOptions: {
            series: [
              {
                pointWidth: 7,
              },
              {},
            ],
          },
        },
        {
          condition: {
            maxWidth: 768,
          },
          chartOptions: {
            series: [
              {
                pointWidth: 5,
              },
              {},
            ],
          },
        },
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            series: [
              {
                pointWidth: 3,
              },
              {},
            ],
          },
        },
      ],
    },
    exporting: {
      buttons: {
        contextButton: {
          enabled: false,
        },
      },
    },
    navigator: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    rangeSelector: {
      enabled: false,
    },
    title: {
      text: "",
    },
  };
  return (
    <>
      {loading ? (
        <div className="candlestick-and-bar-loading" style={{ height: `${height}px` }}>
          <ul>
            {[...new Array(numLinesOfLoading)].map((_, i) => (
              <li key={i}></li>
            ))}
          </ul>

          <div>
            <img src={skeletonBar} alt="Skeleton Bar" />
          </div>
        </div>
      ) : (
        <HighchartsReact highcharts={Highcharts} constructorType={"stockChart"} options={options} />
      )}
    </>
  );
};
