import React, { useEffect, useRef, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useAppSelector } from "../../../../store";
import { themeChart } from "../../../../components/charts/highcharts/theme";

interface IDataChart {
  x: number;
  y: number;
}

const defaultData = "https://demo-live-data.highcharts.com/time-data.csv";

function parseCSV(text: string, divider = ",", passFirstStr = false) {
  return text
    .slice(passFirstStr ? text.indexOf("\n") + 1 : 0)
    .split("\n")
    .map((str: string) => str.split(divider))
    .slice(1);
}

const fetchNewData = async () => {
  try {
    const response = await fetch(defaultData);
    const text = await response.text();
    const parsedData = parseCSV(text);
    return parsedData.map((row: any) => ({
      x: new Date(row[0]).getTime(),
      y: parseFloat(row[1]),
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const LineDynamic: React.FC = () => {
  const theme = useAppSelector((state) => state.theme.theme);
  const [data, setData] = useState<IDataChart[]>([]);
  const [plotLines, setPlotLines] = useState<any[]>([
    {
      value: 1722420610725,
      width: 2,
      color: "transparent",
      zIndex: 2,
    },
  ]);

  const [options, setOptions] = useState<Highcharts.Options>({
    chart: {
      backgroundColor: "transparent",
      height: 400,
      events: {
        load() {
          const chart = this;
          const series = chart.series[0];

          if (data.length > 0) {
            series.setData(data, true, false);
          }
        },
      },
    },

    accessibility: {
      announceNewData: {
        enabled: true,
        announcementFormatter: function (allSeries, newSeries, newPoint) {
          if (newPoint) {
            return "New point added. Value: " + newPoint.y;
          }
          return false;
        },
      },
    },

    xAxis: {
      type: "datetime",
      tickPixelInterval: 100,
      maxPadding: 0.05,
      lineWidth: 0,
      tickLength: 0,
      labels: {
        style: {
          color: themeChart[theme]["titleColor"],
          fontSize: "13",
        },
      },
      plotLines: plotLines,
    },

    yAxis: {
      plotLines: [
        {
          value: 0,
          width: 2,
          color: themeChart[theme]["gridLineColor"],
        },
      ],
      gridLineColor: themeChart[theme]["gridLineColor"],
      labels: {
        style: {
          color: themeChart[theme]["titleColor"],
          fontSize: "13",
        },
      },
      opposite: true,
      title: {
        text: "",
      },
    },

    tooltip: {
      enabled: false,
    },

    series: [
      {
        type: "areaspline",
        data,
      },
    ],

    plotOptions: {
      areaspline: {
        lineWidth: 2,
        color: {
          linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
          stops: themeChart[theme]["lineColor"],
        },
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: themeChart[theme]["fillColor"],
        },
        threshold: null,
        marker: {
          enabled: false,
          symbol: "circle",
          radius: 2.5,
          fillColor: "#ffffff",
          lineColor: {
            linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 },
            stops: themeChart[theme]["lineColor"],
          },
          lineWidth: 2.5,
        },
      },
    },

    title: {
      text: "",
    },
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    exporting: {
      enabled: false,
    },
  });

  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const newData = await fetchNewData();
      setData(newData);
    };

    fetchData();
    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPlotLines((prevPlotLines) => [
        ...prevPlotLines,
        {
          value: Date.now() - 665303,
          width: 2,
          color: "transparent",
          zIndex: 5,
        },
      ]);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      xAxis: {
        ...prevOptions.xAxis,
        labels: {
          style: {
            color: themeChart[theme]["titleColor"],
            fontSize: "13",
          },
        },
        plotLines: plotLines,
      },
      yAxis: {
        ...prevOptions.yAxis,
        plotLines: [
          {
            value: 0,
            width: 2,
            color: themeChart[theme]["gridLineColor"],
          },
        ],
        gridLineColor: themeChart[theme]["gridLineColor"],
        labels: {
          style: {
            color: themeChart[theme]["titleColor"],
            fontSize: "13",
          },
        },
      },
      tooltip: {
        backgroundColor: themeChart[theme]["tooltipBackgroundColor"],
        style: {
          color: themeChart[theme]["tooltipTextColor"][1],
        },
      },
      series: [
        {
          type: "areaspline",
          data,
        },
      ],
      plotOptions: {
        areaspline: {
          lineWidth: 2,
          color: {
            linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
            stops: themeChart[theme]["lineColor"],
          },
          fillColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: themeChart[theme]["fillColor"],
          },
          threshold: null,
          marker: {
            enabled: false,
            symbol: "circle",
            radius: 2.5,
            fillColor: "#ffffff",
            lineColor: {
              linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 },
              stops: themeChart[theme]["lineColor"],
            },
            lineWidth: 2.5,
          },
        },
      },
    }));
  }, [theme, plotLines, data]);

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} ref={chartRef} />
    </div>
  );
};
