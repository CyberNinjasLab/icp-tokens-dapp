// Import React and any other dependencies
import React from 'react';
import Typography from '@mui/material/Typography';
import useWindowWidthUnder from '../../hooks/useWindowWidthUnder';

const MarketLogoAndNameCell = (params) => {
  const marketsLogoMapping = {
    icpswap: 'icpswap_logo.webp',
    sonic: "sonic-dex_logo.webp",
    iclight: "icdex_logo.webp",
  }
  
  const isWindowUnder800 = useWindowWidthUnder(800);

  return (
    <Typography component="span" className="inline-flex h-full w-full items-center">
      <img
          alt={`${params.data.display_name} Logo`}
          src={`/logos/${marketsLogoMapping[params.data.key]}`}
          className="block w-30 h-30 mr-2 brightness-110 rounded-full"
          style={{ width: isWindowUnder800 ? '26px' : '30px', height: isWindowUnder800 ? '26px' : '30px' }}
      /> {params.value}
    </Typography>
  );
};

// Export the component
export default MarketLogoAndNameCell;
