import React from "react";
import { CommonIcons, NavSelectTwo } from "../../../../../common";
import { Chart } from "./chart";

import "./style.scss";

export const AreaOne: React.FC = () => {
  return (
    <div className="area-one box">
      <div className="area-one__nav">
        <div>
          <span>Total</span>
          <NavSelectTwo data={["ETC", "BTC", "BNB", "MATIC", "AVAX"]} defaultValue={0} />
          <div>
            +40 <CommonIcons name="arrow-left" className="arrow-icon" />
          </div>
        </div>
      </div>

      <div className="y-axis" />
      <Chart />
    </div>
  );
};
