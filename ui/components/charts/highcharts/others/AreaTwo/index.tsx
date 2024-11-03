import React from "react";
import { Area } from "./chart";

import "./style.scss";
import { CommonIcons } from "../../../../../common";

export const AreaTwo: React.FC = () => {
  return (
    <section className="area-two box">
      <div className="title">
        <h2>Total TVL</h2>
        <h3>
          €214.05b <span>+0.28%</span>
        </h3>
      </div>
      <Area />
      <div className="y-axis" />
      <button>
        <CommonIcons name="arrow-button" />
      </button>
    </section>
  );
};
