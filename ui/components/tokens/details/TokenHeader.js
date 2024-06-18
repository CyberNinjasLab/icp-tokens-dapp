import React, { useContext, useEffect } from 'react';
import { GeneralContext } from '../../../../contexts/general/General.Context';
import { Tooltip, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Favorites from '../Favorites';
import Link from 'next/link';

const TokenHeader = ({ tokenData }) => {
  const {formatPrice, getTokenName, currency} = useContext(GeneralContext);
  const tokenName = getTokenName(tokenData);

  return (
    <>
      <div className='flex items-center mb-3 flex-wrap'>
        <div className="flex items-center gap-2 pr-4">
          {tokenData.logo && (
          <img
              src={`${process.env.NEXT_PUBLIC_WEB2_API_URL}/storage/${tokenData.logo}`}
              alt={`${tokenData.symbol}-icon`}
              className="w-10 h-10 rounded-full"
            />
          )}
          <Typography variant="h7" style={{
            marginRight: 3
          }}>
            {tokenName != tokenData.symbol ? `${tokenName} (${tokenData?.symbol})` : tokenData?.symbol}
          </Typography>

          <Favorites data={tokenData} size='medium' />
        </div>

        <div className='token-labels gap-x-2 flex'>
          {tokenData.is_sns ? (
            <Tooltip title="Learn more about SNS" placement="bottom">
              <Link href="https://wiki.internetcomputer.org/wiki/Service_Nervous_System_(SNS)" target='_blank'>
                <span className='uppercase cursor-pointer rounded-md text-sm bg-orange/20 text-orange dark:text-orange px-[8px] py-[6px]'>
                  SNS
                </span>
              </Link>
            </Tooltip>
          ) : null}
        </div>
      </div>
      <div className="flex gap-x-6 sm:gap-8 items-center mb-3 flex-wrap">
        <Typography variant="body1" fontSize="large">
          {formatPrice(tokenData.metrics.price[currency])}
        </Typography>
        <div className='flex gap-x-6 sm:gap-8'>
        <Typography variant={tokenData?.metrics.change['24h'][currency] > 0 ? 'green' : 'error'}>
          {tokenData?.metrics.change['24h'][currency] > 0 ? (
            <ArrowUpwardIcon fontSize="small" />
          ) : (
            <ArrowDownwardIcon fontSize="small" />
          )}
          {tokenData?.metrics.change['24h'][currency]}% (24h)
        </Typography>
        
        <Typography variant={tokenData?.metrics.change['7d'][currency] > 0 ? 'green' : 'error'} >
          {tokenData?.metrics.change['7d'][currency] > 0 ? (
            <ArrowUpwardIcon fontSize="small" />
          ) : (
            <ArrowDownwardIcon fontSize="small" />
          )}
          {tokenData?.metrics.change['7d'][currency]}% (7d)
        </Typography>   

        <Typography variant={tokenData?.metrics.change['30d'][currency] > 0 ? 'green' : 'error'} className='hidden md:block'>
          {tokenData?.metrics.change['30d'][currency] > 0 ? (
            <ArrowUpwardIcon fontSize="small" />
          ) : (
            <ArrowDownwardIcon fontSize="small" />
          )}
          {tokenData?.metrics.change['30d'][currency]}% (30d)
        </Typography>  

        <Typography variant={tokenData?.metrics.change['90d'][currency] > 0 ? 'green' : 'error'} className='hidden md:block'>
          {tokenData?.metrics.change['90d'][currency] > 0 ? (
            <ArrowUpwardIcon fontSize="small" />
          ) : (
            <ArrowDownwardIcon fontSize="small" />
          )}
          {tokenData?.metrics.change['90d'][currency]}% (90d)
        </Typography>
        </div>
      </div>
    </>
  );
};

export default TokenHeader;
