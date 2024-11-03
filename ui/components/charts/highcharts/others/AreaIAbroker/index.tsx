import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useAppSelector } from "../../../../../store";
import { themeChart } from "../../theme";

export const AreaIAbroker = ({
  dataChart,
  legendEnabled = true,
  height,
}: {
  dataChart: any;
  legendEnabled?: boolean;
  height: number;
}) => {
  const theme = useAppSelector((state) => state.theme.theme);

  const dailyActiveUsers = dataChart[0];
  const fullyDilutedMarketCap = dataChart[1];

  const fillInNameBitcoin = (oldValue: string, valueNumY: number) => {
    if (dataChart.length === 4) {
      return oldValue;
    } else if (dataChart[4].length === 2 && valueNumY === 1) {
      return dataChart[4][0];
    } else if (dataChart[4].length === 2 && valueNumY === 2) {
      return dataChart[4][1];
    }

    return oldValue;
  };

  const options: Highcharts.Options = {
    chart: {
      backgroundColor: "transparent",
      height: height,
      style: {
        fontFamily: "Poppins",
        fontSize: "15",
      },
    },
    title: {
      text: "",
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      categories: dataChart[2],
      tickInterval: dataChart[3],
      tickWidth: 0,
      crosshair: {
        width: 1,
        color: "rgba(44, 64, 110, 1)",
        dashStyle: "ShortDot",
      },
      labels: {
        format: "{value}",
        style: {
          color: themeChart[theme]["titleColor"],
        },
      },
      lineWidth: 0,
    },
    yAxis: [
      {
        labels: {
          format: "${value}b",
          style: {
            color: themeChart[theme]["titleColor"],
          },
        },
        lineWidth: 0,
        gridLineWidth: 0,
        title: {
          text: "",
        },
      },
      {
        labels: {
          format: "{value}k",
          style: {
            color: themeChart[theme]["titleColor"],
          },
        },
        lineWidth: 0,
        gridLineWidth: 0,
        opposite: true,
        title: {
          text: "",
        },
      },
    ],
    tooltip: {
      shared: true,
      valueDecimals: 2,
      backgroundColor: "rgba(43, 121, 255, 0.4)",
      borderWidth: 1,
      borderColor: "#FEFEFE",
      borderRadius: 5,
      useHTML: true,
      style: {
        fontFamily: "Poppins",
        fontSize: "12",
        padding: "0",
        color: "#fff",
      },
      pointFormat: "{series.name}: <b>{point.y}</b><br/>",
    },
    legend: {
      enabled: legendEnabled,
      align: "left",
      itemHoverStyle: {
        color: themeChart[theme]["titleColor"],
        fontWeight: "500",
      },
      itemStyle: {
        color: themeChart[theme]["titleColor"],
        fontWeight: "normal",
      },
    },
    plotOptions: {
      series: {
        marker: {
          enabled: false,
          states: {
            hover: {
              enabled: true,
            },
          },
        },
      },
    },
    series: [
      {
        type: "area",
        name: fillInNameBitcoin("Fully diluted market cap", 1),
        data: fullyDilutedMarketCap,
        color: "#2B7AFF",
        gapSize: 5,
        tooltip: {
          valueDecimals: 2,
        },
        fillOpacity: 0.3,
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, "rgb(43, 122, 255, 0.3) "],
            [1, "rgba(43, 121, 255, 0)"],
          ],
        },
        threshold: null,
      },
      {
        type: "area",
        name: fillInNameBitcoin("Daily active users", 2),
        data: dailyActiveUsers,
        yAxis: 1,
        color: "#D663FF",
        gapSize: 5,
        tooltip: {
          valueDecimals: 2,
        },
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, "rgba(213, 99, 255, 0.3)"],
            [1, "rgba(213, 99, 255, 0)"],
          ],
        },
        threshold: null,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};
