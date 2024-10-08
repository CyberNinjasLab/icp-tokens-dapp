// Import React and any other dependencies
import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import { GeneralContext } from '../../../contexts/general/General.Context';

// Define the component
const TransactionAmountCell = ({ value }) => {
  const { currency, formatPrice } = useContext(GeneralContext);

  return (
    <Typography
      component="span"
      className="flex justify-end h-[60px] items-center"
    >
      <div>
        <span className={value.direction ? 'text-green-500' : 'text-red-500'}>{value.direction ? '+' : '-'}{value.quantity.toLocaleString()}</span>
        <span className='block text-xs opacity-50'>{formatPrice(value.quantity * value['price_per_token_' + currency])}</span>
      </div>
    </Typography>
  );
};

// Export the component
export default TransactionAmountCell;