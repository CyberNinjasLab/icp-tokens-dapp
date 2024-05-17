import React, { useContext, useEffect, useState } from 'react';
import { ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import { GeneralContext } from '../../../contexts/general/General.Context';

function CurrencySelector() {
  const { setCurrency, currency } = useContext(GeneralContext);
  const [isHydrated, setIsHydrated] = useState(false); // State to track if component is hydrated

  const handleCurrencyChange = (event, newCurrency) => {
    if (newCurrency !== null) {
      setCurrency(newCurrency);
    }
  };

  useEffect(() => {
    // Set isHydrated to true after component is hydrated on the client side
    setIsHydrated(true);
  }, []);

  // Render the component only after it's hydrated on the client side
  if (!isHydrated) {
    return null; // Render nothing during SSR
  }

  return (
    <ToggleButtonGroup
      value={currency}
      exclusive
      onChange={handleCurrencyChange}
      className='my-2'
      color="primary"
      sx={{
        '& .Mui-selected': { color: 'primary' },
      }}
    >
      <Tooltip title="United States Dollar" placement="top">
        <ToggleButton value="usd" aria-label="USD" size="small">
          USD
        </ToggleButton>
      </Tooltip>
      <Tooltip title="Internet Computer" placement="top">
        <ToggleButton value="icp" aria-label="ICP" size="small">
          ICP
        </ToggleButton>
      </Tooltip>
    </ToggleButtonGroup>
  );
}

export default CurrencySelector;