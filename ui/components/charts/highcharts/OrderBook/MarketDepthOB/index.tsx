import React from "react";
import { useTimer } from "../../../../../hooks";

import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

interface MarketDepthProps {
  color: string;
  data: number[];
}

export const MarketDepthOB: React.FC<MarketDepthProps> = ({ color, data }) => {
  const loading = useTimer(1000);
  const [dataState, setDataState] = React.useState([5, 5, 5, 5, 5, 5, 5, 5]);
  const [colorState, setColorState] = React.useState("#EBEFF5");

  React.useEffect(() => {
    if (!loading) {
      setDataState(data);
      setColorState(color);
    }
  }, [loading, color, data]);

  const options = {
    chart: {
      type: "bar",
      height: 183,
      margin: 0,
      backgroundColor: "transparent",
    },

    title: {
      text: "",
    },

    xAxis: {
      minPadding: 0,
      maxPadding: 0,
      lineWidth: 0,
      tickWidth: 0,
      labels: {
        enabled: false,
      },
      title: {
        text: "",
      },
    },

    yAxis: [
      {
        max: 100,
        reversed: true,
        lineWidth: 0,
        gridLineWidth: 0,
        title: null,
        tickWidth: 0,
        labels: {
          enabled: false,
        },
      },
    ],

    plotOptions: {
      area: {
        lineWidth: 0,
        step: "center",
      },
    },

    series: [
      {
        pointWidth: 22.1,
        borderWidth: 0,
        borderRadius: 6,
        name: "positive",
        data: dataState,
        color: colorState,
      },
    ],

    legend: {
      enabled: false,
    },

    tooltip: {
      enabled: false,
    },

    credits: {
      enabled: false,
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};
