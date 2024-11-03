import React from "react";

import "./style.scss";

import { Pagination } from "../../../../../../common/pagination/simplePagination";
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
    <div className="doughnut-info-one">
      <Pagination
        totalItems={12}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        currentPage={isActiveData}
      />

      <div className="doughnut-info-one__container box-3">
        {dataAssets[isActiveData - 1].map(({ title, style, percent }, i) => {
          return (
            <div key={i} className="doughnut-info-one__item">
              <div>
                <span style={{ background: style.background }}></span>
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
                </h3>
              </div>

              <h3>{percent}.00%</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};
