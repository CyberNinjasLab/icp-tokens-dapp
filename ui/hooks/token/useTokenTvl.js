import { useEffect, useState, useContext, useMemo } from 'react';
import { GeneralContext } from '../../../contexts/general/General.Context';
import useSonicDexGraphQL from '../sonic/useSonicDexGraphQL';
import { TOKEN_DATA_QUERY } from '../sonic/queries';
import ic from 'ic0';
import axios from 'axios';

const useTokenTvl = (canisterId) => {
  const { icpPrice } = useContext(GeneralContext);
  const [tvl, setTvl] = useState(null);
  const [kongswapTvl, setKongswapTvl] = useState(null);

  const sonicTokenVariables = useMemo(() => {
    const now = Math.floor(Date.now() / 1000); // Current timestamp in seconds
    const todayMidnight = new Date();
    todayMidnight.setUTCHours(0, 0, 0, 0);
    const dateTo = Math.floor(todayMidnight.getTime() / 1000);

    return {
      tokenId: canisterId, // Replace with dynamic tokenId if needed
      timestamps: [now, now - 86400], // Current time and 24 hours ago
      dateFrom: 0, // Example start from epoch, update as needed
      dateTo,
    };
  }, [canisterId]);

  const { data: sonicTvlData, loading: sonicTvlLoading, error: sonicTvlError } = useSonicDexGraphQL(TOKEN_DATA_QUERY, sonicTokenVariables);

  useEffect(() => {
    const fetchTVL = async () => {
      try {
        if (!sonicTvlLoading && icpPrice) {
          let sonicData = null;
          let kongswapData = null;
          let icpSwapData = null;

          // Fetch Sonic TVL
          try {
            let sumSonicUsd = 0;
            let sumSonicIcp = 0;

            if (sonicTvlData) {
              for (const sonicPool of sonicTvlData.token.pairBase.length ? sonicTvlData.token.pairBase : sonicTvlData.token.pairQuote) {
                if (sonicPool.reserveICP && sonicPool.reserveUSD) {
                  if(sonicPool.token0.symbol != sonicPool.token1.symbol) {
                    sumSonicUsd += parseFloat(sonicPool.reserveUSD);
                    sumSonicIcp += parseFloat(sonicPool.reserveICP);
                  }
                }
              }
              sonicData = {
                usd: parseInt(sumSonicUsd),
                icp: parseInt(sumSonicIcp),
              };
            }
          } catch (error) {
            console.error('Error fetching Sonic TVL:', error);
            throw error;
          }

          // Fetch Kongswap TVL
          try {
            const response = await axios.get('https://api.kongswap.io/api/tokens', {
              params: {
                page: 1,
                limit: 1000
              }
            });

            console.log(response);

            const token = response.data.items.find(token => token.canister_id === canisterId);
            const kongswapTvlValue = token && token.metrics && token.metrics.tvl ? parseFloat(token.metrics.tvl) : 0;
            
            kongswapData = {
              usd: parseInt(kongswapTvlValue),
              icp: parseInt(kongswapTvlValue / icpPrice),
            };
            setKongswapTvl(kongswapTvlValue);
          } catch (error) {
            console.error('Error fetching Kongswap TVL:', error);
            throw error;
          }

          // Fetch ICPSwap TVL
          try {
            const canisterIcpswap1 = ic('gp26j-lyaaa-aaaag-qck6q-cai');
            const canisterIcpswap2 = ic('ggzvv-5qaaa-aaaag-qck7a-cai');

            const icpSwapAllPoolsTvl = await canisterIcpswap1.call('getAllPoolTvl');
            const icpSwapAllPools = await canisterIcpswap2.call('getAllPools');

            let sumIcpSwap = 0;

            for (const poolData of icpSwapAllPools) {
              if (poolData.token0Id == canisterId || poolData.token1Id == canisterId) {
                for (const poolTvl of icpSwapAllPoolsTvl) {
                  if (poolTvl[0] == poolData.pool) {
                    if(poolData.token0Symbol != poolData.token1Symbol) {
                      sumIcpSwap += poolTvl[1];
                    }
                    break;
                  }
                }
              }
            }

            const tvlUsdValue = parseInt(sumIcpSwap);
            icpSwapData = {
              usd: tvlUsdValue,
              icp: parseInt(tvlUsdValue / icpPrice),
            };
          } catch (error) {
            console.error('Error fetching ICPSwap TVL:', error);
            throw error;
          }

          const tvlObj = {
            icp_swap: icpSwapData,
            sonic: sonicData,
            kongswap: kongswapData
          };

          setTvl(tvlObj);
        }
      } catch (error) {
        console.error('Error in main TVL fetch:', error);
        setTimeout(fetchTVL, 30000); // Retry after 30s
      }
    };

    if (canisterId && icpPrice) {
      fetchTVL();
    }
  }, [canisterId, icpPrice, sonicTvlLoading]);

  return { tvl, sonicTvlLoading, sonicTvlError, kongswapTvl };
};

export default useTokenTvl;