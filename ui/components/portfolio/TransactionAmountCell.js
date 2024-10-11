// Import React and any other dependencies
import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import { GeneralContext } from '../../../contexts/general/General.Context';

// Define the component
const TransactionAmountCell = ({ value }) => {
  const { currency, formatPrice, getPortfolioTransactionDirection } = useContext(GeneralContext);
  const direction = getPortfolioTransactionDirection(value[1].direction);
  console.log(value);
  return (
    <Typography
      component="span"
      className="flex justify-end h-[60px] items-center"
    >
      <div>
        <span className={direction == 'Buy' ? 'text-green-500' : 'text-red-500'}>{direction == 'Buy' ? '+' : '-'}{value[1].quantity.toLocaleString()}</span>
        <span className='block text-xs opacity-50'>{formatPrice(value[1].quantity * value[1]['price_' + currency])}</span>
      </div>
    </Typography>
  );
};

// Export the component
export default TransactionAmountCell;