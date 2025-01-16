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
          }

          // Fetch Kongswap TVL
          const response = await axios.get('https://api.kongswap.io/api/tokens', {
            params: {
              page: 1,
              limit: 100
            }
          });

          const token = response.data.tokens.find(token => token.canister_id === canisterId);
          const kongswapTvlValue = token && token.metrics && token.metrics.tvl ? parseFloat(token.metrics.tvl) : 0;

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

          const tvlObj = {
            icp_swap: {
              usd: tvlUsdValue,
              icp: parseInt(tvlUsdValue / icpPrice),
            },
            sonic: {
              usd: parseInt(sumSonicUsd),
              icp: parseInt(sumSonicIcp),
            },
            kongswap: {
              usd: parseInt(kongswapTvlValue),
              icp: parseInt(kongswapTvlValue / icpPrice),
            }
          };

          setTvl(tvlObj);
          setKongswapTvl(kongswapTvlValue); // Separate state for Kongswap TVL if needed elsewhere
        }
      } catch (error) {
        console.error('Error fetching TVL:', error);
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