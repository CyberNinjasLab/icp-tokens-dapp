// Import React and any other dependencies
import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import { GeneralContext } from '../../../contexts/general/General.Context';
import PriceMovementIndicator from '../tokens/PriceMovementIndicator';

// Define the component
const ProfitLossCell = ({ value }) => {
  const { formatPrice } = useContext(GeneralContext);
  const { currentFunds, buySum } = value.portfolio;
  
  // Calculate absolute profit or loss
  const profitOrLoss = currentFunds - buySum;
  let isProfit = profitOrLoss >= 0;
  
  // Format the profit/loss value
  const formattedProfitOrLoss = formatPrice(Math.abs(profitOrLoss));

  // Calculate price movement percentage
  const priceMovement = (buySum !== 0) ? (profitOrLoss / buySum * 100) : 0;
  const formattedPriceMovement = parseFloat(priceMovement.toFixed(2)); // Round to two decimal places

  return (
    <Typography
      component="span"
      className="flex justify-end h-[60px] items-center"
    >
      <div>
        {isProfit ? '+' : '-'} {formattedProfitOrLoss}<br></br>
        <PriceMovementIndicator value={formattedPriceMovement} />
      </div>
    </Typography>
  );
};

// Export the component
export default ProfitLossCell;
