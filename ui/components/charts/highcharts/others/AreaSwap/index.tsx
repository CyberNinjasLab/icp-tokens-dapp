import React from "react";
import { Area } from "../../Area";

import "./style.scss";
import { TwoIconCrypto } from "../../../../tables/OtherPartsOfTable";

export const AreaSwap: React.FC = () => {
  return (
    <section className="area-swap">
      <div className="title">
        <TwoIconCrypto iconsName={["eth", "usdt"]} size={[24, 24]} />
        <h2>
          ETH <span>/ USDT</span>
        </h2>

        <div className="last-title">
          <h3>1859.07 USDT</h3>
          <div>
            <span className="text-gradient-primary">61.4700 (3.42%)</span>
            <span>Past 24 hours</span>
          </div>
        </div>
      </div>
      <div className="chart">
        <Area height={300} rangeSelector={true} xLabels />
      </div>
    </section>
  );
};
