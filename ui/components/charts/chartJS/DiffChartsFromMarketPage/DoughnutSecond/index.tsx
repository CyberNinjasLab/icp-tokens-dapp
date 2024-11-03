import React from "react";
import { useTimer } from "../../../../../hooks";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

import "./style.scss";

interface dataDoughnut {
  title: string;
  percent: string;
  value: number;
  amount?: string;
  type?: string;
}

const activeDataArr = 0;

export const DoughnutItemSecond: React.FC<{
  dataProps: dataDoughnut[][];
  doughnutTitle: string;
  thickness?: boolean;
  backgroundColorPie?: string[][];
  isHorizontal?: boolean;
}> = ({ thickness, dataProps, doughnutTitle, backgroundColorPie, isHorizontal }) => {
  const [dataset, setDataset] = React.useState<dataDoughnut[]>([]);
  const [activeTooltip, setActiveTooltip] = React.useState(1);
  const [activeDataset, setActiveDataset] = React.useState(0);
  const loading = !useTimer(1000);

  const ref = React.useRef(null);

  function checkProps(prop: string[][] | undefined, defaultValue: string[], index: number) {
    if (typeof prop !== "undefined") {
      return prop[index];
    } else {
      return defaultValue;
    }
  }

  React.useEffect(() => {
    setDataset(dataProps[activeDataset]);
  }, [activeDataset]);

  React.useEffect(() => {
    setDataset(dataProps[0]);
  }, [dataProps]);

  const changeActiveDataset = (direction: number) => {
    let value;
    if (activeDataset + direction > dataProps.length - 1) {
      value = 0;
    } else if (activeDataset + direction < 0) {
      value = dataProps.length - 1;
    } else {
      value = activeDataset + direction;
    }
    setActiveDataset(value);
  };

  const data: any = {
    labels: dataset.filter((el) => el.value == 0).length === 0 ? dataset.map((d) => d.title) : "",
    datasets: [
      {
        label: "main",
        data: loading ? dataset.map((d) => d.value) : ["100"],
        backgroundColor: loading
          ? checkProps(
              backgroundColorPie,
              [
                "rgba(143, 75, 204, 1)",
                "rgba(195, 103, 220, 1)",
                "rgba(228, 101, 195, 1)",
                "rgba(240, 146, 136, 1)",
                "rgba(126, 103, 220, 1)",
                "rgba(226, 103, 220, 1)",
              ],
              0
            )
          : ["rgba(232, 232, 240, 1)"],
        borderWidth: 0,
        weight: 1,
        cutout: thickness && 41,
        rotation: isHorizontal ? 270 : 0,
        circumference: isHorizontal ? 180 : 360,
      },
      {
        label: "secondary",
        data: loading ? dataset.map((d) => d.value) : ["100"],
        backgroundColor: loading
          ? checkProps(
              backgroundColorPie,
              [
                "rgba(143, 75, 204, 0.3)",
                "rgba(195, 103, 220, 0.3)",
                "rgba(228, 101, 195, 0.3)",
                "rgba(240, 146, 136, 0.3)",
                "rgba(126, 103, 220, 0.3)",
                "rgba(226, 103, 220, 0.3)",
              ],
              1
            )
          : ["rgba(232, 232, 240, 0.3)"],
        borderWidth: 0,
        weight: 0.2,
        cutout: thickness && 43,
        rotation: isHorizontal ? 270 : 0,
        circumference: isHorizontal ? 180 : 360,
      },
    ],
  };

  const sliceThickness = {
    id: "sliceThickness",
    beforeDraw(chart: any) {
      let sliceThicknessPixel = [215, 230, 240, 270, 300];
      sliceThicknessPixel.forEach((thickness, i) => {
        if (chart.getDatasetMeta(0).data[i]?.outerRadius) {
          chart.getDatasetMeta(0).data[i].outerRadius = (chart.chartArea.width / thickness) * 100;
        }
      });
    },
  };

  const plugins = [sliceThickness];

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },

    onHover: () => {
      //@ts-ignore
      const tooltip = ref.current._active.length > 0 && ref.current._active[0];
      if (tooltip.index + 1 !== activeTooltip && typeof tooltip.index === "number") {
        setActiveTooltip(tooltip.index + 1);
      }
    },
  };

  return (
    <div className={`doughnut-market-second box ${isHorizontal ? "horizontal" : ""}`}>
      <div className="doughnut-market-second__title">
        {doughnutTitle} (<a href="/">?</a>)
      </div>

      <div className="doughnut-market-second__doughnut">
        {loading ? (
          <div className="doughnut-market-second__label">
            <div className="title increase">{dataset[activeTooltip - 1]?.percent}%</div>
            <div className="label">{dataset[activeTooltip - 1]?.amount}</div>
          </div>
        ) : (
          <div className="doughnut-market-second__label">
            <div className="title increase">0.00%</div>
            <div className="label">$0.00</div>
          </div>
        )}

        {/* @ts-ignore */}
        <Doughnut data={data} options={options} ref={ref} plugins={thickness && plugins} />
      </div>

      <div className="doughnut-market-second__buttons">
        <button
          className="doughnut-market-second__buttons-btn"
          onClick={() => changeActiveDataset(-1)}
        >
          {"<"}
        </button>
        <button className="doughnut-market-second__buttons-btn">{activeDataset + 1}</button>
        <button
          className="doughnut-market-second__buttons-btn"
          onClick={() => changeActiveDataset(1)}
        >
          {">"}
        </button>
      </div>

      <div className="doughnut-market-second__list">
        {!loading
          ? dataset.map((_, i) => {
              return (
                <div className="doughnut-market-second__list-item" key={i}>
                  <div className="point" style={{ background: "rgba(232, 232, 240, 1)" }}></div>
                  <div className="label">Title #{i}</div>
                  <div className="value"></div>
                </div>
              );
            })
          : dataset.map((item, i) => {
              const point = data.datasets[0].backgroundColor[i];
              const label =
                activeTooltip > 0 &&
                item.title === dataProps[activeDataset][activeTooltip - 1].title
                  ? "underline"
                  : "";
              return (
                <div
                  className="doughnut-market-second__list-item"
                  key={i}
                  onMouseEnter={(e) => {
                    const targetElement = e.target as HTMLDivElement;
                    const hoverNum =
                      dataProps[activeDataset].findIndex(
                        (a) => a.title === targetElement.innerText
                      ) + 1;

                    if (hoverNum !== 0) {
                      setActiveTooltip(hoverNum);
                    }
                  }}
                >
                  <div className="point" style={{ backgroundColor: point }}></div>
                  <div className="label" style={{ textDecoration: label }}>
                    {item.title}
                  </div>
                  <div className="value">{item.percent}</div>
                </div>
              );
            })}
      </div>
    </div>
  );
};
