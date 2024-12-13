import { useState, useContext, useMemo, useCallback } from 'react';
import axios from 'axios';
import { GraphQLClient } from 'graphql-request';
import { GeneralContext } from '../../../contexts/general/General.Context';
import ic from 'ic0';
import { TOKENS_DATA_QUERY } from '../sonic/queries';

const endpoint = process.env.NEXT_PUBLIC_WEB2_API_URL + '/api/sonic';

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

  const sonicVariables = useMemo(() => {
    const now = Math.floor(Date.now() / 1000); // Current timestamp in seconds
    const twoDaysAgoMidnight = new Date();
    twoDaysAgoMidnight.setUTCHours(0, 0, 0, 0);
    twoDaysAgoMidnight.setUTCDate(twoDaysAgoMidnight.getUTCDate() - 2);
    const dateFrom = Math.floor(twoDaysAgoMidnight.getTime() / 1000);

    const todayMidnight = new Date();
    todayMidnight.setUTCHours(0, 0, 0, 0);
    const dateTo = Math.floor(todayMidnight.getTime() / 1000);

    return {
      dateFrom,
      dateTo,
      timestamps: [now, now - 86400], // Current time and 24 hours ago
      limit: 200, // Limit to 200 results
      desc: true,
    };
  }, []);

  const fetchSonicData = useCallback(async () => {
    if (!icpPrice) return;

    try {
      const graphQLClient = new GraphQLClient(endpoint);
      const sonicTokensData = await graphQLClient.request(TOKENS_DATA_QUERY, sonicVariables);

      let sonicTvl = 0;
      let sonicVolume = 0;

      if (sonicTokensData && sonicTokensData.tokens) {
        sonicTokensData.tokens.forEach((token) => {
          const liquidity = parseFloat(token.totalLiquidity) || 0;
          const price = parseFloat(token.derivedPrice) * icpPrice || 0;
          sonicTvl += liquidity * price;
          sonicVolume += parseFloat(token.volume[0]) || 0;
        });
      }

      setTvlAndVolumeData((prevData) => ({
        ...prevData,
        sonic: { tvl: formatValue(sonicTvl), volume24h: formatValue(sonicVolume) },
      }));
    } catch (error) {
      console.error('Error fetching Sonic data:', error);
    }
  }, [icpPrice, sonicVariables]);

  const fetchIcpSwapData = useCallback(async () => {
    try {
      const icpSwapData = await ic('gp26j-lyaaa-aaaag-qck6q-cai').call('getProtocolData');
      const icpSwapTvl = icpSwapData.tvlUSD || 0;
      const icpSwapVolume = icpSwapData.volumeUSD || 0;

      setTvlAndVolumeData((prevData) => ({
        ...prevData,
        icpswap: { tvl: formatValue(icpSwapTvl), volume24h: formatValue(icpSwapVolume) },
      }));
    } catch (error) {
      console.error('Error fetching ICP Swap data:', error);
    }
  }, []);

  const fetchKongSwapData = useCallback(async () => {
    try {
      const kongSwapData = await ic('2ipq2-uqaaa-aaaar-qailq-cai').call('pools', []);
      
      let kongSwapTvl = 0;
      let kongSwapVolume = 0;

      if (kongSwapData.Ok) {
        kongSwapTvl = parseInt(kongSwapData.Ok.total_tvl, 10) / Math.pow(10, 6) || 0;
        kongSwapVolume = parseInt(kongSwapData.Ok.total_24h_volume, 10) / Math.pow(10, 6) || 0;
      }

      setTvlAndVolumeData((prevData) => ({
        ...prevData,
        kongswap: { tvl: formatValue(kongSwapTvl), volume24h: formatValue(kongSwapVolume) },
      }));
    } catch (error) {
      console.error('Error fetching Kong Swap data:', error);
    }
  }, []);

  const fetchIcpExData = useCallback(async () => {
    try {
      const icpExResponse = await axios.get('https://metrics.icpex.org/token/token/list');

      let icpExTvl = 0;
      let icpExVolume24h = 0;

      if (icpExResponse.data.retCode === 1 && icpExResponse.data.data) {
        icpExResponse.data.data.forEach((pool) => {
          icpExTvl += pool.tvl || 0;
          icpExVolume24h += pool.volume24h || 0;
        });
      }

      setTvlAndVolumeData((prevData) => ({
        ...prevData,
        icpex: { tvl: formatValue(icpExTvl), volume24h: formatValue(icpExVolume24h) },
      }));
    } catch (error) {
      console.error('Error fetching ICPex data:', error);
    }
  }, []);

  const fetchIcLightData = useCallback(async () => {
    try {
      const icLightTvlResponse = await axios.get('https://gwhbq-7aaaa-aaaar-qabya-cai.raw.icp0.io/v1/pools/tvls');
      const icLightVolumeResponse = await axios.get('https://gwhbq-7aaaa-aaaar-qabya-cai.raw.icp0.io/v1/latest');

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

      setTvlAndVolumeData((prevData) => ({
        ...prevData,
        iclight: { tvl: formatValue(icLightTvl), volume24h: formatValue(icLightVolume) },
      }));
    } catch (error) {
      console.error('Error fetching ICLight data:', error);
    }
  }, []);

  const fetchAllDexData = useCallback(async () => {
    await Promise.all([
      fetchSonicData(),
      fetchIcpSwapData(),
      fetchKongSwapData(),
      fetchIcpExData(),
      fetchIcLightData(),
    ]);
  }, [icpPrice]);

  return {
    tvlAndVolumeData,
    fetchSonicData,
    fetchIcpSwapData,
    fetchKongSwapData,
    fetchIcpExData,
    fetchIcLightData,
    fetchAllDexData
  };
};

export default useTvlAndVolume;
