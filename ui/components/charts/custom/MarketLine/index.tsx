//@ts-nocheck
import React from "react";
import LineChart from "./LineChart/lineChart";

import "./style.scss";

import data from "./LineChart/data.json";
import { CommonIcons, NavSelect } from "../../../../common";

const dataDefaulte = {
  portfolio: [
    {
      name: "Dodge & Cox Stock (M:DODGX)",
      active: true,
      color: "#d30b95",
    },
  ],
  benchmark: [
    {
      name: "Walmart Inc. Common Stock",
      active: true,
      color: "#84D2F6",
    },
    {
      name: "Tesla, Inc. Common Stock",
      active: true,
      color: "#7FD1B9",
    },
  ],
};

const buttons = [
  { title: "1M", value: "1" },
  { title: "3M", value: "3" },
  { title: "6M", value: "6" },
  { title: "YTD", value: "8" },
  { title: "1Y", value: "11" },
];

const MarketLine = (props) => {
  const [fetchedData, setFetchedData] = React.useState([]);
  const [filter, setFilter] = React.useState(3);
  const [stocks, setStocks] = React.useState({ portfolio: [], benchmark: [] });
  const [addVisible1, setAddVisible1] = React.useState(false);
  const [addVisible2, setAddVisible2] = React.useState(false);
  const [portfolioInput, setPortfolioInput] = React.useState("");
  const [benchmarkInput, setBenchmarkInput] = React.useState("");
  const [dateRange, setDateRange] = React.useState([
    new Date(new Date().setMonth(new Date().getMonth() - 1)),
    new Date(),
  ]);

  React.useEffect(() => {
    if (typeof props.timeoutForSkeletonValue !== "undefined") {
      if (props.timeoutForSkeletonValue) {
        setStocks(dataDefaulte);
      }
    } else {
      setStocks(dataDefaulte);
    }
  }, [props.timeoutForSkeletonValue]);

  const handleDateBtnClick = (m) => {
    const d = new Date();
    const from = d.setMonth(d.getMonth() - m);
    setDateRange([new Date(from), new Date()]);
    setFilter(m);
  };

  const handleActiveClick = (index, category) => {
    setStocks((state) => {
      return {
        ...state,
        [category]: stocks[category].map((stock, i) => {
          if (i === index) {
            return {
              ...stock,
              active: !stock.active,
            };
          } else return stock;
        }),
      };
    });
  };

  React.useEffect(() => {
    const newStocks = data.stocks.map((el) => {
      return {
        name: el.name,
        active: true,
        color: el.color,
      };
    });
    setFetchedData((state) => {
      return [...state, ...newStocks];
    });
    handleDateBtnClick(3);
  }, []);

  const handleAddNewStock = (stock, category) => {
    setStocks((state) => {
      return {
        ...state,
        [category]: [...state[category], stock],
      };
    });
    if (category === "portfolio") {
      setAddVisible1(false);
    } else {
      setAddVisible2(false);
    }
  };

  const handleDeleteStock = (stock, category) => {
    setStocks((state) => {
      const idx = state[category].findIndex((a) => a.name === stock.name);
      return {
        ...state,
        [category]: [...state[category].slice(0, idx), ...state[category].slice(idx + 1)],
      };
    });
  };

  const renderPopupList = (listName) => {
    const input = listName === "benchmark" ? benchmarkInput : portfolioInput;
    const filtered = fetchedData.filter(
      (a) =>
        stocks.portfolio.filter((b) => b.name === a.name).length < 1 &&
        stocks.benchmark.filter((b) => b.name === a.name).length < 1
    );
    const inputFiltered = filtered.filter(
      (a) => a.name.toLowerCase().indexOf(input.toLowerCase()) > -1
    );

    if (!fetchedData || inputFiltered.length == 0) {
      return <div className="empty">There is no stocks</div>;
    }
    return (
      <>
        {inputFiltered.map((stock, i) => {
          return (
            <div
              className="MarketLine-wrap__sidebar-list-popup__item"
              onClick={() => handleAddNewStock(stock, listName)}
              key={i}
            >
              {stock.name}
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div className="MarketLine box">
      <div className="MarketLine__header">
        <div className="MarketLine__header-title">
          Performance (<a href="#">?</a>)
        </div>
        <div className="MarketLine__header-info">
          <div className="update">Page last updated </div>
          <div className="date">2:58 PM ET, 05/05/2022</div>
          <div className="refresh">
            <div>
              <CommonIcons name="reset" size="12" />
            </div>
            Refresh
          </div>
          <div className="print">
            <div>
              <CommonIcons name="print" size="14" />
            </div>
            Print
          </div>
        </div>
      </div>

      <div className="MarketLine-wrap">
        <div className="MarketLine-wrap__sidebar">
          <div className="col">
            <div className="MarketLine-wrap__sidebar-label">Portfolio</div>

            <div className="MarketLine-wrap__sidebar-choose">
              <input
                placeholder="Sub portfolio #1"
                value={portfolioInput}
                onChange={(e) => setPortfolioInput(e.target.value)}
              />
              <div className="add" onClick={() => setAddVisible1(!addVisible1)}>
                +
              </div>
            </div>

            <div className="MarketLine-wrap__sidebar-list">
              <div
                className="MarketLine-wrap__sidebar-list-popup"
                style={{ display: addVisible1 ? "block" : "none" }}
              >
                {renderPopupList("portfolio")}
              </div>
              {stocks.portfolio.map((stock, i) => {
                return (
                  <div className="MarketLine-wrap__sidebar-list__item" key={i}>
                    <label className="checkbox-container">
                      <input
                        type="checkbox"
                        checked={stock.active}
                        onChange={() => handleActiveClick(i, "portfolio")}
                      />
                      <span className="checkmark"></span>
                    </label>
                    <div className="point" style={{ backgroundColor: stock.color }}></div>
                    <div className="name">{stock.name}</div>
                    <i
                      className="bi bi-x delete"
                      onClick={() => handleDeleteStock(stock, "portfolio")}
                    ></i>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col">
            <div className="MarketLine-wrap__sidebar-label">Benchmark</div>
            <div className="MarketLine-wrap__sidebar-choose">
              <input
                placeholder="Search"
                value={benchmarkInput}
                onChange={(e) => setBenchmarkInput(e.target.value)}
              />
              <div className="browse" onClick={() => setAddVisible2(!addVisible2)}>
                Browse
              </div>
              <div className="add" onClick={() => setAddVisible2(!addVisible2)}>
                +
              </div>
            </div>

            <div className="MarketLine-wrap__sidebar-list">
              <div
                className="MarketLine-wrap__sidebar-list-popup"
                style={{ display: addVisible2 ? "block" : "none" }}
              >
                {renderPopupList("benchmark")}
              </div>
              {stocks.benchmark.map((stock, i) => {
                return (
                  <div className="MarketLine-wrap__sidebar-list__item" key={i}>
                    <label className="checkbox-container">
                      <input
                        type="checkbox"
                        checked={stock.active}
                        onChange={() => handleActiveClick(i, "benchmark")}
                      />
                      <span className="checkmark"></span>
                    </label>
                    <div className="point" style={{ backgroundColor: stock.color }}></div>
                    <div className="name">{stock.name}</div>
                    <i
                      className="bi bi-x delete"
                      onClick={() => handleDeleteStock(stock, "benchmark")}
                    ></i>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="MarketLine-wrap__content">
          <div className="MarketLine-wrap__content-header">
            <div className="MarketLine-wrap__content-header__info">
              <div className="info">
                <div className="info__value">$ 5,000.00</div>
                <div className="info__label">Portfolio Value</div>
              </div>
              <div className="info">
                <div className="info__value decrease">-$33.54 (-0.21%)</div>
                <div className="info__label">Day Change</div>
              </div>
              <div className="info">
                <div className="info__value increase">+$33.54 (+0.21%)</div>
                <div className="info__label">YTD Change</div>
              </div>
            </div>
            <NavSelect data={buttons} handleSelect={handleDateBtnClick} />
          </div>
          <div className="chart-wrap">
            <div className="MarketLine-wrap__content-chart">
              <LineChart
                stocks={[...stocks.benchmark, ...stocks.portfolio]}
                dateRangeProps={dateRange.map((el) =>
                  el != null ? el.toISOString().replace(/T.*/, "") : null
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketLine;
