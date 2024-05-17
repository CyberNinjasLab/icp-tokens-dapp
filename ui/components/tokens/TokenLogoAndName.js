import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import { GeneralContext } from '../../../contexts/general/General.Context';
import useWindowWidthUnder from '../../hooks/useWindowWidthUnder';

const TokenLogoAndName = ({ data, showFullContent }) => {
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
        <img
          alt={`${data.name} Logo`}
          src={`${process.env.NEXT_PUBLIC_WEB2_API_URL}/storage/${data.logo}`}
          className="block w-30 h-30 mr-2 brightness-110 rounded-full"
          style={{ width: isWindowUnder800 ? '26px' : '30px', height: isWindowUnder800 ? '26px' : '30px' }}
        />
      )}
      {renderNameAndSymbol()}
    </Typography>
  );
};

export default TokenLogoAndName;
