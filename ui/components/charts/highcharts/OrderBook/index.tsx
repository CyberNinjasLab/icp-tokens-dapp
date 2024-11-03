import React from "react";
import { useTimer } from "../../../../hooks";

import "./style.scss";
import { MarketDepthOB } from "./MarketDepthOB";
import { changeRGBAOpacity } from "../../../../utils/utilsForNumbers";

interface OrderBookProps {
  data: {
    price: number;
    size: number | string;
    sum: string;
  }[];
  dataMD: number[];
  colorMD: string;
}

export const OrderBook: React.FC<OrderBookProps> = ({ data, dataMD, colorMD }) => {
  const loading = useTimer(1000);

  return (
    <div className="order-book-chart">
      <div className="order-book-chart__titles">
        <div>Price (USDT)</div>
        <div>Size (ETH)</div>
        <div>Sum (USDT)</div>
      </div>

      <div className="order-book-chart__chart">
        <ul>
          {data.map(({ price, size, sum }, i) => {
            return loading ? (
              <li key={i}>
                <span className="c-text-sec">0,00</span>
                <span className="c-text-sec">0,00</span>
                <span className="c-text-sec">0,00</span>
              </li>
            ) : (
              <li key={i}>
                <span style={{ color: colorMD }}>{price}</span>
                <span>{size}</span>
                <span>{sum}</span>
              </li>
            );
          })}
        </ul>

        <MarketDepthOB data={dataMD} color={changeRGBAOpacity(colorMD, 0.15)} />
      </div>
    </div>
  );
};
