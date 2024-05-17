// Import React and any other dependencies
import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import { GeneralContext } from '../../../contexts/general/General.Context';
import PriceMovementIndicator from '../tokens/PriceMovementIndicator';

// Define the component
const ProfitLossCell = ({ value }) => {
  const { roundPrice } = useContext(GeneralContext);
  const { currentFunds, investedFunds } = value.portfolio;
  
  // Calculate absolute profit or loss
  const profitOrLoss = currentFunds - investedFunds;
  let isProfit = profitOrLoss >= 0;
  
  // Format the profit/loss value
  const formattedProfitOrLoss = roundPrice(Math.abs(profitOrLoss));

  // Calculate price movement percentage
  const priceMovement = (investedFunds !== 0) ? (profitOrLoss / investedFunds * 100) : 0;
  const formattedPriceMovement = parseFloat(priceMovement.toFixed(2)); // Round to two decimal places

  return (
    <Typography
      component="span"
      className="flex justify-end h-[60px] items-center"
    >
      <div>
        {isProfit ? '+' : '-'} {formattedProfitOrLoss} ICP<br></br>
        <PriceMovementIndicator value={formattedPriceMovement} />
      </div>
    </Typography>
  );
};

// Export the component
export default ProfitLossCell;
