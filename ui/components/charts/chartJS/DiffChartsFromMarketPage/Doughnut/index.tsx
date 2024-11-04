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

export const DoughnutItem: React.FC<{
  dataProps: dataDoughnut[][];
  doughnutTitle: string;
}> = ({ dataProps, doughnutTitle }) => {
  const [dataArr, setDataArr] = React.useState<dataDoughnut[]>([]);
  const [activeTooltip, setActiveTooltip] = React.useState(1);
  const loading = !useTimer(1000);

  const ref = React.useRef(null);

  React.useEffect(() => {
    setDataArr(dataProps[activeDataArr]);
  }, [dataProps]);

  const data: any = {
    labels: dataArr.filter((el) => el.value == 0).length === 0 ? dataArr.map((d) => d.title) : "",
    datasets: [
      {
        label: "main",
        data: loading ? dataArr.map((d) => d.value) : ["100"],
        backgroundColor: loading
          ? [
              "rgba(143, 75, 204, 1)",
              "rgba(195, 103, 220, 1)",
              "rgba(228, 101, 195, 1)",
              "rgba(240, 146, 136, 1)",
              "rgba(126, 103, 220, 1)",
              "rgba(226, 103, 220, 1)",
            ]
          : ["rgba(232, 232, 240, 1)"],
        borderWidth: 0,
        weight: 1,
        cutout: 59,
      },
      {
        label: "secondary",
        data: loading ? dataArr.map((d) => d.value) : ["100"],
        backgroundColor: loading
          ? [
              "rgba(143, 75, 204, 0.3)",
              "rgba(195, 103, 220, 0.3)",
              "rgba(228, 101, 195, 0.3)",
              "rgba(240, 146, 136, 0.3)",
              "rgba(126, 103, 220, 0.3)",
              "rgba(226, 103, 220, 0.3)",
            ]
          : ["rgba(232, 232, 240, 0.3)"],
        borderWidth: 0,
        weight: 0.2,
        cutout: 59,
      },
    ],
  };

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
    <div className={`doughnut-market`}>
      <div className="doughnut-market__title">
        {doughnutTitle} (<a href="/">?</a>)
      </div>

      <div className="doughnut-market__doughnut">
        {loading ? (
          <div className="doughnut-market__label">
            <div className="title increase">{dataArr[activeTooltip - 1]?.percent}%</div>
            <div className="label">{dataArr[activeTooltip - 1]?.amount}</div>
          </div>
        ) : (
          <div className="doughnut-market__label">
            <div className="title increase">0.00%</div>
            <div className="label">$0.00</div>
          </div>
        )}

        <Doughnut data={data} options={options} ref={ref} />
      </div>

      <div className="doughnut-market__list">
        {!loading
          ? dataArr.map((_, i) => {
              return (
                <div className="doughnut-market__list-item" key={i}>
                  <div className="point" style={{ background: "rgba(232, 232, 240, 1)" }}></div>
                  <div className="label">Title #{i}</div>
                  <div className="value"></div>
                </div>
              );
            })
          : dataArr.map((item, i) => {
              const point = data.datasets[0].backgroundColor[i];
              const label =
                activeTooltip > 0 &&
                item.title === dataProps[activeDataArr][activeTooltip - 1].title
                  ? "underline"
                  : "";
              return (
                <div
                  className="doughnut-market__list-item"
                  key={i}
                  onMouseEnter={(e) => {
                    const targetElement = e.target as HTMLDivElement;
                    const hoverNum =
                      dataProps[activeDataArr].findIndex(
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
                  <div className="value">{item.amount}</div>
                </div>
              );
            })}
      </div>
    </div>
  );
};
