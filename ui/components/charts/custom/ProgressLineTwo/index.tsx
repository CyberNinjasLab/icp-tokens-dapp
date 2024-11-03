import React from "react";

import "./style.scss";
import { CommonIcons } from "../../../../common";

export const ProgressLineTwo: React.FC = () => {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    setValue(67);
  }, []);

  return (
    <div className="range-tooltip">
      <div className="tooltip-custom-container" style={{ left: `calc(${value}% - 35px)` }}>
        <div className="tooltip-custom">
          <CommonIcons name="tooltip" />
          <div className="tooltip-custom-text">{value}%</div>
        </div>
      </div>

      <h4>80%</h4>

      <div className="title">
        <h4>0%</h4>
        <h4>100%</h4>
      </div>

      <div className="range-wrapper">
        <div className="range-fill" style={{ width: `${value}%` }}></div>
        <div className="range-mark"></div>
      </div>
    </div>
  );
};
