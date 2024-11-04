import React from "react";

import "./style.scss";
import { dataProfit, months } from "./data";

export const ProfitLoss: React.FC = () => {
  return (
    <section className="profit-loss">
      <h2>Profit Loss</h2>

      <div className="profit-loss__buttons-panel">
        <div>
          {["HeatMap", "Rolling Sharpe", "Rolling Sorption", "Rolling Volatility", "BETA"].map(
            (btn, i) => {
              return (
                <button
                  key={i}
                  className={i === 0 ? "btn-ai-broker-main-second" : "btn-ai-broker-main"}
                >
                  {btn}
                </button>
              );
            }
          )}
        </div>
      </div>
      <div className="profit-loss__main-content box">
        <div className="profit-loss__wrapper-overflow">
          <div className="profit-loss__wrapper">
            <div>
              {dataProfit.slice(0, 2).map((row, i) => {
                return (
                  <div className="profit-loss__row row-1" key={i}>
                    <span>{row.year}</span>
                    {row.data.map(({ color, data }, i) => {
                      return (
                        <div key={i} style={{ background: color }}>
                          {data}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
              <div className="profit-loss__mounts">
                {months.map((month, i) => {
                  return <p key={i}>{month}</p>;
                })}
              </div>
            </div>
            <div>
              {dataProfit.slice(2).map((row, i) => {
                return (
                  <div className="profit-loss__row" key={i}>
                    <span>{row.year}</span>
                    {row.data.map(({ color, data }, i) => {
                      return (
                        <div key={i} style={{ background: color }}>
                          {data}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
              <div className="profit-loss__mounts">
                {months.map((month, i) => {
                  return <p key={i}>{month}</p>;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
