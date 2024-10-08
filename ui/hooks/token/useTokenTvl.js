import { useEffect, useState, useContext, useMemo } from 'react';
import { GeneralContext } from '../../../contexts/general/General.Context';
import useSonicDexGraphQL from '../sonic/useSonicDexGraphQL';
import { TOKEN_DATA_QUERY } from '../sonic/queries';
import ic from 'ic0';

const useTokenTvl = (canisterId) => {
  const { icpPrice } = useContext(GeneralContext);
  const [tvl, setTvl] = useState(null);

  const variables = useMemo(() => {
    const now = Math.floor(Date.now() / 1000);  // Current timestamp in seconds
    const dayAgo = now - 86400;  // 1 day ago (86400 seconds in a day)
    const weekAgo = now - 86400 * 7;  // 1 week ago (7 days ago)
    
    return {
      tokenId: canisterId,
      now,
      weekAgo,
      dayAgo,
    };
  }, [canisterId]);

  const { data: sonicTvlData, loading: sonicTvlLoading, error: sonicTvlError } = useSonicDexGraphQL(TOKEN_DATA_QUERY, variables);

  useEffect(() => {
    const fetchTokenTvl = async () => {
      try {
        if (!sonicTvlLoading && icpPrice) {
          let sumSonicUsd = 0;
          let sumSonicIcp = 0;

          if (sonicTvlData) {
            for (const sonicPool of sonicTvlData.token.pairBase.length ? sonicTvlData.token.pairBase : sonicTvlData.token.pairQuote) {
              if (sonicPool.reserveICP && sonicPool.reserveUSD) {
                sumSonicUsd += parseFloat(sonicPool.reserveUSD);
                sumSonicIcp += parseFloat(sonicPool.reserveICP);
              }
            }
          }

          const canisterIcpswap1 = ic('gp26j-lyaaa-aaaag-qck6q-cai');
          const canisterIcpswap2 = ic('ggzvv-5qaaa-aaaag-qck7a-cai');

          const icpSwapAllPoolsTvl = await canisterIcpswap1.call('getAllPoolTvl');
          const icpSwapAllPools = await canisterIcpswap2.call('getAllPools');

          let sumIcpSwap = 0;

          for (const poolData of icpSwapAllPools) {
            if (poolData.token0Id == canisterId || poolData.token1Id == canisterId) {
              for (const poolTvl of icpSwapAllPoolsTvl) {
                if (poolTvl[0] == poolData.pool) {
                  sumIcpSwap += poolTvl[1];
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
          };

          setTvl(tvlObj);
        }
      } catch (error) {
        console.error('Error fetching TVL:', error);
        setTimeout(fetchTokenTvl, 30000); // Retry after 30s
      }
    };

    if (canisterId && icpPrice) {
      fetchTokenTvl();
    }
  }, [canisterId, icpPrice, sonicTvlLoading]);

  return { tvl, sonicTvlLoading, sonicTvlError };
};

export default useTokenTvl;
