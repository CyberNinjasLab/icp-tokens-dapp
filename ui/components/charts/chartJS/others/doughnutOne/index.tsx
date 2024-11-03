import React from "react";
import { useTimer } from "../../../../../hooks";

import "./style.scss";
import { ChartDoughnutMain } from "./ChartDoughnutMain";
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
  const [cutout, setCutout] = React.useState(resizeWindow > 480 ? 111 : 110);
  const [labelValue, setLabelValue] = React.useState<ValueHover>();

  const setNewResize = () => {
    setResizeWindow(window.innerWidth);

    if (resizeWindow > 480) {
      setCutout(111);
    } else {
      setCutout(110);
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
  }, []);

  return (
    <div className="doughnut-other box">
      <p>As of March 19, 2023</p>
      <div className="doughnut-other__wrapper">
        <div className="doughnut-other__chart-main">
          <ChartDoughnutMain
            dataAssets={dataAssets[isActiveData - 1]}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            cutout={cutout}
            handleChangeLabel={handleChangeLabel}
          />
        </div>
        <div className={`doughnut-other__wrapper-title`}>
          <div className={`doughnut-other__title`}>
            {activeLabel ? (
              <>
                <h3>{labelValue?.percent}.00%</h3>
                <h2>{labelValue?.title}</h2>
              </>
            ) : loading ? (
              <>
                <h3 className="c-text-sec">0.00%</h3>
                <h2>Assets</h2>
              </>
            ) : (
              <>
                <h3>12.00%</h3>
                <h2>Bitcoin</h2>
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
