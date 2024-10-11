// Import React and any other dependencies
import React, { useContext } from 'react';
import { GeneralContext } from '../../../contexts/general/General.Context';
import PriceMovementIndicator from '../tokens/PriceMovementIndicator';

// Define the component
const PortfolioSummary = ({ data }) => {
  const { formatPrice, currency } = useContext(GeneralContext);

  const totalPortfolioBuy = data?.summary.totalPortfolioBuyCost[currency];
  const totalPortfolioWorth = data?.summary.totalPortfolioWorth[currency];
  const totalPortfolioSold = data?.summary.totalPortfolioSold[currency];

  // Calculate all-time profit in value
  const profitValue = totalPortfolioWorth - totalPortfolioBuy + totalPortfolioSold;
  const profitValueSign = profitValue >= 0 ? '+' : '-'

  // Calculate profit as a percentage of the investment
  const profitPercentage = (totalPortfolioBuy !== 0) ? (profitValue / totalPortfolioBuy) * 100 : 0;

  return (
    <div className='flex flex-wrap mt-3 sm:space-x-4 sm:space-y-0 space-y-2'>
      <div className='border border-[#DDDDDD] dark:border-[#4b5563] rounded-md py-3 px-4 w-full sm:w-64'>
        <span className='block text-sm font-medium'>Current Worth</span>
        <span className={`text-xl font-bold ${data ? '' : 'blur-effect'}`}>
          {data ? (
            formatPrice(totalPortfolioWorth)
          ) : (
            <span className='inline-block w-16'></span>
          )}
        </span>
      </div>
      <div className='border border-[#DDDDDD] dark:border-[#4b5563] rounded-md py-3 px-4 w-full sm:w-auto sm:min-w-64'>
        <span className='block text-sm font-medium'>Profit/Loss</span>
        {data ? (
          <div className={`flex align-middle`}>
            <div className='flex align-middle'>
              <span className='text-xl font-bold inline-block'> {profitValueSign} {formatPrice(Math.abs(profitValue))}</span>
              <span className='text-sm font-bold inline-block ml-1'><PriceMovementIndicator value={profitPercentage} /></span>
            </div>
          </div>
        ) : (
          <span className={`text-xl font-bold ${data ? '' : 'blur-effect'}`}>
            <span className='inline-block w-16'></span>
          </span>
        )}
      </div>
    </div>
  );
};

// Export the component
export default PortfolioSummary;
