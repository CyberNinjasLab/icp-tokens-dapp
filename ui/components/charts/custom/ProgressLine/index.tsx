import React, { useEffect } from "react";
import { useTimer } from "../../../../hooks";

import {
  IDataForDifferentChart,
  dataForDifferentChart,
} from "../../../../pages/charts/charts/data";
import { DropdownSecond } from "../../../../common";

import "./style.scss";

import { ReactComponent as LineForChartInput } from "../../../../assets/svg/rarely-usable/progress-line.svg";

export const ProgressLine: React.FC = () => {
  const timer = useTimer(500);
  const [value, setValue] = React.useState(1);

  useEffect(() => {
    if (!timer) {
      setValue(85);
    }
  }, [timer]);

  const handleSelectChange = (value: IDataForDifferentChart) => {
    setValue(value.investmentTable.rangePercent);
  };

  const calculatePercentage = (value: number) => {
    if (value < 11) {
      return 10;
    } else if (value > 90) {
      return 90;
    } else {
      return value;
    }
  };

  return (
    <section className="progress-line box">
      <div className="progress-line__title">ROI performance</div>
      <DropdownSecond options={dataForDifferentChart} onSelectChange={handleSelectChange} />

      <div className="chart-input">
        <div className="chart-input__position">
          <div
            className="chart-input__slider box-2"
            style={{ left: `calc(${calculatePercentage(value)}%)` }}
          >
            <div className="chart-input__title-amount">
              €{value}00<span>*</span>/{value}%
            </div>
          </div>
        </div>

        <div className="progress-line-box">
          <div className="track">
            <div className="fill" style={{ width: `${value}%` }}></div>
          </div>
        </div>

        <div className="chart-input__line">
          <div className="chart-input__wrapper-text">
            <div className="chart-input__text">€0</div>
            <div className="chart-input__text">€10000</div>
          </div>
          <LineForChartInput />
        </div>
      </div>
      <p className="progress-line__return text-gradient-primary">Return on investment received</p>
      <p className="progress-line__expected text-gradient-primary">
        Expected investment based on the previous performance
      </p>
    </section>
  );
};
