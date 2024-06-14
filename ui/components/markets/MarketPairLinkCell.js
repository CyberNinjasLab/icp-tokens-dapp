// Import React and any other dependencies
import React from 'react';
import Typography from '@mui/material/Typography';
import useWindowWidthUnder from '../../hooks/useWindowWidthUnder';
import { Launch } from '@mui/icons-material';
import Link from 'next/link';

const MarketPairLinkCell = ({params, token}) => {
  const marketSwapLinksMapping = {
    icpswap: 'https://app.icpswap.com/swap?input=ryjl3-tyaaa-aaaaa-aaaba-cai&output=',
    sonic: "https://app.sonic.ooo/swap",
    iclight: `https://iclight.io/ICDex/${token.symbol}/ICP`,
  }
  
  const isWindowUnder800 = useWindowWidthUnder(800);

  return (
    <Typography component="span" className="inline-flex h-full w-full items-center">
      <Link href={marketSwapLinksMapping[params.data.key]} target="_blank" className='text-primary'>
        {token.symbol}/ICP<Launch fontSize='small' className='ml-1 scale-90 relative bottom-[1px]' />
      </Link>
    </Typography>
  );
};

// Export the component
export default MarketPairLinkCell;
