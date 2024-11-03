import React from "react";

import "./style.scss";

import { Pagination } from "../../../../../common/pagination/simplePagination";
import { dataAssets } from "../data";

const itemsPerPage = 4;

interface ValueHover {
  title: string;
  percent: string | number;
}

interface DoughnutInfoProps {
  handleActiveData: (value: number) => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  isActiveData: number;
  handleChangeLabel: (value: ValueHover) => void;
}

export const DoughnutInfo: React.FC<DoughnutInfoProps> = ({
  handleActiveData,
  handleMouseEnter,
  handleMouseLeave,
  isActiveData,
  handleChangeLabel,
}) => {
  const handlePageChange = (page: number) => {
    handleActiveData(page);
  };

  return (
    <div className="doughnut-info">
      <Pagination
        totalItems={12}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        currentPage={isActiveData}
        style={{ width: "100%", marginTop: "10px" }}
      />

      <div className="doughnut-info__container">
        {dataAssets[isActiveData - 1].map(({ title, crypto, style, percent }, i) => {
          const newStyle = {
            ...style,
            width: parseInt(style.width) + 50 + "%",
          };
          return (
            <div key={i} className="doughnut-info__item">
              <h3
                onMouseEnter={() => {
                  handleMouseEnter();
                  handleChangeLabel({
                    title: title + " " + crypto,
                    percent: percent,
                  });
                }}
                onMouseLeave={() => {
                  handleMouseLeave();
                  handleChangeLabel({
                    title: title + " " + crypto,
                    percent: percent,
                  });
                }}
              >
                {title}
                <span style={{ color: style.background }}>&nbsp;{crypto}</span>
              </h3>
              <div>
                <div className="range-slider">
                  {/* <div className="range-slider__shadow" style={newStyle} /> */}
                  <div className="range-slider__full" style={newStyle} />
                </div>
                <h3>{percent}%</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
