//@ts-nocheck
import React from "react";

import { useAppSelector } from "../../../../../../store";
import { Line } from "react-chartjs-2";
import gradient from "chartjs-plugin-gradient";
import "chartjs-adapter-date-fns";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  TimeScale,
} from "chart.js";

import data from "./data.json";
import { dates } from "./dataCurrently";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  gradient,
  Filler,
  TimeScale
);

export default function Chart({ stocks, dateRangeProps }) {
  const themeState = useAppSelector((state) => state.theme.theme);
  const theme = !themeState.startsWith("d");

  const [dateRange, setDateRange] = React.useState([]);
  const [size, setSize] = React.useState(0);
  const [min, setMinValue] = React.useState(null);
  const [avg, setAvgValue] = React.useState(null);
  const [max, setMaxValue] = React.useState(null);
  const [position, setPosition] = React.useState([]);
  const [graphicData, setGraphicData] = React.useState({
    labels: [],
    datasets: [],
  });

  React.useEffect(() => {
    const a = dates.findIndex((a) => a === dateRangeProps[0]) + 1;
    const b = dates.findIndex((a) => a === dateRangeProps[1]) + 2;
    setDateRange([a, b]);
    if (b == -1 || a == -1) {
      setSize(0);
    } else {
      setSize(b - a);
    }
  }, [dateRangeProps]);

  const options = {
    maintainAspectRatio: false,
    devicePixelRatio: 1.1,
    animation: {
      duration: 250,
    },
    scales: {
      y: {
        min: min + min * 0.2,
        max: max + max * 0.2,
        beginAtZero: true,
        grid: {
          display: true,
        },
        ticks: {
          display: false,
        },
      },
      x: {
        type: "time",
        scaleLabel: {
          display: true,
          labelString: "Date",
        },
        grid: {
          display: false,
        },
        ticks: {
          color: "#55557E",
          family: "Montserrat",
          font: {
            font: "10px",
            weight: "Regular",
          },
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      gradient,
      tooltip: {
        callbacks: {
          title: function (e) {
            return e[0].dataset.label;
          },
          label: function (e) {
            return e.formattedValue + "%";
          },
        },
      },
      title: {
        display: false,
      },
    },
  };

  const chartRef = React.useRef(null);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const positions = [];
      chartRef.current._metasets.map((metaset) => {
        if (metaset.data.length > 0) {
          positions.push({
            x: metaset.data.slice(-1)[0].x || metaset.data.slice(-2)[0].x,
            y: metaset.data.slice(-1)[0].y || metaset.data.slice(-2)[0].y,
            name: metaset._dataset.label,
          });
        }
      });
      setPosition(positions);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const setMin = () => {
    const activeStocks = stocks.filter((s) => s.active);
    let newDatasets = data.stocks.filter(
      (a) => activeStocks.findIndex((b) => b.name == a.name) > -1
    );
    let min = Infinity;
    newDatasets.map((d) =>
      d.data.slice(dateRange[0], dateRange[1]).map((el) => (min = el < min ? el : min))
    );

    setMinValue(min);

    const minDataset = {
      label: "guide min",
      data: new Array(size).fill(min),
      borderColor: theme ? "#00003E" : "#FFD45D",
      borderDash: [10, 10],
      fill: false,
      pointRadius: 0,
      borderWidth: 0.5,
    };

    setGraphicData((state) => {
      return {
        ...state,
        datasets: [...state.datasets, minDataset],
      };
    });
  };

  const setAvg = () => {
    const activeStocks = stocks.filter((s) => s.active);
    let newDatasets = data.stocks.filter(
      (a) => activeStocks.findIndex((b) => b.name == a.name) > -1
    );
    let sum = 0;
    let count = 0;
    newDatasets.map((d) =>
      d.data.slice(dateRange[0], dateRange[1]).map((el) => {
        sum += el;
        count++;
      })
    );

    setAvgValue(sum / count);

    const avgDataset = {
      label: "guide avg",
      data: new Array(size).fill(sum / count),
      borderDash: [10, 10],
      fill: false,
      pointRadius: 0,
      borderWidth: 0.5,
      borderColor: theme ? "#00003E" : "#FFD45D",
    };

    setGraphicData((state) => {
      return {
        ...state,
        datasets: [...state.datasets, avgDataset],
      };
    });
  };

  const setMax = () => {
    let max = -Infinity;

    const activeStocks = stocks.filter((s) => s.active);
    let newDatasets = data.stocks.filter(
      (a) => activeStocks.findIndex((b) => b.name == a.name) > -1
    );

    newDatasets.map((d) =>
      d.data.slice(dateRange[0], dateRange[1]).map((el) => (max = el > max ? el : max))
    );

    setMaxValue(max);

    const maxDataset = {
      label: "guide max",
      data: new Array(size).fill(max),
      borderColor: theme ? "#00003E" : "#FFD45D",
      borderDash: [10, 10],
      fill: false,
      pointRadius: 0,
      borderWidth: 1,
    };

    setGraphicData((state) => {
      return {
        ...state,
        datasets: [...state.datasets, maxDataset],
      };
    });
  };

  React.useEffect(() => {
    if (dateRange[0] > 1 && dateRange[1] > 1) {
      const activeStocks = stocks.filter((s) => s.active);
      let newDatasets = data.stocks.filter(
        (a) => activeStocks.findIndex((b) => b.name == a.name) > -1
      );

      const newData = {
        labels: dates.slice(dateRange[0], dateRange[1]),
        datasets: newDatasets.map((dataset, i) => {
          return {
            label: dataset.name,
            data: dataset.data.slice(dateRange[0], dateRange[1]),
            gradient: {
              backgroundColor: {
                axis: "y",
                colors: {
                  [Math.max(
                    ...dataset.data.slice(dateRange[0], dateRange[1])
                  )]: `${dataset.color}77`,
                  [Math.min(...dataset.data.slice(dateRange[0], dateRange[1]))]:
                    "rgba(255,255,255,0.01)",
                },
              },
            },
            tension: 0,
            fill: "start",
            pointRadius: 0.1,
            borderColor: dataset.color,
            borderWidth: 1,
          };
        }),
      };
      setGraphicData((state) => {
        return {
          ...newData,
        };
      });

      setMin();
      setMax();
      setAvg();
    }
    // eslint-disable-next-line
  }, [size, stocks, max, min, dateRange, dateRangeProps, themeState]);

  return (
    <>
      <Line
        ref={chartRef}
        options={options}
        data={graphicData}
        style={{ height: "500px", width: "100%" }}
      />

      {graphicData.datasets.map((el, index) => {
        // render labels
        const idx = position.findIndex((a) => a.name == el.label);
        const price = el.data.slice(-1)[0];
        if (el.label.indexOf("guide") < 0 && el.label !== "guide zero" && idx > -1) {
          return (
            <div key={index}>
              <div
                className="pos-arrow"
                style={{
                  left: position[idx].x - 6,
                  top: position[idx].y - 10.4,
                  borderRight: `8px solid ${el.borderColor}`,
                }}
              ></div>
              <div
                className="pos"
                style={{
                  position: "absolute",
                  left: position[idx].x + 9,
                  top: position[idx].y - 9,
                  backgroundColor: el.borderColor,
                  borderColor: el.borderColor,
                }}
              >
                {`${price.toFixed(2)}%`}
              </div>
            </div>
          );
        }
        return null;
      })}

      {dateRange.length > 0 &&
        graphicData.datasets
          .filter((a) => a.label.indexOf("guide") > -1)
          .map((el, index) => {
            const idx = position.findIndex((pos) => pos.name === el.label);
            if (
              el.label !== "guide zero" &&
              idx > -1 &&
              el.data[0] != Infinity &&
              el.data[0] != -Infinity &&
              !isNaN(el.data[0])
            ) {
              let title;
              if (el.data[0] === avg) {
                title = "AVG";
              } else if (el.data[0] === min) {
                title = "MIN";
              } else {
                title = "MAX";
              }
              return (
                <div key={index}>
                  <div
                    className="guide-label__arrow"
                    style={{
                      left: position[idx].x + 67,
                      top: position[idx].y - 10,
                    }}
                  ></div>
                  <div
                    className="guide-label"
                    style={{
                      position: "absolute",
                      left: position[idx].x + 82,
                      top: position[idx].y - 9,
                    }}
                  >
                    <div>
                      {el.data[0].toFixed(2)}% {title}
                    </div>
                  </div>
                </div>
              );
            }
          })}
      <div className="line"></div>
    </>
  );
}
