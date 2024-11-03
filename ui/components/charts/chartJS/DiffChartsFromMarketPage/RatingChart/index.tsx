import React from "react";
import { useTimer } from "../../../../../hooks";

import "./style.scss";

import { LineChartRating } from "./RatingChart";

export const RatingChart: React.FC<{
  titleOfCategory: {
    title: string;
    color: string;
  }[];
}> = ({ titleOfCategory }) => {
  const loading = useTimer(1000);

  return (
    <div className="rating-chart">
      <div className="rating-chart__chart">
        <LineChartRating />
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
  return ["Data #1", "Data #2", "Data #3", "Data #4"].map((title, i) => {
    return (
      <div key={i} className="footer-label__item">
        <div className="footer-label__point"></div>
        <div className="footer-label__label">{title}</div>
      </div>
    );
  });
};
