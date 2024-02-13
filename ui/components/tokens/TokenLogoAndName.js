import React from 'react';
import Typography from '@mui/material/Typography';
import { isMobile } from 'react-device-detect';

const TokenLogoAndName = ({ value, data }) => {
  return (
    <Typography component="span" className="inline-flex h-full w-full items-center">
      {data.logo && (
        <img
          alt={`${data.name} Logo`}
          src={`http://127.0.0.1:8000/storage/${data.logo}`}
          className="block w-30 h-30 mr-2 brightness-110 rounded-full"
          style={{ width: '30px', height: '30px' }}
        />
      )}
      {isMobile ? (
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
      )}
    </Typography>
  );
};

export default TokenLogoAndName;
