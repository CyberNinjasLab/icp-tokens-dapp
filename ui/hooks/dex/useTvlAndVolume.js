import { useEffect, useState, useContext, useMemo } from 'react';
import axios from 'axios';
import { GraphQLClient } from 'graphql-request';
import { GeneralContext } from '../../../contexts/general/General.Context';
import ic from 'ic0';
import { TOKENS_DATA_QUERY } from '../sonic/queries';

// Define the endpoint for the Sonic API
const endpoint = process.env.NEXT_PUBLIC_WEB2_API_URL + '/api/sonic';

// Helper function to format numbers with dollar prefix, thousands (k), and millions (m)
const formatValue = (value) => {
  const num = parseFloat(value);
  if (isNaN(num)) return '$0.00';

  if (num >= 1e6) {
    return `$${(num / 1e6).toFixed(2)}m`;
  } else if (num >= 1e3) {
    return `$${(num / 1e3).toFixed(2)}k`;
  } else {
    return `$${num.toFixed(2)}`;
  }
};

const useTvlAndVolume = () => {
  const { icpPrice } = useContext(GeneralContext);
  const [tvlAndVolumeData, setTvlAndVolumeData] = useState({
    icpswap: { tvl: null, volume24h: null },
    kongswap: { tvl: null, volume24h: null },
    icpex: { tvl: null, volume24h: null },
    iclight: { tvl: null, volume24h: null },
    sonic: { tvl: null, volume24h: null },
  });

  // Define variables for TOKENS_DATA_QUERY
  const sonicVariables = useMemo(() => {
    const now = Math.floor(Date.now() / 1000); // Current timestamp in seconds
    const twoDaysAgo = now - 86400 * 2; // 2 days ago
    const limit = 200; // Define the number of tokens to retrieve

    return {
      now,
      twoDaysAgo,
      limit,
    };
  }, []);

  useEffect(() => {
    const fetchTvlAndVolume = async () => {
      try {
        if (icpPrice) {
          // Define an async function to fetch GraphQL data for Sonic
          const fetchSonicTokensData = async () => {
            const graphQLClient = new GraphQLClient(endpoint, {
              headers: {
                'Accept-Encoding': 'gzip, deflate, br, zstd',
                'Accept-Language': 'en-GB,en;q=0.9,en-US;q=0.8,bg;q=0.7',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
                'Content-Type': 'application/json',
                'Origin': 'https://data.sonic.ooo',
                'Referer': 'https://data.sonic.ooo/',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
              },
            });
            return await graphQLClient.request(TOKENS_DATA_QUERY, sonicVariables);
          };

          // Define requests array, including the Sonic API data fetch
          const requests = [
            fetchSonicTokensData(),

            // ICP Swap data
            ic('gp26j-lyaaa-aaaag-qck6q-cai').call('getProtocolData'),

            // Kong Swap data
            ic('2ipq2-uqaaa-aaaar-qailq-cai').call('pools', []),

            // ICPex data
            axios.get('https://metrics.icpex.org/token/token/list'),

            // ICLight TVL data
            axios.get('https://gwhbq-7aaaa-aaaar-qabya-cai.raw.icp0.io/v1/pools/tvls'),

            // ICLight Volume data
            axios.get('https://gwhbq-7aaaa-aaaar-qabya-cai.raw.icp0.io/v1/latest'),
          ];

          // Execute all requests in parallel
          const [
            sonicTokensData,
            icpSwapData,
            kongSwapData,
            icpExResponse,
            icLightTvlResponse,
            icLightVolumeResponse,
          ] = await Promise.all(requests);

          // Extract ICP Swap data
          const icpSwapTvl = icpSwapData.tvlUSD || 0;
          const icpSwapVolume = icpSwapData.volumeUSD || 0;

          let sonicTvl = 0;
          let sonicVolume = 0;
          // Process sonicTokensData to calculate totalLiquidity * derivedPrice and volume24Hr
          if (sonicTokensData && sonicTokensData.tokens) {
            sonicTokensData.tokens.forEach((token) => {
              const liquidity = parseFloat(token.totalLiquidity) || 0;
              const price = parseFloat(token.derivedPrice) * icpPrice || 0;
              sonicTvl += liquidity * price; // Calculate TVL
              sonicVolume += parseFloat(token.volume24Hr) || 0; // Sum volume
            });
          }

          // Process other responses as before (e.g., kongSwapData, icpExResponse, etc.)
          let kongSwapTvl = 0;
          let kongSwapVolume = 0;
          if (kongSwapData.Ok) {
            kongSwapTvl = parseInt(kongSwapData.Ok.total_tvl, 10) / Math.pow(10, 6) || 0;
            kongSwapVolume = parseInt(kongSwapData.Ok.total_24h_volume, 10) / Math.pow(10, 6) || 0;
          }

          let icpExTvl = 0;
          let icpExVolume24h = 0;
          if (icpExResponse.data.retCode === 1 && icpExResponse.data.data) {
            icpExResponse.data.data.forEach((pool) => {
              icpExTvl += pool.tvl || 0;
              icpExVolume24h += pool.volume24h || 0;
            });
          }

          let icLightTvl = 0;
          let icLightVolume = 0;
          if (icLightTvlResponse.data && icLightTvlResponse.data.pairs) {
            icLightTvlResponse.data.pairs.forEach((res) => {
              if (res.pair && !res.pair.toLowerCase().includes('test')) {
                icLightTvl += parseFloat(res.tvl) || 0;
              }
            });
          }

          if (icLightVolumeResponse.data) {
            for (let key in icLightVolumeResponse.data) {
              icLightVolume += parseFloat(icLightVolumeResponse.data[key].usd_24h_volume) || 0;
            }
          }

          // Apply formatting to all tvl and volume values
          setTvlAndVolumeData({
            icpswap: { tvl: formatValue(icpSwapTvl), volume24h: formatValue(icpSwapVolume) },
            kongswap: { tvl: formatValue(kongSwapTvl), volume24h: formatValue(kongSwapVolume) },
            icpex: { tvl: formatValue(icpExTvl), volume24h: formatValue(icpExVolume24h) },
            iclight: { tvl: formatValue(icLightTvl), volume24h: formatValue(icLightVolume) },
            sonic: { tvl: formatValue(sonicTvl), volume24h: formatValue(sonicVolume) },
          });
        }
      } catch (error) {
        console.error('Error fetching TVL and Volume:', error);
        setTimeout(fetchTvlAndVolume, 30000); // Retry after 30 seconds
      }
    };

    if (icpPrice) {
      fetchTvlAndVolume();
    }
  }, [icpPrice, sonicVariables]);

  return tvlAndVolumeData;
};

export default useTvlAndVolume;
