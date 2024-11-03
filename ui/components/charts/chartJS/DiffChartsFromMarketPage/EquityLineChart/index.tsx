import React from "react";
import { useTimer } from "../../../../../hooks";

import "./style.scss";

import { LineChart } from "./LineChart";

export const EquityLineChart: React.FC<{
  titleOfCategory: {
    title: string;
    color: string;
  }[];
}> = ({ titleOfCategory }) => {
  const loading = useTimer(1000);

  return (
    <div className="equity-line-chart">
      <div className="equity-line-chart__chart">
        <LineChart />
      </div>

      <div className="footer-label">
        {loading ? (
          <FooterLabelLoading />
        ) : (
          titleOfCategory.map(({ title, color }, i) => {
            return (
              <div key={i} className="footer-label__item">
                <div className="footer-label__point" style={{ background: color }}></div>
                <div className="footer-label__label">{title}</div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

const FooterLabelLoading: React.FC = () => {
  return ["Data #1", "Data #2", "Data #3"].map((title, i) => {
    return (
      <div key={i} className="footer-label__item">
        <div className="footer-label__point"></div>
        <div className="footer-label__label">{title}</div>
      </div>
    );
  });
};
