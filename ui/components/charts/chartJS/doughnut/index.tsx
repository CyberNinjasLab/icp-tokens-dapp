import React from "react";
import { useTimer } from "../../../../hooks";

import "./index.scss";
import { ChartDoughnutMain } from "./ChartDoughnutMain";
// import { ChartShadowSecond } from "./ChartShadowSecond";
import { DoughnutInfo } from "./DoughnutInfo";
import { dataAssets } from "./data";

const timeoutForSkeleton = 1000;

export interface ValueHover {
  title: string;
  percent: string | number;
}

export const DoughnutChart: React.FC = () => {
  const loading = useTimer(timeoutForSkeleton);
  const [isActiveData, setIsActiveData] = React.useState(4);
  const [activeLabel, setActiveLabel] = React.useState<boolean>(false);
  const handleActiveData = (value: number) => {
    setIsActiveData(value);
  };

  const [resizeWindow, setResizeWindow] = React.useState(window.innerWidth);
  const [cutout, setCutout] = React.useState(resizeWindow > 480 ? 109 : 108);
  const [labelValue, setLabelValue] = React.useState<ValueHover>();

  const setNewResize = () => {
    setResizeWindow(window.innerWidth);

    if (resizeWindow > 480) {
      setCutout(109);
    } else {
      setCutout(108);
    }
  };

  React.useEffect(() => {
    window.addEventListener("resize", setNewResize);

    return () => {
      window.removeEventListener("resize", setNewResize);
    };

    // eslint-disable-next-line
  }, [resizeWindow]);

  const handleMouseEnter = () => {
    setActiveLabel(true);
  };

  const handleMouseLeave = () => {
    setActiveLabel(false);
  };

  const handleChangeLabel = (value: ValueHover) => {
    setLabelValue(value);
  };

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsActiveData(1);
    }, timeoutForSkeleton);

    return () => {
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="doughnut-chart">
      <div className="doughnut-chart__wrapper">
        <div className="doughnut-chart__chart-main">
          <ChartDoughnutMain
            dataAssets={dataAssets[isActiveData - 1]}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            cutout={cutout}
            handleChangeLabel={handleChangeLabel}
          />
        </div>

        <div className={`doughnut-chart__wrapper-title`}>
          <div className={`doughnut-chart__title`}>
            {activeLabel ? (
              <>
                <h2>{labelValue?.title}</h2>
                <h3>{labelValue?.percent}%</h3>
              </>
            ) : loading ? (
              <>
                <h2>My wallet</h2>
                <h3 className="c-text-sec">
                  € 0.<span>00</span>
                </h3>
                <h4 className="c-text-sec">0 Assets</h4>
              </>
            ) : (
              <>
                <h2>My wallet</h2>
                <h3>
                  € 12,433.<span>35</span>
                </h3>
                <h4>12 Assets</h4>
              </>
            )}
          </div>
        </div>
      </div>

      <DoughnutInfo
        handleActiveData={handleActiveData}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        isActiveData={isActiveData}
        handleChangeLabel={handleChangeLabel}
      />
    </div>
  );
};
