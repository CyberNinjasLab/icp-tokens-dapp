import React from "react";
import { Area } from "./chart";

import "./style.scss";
import { TwoIconCrypto } from "../../../../tables/OtherPartsOfTable";

export const AreaThree: React.FC = () => {
  return (
    <section className="area-three box">
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
      <Area />
    </section>
  );
};
