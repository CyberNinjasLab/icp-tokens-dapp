import { useEffect, useState, useContext, useMemo } from 'react';
import axios from 'axios';
import { GeneralContext } from '../../../contexts/general/General.Context';
import ic from 'ic0';

const useTvlAndVolume = (canisterId) => {
  const { icpPrice } = useContext(GeneralContext);
  const [tvlAndVolume, setTvlAndVolume] = useState({ tvl: null, volume24h: null });

  useEffect(() => {
    const fetchTvlAndVolume = async () => {
      try {
        if (icpPrice) {
          // Define requests
          const requests = [
            // ICP Swap data
            ic('gp26j-lyaaa-aaaag-qck6q-cai').call('getProtocolData'),

            // Kong Swap data
            ic('2ipq2-uqaaa-aaaar-qailq-cai').call('pools'),

            // ICPex data
            axios.get('https://api.icpex.com/v1/tokens/tvl'),

            // ICLight TVL data
            axios.get('https://gwhbq-7aaaa-aaaar-qabya-cai.raw.icp0.io/v1/pools/tvls'),

            // ICLight Volume data
            axios.get('https://gwhbq-7aaaa-aaaar-qabya-cai.raw.icp0.io/v1/latest'),
          ];

          // Execute all requests in parallel
          const [icpSwapData, kongSwapData, icpExResponse, icLightTvlResponse, icLightVolumeResponse] = await Promise.all(requests);

          // Process each response
          let totalTvl = 0;
          let volume24h = 0;

          // Process ICP Swap data
          totalTvl += icpSwapData.tvlUSD;
          volume24h += icpSwapData.volumeUSD;

          // Process Kong Swap data
          if (kongSwapData.Ok) {
            totalTvl += parseInt(kongSwapData.Ok.total_tvl, 10);
            volume24h += parseInt(kongSwapData.Ok.total_24h_volume, 10);
          }

          // Process ICPex data
          if (icpExResponse.data.retCode === 1 && icpExResponse.data.data) {
            icpExResponse.data.data.forEach((pool) => {
              if (pool.baseToken === canisterId || pool.quoteToken === canisterId) {
                totalTvl += pool.tvl * icpPrice; // convert to USD
                if (pool.volume24h) {
                  volume24h += pool.volume24h * icpPrice;
                }
              }
            });
          }

          // Process ICLight TVL data
          if (icLightTvlResponse.data && icLightTvlResponse.data.pairs) {
            icLightTvlResponse.data.pairs.forEach((res) => {
              if (res.pair && !res.pair.toLowerCase().includes('test')) {
                totalTvl += parseFloat(res.tvl);
              }
            });
          }

          // Process ICLight Volume data
          if (icLightVolumeResponse.data) {
            for (let key in icLightVolumeResponse.data) {
              volume24h += parseFloat(icLightVolumeResponse.data[key].usd_24h_volume);
            }
          }

          // Final TVL and volume structure
          setTvlAndVolume({
            tvl: {
              total: totalTvl,
              sonic: null,
              icp_swap: icpSwapData.tvlUSD,
              kong_swap: parseInt(kongSwapData.Ok.total_tvl, 10),
              icp_ex: null,
              ic_light: null
            },
            volume24h,
          });
        }
      } catch (error) {
        console.error('Error fetching TVL and Volume:', error);
        setTimeout(fetchTvlAndVolume, 30000); // Retry after 30 seconds
      }
    };

    if (canisterId && icpPrice) {
      fetchTvlAndVolume();
    }
  }, [canisterId, icpPrice]);

  return { tvlAndVolume };
};

export default useTvlAndVolume;
