// Import React and any other dependencies
import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import { GeneralContext } from '../../../contexts/general/General.Context';

// Define the component
const TransactionTypeCell = ({ value }) => {
  const { formatUnixTimestampToDate } = useContext(GeneralContext);

  return (
    <Typography
      component="span"
      className="flex justify-start h-[60px] items-center"
    >
      <div>
        <span className={value.direction ? 'text-green-500' : 'text-red-500'}>{value.direction ? 'Buy' : 'Sell' }</span>
        <span className='block text-xs opacity-50'>{formatUnixTimestampToDate(value.timestamp)}</span>
      </div>
    </Typography>
  );
};

// Export the component
export default TransactionTypeCell;