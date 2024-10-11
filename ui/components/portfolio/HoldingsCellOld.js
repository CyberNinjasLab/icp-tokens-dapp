// Import React and any other dependencies
import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import { GeneralContext } from '../../../contexts/general/General.Context';

// Define the component
const HoldingsCellOld = ({ value }) => {
  const { formatPrice, currency } = useContext(GeneralContext);

  return (
    <Typography
      component="span"
      className="flex justify-end h-[60px] items-center"
    >
      <div>
        {formatPrice(value.portfolio.totalQuantity * value.metrics.price[currency])}
        <span className='block text-xs opacity-50'>{value.portfolio.totalQuantity.toLocaleString()} {value.symbol}</span>
      </div>
    </Typography>
  );
};

// Export the component
export default HoldingsCellOld;