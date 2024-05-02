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
    {value >= 0 ? (
      <KeyboardArrowUpIcon className="text-green-500" fontSize="medium" />
    ) : (
      <KeyboardArrowDownIcon className="text-[#FF3A33]" fontSize="medium" />
    )}
    <span className={`${value >= 0 ? 'text-green-500' : 'text-[#FF3A33]'} min-w-[53px] inline-block`}>{value.toFixed(2)}%</span>
  </Typography>
);

// Export the component
export default PriceMovementIndicator;