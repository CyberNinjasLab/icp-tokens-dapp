import React from "react";
import { dataIndicators } from "./data";
import { LineFillShadow } from "./LineFillShadow";

import "./style.scss";

export const ListOfArea: React.FC = () => {
  return (
    <ul className="indicators">
      {dataIndicators.map(({ title, last, coming, chart, color }, i) => {
        return (
          <li key={title + i} className="box">
            <h2>{title}</h2>
            <h3>{last}</h3>
            <h4 style={{ color: color }}>{coming}</h4>
            <LineFillShadow data={chart} color={color} height={25} type="area" />
          </li>
        );
      })}
    </ul>
  );
};
