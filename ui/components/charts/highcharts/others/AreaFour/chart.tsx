import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../store";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { fetchHistoryPrice } from "../../../../../store/historyPriceSlice";
import { themeChart } from "../../theme";

export const Area: React.FC<{ selectTime?: number | string }> = ({ selectTime = 90 }) => {
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
    setFilterData(filteredData);
  }, [selectTime, status]);

  const options = {
    chart: {
      margin: [25, 0, null, 0],
      alignTicks: false,
      height: 425,
      backgroundColor: "transparent",
    },

    title: {
      text: "",
    },

    yAxis: {
      tickInterval: 500,
      opposite: true,
      labels: {
        enabled: false,
        x: 60,
        format: "${value}",
        offset: 0,
        style: {
          fontFamily: "Poppins",
          color: themeChart[theme]["titleColor"],
          fontSize: 13,
        },
      },
      lineWidth: 0,
      gridLineWidth: 0,
      title: {
        text: "",
      },
    },

    xAxis: [
      {
        crosshair: false,
        lineWidth: 0,
        tickLength: 0,
        labels: {
          style: {
            fontFamily: "Poppins",
            color: themeChart[theme]["titleColor"],
            fontSize: 13,
          },
        },
      },
    ],

    series: [
      {
        type: "areaspline",
        name: "EUR",
        data: filterData,
        lineWidth: 2.5,
        fillColor: "transparent",
        color: {
          linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
          stops: themeChart[theme]["lineColor"],
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
        marker: {
          symbol: "circle",
          radius: 2.5,
          fillColor: "#ffffff",
          lineColor: {
            linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 },
            stops: themeChart[theme]["lineColor"],
          },
          lineWidth: 2.5,
        },
        onPoint: {
          connectorOptions: {
            width: 0,
          },
        },
      },
    ],

    tooltip: {
      split: false,
      headerFormat: "",
      pointFormat: "<tr><td><b>{series.name}</b></td></tr>",
      footerFormat: "<tr><td><b> {point.y}</b></td>",
      padding: 12,
      backgroundColor: themeChart[theme]["tooltipBackgroundColor"],
      style: {
        color: themeChart[theme]["tooltipTextColor"][1],
        fontSize: 11,
      },
      valueDecimals: 0,
      shadow: false,
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
    scrollbar: {
      enabled: false,
      barBorderRadius: 2,
      buttonsEnabled: false,
      height: 5,
      margin: 0,
      rifleColor: "transparent",
      trackBackgroundColor: "transparent",
      barBackgroundColor: "#4791ff",
      trackBorderRadius: 2,
    },
  };

  return (
    <div id="container-column-chart">
      {data.length > 0 ? (
        <HighchartsReact highcharts={Highcharts} constructorType={"stockChart"} options={options} />
      ) : (
        <div className="chart-loading">
          <div className="loading" />
        </div>
      )}
    </div>
  );
};
