// Import React and any other dependencies
import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import { GeneralContext } from '../../../contexts/general/General.Context';

// Define the component
const HoldingsCell = ({ value }) => {
  const { formatPrice, roundPrice, currency } = useContext(GeneralContext);

  return (
    <Typography
      component="span"
      className="flex justify-end h-[60px] items-center"
    >
      <div>
        {formatPrice(roundPrice(value.quantity * value.token.metrics.price[currency]))}
        <span className='block text-xs opacity-50'>{value.quantity.toLocaleString()} {value.token.symbol}</span>
      </div>
    </Typography>
  );
};

// Export the component
export default HoldingsCell;