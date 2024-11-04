import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store";
import Highcharts from "highcharts/highstock";
import HighchartsReact, {
  HighchartsReactRefObject,
  HighchartsReactProps,
} from "highcharts-react-official";
import HighchartsAccessibility from "highcharts/modules/accessibility";
import HighchartsExportData from "highcharts/modules/export-data";
import HighchartsTreeMap from "highcharts/modules/treemap";
import HighchartsHeatMap from "highcharts/modules/heatmap";
import HighchartsExporting from "highcharts/modules/exporting";

import "./style.scss";
import { getGradientColor, mapPercentageToNumber } from "./helpers";
import { fetchTopPrice } from "../../../../store/topListPrices";
import { numWithCommas } from "../../../../utils";
import { themeChart } from "../theme";
import { Loading, NavSelect } from "../../../../common";
import { dataStatic } from "./data";

HighchartsAccessibility(Highcharts);
HighchartsHeatMap(Highcharts);
HighchartsTreeMap(Highcharts);
HighchartsExportData(Highcharts);
HighchartsExporting(Highcharts);

declare module "highcharts" {
  interface Point {
    price?: number;
    priceChange?: number;
  }
}

interface IDataProps {
  name: string;
  value: number;
  price: string;
  colorValue: number;
  priceChange: number;
  color:
    | string
    | {
        linearGradient: {
          x1: number;
          x2: number;
          y1: number;
          y2: number;
        };
        stops: (string | number | null)[][];
      };
}

const buttons = [
  { title: "1h", value: "1h" },
  { title: "24h", value: "24h" },
  { title: "7d", value: "7d" },
  { title: "30d", value: "30d" },
  { title: "60d", value: "60d" },
  { title: "90d", value: "90d" },
];

export const TreeMap = () => {
  const { prices, status } = useAppSelector((state) => state.topListPrices);
  const theme = useAppSelector((state) => state.theme.theme);
  const dispatch = useAppDispatch();
  const [priceChangingTime, setPriceChangingTime] = useState(buttons[1].value);

  const handleNavSelect = (value: string) => {
    setPriceChangingTime(value);
  };

  useEffect(() => {
    if (prices.length === 0) {
      dispatch(fetchTopPrice());
    }
  }, []);

  const dataChart: IDataProps[] = prices.map(({ symbol, quote }, index) => ({
    name: symbol,
    value: 100 / (index + 1),
    price: numWithCommas(quote.USD.price.toFixed(2)),
    colorValue: prices.length - index,
    priceChange: Number(quote.USD[`percent_change_${priceChangingTime}`].toFixed(3)),
    color: "",
  }));

  const posMinColor = ["#4bda87", "#1bac57"];
  const posMaxColor = ["#13aa52", "#00662b"];
  const negMinColor = ["#fa829a", "#dd1d4d"];
  const negMaxColor = ["#fb2056", "#870223"];

  dataChart.forEach(function (point) {
    if (point.priceChange < 0) {
      point.color = {
        linearGradient: { x1: 0, x2: 1, y1: 0, y2: 1 },
        stops: [
          [
            0,
            getGradientColor(
              posMinColor[0],
              posMaxColor[0],
              mapPercentageToNumber(point.priceChange)
            ),
          ],
          [
            1,
            getGradientColor(
              posMinColor[1],
              posMaxColor[1],
              mapPercentageToNumber(point.priceChange)
            ),
          ],
        ],
      };
    } else if (point.priceChange > 0) {
      point.color = {
        linearGradient: { x1: 0, x2: 1, y1: 0, y2: 1 },
        stops: [
          [
            0,
            getGradientColor(
              negMinColor[0],
              negMaxColor[0],
              mapPercentageToNumber(point.priceChange)
            ),
          ],
          [
            1,
            getGradientColor(
              negMinColor[1],
              negMaxColor[1],
              mapPercentageToNumber(point.priceChange)
            ),
          ],
        ],
      };
    } else {
      point.color = {
        linearGradient: { x1: 0, x2: 1, y1: 0, y2: 1 },
        stops: [
          [0, "#576c75"],
          [1, "#253237"],
        ],
      };
    }
  });

  const options: Highcharts.Options = {
    chart: {
      backgroundColor: "transparent",
      margin: [0, 0, 0, 0],
    },
    colorAxis: {
      minColor: "#fdb7bf",
      maxColor: "#F4364C",
    },
    exporting: {
      buttons: {
        contextButton: {
          theme: {
            fill: themeChart[theme]["tooltipBackgroundColor"],
          },
        },
      },
    },
    series: [
      {
        type: "treemap",
        layoutAlgorithm: "squarified",
        clip: false,
        cursor: "pointer",
        borderWidth: 2,
        borderColor: themeChart[theme]["tooltipBackgroundColor"],
        //@ts-ignore
        data: dataChart,
        dataLabels: {
          allowOverlap: false,
          useHTML: true,
          style: {},
          formatter: function () {
            if (this.point.shapeArgs) {
              return (
                '<div class="main-label"> <div class="main-label__title" style="font-size:' +
                this.point.shapeArgs.height / 8 +
                'px">' +
                this.key +
                '</div><div class="main-label__value" style="font-size:' +
                this.point.shapeArgs.height / 12 +
                'px">  ' +
                this.point.price +
                "</div></div>"
              );
            }
          },
        },
        states: {
          hover: {
            borderColor: undefined,
            brightness: -0.078,
          },
        },
      },
    ],
    tooltip: {
      backgroundColor: "rgba(0,0,0,0)",
      shadow: false,
      borderWidth: 0,
      useHTML: true,
      style: {
        zIndex: 100,
      },
      formatter: function (this: Highcharts.TooltipFormatterContextObject) {
        const point = this.point as Highcharts.Point & {
          price?: number;
          priceChange?: number;
          color?: {
            linearGradient: {
              x1: number;
              x2: number;
              y1: number;
              y2: number;
            };
            stops: (string | number | null)[][];
          };
        };

        return (
          "" +
          '<p style="color:#9ab;font-family:DobloxSans,sans-serif;border-radius:3px;font-size:11px;text-align:left;margin:0;padding:10px;border:2px solid yellow;background:linear-gradient(to bottom, ' +
          point.color?.stops[0][1] +
          ", " +
          point.color?.stops[1][1] +
          ')">' +
          '<strong style="color:#fff;font-weight:normal;font-size:14px;">' +
          point.name +
          "<br> Price: " +
          (point.price !== undefined ? point.price : "N/A") +
          "<br> Price Change " +
          priceChangingTime +
          ": " +
          (point.priceChange !== undefined ? point.priceChange : "N/A") +
          "%" +
          "</strong></p>"
        );
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
  };

  return (
    <div className="container">
      {status === "loading" ? (
        <div style={{ display: "flex", alignItems: "center", height: "400px" }}>
          <Loading />
          <h3>First loading takes more time than usual...</h3>
        </div>
      ) : (
        <>
          <NavSelect data={buttons} handleSelect={handleNavSelect} defaultValue={1} />
          <div style={{ marginTop: 20 }}>
            <HighchartsReact highcharts={Highcharts} options={options} />
          </div>
        </>
      )}
    </div>
  );
};
