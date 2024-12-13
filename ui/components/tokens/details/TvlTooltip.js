import React, { useContext, useState } from 'react';
import { Tooltip, useMediaQuery, ClickAwayListener } from '@mui/material';
import { GeneralContext } from '../../../../contexts/general/General.Context';
import { Launch } from '@mui/icons-material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const questionMarkStyle = {
  ml: '4px',
  position: 'relative',
  bottom: '2px',
  cursor: 'pointer',
  opacity: '0.5',
};

// Helper function to search for a market by key in tokenMarkets
function findMarketByKey(tokenMarkets, key) {
  return tokenMarkets.find(market => market.key === key);
}

function TvlTooltip({ tvl, currency, data, tokenMarkets }) {
  const { showPriceCurrency } = useContext(GeneralContext);

  // State to manage the tooltip's open/close status on mobile
  const [open, setOpen] = useState(false);

  // Media query to detect if the user is on a desktop device
  const isDesktop = useMediaQuery('(min-width:600px)');

  // Handlers for opening/closing the tooltip on mobile
  const handleTooltipOpen = () => setOpen(true);
  const handleTooltipClose = () => setOpen(false);

  // Search for ICP Swap and Sonic in the tokenMarkets array
  const icpSwapMarket = findMarketByKey(tokenMarkets, 'icpswap');
  const sonicMarket = findMarketByKey(tokenMarkets, 'sonic');

  const tooltipContent = (
    <div className='text-sm p-1 scale-95 gap-y-1 flex flex-col'>
      {icpSwapMarket && tvl.icp_swap[currency] && (
        <div>
          <a
            href={`https://info.icpswap.com/swap/token/details/${data.canister_id}`}
            target='_blank'
            className='font-semibold'
            rel="noopener noreferrer"
          >
            <img
              src="/logos/icpswap_logo.webp"
              className='relative bottom-[1px] mr-[2px] inline-block w-4 h-4 rounded-full bg-black'
              alt="ICP Swap"
            />{' '}
            {showPriceCurrency(tvl.icp_swap[currency].toLocaleString())}{' '}
            <Launch fontSize='small' className='scale-90 relative right-[2px] bottom-[1px]' />
          </a>
        </div>
      )}
      {sonicMarket && tvl.sonic[currency] && (
        <div>
          <a
            href={`https://v3.data.sonic.ooo/tokens/${data.canister_id}`}
            target='_blank'
            className=' font-semibold'
            rel="noopener noreferrer"
          >
            <img
              src="/logos/sonic-dex_logo.jpg"
              className='relative bottom-[1px] mr-[2px] inline-block w-4 h-4 rounded-full bg-black'
              alt="Sonic Dex"
            />{' '}
            {showPriceCurrency(tvl.sonic[currency].toLocaleString())}{' '}
            <Launch fontSize='small' className='scale-90 relative bottom-[2px] right-[1px]' />
          </a>
        </div>
      )}
    </div>
  );

  return (
    <div className='inline-block'>
      {isDesktop ? (
        // Desktop behavior: Show on hover
        <Tooltip title={tooltipContent} arrow>
          <HelpOutlineIcon sx={questionMarkStyle} fontSize="small" />
        </Tooltip>
      ) : (
        // Mobile behavior: Show on tap and close when tapping outside
        <ClickAwayListener onClickAway={handleTooltipClose}>
          <div>
            <Tooltip
              title={tooltipContent}
              open={open}
              onClose={handleTooltipClose}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              arrow
            >
              <HelpOutlineIcon
                sx={questionMarkStyle}
                fontSize="small"
                onClick={handleTooltipOpen}
              />
            </Tooltip>
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
}

export default TvlTooltip;
