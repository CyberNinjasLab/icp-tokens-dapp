import React from 'react';
import Typography from '@mui/material/Typography';
import { isMobile } from 'react-device-detect';

const TokenLogoAndName = ({ data }) => {
  // Conditionally render name and symbol based on equality and device type
  const renderNameAndSymbol = () => {
    if (data.name !== data.symbol) {
      return isMobile ? (
        <Typography>{data.symbol}</Typography>
      ) : (
        <>
          <Typography className="text-30" component="span" sx={{ mr: 1 }}>
            {data.name}
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
          {data.symbol}
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
          style={{ width: '30px', height: '30px' }}
        />
      )}
      {renderNameAndSymbol()}
    </Typography>
  );
};

export default TokenLogoAndName;
