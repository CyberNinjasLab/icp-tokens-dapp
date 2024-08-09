import React, { useContext, useEffect, useState } from 'react';
import { ToggleButton, ToggleButtonGroup, Tooltip, useTheme } from '@mui/material';
import { GeneralContext } from '../../../contexts/general/General.Context';
import useWindowWidthUnder from '../../hooks/useWindowWidthUnder';

function CurrencySelector() {
  const { setCurrency, currency, theme } = useContext(GeneralContext);
  const [isHydrated, setIsHydrated] = useState(false); // State to track if component is hydrated
  const isWindowUnder1100 = useWindowWidthUnder(1100);

  const handleCurrencyChange = (event, newCurrency) => {
    if (newCurrency !== null) {
      setCurrency(newCurrency);
    }
  };

  useEffect(() => {
    // Set isHydrated to true after component is hydrated on the client side
    setIsHydrated(true);
  }, []);

  const handleToggleClick = () => {
    if (isWindowUnder1100) {
      const newCurrency = currency === 'usd' ? 'icp' : 'usd';
      setCurrency(newCurrency);
    }
  };

  // Render the component only after it's hydrated on the client side
  if (!isHydrated) {
    return null; // Render nothing during SSR
  }

  return (
    <div onClick={isWindowUnder1100 ? handleToggleClick : undefined}>
      <ToggleButtonGroup
        value={currency}
        exclusive
        onChange={!isWindowUnder1100 ? handleCurrencyChange : undefined}
        className='my-2'
        color="primary"
        sx={{
          '& .Mui-selected': { color: 'primary' },
        }}
      >
        <Tooltip title={`${isWindowUnder1100 ? 'Select currency' : 'United States Dollar'}`} placement="top">
          <ToggleButton 
            value="usd" 
            aria-label="USD" 
            size="small"
            style={{
              borderRadius: isWindowUnder1100 && currency === 'usd' ? '4px' : '',
              display: isWindowUnder1100 && currency !== 'usd' ? 'none' : 'inline-flex',
              minWidth: '40px'
            }}
          >
            USD
          </ToggleButton>
        </Tooltip>
        <Tooltip title={`${isWindowUnder1100 ? 'Select currency' : 'Internet Computer'}`} placement="top">
          <ToggleButton 
            value="icp" 
            aria-label="ICP" 
            size="small"
            style={{
              borderRadius: isWindowUnder1100 && currency === 'icp' ? '4px' : '',
              borderLeft: theme == 'dark' ? '1px solid rgb(75 85 99)' : '1px solid rgb(229, 231, 235)',
              display: isWindowUnder1100 && currency !== 'icp' ? 'none' : 'inline-flex',
              minWidth: '40px'
            }}
          >
            ICP
          </ToggleButton>
        </Tooltip>
      </ToggleButtonGroup>
    </div>
  );
}

export default CurrencySelector;
