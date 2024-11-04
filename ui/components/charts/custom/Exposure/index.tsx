import React from "react";
import "./style.scss";
import { data } from "./data";
import { MarketBoxTab } from "../../../tabs/MarketBoxTab";
import { useTimer } from "../../../../hooks";

const buttons = ["Stock Sector Exposure", "Bond Maturity Exposure"];

export const Exposure: React.FC = () => {
  const timeout = useTimer(1000);
  const [activeCategory, setActiveCategory] = React.useState(0);

  const handleActiveTabButton = (value: number) => setActiveCategory(value);

  return (
    <MarketBoxTab
      buttonNames={buttons}
      icon={false}
      activeTab={activeCategory}
      handleActiveTab={handleActiveTabButton}
    >
      <div className="exposure">
        <div className="exposure__content">
          <div className="exposure__content-itemsList">
            {data[activeCategory].map((item, i) => {
              return (
                <div className="exposure__content-itemsList__item" key={i}>
                  <div className="point" style={{ backgroundColor: item.color }}></div>
                  <div
                    className="label"
                    style={{
                      color: item.active ? item.color : "",
                      textDecoration: item.active ? "underline" : "",
                    }}
                  >
                    {item.title}
                  </div>
                  <div className="bar-wrap">
                    <div
                      className="bar"
                      style={{
                        width: item.value == "0" ? "2px" : `${timeout ? 0 : item.value}%`,
                        backgroundColor: item.color,
                      }}
                    ></div>
                  </div>
                  <div className="percent">{item.value}%</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </MarketBoxTab>
  );
};
