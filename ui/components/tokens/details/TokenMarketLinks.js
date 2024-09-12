/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import useTokenMarketsData from '../../../hooks/token/useTokenMarketsData'; // Import your custom hook
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';

// Custom Tooltip
const CustomTooltip = styled(Tooltip)(({ theme }) => ({
  tooltip: {
    backgroundColor: 'dark-gray',
    color: 'white',
    boxShadow: theme.shadows[1],
    fontSize: 12,
  },
  arrow: {
    color: 'dark-gray', // Set the arrow color to match the tooltip background
  },
}));

// Custom IconButton
const CustomIconButton = styled(IconButton)(({ theme }) => ({
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)', // Adjust hover background
  },
}));

function TokenMarketLinks({ token }) {
  const [formattedMarketsData, setFormattedMarketsData] = useState([]);

  // Fetch token markets data using the custom hook
  const { tokenMarketsData: tokenMarkets, isLoading, error } = useTokenMarketsData(token?.canister_id);

  // Mapping the markets to the corresponding swap links
  const marketSwapLinksMapping = {
    icpswap: 'https://app.icpswap.com/swap?input=ryjl3-tyaaa-aaaaa-aaaba-cai&output=' + token.canister_id,
    sonic: "https://app.sonic.ooo/swap",
    iclight: `https://iclight.io/ICDex/${token.symbol}/ICP`,
  };

  // Mapping the markets to their logos
  const marketsLogoMapping = {
    icpswap: 'icpswap_logo.webp',
    sonic: "sonic-dex_logo.webp",
    iclight: "icdex_logo.webp",
  };

  useEffect(() => {
    if (tokenMarkets) {
      // Sort the markets by 24h Volume in descending order
      const sortedMarkets = tokenMarkets.sort((a, b) => {
        return b.volume['24h']['usd'] - a.volume['24h']['usd'];
      });

      // Format the markets data (assuming market objects have a 'key' field for mapping logos)
      const newData = sortedMarkets.map((market, index) => ({
        ...market,
        '#': index + 1,
      }));

      setFormattedMarketsData(newData);
    }
  }, [tokenMarkets]);

  // Display loading or error message if necessary
  // if (isLoading) return <div className='min-h-[46px]'><p>Loading markets data...</p></div>;
  // if (error) return <div className='min-h-[46px]'><p>Error loading markets: {error}</p></div>;

  return (
    <div className="markets-list flex flex-row items-center justify-start min-h-[46px]">
      {formattedMarketsData.map((market, index) => {
        // Fetching the appropriate link from the swap links mapping
        const marketLink = marketSwapLinksMapping[market.key];
        const marketLogo = marketsLogoMapping[market.key];

        if (!marketLink || !marketLogo) return null; // If no link or logo is available, skip this entry

        return (
          <CustomTooltip key={index} title={market.display_name} arrow>
            <CustomIconButton
              component="a"
              href={marketLink}
              target="_blank"
              rel="noopener noreferrer"
              color="default"
              size="small"
            >
              <img
                alt={`${market.display_name} Logo`}
                src={`/logos/${marketLogo}`}
                className="block brightness-110 rounded-full"
                style={{
                  width: '36px',
                  height: '36px',
                }}
              />
            </CustomIconButton>
          </CustomTooltip>
        );
      })}
    </div>
  );
}

export default TokenMarketLinks;
