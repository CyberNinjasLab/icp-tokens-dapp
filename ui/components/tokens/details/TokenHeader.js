import React, { useContext } from 'react';
import { GeneralContext } from '../../../../contexts/general/General.Context';
import { Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const TokenHeader = ({ tokenData }) => {
  const {formatPrice, getTokenName} = useContext(GeneralContext);
  const tokenName = getTokenName(tokenData)

  return (
    <>
      <div className="flex items-center gap-2 mb-3">
      {tokenData.logo && (
      <img
          src={`${process.env.NEXT_PUBLIC_WEB2_API_URL}/storage/${tokenData.logo}`}
          alt={`${tokenData.symbol}-icon`}
          className="w-10 h-10 rounded-full"
        />
      )}
        <Typography variant="h7">
          {tokenName !== tokenData.symbol ? `${tokenName} (${tokenData?.symbol})` : tokenData?.symbol}
        </Typography>
      </div>
      <div className="flex gap-6 sm:gap-8 items-center mb-3">
        <Typography variant="body1" fontSize="medium">
          {formatPrice(tokenData.price)}
        </Typography>
        <Typography color={tokenData?.metrics.change_24h > 0 ? 'green' : 'error'}>
          {tokenData?.metrics.change_24h > 0 ? (
            <ArrowUpwardIcon fontSize="small" />
          ) : (
            <ArrowDownwardIcon fontSize="small" />
          )}
          {tokenData?.metrics.change_24h}% (24h)
        </Typography>
        
        <Typography color={tokenData?.metrics.change_7d > 0 ? 'green' : 'error'} className='hidden sm:block'>
          {tokenData?.metrics.change_7d > 0 ? (
            <ArrowUpwardIcon fontSize="small" />
          ) : (
            <ArrowDownwardIcon fontSize="small" />
          )}
          {tokenData?.metrics.change_7d}% (7d)
        </Typography>   

        <Typography color={tokenData?.metrics.change_30d > 0 ? 'green' : 'error'} className='hidden md:block'>
          {tokenData?.metrics.change_30d > 0 ? (
            <ArrowUpwardIcon fontSize="small" />
          ) : (
            <ArrowDownwardIcon fontSize="small" />
          )}
          {tokenData?.metrics.change_30d}% (30d)
        </Typography>  

        <Typography color={tokenData?.metrics.change_90d > 0 ? 'green' : 'error'} className='hidden md:block'>
          {tokenData?.metrics.change_90d > 0 ? (
            <ArrowUpwardIcon fontSize="small" />
          ) : (
            <ArrowDownwardIcon fontSize="small" />
          )}
          {tokenData?.metrics.change_90d}% (90d)
        </Typography>
      </div>
    </>
  );
};

export default TokenHeader;
