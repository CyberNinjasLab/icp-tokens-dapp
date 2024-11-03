import React from "react";
import { useAppSelector } from "../../../../../store";

import "./style.scss";
import { CryptoIcons } from "../../../../../common";
import { Charts } from "./Charts";
import { dataBothChart } from "./data";
import { ProgressLineTwo } from "../../../custom/ProgressLineTwo";
import { themeChart } from "./Charts/theme";

export const AreaAndColumn: React.FC = () => {
  const theme = useAppSelector((state) => state.theme.theme);

  const colorLineChart = () => {
    switch (theme) {
      case "light-blue":
        return "rgb(58, 87, 232)";
      case "dark-blue":
        return "rgb(58, 87, 232)";
      case "light-green":
        return "rgb(84, 204, 154)";
      case "dark-green":
        return "rgb(78, 185, 140)";
      case "light-orange":
        return "rgb(255, 161, 74)";
      case "dark-orange":
        return "rgb(255, 161, 74)";
      default:
        return "rgba(58, 87, 232)";
    }
  };

  return (
    <section className="container-both-chart box">
      <div className="box-chart-1">
        <h4>Total Supply</h4>
        <div className="title-amount">
          $ 10,513,101.44 /&nbsp;&nbsp;
          <CryptoIcons name="eth" size="20" /> &nbsp; 53,019.131766 ETH
        </div>

        <div className="chart">
          <Charts data={dataBothChart[0]} theme={themeChart[theme]} nameTooltip="Borrow APR" />
        </div>

        <div className="amount-under-chart">
          <h4>Interest Earned</h4>
          <h4>Net APY</h4>
          <h5>$653,374.71</h5>
          <h5>2.75%</h5>
        </div>
      </div>

      <div className="box-chart-2">
        <h4>Total Borrow</h4>
        <div className="title-amount">
          $6,942,471.79 /&nbsp;&nbsp;
          <CryptoIcons name="eth" size="20" /> &nbsp; 35,411.778213 ETH
        </div>

        <div className="chart">
          <Charts
            data={dataBothChart[1]}
            theme={themeChart["theme-default"]}
            nameTooltip="Borrow APR"
          />
        </div>

        <h4 style={{ marginTop: "12px" }}>Helth Factor</h4>
        <ProgressLineTwo />
      </div>
    </section>
  );
};
