import React, { useContext, useEffect } from 'react';
import { GeneralContext } from '../../../../contexts/general/General.Context';
import { Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Favorites from '../Favorites';
import useTokenFavorites from '../../../hooks/token/useTokenFavorites';

const TokenHeader = ({ tokenData }) => {
  const {formatPrice, getTokenName, currency} = useContext(GeneralContext);
  const tokenName = getTokenName(tokenData);

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
          {tokenName != tokenData.symbol ? `${tokenName} (${tokenData?.symbol})` : tokenData?.symbol}
        </Typography>

        <Favorites data={tokenData} />
      </div>
      <div className="flex gap-6 sm:gap-8 items-center mb-3">
        <Typography variant="body1" fontSize="medium">
          {formatPrice(tokenData.metrics.price[currency])}
        </Typography>
        <Typography color={tokenData?.metrics.change['24h'][currency] > 0 ? 'green' : 'error'}>
          {tokenData?.metrics.change['24h'][currency] > 0 ? (
            <ArrowUpwardIcon fontSize="small" />
          ) : (
            <ArrowDownwardIcon fontSize="small" />
          )}
          {tokenData?.metrics.change['24h'][currency]}% (24h)
        </Typography>
        
        <Typography color={tokenData?.metrics.change['7d'][currency] > 0 ? 'green' : 'error'} >
          {tokenData?.metrics.change['7d'][currency] > 0 ? (
            <ArrowUpwardIcon fontSize="small" />
          ) : (
            <ArrowDownwardIcon fontSize="small" />
          )}
          {tokenData?.metrics.change['7d'][currency]}% (7d)
        </Typography>   

        <Typography color={tokenData?.metrics.change['30d'][currency] > 0 ? 'green' : 'error'} className='hidden md:block'>
          {tokenData?.metrics.change['30d'][currency] > 0 ? (
            <ArrowUpwardIcon fontSize="small" />
          ) : (
            <ArrowDownwardIcon fontSize="small" />
          )}
          {tokenData?.metrics.change['30d'][currency]}% (30d)
        </Typography>  

        <Typography color={tokenData?.metrics.change['90d'][currency] > 0 ? 'green' : 'error'} className='hidden md:block'>
          {tokenData?.metrics.change['90d'][currency] > 0 ? (
            <ArrowUpwardIcon fontSize="small" />
          ) : (
            <ArrowDownwardIcon fontSize="small" />
          )}
          {tokenData?.metrics.change['90d'][currency]}% (90d)
        </Typography>
      </div>
    </>
  );
};

export default TokenHeader;
