// Import React and any other dependencies
import React, { useContext } from 'react';
import { GeneralContext } from '../../../contexts/general/General.Context';
import PriceMovementIndicator from '../tokens/PriceMovementIndicator';

// Define the component
const TokenTransactionsSummary = ({ tokenSummary, tokenData }) => {
  const { formatPrice, currency } = useContext(GeneralContext);

  console.log(tokenSummary, tokenData);

  const totalPortfolioBuy = tokenSummary?.summary.totalPortfolioBuyCost[currency];
  const totalPortfolioWorth = tokenSummary?.summary.totalPortfolioWorth[currency];
  const totalPortfolioSold = tokenSummary?.summary.totalPortfolioSold[currency];

  // Calculate all-time profit in value
  const profitValue = totalPortfolioWorth - totalPortfolioBuy + totalPortfolioSold;
  const profitValueSign = profitValue >= 0 ? '+' : '-'

  // Calculate profit as a percentage of the investment
  const profitPercentage = (totalPortfolioBuy !== 0) ? (profitValue / totalPortfolioBuy) * 100 : 0;
  return (
    <div className='flex flex-wrap mt-3 lg:space-x-4 lg:space-y-0 space-y-2'>
      <div className='border border-[#DDDDDD] dark:border-[#4b5563] rounded-md py-3 px-4 w-full lg:w-64'>
        <span className='block text-sm font-medium'>Current Worth</span>
        <span className='text-xl font-bold'>{formatPrice(totalPortfolioWorth)}</span>
      </div>
      <div className='border border-[#DDDDDD] dark:border-[#4b5563] rounded-md py-3 px-4 w-full lg:w-64'>
        <span className='block text-sm font-medium'>Quantity</span>
        <span className='text-xl font-bold'>{tokenData?.quantity.toLocaleString()} {tokenData.token.symbol}</span>
      </div>
      {totalPortfolioBuy > 0  && (
        <div className='border border-[#DDDDDD] dark:border-[#4b5563] rounded-md py-3 px-4 w-full lg:w-auto lg:min-w-64'>
          <span className='block text-sm font-medium'>Profit/Loss</span>
          <div className='flex align-middle'>
            <span className='text-xl font-bold inline-block'> {profitValueSign} {formatPrice(Math.abs(profitValue))}</span>
            <span className='text-sm font-bold inline-block ml-1'><PriceMovementIndicator value={profitPercentage} /></span>
          </div>
        </div>
      )}
      <div className='border border-[#DDDDDD] dark:border-[#4b5563] rounded-md py-3 px-4 w-full lg:w-64'>
        <span className='block text-sm font-medium'>Avg. Buy Price</span>
        <span className='text-xl font-bold'>{formatPrice(tokenData['total_quantity_bought'] > 0 ? tokenData['total_' + currency + '_buy_cost'] / tokenData['total_quantity_bought'] : 0)}</span>
      </div>
    </div>
  );
};

// Export the component
export default TokenTransactionsSummary;
