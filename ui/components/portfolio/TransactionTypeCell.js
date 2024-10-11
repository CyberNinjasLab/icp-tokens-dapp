// Import React and any other dependencies
import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import { GeneralContext } from '../../../contexts/general/General.Context';
import useWindowWidthUnder from '../../hooks/useWindowWidthUnder';

// Define the component
const TransactionTypeCell = ({ value }) => {
  const { formatUnixTimestampToDate, getPortfolioTransactionDirection } = useContext(GeneralContext);
  const isWindowUnder800 = useWindowWidthUnder(800);

  const direction = getPortfolioTransactionDirection(value[1].direction);

  const formatDate = (timestamp) => {
    // Call formatUnixTimestampToDate with appropriate short parameter based on window width
    return formatUnixTimestampToDate(timestamp, isWindowUnder800);
  };

  return (
    <Typography
      component="span"
      className="flex justify-start h-[60px] items-center"
    >
      <div>
        <span className={direction == 'Buy' ? 'text-green-500' : 'text-red-500'}>{direction == 'Buy' ? 'Buy' : 'Sell' }</span>
        <span className='block text-xs opacity-50'>{formatDate(value[1].timestamp)}</span>
      </div>
    </Typography>
  );
};

// Export the component
export default TransactionTypeCell;