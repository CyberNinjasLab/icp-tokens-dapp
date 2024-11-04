import React from "react";
import { useInView } from "react-intersection-observer";

import "./style.scss";

import { ReactComponent as Pointer } from "../../../../../assets/svg/ai-broker/pointer.svg";

interface SpeedometerCustomChartProps {
  value: string;
}

export const SpeedChart: React.FC<SpeedometerCustomChartProps> = ({ value }) => {
  const { ref: chartRef, inView } = useInView({
    threshold: 0,
  });

  const setValueChart = (value: string) => {
    switch (value) {
      case "sell":
        return { transform: "rotate(234deg)" };
      case "neutral":
        return { transform: "rotate(297deg)" };
      case "buy":
        return { transform: "rotate(360deg)" };
      default:
        return {};
    }
  };

  return (
    <div className="speedometer-chart" ref={chartRef}>
      <div className="speedometer-chart__wrapper">
        <div className="speedometer">
          <div className="pointer" style={inView ? setValueChart(value) : setValueChart("sell")}>
            <div className="pointer__wrapper">
              <Pointer />
            </div>
          </div>
          <h4 className="speedometer__sell">SELL</h4>
          <h4 className="speedometer__neutral">NEUTRAL</h4>
          <h4 className="speedometer__buy">BUY</h4>
        </div>
      </div>
    </div>
  );
};
