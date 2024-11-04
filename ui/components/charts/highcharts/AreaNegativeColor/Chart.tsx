import React from "react";
import { useAppSelector } from "../../../../store";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

import "./style.scss";

interface AreaSplineProps {
  dataLabels?: object;
  xLabels?: boolean;
  yLabels?: boolean;
  height?: number;
  data?: number[];
  margin?: Array<number | null>;
  selectTime?: string;
}

interface Data {
  area: number[][];
  volume: number[][];
}

interface themes {
  [key: string]: {
    tooltipBackgroundColor: string;
    titleColor: string;
    borderColor: string;
  };
}

const themeChart: themes = {
  "light-blue": {
    tooltipBackgroundColor: "#fff",
    titleColor: "#1B2559",
    borderColor: "rgb(247, 233, 233)",
  },
  "dark-blue": {
    tooltipBackgroundColor: "#151429",
    titleColor: "#FEFEFE",
    borderColor: "rgba(254, 254, 254, 0.05)",
  },
  "light-green": {
    tooltipBackgroundColor: "#fff",
    titleColor: "#1B2559",
    borderColor: "rgb(247, 233, 233)",
  },
  "dark-green": {
    tooltipBackgroundColor: "#151429",
    titleColor: "#FEFEFE",
    borderColor: "rgba(254, 254, 254, 0.05)",
  },
  "light-orange": {
    tooltipBackgroundColor: "#fff",
    titleColor: "#1B2559",
    borderColor: "rgb(247, 233, 233)",
  },
  "dark-orange": {
    tooltipBackgroundColor: "#151429",
    titleColor: "#FEFEFE",
    borderColor: "rgba(254, 254, 254, 0.05)",
  },
};

const sliceDate = [100, 250];

export const Chart: React.FC<AreaSplineProps> = ({ height, margin, selectTime }) => {
  const theme = useAppSelector((state) => state.theme.theme);
  const [data, setData] = React.useState<Data>({ area: [], volume: [] });

  const crosshairSet = {
    color: themeChart[theme]["borderColor"],
    dashStyle: "LongDash",
  };

  const styleLabel = {
    fontFamily: "Poppins",
    color: "rgb(155, 174, 202)",
    fontSize: 13,
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://demo-live-data.highcharts.com/aapl-v.json");
        const result = await response.json();
        const modified = result.map((item: number[]) => [
          item[0],
          +(item[1] / 10000000).toFixed(2),
        ]);

        setData({
          area: modified,
          volume: modified,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const options = {
    chart: {
      margin: margin?.length ? margin : null,
      style: styleLabel,
      backgroundColor: "transparent",
    },

    xAxis: {
      type: "datetime",
      crosshair: crosshairSet,
      labels: { style: styleLabel },
      tickWidth: 0,
      lineWidth: 0,
    },

    yAxis: [
      {
        crosshair: crosshairSet,
        tickInterval: 3,
        opposite: true,
        labels: {
          style: styleLabel,
          x: 8,
          align: "left",
          formatter: function (this: Highcharts.AxisLabelsFormatterContextObject) {
            return +this?.value + "%";
          },
        },
        height: "85%",
        gridLineWidth: 0.5,
        gridLineColor: themeChart[theme]["borderColor"],
        title: {
          text: "",
        },
        plotLines: [
          {
            ...crosshairSet,
            value: 7.5,
            width: 1,
            label: {
              useHTML: true,
              textAlign: "center",
              x: 15,
              y: 1,
              formatter() {
                return `<span>7,49%</span>`;
              },
            },
          },
        ],
      },
      {
        labels: {
          enabled: false,
        },
        top: "85%",
        height: "15%",
        offset: 0,
        title: {
          text: "",
        },
        gridLineColor: "transparent",
      },
    ],

    tooltip: {
      split: false,
      backgroundColor: themeChart[theme]["tooltipBackgroundColor"],
      shared: true,
      useHTML: true,
      headerFormat: '<table><tr><th colspan="2">{point.key}</th></tr>',
      pointFormat:
        '<tr><td style="color: rgb(178, 178, 217)"><span style="background: {series.color}; ">&nbsp;</span> {series.name} </td>' +
        '<td style="text-align: right">&nbsp;{point.y}%</td></tr>',
      footerFormat: "</table>",
      valueDecimals: 2,
      shadow: {
        color: "rgba(0, 0, 0, 0.1)",
        width: 15,
        opacity: 1,
        offsetX: 0,
        offsetY: 4,
      },
      style: {
        color: themeChart[theme]["titleColor"],
      },
    },

    series: [
      {
        type: "area",
        id: "aapl-ohlc",
        name: "Daily ROI:",
        data: data.area.slice(sliceDate[0], sliceDate[1]),
        color: "#25A50E",
        fillColor: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [0, "rgba(37, 165, 14, 0.5)"],
            [1, "rgba(255, 255, 255, 0)"],
          ],
        },
        negativeColor: "#EF4E4E",
        negativeFillColor: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [0, "rgb(255, 255, 255,0)"],
            [1, "rgba(239, 78, 78, 0.2)"],
          ],
        },
        lineWidth: 1,
        threshold: 7.5,
      },
      {
        type: "column",
        id: "aapl-volume",
        name: "Vol 24h:",
        data: data.volume.slice(sliceDate[0], sliceDate[1]),
        color: "rgb(11, 133, 255, 0.7)",
        yAxis: 1,
        borderRadius: 2,
        states: {
          hover: {
            color: "#73a8f89e",
            borderColor: themeChart[theme]["borderColor"],
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
    legend: {
      enabled: false,
    },
    title: {
      text: "",
    },
    scrollbar: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
  };

  return data.area.length === 0 ? (
    <div className="areas-spline-wrapper-loading" style={{ height: `${height}px` }}>
      loading...
    </div>
  ) : (
    <div className="areas-spline-wrapper">
      <HighchartsReact highcharts={Highcharts} constructorType={"stockChart"} options={options} />
    </div>
  );
};
