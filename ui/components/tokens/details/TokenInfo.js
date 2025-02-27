import React, { lazy, useContext, useEffect, useMemo, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import { Tooltip, Typography } from '@mui/material';
import TokenLinks from './TokenLinks';
import { GeneralContext } from '../../../../contexts/general/General.Context';
import ICHouseLink from '../ICHouseLink';
import ICExplorerLink from '../ICExplorerLink';
import ContractButton from '../ContractButton';
import ShowMoreText from '../../_base/ShowMoreText';
import useTokenTvl from '../../../hooks/token/useTokenTvl';
import TvlTooltip from './TvlTooltip';
import useTokenMarketsData from '../../../hooks/token/useTokenMarketsData'


const TokenMarketLinks = lazy(() => import('./TokenMarketLinks'));

const style = {
  py: 1,
  px: { xs: 0, md: 1 },
  width: '100%',
  border: 'none',
};

export default function TokenInfo({ data }) {
  const { formatTotalSupply, currency, showPriceCurrency, icpPrice } = useContext(GeneralContext);
  const { tvl } = useTokenTvl(data.canister_id);
  // Fetch token markets data using the custom hook
  const { tokenMarketsData: tokenMarkets, isLoading, error } = useTokenMarketsData(data?.canister_id);

  return (
    <div className='bg-[#28abe508] border border-[#D3D3D3] dark:border-[#555] rounded-md max-w-[400px] mx-auto'>
      <List sx={style}>
        {data.canister_id != 'ryjl3-tyaaa-aaaaa-aaaba-cai' && (
          <ListItem>
            <div className="">
              <Typography variant="textSemiBold">Markets</Typography>
            </div>
          </ListItem>
        )}
        {data.canister_id != 'ryjl3-tyaaa-aaaaa-aaaba-cai' && (
        <ListItem sx={{ paddingTop: 0 }}>
          <div className='relative left-[-5px]'>
            <TokenMarketLinks token={data} tokenMarkets={tokenMarkets} />
          </div>
        </ListItem>
        )}
        {data.canister_id != 'ryjl3-tyaaa-aaaaa-aaaba-cai' && (
          <Divider variant="middle" component="li" className="pt-2" />
        )}
        {data.canister_id != 'ryjl3-tyaaa-aaaaa-aaaba-cai' && (
          <ListItem>
            <div className="flex justify-between items-center w-full mt-2">
              <Typography variant="textSemiBold">
              Total Value Locked 
              {tvl && (
                <TvlTooltip tvl={tvl} currency={currency} data={data} tokenMarkets={tokenMarkets} />
              )}
              </Typography>
              {/* Conditionally render TVL value or a loading placeholder with a pulse animation */}
              <Typography>
                {tvl ? (
                  showPriceCurrency(
                    ((tvl.sonic?.[currency] || 0) + 
                     (tvl.icp_swap?.[currency] || 0) + 
                     (tvl.kongswap?.[currency] || 0)).toLocaleString()
                  )  
                ) : (
                  <div className="w-20 h-5 bg-gray-200/40 dark:bg-gray-200/10 rounded animate-pulse"></div>
                )}
              </Typography>
            </div>
          </ListItem>
        )}
        <ListItem>
          <div className="flex justify-between items-center w-full">
            <Typography variant="textSemiBold">
              Fully Diluted M Cap
              {/* <HelpOutlineIcon sx={questionMarkStyle} fontSize="small" /> */}
            </Typography>
            <Typography>{showPriceCurrency(parseFloat(data.metrics.fully_diluted_market_cap[currency])?.toLocaleString())}</Typography>
          </div>
        </ListItem>
        {data.metrics.volume && data.metrics.volume[currency] && (
          <>
            {data.metrics.volume[currency]['24h'] != null ? (
              <ListItem>
                <div className="flex justify-between items-center w-full">
                  <Typography variant="textSemiBold">
                    Volume (24h)
                    {/* <HelpOutlineIcon sx={questionMarkStyle} fontSize="small" />{' '} */}
                  </Typography>
                  <Typography>{showPriceCurrency(data.metrics.volume[currency]['24h'].toLocaleString())}</Typography>
                </div>
              </ListItem>
            ) : null}

            {data.metrics.volume[currency]['7d'] != null ? (
              <ListItem>
                <div className="flex justify-between items-center w-full">
                  <Typography variant="textSemiBold">
                    Volume (7d)
                    {/* <HelpOutlineIcon sx={questionMarkStyle} fontSize="small" />{' '} */}
                  </Typography>
                  <Typography>{showPriceCurrency(data.metrics.volume[currency]['7d'].toLocaleString())}</Typography>
                </div>
              </ListItem>
            ) : null}
          </>
        )}
        <ListItem style={{display: 'none'}}>
          <div className="flex justify-between items-center w-full">
            <Typography variant="textSemiBold">
              Circulating Supply
              {/* <HelpOutlineIcon sx={questionMarkStyle} fontSize="small" />{' '} */}
            </Typography>
            <Typography><i>No API Data</i></Typography>
          </div>
        </ListItem>
        <ListItem>
          <div className="flex justify-between items-center w-full">
            <Typography variant="textSemiBold">
              Total Supply
              {/* <HelpOutlineIcon sx={questionMarkStyle} fontSize="small" />{' '} */}
            </Typography>
            <Typography>{formatTotalSupply(data)} {data.symbol}</Typography>
          </div>
        </ListItem>
        <ListItem>
          <div className="flex justify-between items-center w-full">
            <Typography variant="textSemiBold">
              Contract
              {/* <HelpOutlineIcon sx={questionMarkStyle} fontSize="small" />{' '} */}
            </Typography>
            <Typography>
              <ContractButton canisterId={data.canister_id} />
            </Typography>
          </div>
        </ListItem>
        <ListItem>
          <div className="flex justify-between items-center w-full">
            <Typography variant="textSemiBold">
              Explorer
              {/* <HelpOutlineIcon sx={questionMarkStyle} fontSize="small" />{' '} */}
            </Typography>
            <Typography className='flex space-x-3'>
              <ICExplorerLink canisterId={data.canister_id} /><ICHouseLink canisterId={data.canister_id} />
            </Typography>
          </div>
        </ListItem>
        {/* <ListItem>
          <div className="flex justify-between items-center w-full">
            <Typography variant="textSemiBold">
              Standard
              <HelpOutlineIcon sx={questionMarkStyle} fontSize="small" />{' '}
            </Typography>
            <Typography>
              <StandardLink standard={data.token_standard} />
            </Typography>
          </div>
        </ListItem> */}
        {data.details?.short_description && (
          <>
            <Divider variant="middle" component="li" className="pt-4" />
            <ListItem>
              <div className="mt-2">
                <ShowMoreText text={data.details?.short_description} />
              </div>
            </ListItem>
          </>
        )}
        {data.links && data.links.length > 0 && (
          <>
            <Divider variant="middle" component="li" className="pt-2" />
            <ListItem>
              <div className="mt-2">
                <Typography variant="textSemiBold">Links</Typography>
              </div>
            </ListItem>
            <ListItem sx={{paddingTop: 0}}>
              <div className='relative left-[-5px]'>
                <TokenLinks links={data.links} />
              </div>
            </ListItem>
          </>
        )}

      </List>
    </div>
  );
}
