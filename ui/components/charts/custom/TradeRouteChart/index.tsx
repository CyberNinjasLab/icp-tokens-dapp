import React from "react";

import "./style.scss";
import { CommonIcons, CryptoIcons } from "../../../../common";
import classNames from "classnames";

interface ICryptoTitle {
  dataCryptoTitle: {
    icon: string;
    name: string;
    price: string;
    opposite?: boolean;
  }[];
}

interface IDataTokenProps {
  title: string;
  subtitle: string;
  percent: number;
  icon: string;
  subIcon: string;
}
[];

const dataCryptoTitle = [
  {
    name: "BTC",
    icon: "btc",
    price: "1",
    opposite: false,
  },
  {
    name: "ETH",
    icon: "eth",
    price: "23.781653",
    opposite: true,
  },
];

const dataToken = [
  {
    title: "WETH",
    subtitle: "UniSwap V2",
    percent: 100,
    icon: "https://storage.googleapis.com/ks-setting-1d682dca/8a919aae-a5d4-4244-a283-8d4cf8e803ff.png",
    subIcon:
      "https://storage.googleapis.com/ks-setting-1d682dca/f4245c06-1a2d-4149-ae5d-5c31d82a059a.png",
  },
  {
    title: "AEVO",
    subtitle: "UniSwap V3",
    percent: 100,
    icon: "https://storage.googleapis.com/ks-setting-1d682dca/2013da9f-ee0d-49c1-8bd0-e7bea6c61bd91712324785658.png",
    subIcon:
      "https://storage.googleapis.com/ks-setting-1d682dca/f4245c06-1a2d-4149-ae5d-5c31d82a059a.png",
  },
  {
    title: "AXL",
    subtitle: "Curve Plain",
    percent: 100,
    icon: "https://storage.googleapis.com/ks-setting-1d682dca/01dfd5f3-3cb5-4aaf-99db-6497ae49f97b.png",
    subIcon:
      "https://storage.googleapis.com/ks-setting-1d682dca/ed3dbb53-0640-435f-8397-1353899c7e971709704027259.png",
  },
  {
    title: "DAI",
    subtitle: "SushiSwap V2",
    percent: 100,
    icon: "https://storage.googleapis.com/ks-setting-1d682dca/daf2a75f-31c3-457c-a3b8-dad625f9d91a.png",
    subIcon:
      "https://storage.googleapis.com/ks-setting-1d682dca/367fba5a-24d0-448a-a6e1-a6e0c3b11e92.png",
  },
];

export const TradeRouteChart: React.FC = () => {
  return (
    <div className="trade-route-chart">
      <h2>Your trade route</h2>

      <CryptoTitle dataCryptoTitle={dataCryptoTitle} />

      <div className="container">
        <div className="vertical-line" />
        <div className="routes">
          <div className="route">
            <div className="tokens-container">
              <div className="tokens">
                <Token {...dataToken[0]} />
                <Token {...dataToken[1]} />
              </div>
            </div>
            <div className="horizontal-line">
              <div className="percent">95%</div>
              <div className="line" />
              <div className="start-arrow">
                <CommonIcons name="arrow-up" className="arrow" size="10" />
              </div>
              <CommonIcons name="arrow-up" className="arrow" size="10" />
              <div className="center-arrow">
                <CommonIcons name="arrow-up" className="arrow" size="10" />
              </div>
            </div>
          </div>

          <div className="route">
            <div className="tokens-container">
              <div className="tokens">
                <Token {...dataToken[2]} />
                <Token {...dataToken[3]} />
              </div>
            </div>
            <div className="horizontal-line">
              <div className="percent">5%</div>
              <div className="line" />
              <div className="start-arrow">
                <CommonIcons name="arrow-up" className="arrow" size="10" />
              </div>
              <CommonIcons name="arrow-up" className="arrow" size="10" />
              <div className="center-arrow">
                <CommonIcons name="arrow-up" className="arrow" size="10" />
              </div>
            </div>
          </div>
        </div>
        <div className="vertical-line" />
      </div>
    </div>
  );
};

export default Crypto;

const Token: React.FC<IDataTokenProps> = ({ title, subtitle, icon, percent, subIcon }) => {
  return (
    <div className="token">
      <a href="#" className="title">
        <img src={icon} alt={title} width={16} />
        {title}
      </a>
      <a href="#" className="subtitle">
        <img src={subIcon} alt={subtitle} width={14} />
        <span>{subtitle}:</span> <span>{percent}%</span>
      </a>
    </div>
  );
};

const CryptoTitle: React.FC<ICryptoTitle> = ({ dataCryptoTitle }) => {
  return (
    <div className="crypto-title">
      {dataCryptoTitle.map(({ name, icon, price, opposite }, i) => (
        <div key={i + name} className={classNames("crypto-title__item", { opposite })}>
          <CryptoIcons name={icon} size="20" /> <span>{name}</span> <span>{price}</span>
        </div>
      ))}
    </div>
  );
};
