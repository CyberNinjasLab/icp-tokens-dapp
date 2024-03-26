import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import { isMobile } from 'react-device-detect';
import { GeneralContext } from '../../../contexts/general/General.Context';

const TokenLogoAndName = ({ data }) => {
  const { getTokenName }  = useContext(GeneralContext)
  const tokenName = getTokenName(data)
  
  // Conditionally render name and symbol based on equality and device type
  const renderNameAndSymbol = () => {
    if (tokenName != data.symbol) {
      return isMobile ? (
        <Typography>{data.symbol}</Typography>
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
    } else {
      // If name and symbol are equal, just render the symbol
      return (
        <Typography className="text-30" component="span">
          {tokenName}
        </Typography>
      );
    }
  };

  return (
    <Typography component="span" className="inline-flex h-full w-full items-center">
      {data.logo && (
        <img
          alt={`${data.name} Logo`}
          src={`${process.env.NEXT_PUBLIC_WEB2_API_URL}/storage/${data.logo}`}
          className="block w-30 h-30 mr-2 brightness-110 rounded-full"
          style={{ width: isMobile ? '26px' : '30px', height: isMobile ? '26px' : '30px' }}
        />
      )}
      {renderNameAndSymbol()}
    </Typography>
  );
};

export default TokenLogoAndName;
