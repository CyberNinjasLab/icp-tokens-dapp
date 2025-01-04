import { makeApiRequest, generateSymbol, parseFullSymbol } from './helpers.js';

const configurationData = {
  "supports_search": true,
  "supports_group_request": false,
  "supports_marks": false,
  "supports_timescale_marks": false,
  "supports_time": true,
  "exchanges": [
      {
          "value": "",
          "name": "All Exchanges",
          "desc": ""
      }
  ],
  "symbols_types": [
      {
          "name": "All types",
          "value": ""
      }
  ],
  "supported_resolutions": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "10",
      "12",
      "15",
      "30",
      "45",
      "60",
      "120",
      "180",
      "240",
      "360",
      "480",
      "720",
      "1D",
      "2D",
      "3D",
      "4D",
      "1W",
      "2W",
      "1M",
      "3M"
  ]
};

class DataFeed {
  symbolInfo = {
    "name": "",
    "ticker": "",
    "description": "",
    "type": "crypto",
    "session": "24x7",
    "timezone": "Etc\/UTC",
    "exchange": "icptokens.net",
    "listed_exchange": "ICP Tokens",
    "has_intraday": true,
    "minmov": 1,
    "pricescale": 10000,
    "supported_resolutions": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "10",
        "12",
        "15",
        "30",
        "45",
        "60",
        "120",
        "180",
        "240",
        "360",
        "480",
        "720",
        "1D",
        "2D",
        "3D",
        "4D",
        "1W",
        "2W",
        "1M",
        "3M"
    ],
    "intraday_multipliers": [
        "1",
        "5",
        "30",
        "60",
        "240",
        "720"
    ],
    "data_status": "streaming"
  };

  constructor(canister_id, currency, tokenData) {
    this.canister_id = canister_id;
    this.currency = currency;

    this.symbolInfo.name = tokenData.name;
    this.symbolInfo.ticker = `${tokenData.symbol}/${currency.toUpperCase()}`
    this.apiBaseUrl = `https://web2.icptokens.net/api/datafeed/${canister_id}/${currency}`;
    this.configurationData = configurationData;
  }

  onReady(callback) {
    setTimeout(() => callback(this.configurationData));
    console.log('[onReady]: Method call');
  }

  searchSymbols(userInput, exchange, symbolType, onResultReadyCallback) {
    console.log('[searchSymbols]: Method call');
    // Note: You'd typically implement actual symbol searching here
    onResultReadyCallback([]);
  }

  async resolveSymbol(symbolName, onSymbolResolvedCallback, onResolveErrorCallback, extension) {
    setTimeout(() => onSymbolResolvedCallback(this.symbolInfo));
  }

  async getBars(symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) {
      // console.log("TICK", resolution, periodParams);

      try {
          // Extract necessary parameters
          const { from, to } = periodParams;
          const symbol = encodeURIComponent(`${symbolInfo.ticker}`);
          
          // Construct the API endpoint URL
          const apiUrl = `https://web2.icptokens.net/api/datafeed/${this.canister_id}/${this.currency}/history?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}&countback=2`;
          
          // Fetch data from the backend API
          const response = await fetch(apiUrl);
          
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();

          
          // Process the data (assuming data structure matches what's expected by onHistoryCallback)
            const bars = data.t.map((time, index) => ({
              time: time * 1000, // Convert to milliseconds
              open: data.o[index],
              high: data.h[index],
              low: data.l[index],
              close: data.c[index],
              volume: data.v[index]
          })).filter(bar => bar.time >= from * 1000 && bar.time < to * 1000);

          if (bars.length === 0) {
              onHistoryCallback([], { noData: true });
          } else {
              onHistoryCallback(bars, { noData: false });
          }
      } catch (error) {
          console.log('[getBars]: Get error', error);
          onErrorCallback(error);
      }
  }

  subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) {
    console.log('[subscribeBars]: Method call with subscriberUID:', subscriberUID);
  }

  unsubscribeBars(subscriberUID) {
    console.log('[unsubscribeBars]: Method call with subscriberUID:', subscriberUID);
  }
}

// Usage example:
// const datafeedInstance = new DataFeed(canister_id, currency);
export default DataFeed;