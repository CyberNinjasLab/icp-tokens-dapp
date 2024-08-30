// Import React and any other dependencies
import React from 'react';
import Typography from '@mui/material/Typography';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// Define the component
const PriceMovementIndicator = ({ value }) => (
  <Typography
    component="span"
    className="inline-flex justify-center h-full items-center"
  >
    <span className='w-[14px]'>
      {value >= 0 ? (
        <KeyboardArrowUpIcon className="text-green-500 inline-block" fontSize="medium" />
      ) : (
        <KeyboardArrowDownIcon className="text-[#FF3A33]" fontSize="medium" />
      )}
    </span>
    <span className={`${value >= 0 ? 'text-green-500' : 'text-[#FF3A33]'} ${Math.abs(value) < 10 ? 'min-w-[46px]' : 'min-w-[54px]'} inline-block`}>{Math.abs(value).toFixed(2)}%</span>
  </Typography>
);

// Export the component
export default PriceMovementIndicator;