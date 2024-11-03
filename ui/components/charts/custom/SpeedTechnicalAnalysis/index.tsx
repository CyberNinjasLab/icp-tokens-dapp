import React from "react";

import "./style.scss";
import { SpeedChart } from "./SpeedChart";
import { dataDropdownCrypto, dataDropdownTime, dataChart } from "./data";

import { CommonIcons, CryptoIcons, Dropdown } from "../../../../common";
import { SelectOption } from "../../../../common/dropdown/Dropdown";

interface IDataChart {
  crypto: string;
  time: string;
  data: {
    sell: number;
    neutral: number;
    buy: number;
  };
}

export const SpeedTechnicalAnalysis: React.FC = () => {
  const [chosenData, setChosenData] = React.useState([dataChart[0]]);
  const [selectValuesCrypto, setSelectValuesCrypto] = React.useState("ETH/USDT");
  const [selectValuesTime, setSelectValuesTime] = React.useState("1 minute");

  const handleSelectChangeCrypto = (value: SelectOption) => {
    if (value.value) {
      setSelectValuesCrypto(value.value);
      setChosenData(filterDataSelect(dataChart, value.value, selectValuesTime));
    }
  };

  const handleSelectChangeTime = (value: SelectOption) => {
    if (value.value) {
      setSelectValuesTime(value.value);
      setChosenData(filterDataSelect(dataChart, selectValuesCrypto, value.value));
    }
  };

  const chooseBiggestNumber = (data: IDataChart): string => {
    const maxValue = Math.max(...Object.values(data.data));
    const maxKey = Object.keys(data.data).find(
      (key) => data.data[key as keyof typeof data.data] === maxValue
    );
    return maxKey || "";
  };

  const filterDataSelect = (data: IDataChart[], selectCrypto: string, selectTime: string) => {
    return data.filter((data) => data.crypto === selectCrypto && data.time === selectTime);
  };

  return (
    <section className="technical-analysis">
      <h2>Technical Analysis</h2>

      <div className="technical-analysis__container box">
        <div className="technical-analysis__dropdowns">
          <div className="box-2">
            <Dropdown options={dataDropdownCrypto} handleSelectValue={handleSelectChangeCrypto} />
          </div>
          <div className="box-2">
            <Dropdown options={dataDropdownTime} handleSelectValue={handleSelectChangeTime} />
          </div>
        </div>

        <div className="technical-analysis__chart">
          <SpeedChart value={chooseBiggestNumber(chosenData[0])} />
        </div>

        <div className="technical-analysis__info">
          <h3>{chooseBiggestNumber(chosenData[0]).toLocaleUpperCase()}</h3>

          <div>
            <div>
              <h4 style={{ color: " #CF304A" }}>{chosenData[0].data.sell}</h4>
              <h4>Sell</h4>
            </div>
            <div>
              <h4 style={{ color: "#A6B2CD" }}>{chosenData[0].data.neutral}</h4>
              <h4>Neutral</h4>
            </div>
            <div>
              <h4 style={{ color: "#03A66D" }}>{chosenData[0].data.buy}</h4>
              <h4>Buy</h4>
            </div>
          </div>
        </div>

        <div className="technical-analysis__footer">
          <div>
            <button className="btn-ai-broker-main">More info</button>
            <button className="btn-ai-broker-main">Copy link</button>
          </div>
          <div>
            <p>Last update 28.08.2023 12:00 PM</p>
            <div>
              {["eth", "usdt", "bnb", "usdc", "oxt", "btc"].map((svg, i) => {
                return <CryptoIcons name={svg} className="token-info__svg" size="21" key={i} />;
              })}
              <CommonIcons name="arrow-right" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
