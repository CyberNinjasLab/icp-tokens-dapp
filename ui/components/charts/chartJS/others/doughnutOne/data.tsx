export interface IDataAssets {
  title: string;
  style: {
    background: string;
  };
  percent: number;
}

// Define colors as variables
const bitcoinColor = "#FFB800";
const ethereumColor = "#E85DFF";
const shardColor = "#FF20A6";
const binanceColor = "#06F";
const dashColor = "#10A9FF";
const loadingColor = "#9baeca";

export const dataAssets = [
  [
    {
      title: "Bitcoin ",
      style: {
        background: bitcoinColor,
      },
      percent: 24,
    },
    {
      title: "Ethereum",
      style: {
        background: ethereumColor,
      },
      percent: 18,
    },
    {
      title: "Shard",
      style: {
        background: shardColor,
      },
      percent: 32,
    },
    {
      title: "Binance",
      style: {
        background: binanceColor,
      },
      percent: 26,
    },
    {
      title: "Dash",
      style: {
        background: dashColor,
      },
      percent: 5,
    },
  ],
  [
    {
      title: "Bitcoin ",
      style: {
        background: bitcoinColor,
      },
      percent: 41,
    },
    {
      title: "Ethereum",
      style: {
        background: ethereumColor,
      },
      percent: 42,
    },
    {
      title: "Shard",
      style: {
        background: shardColor,
      },
      percent: 17,
    },
    {
      title: "Binance",
      style: {
        background: binanceColor,
      },
      percent: 18,
    },
    {
      title: "Dash",
      style: {
        background: dashColor,
      },
      percent: 10,
    },
  ],
  [
    {
      title: "Bitcoin ",
      style: {
        background: bitcoinColor,
      },
      percent: 10,
    },
    {
      title: "Ethereum",
      style: {
        background: ethereumColor,
      },
      percent: 15,
    },
    {
      title: "Shard",
      style: {
        background: shardColor,
      },
      percent: 30,
    },
    {
      title: "Binance",
      style: {
        background: binanceColor,
      },
      percent: 45,
    },
    {
      title: "Dash",
      style: {
        background: dashColor,
      },
      percent: 20,
    },
  ],
  [
    {
      title: "Bitcoin ",
      style: {
        background: loadingColor,
      },
      percent: 0,
    },
    {
      title: "Ethereum",
      style: {
        background: loadingColor,
      },
      percent: 0,
    },
    {
      title: "Shard",
      style: {
        background: loadingColor,
      },
      percent: 0,
    },
    {
      title: "Binance",
      style: {
        background: loadingColor,
      },
      percent: 0,
    },
  ],
];
