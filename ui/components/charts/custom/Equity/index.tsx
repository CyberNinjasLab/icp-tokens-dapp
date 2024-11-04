import React from "react";
import { useTimer } from "../../../../hooks";

import "./style.scss";

import { MarketBoxTab } from "../../../tabs/MarketBoxTab";
import { equityDate } from "./data";

const buttons = ["Equity", "Fixed Income"];

export const Equity: React.FC = () => {
  const timeout = !useTimer(500);

  const [activeCategory, setActiveCategory] = React.useState(0);

  const handleActiveTabButton = (value: number) => {
    setActiveCategory(value);
  };

  if (activeCategory) {
    equityDate[1].mark = "equity-mark-hidden";
    equityDate[5].mark = "equity-mark-visible";
  } else {
    equityDate[5].mark = "equity-mark-hidden";
    equityDate[1].mark = "equity-mark-visible";
  }

  return (
    <MarketBoxTab
      buttonNames={buttons}
      icon={false}
      activeTab={0}
      handleActiveTab={handleActiveTabButton}
    >
      <div className="exposure">
        <div className="exposure__content">
          <div className="equity-chart">
            <div className="equity-chart__wrapper">
              <div className="equity-chart__label-top">Valuation</div>
              <div className="equity-chart__label-right">Market Cap</div>
              <div className="equity-chart__label-left">
                <div>Small</div>
                <div>Medium</div>
                <div>Large</div>
              </div>
              <div className="equity-chart__border grid-container n-1">
                {timeout
                  ? equityDate.map((item, i) => {
                      return (
                        <div key={i} className={`equity-chart__item ${item.clazz}`}>
                          <div className={item.mark}>
                            <div className="equity-mark"></div>
                            <div className="equity-mark-second"></div>
                          </div>
                          {item.percent}
                        </div>
                      );
                    })
                  : equityDate.map((item, i) => {
                      return (
                        <div key={i} className="equity-chart__item moderate">
                          0.00%
                        </div>
                      );
                    })}
              </div>
              <div className="equity-chart__label-bottom">
                <div>Value</div>
                <div>Blend</div>
                <div>Growth</div>
              </div>

              <div className="mark-description">
                <div className="exposure__content-itemsList__item">
                  <div className="point" style={{ background: !timeout ? "#55557E" : "" }}></div>
                  <div className="label">Your selected accounts</div>
                </div>
                <div className="exposure__content-itemsList__item">
                  <div
                    className="point"
                    style={{ background: timeout ? "#9d5316" : "#55557E" }}
                  ></div>
                  <div className="label">Dow Jones U.S. Total Market Index</div>
                </div>
              </div>
              <p className="color-sections-description-title">Level of risk</p>
              <div className="color-sections-description">
                <div className="color-sections-description__item">
                  <div></div>
                  <div>High</div>
                </div>
                <div className="color-sections-description__item">
                  <div className="moderate"></div>
                  <div>Moderate</div>
                </div>
                <div className="color-sections-description__item">
                  <div className="low"></div>
                  <div>Low</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MarketBoxTab>
  );
};
