import React, { useContext } from 'react';
import { GeneralContext } from '../../../../contexts/general/General.Context';
import { Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const TokenHeader = ({ tokenData }) => {
  const {formatPrice} = useContext(GeneralContext);

  return (
    <>
      <div className="flex items-center gap-2 mb-3">
      {tokenData.logo && (
      <img
          src={`http://127.0.0.1:8000/storage/${tokenData.logo}`}
          alt={`${tokenData.symbol}-icon`}
          className="w-10 h-10 rounded-full"
        />
      )}
        <Typography variant="h7">{tokenData?.name} ({tokenData?.symbol})</Typography>
      </div>
      <div className="flex gap-6 sm:gap-8 items-center mb-3">
        <Typography variant="body1" fontSize="medium">
          {formatPrice(tokenData.price)}
        </Typography>
        <Typography color={tokenData?.change_24h > 0 ? 'green' : 'error'}>
          {tokenData?.change_24h > 0 ? (
            <ArrowUpwardIcon fontSize="small" />
          ) : (
            <ArrowDownwardIcon fontSize="small" />
          )}
          {tokenData?.change_24h}% (24h)
        </Typography>
        
        <Typography color={tokenData?.change_7d > 0 ? 'green' : 'error'} className='hidden sm:block'>
          {tokenData?.change_7d > 0 ? (
            <ArrowUpwardIcon fontSize="small" />
          ) : (
            <ArrowDownwardIcon fontSize="small" />
          )}
          {tokenData?.change_7d}% (7d)
        </Typography>   

        <Typography color={tokenData?.change_30d > 0 ? 'green' : 'error'} className='hidden md:block'>
          {tokenData?.change_30d > 0 ? (
            <ArrowUpwardIcon fontSize="small" />
          ) : (
            <ArrowDownwardIcon fontSize="small" />
          )}
          {tokenData?.change_30d}% (30d)
        </Typography>  

        <Typography color={tokenData?.change_90d > 0 ? 'green' : 'error'} className='hidden md:block'>
          {tokenData?.change_90d > 0 ? (
            <ArrowUpwardIcon fontSize="small" />
          ) : (
            <ArrowDownwardIcon fontSize="small" />
          )}
          {tokenData?.change_90d}% (90d)
        </Typography>
      </div>
    </>
  );
};

export default TokenHeader;
