import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { fetchHistoryPrice } from "../../../../store/historyPriceSlice";
import { useTimer } from "../../../../hooks";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

import "./style.scss";
import { themeChart } from "./theme";

interface AreaSplineProps {
  dataLabels?: object;
  xLabels?: boolean;
  yLabels?: boolean;
  height?: number;
  data?: number[];
  margin?: Array<number | null>;
  selectTime: number | string;
}

export const AreaSpline: React.FC<AreaSplineProps> = ({ height, margin, selectTime }) => {
  const { price: data, status } = useAppSelector((state) => state.historyPriceSlice);
  const theme = useAppSelector((state) => state.theme.theme);
  const dispatch = useAppDispatch();
  const loading = useTimer(1000);

  const newData = data.map((item) => [item[0], +item[4]]);
  const [filterData, setFilterData] = useState(newData);

  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchHistoryPrice());
      setFilterData(newData);
    }
  }, []);

  useEffect(() => {
    const filteredData = newData.slice(366 - +selectTime, -1);
    setFilterData(filteredData);
  }, [selectTime, status]);

  const options = {
    chart: {
      margin: margin?.length ? margin : null,
      backgroundColor: "transparent",
      style: {
        fontFamily: "Poppins",
        fontSize: 15,
      },
    },
    xAxis: [
      {
        tickWidth: 0,
        labels: {
          style: {
            color: themeChart[theme]["titleColor"],
          },
        },
        lineWidth: 0,
      },
      {
        gridLineColor: themeChart[theme]["gridLineColor"],
        lineColor: themeChart[theme]["gridLineColor"],
      },
    ],

    yAxis: [
      {
        tickInterval: 500,
        labels: {
          x: 8,
          align: "left",
          style: {
            color: themeChart[theme]["titleColor"],
          },
          formatter: function (this: Highcharts.AxisLabelsFormatterContextObject) {
            return "$ " + +this?.value;
          },
        },
        height: "85%",
        gridLineWidth: 0.5,
        gridLineColor: themeChart[theme]["gridLineColor"],
      },
      {
        labels: {
          enabled: false,
        },
        top: "85%",
        height: "15%",
        offset: 0,
        gridLineColor: themeChart[theme]["gridLineColor"],
      },
    ],

    tooltip: {
      style: {
        color: themeChart[theme]["titleColor"],
      },
      backgroundColor: themeChart[theme]["tooltipBackgroundColor"],
    },

    series: [
      {
        type: "area",
        id: "aapl-ohlc",
        name: "Price",
        data: filterData,
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: themeChart[theme]["fillColor"],
        },
        color: {
          linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
          stops: themeChart[theme]["lineColor"],
        },
        lineWidth: 1.5,
      },
      {
        type: "column",
        id: "aapl-volume",
        name: "Volume",
        data: filterData,
        color: themeChart[theme]["barColor"],
        yAxis: 1,
        borderRadius: 3,
        groupPadding: -0.1,
        borderColor: themeChart[theme]["barBorderColor"],
        borderWidth: 1,
        states: {
          hover: {
            color: themeChart[theme]["hoverBarColor"],
            borderColor: "white",
          },
        },
      },
    ],
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

    rangeSelector: {
      allButtonsEnabled: true,
      selected: selectTime,
      buttons: [
        {
          type: "day",
          count: 8,
          text: "7d",
        },
        {
          type: "month",
          count: 1,
          text: "1m",
        },
        {
          type: "month",
          count: 3,
          text: "3m",
        },
        {
          type: "month",
          count: 6,
          text: "6m",
        },
        {
          type: "ytd",
          text: "YTD",
        },
        {
          type: "year",
          count: 1,
          text: "1y",
        },
        {
          type: "all",
          text: "All",
        },
      ],
      buttonPosition: {
        align: "right",
      },
      inputPosition: {
        align: "left",
      },
      buttonSpacing: 0,
      buttonTheme: {
        fill: "#F8FAFD",
        height: 32,
        width: 50,
        borderRadius: 0,
        stroke: "none",
        r: 2,
        style: {
          color: "#9BAECA",
          fontFamily: "Poppins",
          textTransform: "uppercase",
          fontWeight: 400,
          fontSize: 15,
        },
        states: {
          hover: {
            fill: "#73A8F8",
            style: {
              color: "#fff",
            },
          },
          focus: {
            fill: "rgba(253, 120, 19)",
          },
          select: {
            fill: "#73A8F8",
            style: {
              color: "#fff",
              fontFamily: "Poppins",
              textTransform: "uppercase",
              fontWeight: 400,
              fontSize: 15,
            },
          },
        },
      },
    },

    navigator: {
      height: 40,
      margin: 10,
      maskFill: themeChart[theme]["maskFillColor"],
      outlineWidth: 0,
      handles: {
        width: 12,
        height: 18,
        symbols: themeChart[theme]["iconNavigatorButtons"],
      },
      xAxis: {
        labels: {
          enabled: false,
        },
        gridLineColor: themeChart[theme]["gridLineColor"],
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
    exporting: {
      buttons: {
        contextButton: {
          enabled: false,
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

  return loading ? (
    <div className="areas-spline-wrapper-loading" style={{ height: `${height}px` }}>
      <ul>
        {[...new Array(5).fill("00:00")].map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  ) : (
    <div className="areas-spline-wrapper">
      <HighchartsReact
        key={theme}
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={options}
      />
    </div>
  );
};
