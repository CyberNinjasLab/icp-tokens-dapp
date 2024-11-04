import React from "react";
import { Area } from "./chart";

import "./style.scss";
import { TwoIconCrypto } from "../../../../tables/OtherPartsOfTable";
import { Dropdown, NavSelectThree } from "../../../../../common";

export const AreaFour: React.FC = () => {
  const [selectTime, setSelectTime] = React.useState<number | string>(90);

  const handleNavSelect = (value: number | string) => {
    setSelectTime(value);
  };

  return (
    <section className="area-four box">
      <div className="title">
        <div className="col-1">
          <TwoIconCrypto iconsName={["usdc", "eth"]} size={[47, 47]} />
          <h2>USDC/ETH</h2>
        </div>

        <ul className="col-2">
          <li>
            <span>LP Fee:</span>
            <span>0.3%</span>
          </li>
          <li>
            <span>TVL:</span>
            <span>$4.24b</span>
          </li>
          <li>
            <span>Volume 24H:</span>
            <span>$1.81b</span>
          </li>
        </ul>
      </div>

      <div className="user-panel">
        <NavSelectThree handleSelect={handleNavSelect} defaultValue={3} />
        <div className="box-2">
          <Dropdown options={[{ label: "Line" }, { label: "Line 2" }]} icon="arrow-drop-gradient" />
        </div>
      </div>
      <Area selectTime={selectTime} />
    </section>
  );
};
