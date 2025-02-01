import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import { GeneralContext } from '../../../contexts/general/General.Context';
import useWindowWidthUnder from '../../hooks/useWindowWidthUnder';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const TokenLogoAndName = ({ data, showFullContent, logoSizeClass='w-6 h-6' }) => {
  const { getTokenName }  = useContext(GeneralContext)
  const tokenName = getTokenName(data)
  const isWindowUnder800 = useWindowWidthUnder(800);
  
  // Conditionally render name and symbol based on equality and device type
  const renderNameAndSymbol = () => {
    return isWindowUnder800 && !showFullContent ? (
      <Typography>
        {data.symbol.toLowerCase() == tokenName.toLowerCase() ? tokenName : data.symbol}
      </Typography>
    ) : (
      <>
        <Typography className="text-30" component="span" sx={{ mr: 1 }}>
          {tokenName}
        </Typography>
        <Typography
          className="text-30"
          component="span"
          color="darkgray"
          fontSize={12}
        >
          {data.symbol}
        </Typography>
      </>
    );
  };

  return (
    <Typography component="span" className="inline-flex h-full w-full items-center">
      {data.logo && (
        <LazyLoadImage
          alt={`${data.name} Logo`}
          // height={image.height}
          src={`${process.env.NEXT_PUBLIC_WEB2_API_URL}/storage/${data.logo}`}
          // width={image.width} 
          className={`block ${logoSizeClass} mr-2 brightness-110 rounded-full`}
        />
      )}
      {renderNameAndSymbol()}
    </Typography>
  );
};

export default TokenLogoAndName;
