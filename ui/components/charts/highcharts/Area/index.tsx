import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { fetchHistoryPrice } from "../../../../store/historyPriceSlice";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { numWithCommas } from "../../../../utils";

import "./style.scss";
import { themeChart } from "../theme";

interface AreaProps {
  dataLabels?: object;
  xLabels?: boolean;
  yLabels?: boolean;
  height?: number;
  data?: number[];
  margin?: Array<number | null>;
  selectTime?: number | string;
  rangeSelector?: boolean;
}

export const Area: React.FC<AreaProps> = ({
  height,
  xLabels,
  yLabels,
  margin,
  rangeSelector = false,
  selectTime = 90,
}) => {
  const { price: data, status } = useAppSelector((state) => state.historyPriceSlice);
  const dispatch = useAppDispatch();

  const theme = useAppSelector((state) => state.theme.theme);

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

    if (rangeSelector) {
      setFilterData(newData);
    } else {
      setFilterData(filteredData);
    }
  }, [selectTime, status, theme]);

  const options = {
    chart: {
      margin: margin?.length ? margin : null,
      type: "areaspline",
      height: height,
      backgroundColor: "transparent",
      style: {
        fontFamily: "Poppins",
        fontSize: 15,
      },
    },

    xAxis: {
      tickWidth: 0,
      labels: {
        enabled: xLabels,
        style: {
          color: themeChart[theme]["titleColor"],
        },
      },
      lineWidth: 0,
    },

    yAxis: {
      labels: {
        enabled: yLabels,
        formatter: function (this: Highcharts.AxisLabelsFormatterContextObject) {
          return `$${numWithCommas(Number(this.value))}`;
        },
        style: {
          color: themeChart[theme]["titleColor"],
        },
      },
      lineWidth: 0,
      gridLineWidth: 0,
      opposite: false,
      title: {
        text: "",
      },
    },

    tooltip: {
      split: false,
      valueDecimals: 0,
      padding: 5,
      borderWidth: 0,
      borderRadius: 8,
      backgroundColor: themeChart[theme]["tooltipBackgroundColor"],
      shadow: false,
      fontSize: 16,
      distance: 20,
      useHTML: true,
      formatter: function (this: Highcharts.TooltipFormatterContextObject) {
        const amount = numWithCommas(Number(this.y));
        let percent = "";
        let date = "";

        if (this.y !== undefined && this.y !== null) {
          percent = Number(this.y / 1000).toFixed(2);
        }

        if (this.x !== undefined) {
          date = Highcharts.dateFormat("%e-%b-%Y", +new Date(this.x));
        }

        return (
          `<div style='box-shadow:  5px 20px 40px ${themeChart[theme]["tooltipBackgroundColor"]}'>` +
          "<table>" +
          `<tr><td style="color: ${themeChart[theme]["tooltipTextColor"][0]};">` +
          this.series.name +
          "</td></tr>" +
          `<span style="color: #00BC84;">${date}</span>` +
          `<tr><td style="color: ${themeChart[theme]["tooltipTextColor"][1]}; ">$` +
          amount +
          "</td>" +
          '<td style="color: #00BC84; padding: 5px 0 0 5px;">+' +
          percent +
          "%</td></tr>" +
          "</table>" +
          "</div>"
        );
      },
      crosshairs: {
        dashStyle: "solid",
        width: 1.5,
        color: themeChart[theme]["crosshairs"],
      },
    },

    series: {
      name: "Area Chart",
      data: filterData,
      gapSize: 5,
      lineWidth: 1.5,
      fillOpacity: 0.3,
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
      threshold: null,
      pointPlacement: "on",
    },
    exporting: {
      buttons: {
        contextButton: {
          enabled: false,
        },
      },
    },
    rangeSelector: {
      enabled: rangeSelector,
      x: -20,
      selected: 4,
      buttonSpacing: 2,
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
        width: 28,
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
          fontWeight: 400,
          fontSize: 12,
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
    title: {
      text: "",
    },
    navigator: {
      enabled: false,
    },
    scrollbar: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
  };

  return status === "resolved" ? (
    <HighchartsReact
      key={theme}
      highcharts={Highcharts}
      constructorType={"stockChart"}
      options={options}
    />
  ) : (
    <div className="area-wrapper" style={{ height: `${height}px` }}>
      <ul>
        {[...new Array(5).fill("00:00")].map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
