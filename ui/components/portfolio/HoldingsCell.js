// Import React and any other dependencies
import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import { GeneralContext } from '../../../contexts/general/General.Context';

// Define the component
const HoldingsCell = ({ value }) => {
  const { roundPrice } = useContext(GeneralContext);

  return (
    <Typography
      component="span"
      className="flex justify-end h-[60px] items-center"
    >
      <div>
        {value.portfolio.totalQuantity.toLocaleString()}
        <span className='block text-xs opacity-50'>{roundPrice(value.portfolio.totalQuantity * value.metrics.price.icp)} (ICP)</span>
      </div>
    </Typography>
  );
};

// Export the component
export default HoldingsCell;