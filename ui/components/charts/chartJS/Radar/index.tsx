import React from "react";
import { Chart } from "./Chart";

import "./style.scss";
import {
  IDataForDifferentChart,
  dataForDifferentChart,
} from "../../../../pages/charts/charts/data";
import { DropdownSecond } from "../../../../common";

const loanData = {
  loanAmount: 0,
  interestRate: 0,
  duration: 0,
  investmentProduct: 0,
  assetClass: 0,
  location: 0,
  amount: 0,
};

const newData = {
  loanAmount: 5,
  interestRate: 8,
  duration: 9,
  investmentProduct: 10,
  assetClass: 7,
  location: 2,
  amount: 41,
};

const timeoutForSkeleton = 1000;

export const ChartRadar = () => {
  const [selectedValue, setSelectedValue] = React.useState(loanData);

  function getRandomNumber() {
    return Math.floor(Math.random() * 11);
  }

  const sumNumbers = (numbers: object) => {
    return Object.values(numbers)
      .slice(0, 6)
      .reduce((sum, number) => sum + number, 0);
  };

  const handleSelectChange = (value: IDataForDifferentChart) => {
    const { loanAmount, invest } = value.percent;

    const dataForDifferentChart = {
      loanAmount: loanAmount,
      interestRate: getRandomNumber(),
      duration: getRandomNumber(),
      investmentProduct: invest,
      assetClass: getRandomNumber(),
      location: getRandomNumber(),
    };

    setSelectedValue({ ...dataForDifferentChart, amount: sumNumbers(dataForDifferentChart) });
  };

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSelectedValue(newData);
    }, timeoutForSkeleton);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="box radar-chart">
      <div className="chart-radar">
        <Chart data={Object.values(selectedValue).slice(0, 6)} />
      </div>

      <DropdownSecond options={dataForDifferentChart} onSelectChange={handleSelectChange} />

      <div className="total-score-title">
        Total score <span>{selectedValue.amount}/100</span>
      </div>

      <div className="total-scores">
        <div className="total-scores__wrapper box-3">
          <div className="total-scores__item">
            <div className="total-scores__title">Loan amount</div>
            <div className="total-scores__amount">{selectedValue.loanAmount}/10</div>
          </div>
          <div className="total-scores__item">
            <div className="total-scores__title">Interest rate</div>
            <div className="total-scores__amount">{selectedValue.interestRate}/10</div>
          </div>
          <div className="total-scores__item">
            <div className="total-scores__title">Duration</div>
            <div className="total-scores__amount">{selectedValue.duration}/10</div>
          </div>
        </div>

        <div className="total-scores__wrapper box-3">
          <div className="total-scores__item">
            <div className="total-scores__title">Investment product</div>
            <div className="total-scores__amount">{selectedValue.investmentProduct}/10</div>
          </div>
          <div className="total-scores__item">
            <div className="total-scores__title">Asset class</div>
            <div className="total-scores__amount">{selectedValue.assetClass}/10</div>
          </div>
          <div className="total-scores__item">
            <div className="total-scores__title">Location</div>
            <div className="total-scores__amount">{selectedValue.location}/10</div>
          </div>
        </div>
      </div>

      <div className="diversification-text">
        Build up a portfolio! The more different projects you choose, the better your
        diversification. A balanced investment strategy is the right way to achieve optimal.
      </div>
    </div>
  );
};
