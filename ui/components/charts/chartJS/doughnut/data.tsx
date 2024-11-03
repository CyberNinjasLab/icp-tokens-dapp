export interface IDataAssets {
  title: string;
  crypto: string;
  style: {
    background: string;
    width: string;
  };
  percent: number;
}

// Define colors as variables
const bitcoinColor = "#FFB800";
const ethereumColor = "#E85DFF";
const shardColor = "#FF20A6";
const binanceColor = "#06F";
const loadingColor = "#9baeca";

export const dataAssets = [
  [
    {
      title: "Bitcoin ",
      crypto: "(BTC)",
      style: {
        background: bitcoinColor,
        width: "24%",
      },
      percent: 24,
    },
    {
      title: "Ethereum",
      crypto: "(ETH)",
      style: {
        background: ethereumColor,
        width: "18%",
      },
      percent: 18,
    },
    {
      title: "Shard",
      crypto: "(SHARD)",
      style: {
        background: shardColor,
        width: "32%",
      },
      percent: 32,
    },
    {
      title: "Binance",
      crypto: "(BNB)",
      style: {
        background: binanceColor,
        width: "26%",
      },
      percent: 26,
    },
  ],
  [
    {
      title: "Bitcoin ",
      crypto: "(BTC)",
      style: {
        background: bitcoinColor,
        width: "41%",
      },
      percent: 41,
    },
    {
      title: "Ethereum",
      crypto: "(ETH)",
      style: {
        background: ethereumColor,
        width: "42%",
      },
      percent: 42,
    },
    {
      title: "Shard",
      crypto: "(SHARD)",
      style: {
        background: shardColor,
        width: "17%",
      },
      percent: 17,
    },
    {
      title: "Binance",
      crypto: "(BNB)",
      style: {
        background: binanceColor,
        width: "18%",
      },
      percent: 18,
    },
  ],
  [
    {
      title: "Bitcoin ",
      crypto: "(BTC)",
      style: {
        background: bitcoinColor,
        width: "10%",
      },
      percent: 10,
    },
    {
      title: "Ethereum",
      crypto: "(ETH)",
      style: {
        background: ethereumColor,
        width: "15%",
      },
      percent: 15,
    },
    {
      title: "Shard",
      crypto: "(SHARD)",
      style: {
        background: shardColor,
        width: "30%",
      },
      percent: 30,
    },
    {
      title: "Binance",
      crypto: "(BNB)",
      style: {
        background: binanceColor,
        width: "45%",
      },
      percent: 45,
    },
  ],
  [
    {
      title: "Bitcoin ",
      crypto: "(BTC)",
      style: {
        background: loadingColor,
        width: "0%",
      },
      percent: 0,
    },
    {
      title: "Ethereum",
      crypto: "(ETH)",
      style: {
        background: loadingColor,
        width: "0%",
      },
      percent: 0,
    },
    {
      title: "Shard",
      crypto: "(SHARD)",
      style: {
        background: loadingColor,
        width: "0%",
      },
      percent: 0,
    },
    {
      title: "Binance",
      crypto: "(BNB)",
      style: {
        background: loadingColor,
        width: "0%",
      },
      percent: 0,
    },
  ],
];
