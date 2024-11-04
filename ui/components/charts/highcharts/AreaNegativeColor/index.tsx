import React from "react";
import { CommonIcons, NavSelect } from "../../../../common";

import "./style.scss";
import { Chart } from "./Chart";

const commonBtns = [
  { title: "1D", value: "0" },
  { title: "1M", value: "1" },
  { title: "3M", value: "2" },
  { title: "1Y", value: "3" },
  { title: "YTD", value: "4" },
  { title: "ALL", value: "5" },
  { title: <CommonIcons name="date-icon" />, value: "6" },
  { title: "LOG", value: "7" },
];

export const AreaNegativeColor: React.FC = () => {
  const [selectTime, setSelectTime] = React.useState<string>("2");

  const handleNavSelect = (value: string) => {
    setSelectTime(value);
  };

  return (
    <div className="area-negative-color box">
      <div className="user-panel">
        <NavSelect
          data={[
            { title: "Daily ROI" },
            { title: "Daily transactions" },
            { title: "Daily volume" },
          ]}
          defaultValue={0}
        />
        {/* @ts-ignore */}
        <NavSelect data={commonBtns} defaultValue={0} handleSelect={handleNavSelect} />
      </div>

      <div>
        <Chart selectTime={selectTime} />
      </div>
    </div>
  );
};
