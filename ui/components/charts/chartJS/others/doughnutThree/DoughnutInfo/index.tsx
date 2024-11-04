import React from "react";

import "./style.scss";

import { Pagination } from "../../../../../../common/pagination/simplePagination";
import { dataChartThree } from "../dataForChart";

const itemsPerPage = 4;

interface ValueHover {
  title: string;
  percent: string | number;
}

interface DoughnutInfoProps {
  handleActiveData: (value: number) => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  handleChangeLabel: (value: ValueHover) => void;
  isActiveData: number;
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
    <div className="doughnut-info-three">
      <Pagination
        totalItems={12}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        currentPage={isActiveData}
        style={{ width: "100%", marginTop: "10px" }}
      />

      <div className="doughnut-info-three__container">
        {dataChartThree[isActiveData - 1].map(({ title, crypto, style, percent }, i) => {
          const newStyle = {
            ...style,
            width: parseInt(style.width) + 50 + "%",
          };
          return (
            <div key={i} className="doughnut-info-three__item">
              <h3
                onMouseEnter={() => {
                  handleMouseEnter();
                  handleChangeLabel({
                    title: title,
                    percent: percent,
                  });
                }}
                onMouseLeave={() => {
                  handleMouseLeave();
                  handleChangeLabel({
                    title: title,
                    percent: percent,
                  });
                }}
              >
                {title}
                <span style={{ color: style.background }}>&nbsp;{crypto}</span>
              </h3>
              <div>
                <div className="range-slider">
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
