// Import React and any other dependencies
import React, { useContext } from 'react';
import { GeneralContext } from '../../../contexts/general/General.Context';
import PriceMovementIndicator from '../tokens/PriceMovementIndicator';

// Define the component
const TokenTransactionsSummary = ({ summary, token }) => {
  const { formatPrice } = useContext(GeneralContext);
  const totalInvested = summary.totalInvested;
  const totalCurrentFunds = summary.totalCurrentFunds;

  // Calculate all-time profit in value
  const profitValue = totalCurrentFunds - totalInvested;
  const profitValueSign = profitValue >= 0 ? '+' : '-'

  // Calculate profit as a percentage of the investment
  const profitPercentage = (totalInvested !== 0) ? (profitValue / totalInvested) * 100 : 0;

  return (
    <div className='flex flex-wrap mt-3 lg:space-x-4 lg:space-y-0 space-y-2'>
      <div className='border border-[#DDDDDD] dark:border-[#4b5563] rounded-md py-3 px-4 w-full lg:w-64'>
        <span className='block text-sm font-medium'>Current Worth</span>
        <span className='text-xl font-bold'>{formatPrice(totalCurrentFunds)}</span>
      </div>
      <div className='border border-[#DDDDDD] dark:border-[#4b5563] rounded-md py-3 px-4 w-full lg:w-64'>
        <span className='block text-sm font-medium'>Quantity</span>
        <span className='text-xl font-bold'>{summary.totalQuantity.toLocaleString()} {token.symbol}</span>
      </div>
      <div className='border border-[#DDDDDD] dark:border-[#4b5563] rounded-md py-3 px-4 w-full lg:w-auto lg:min-w-64'>
        <span className='block text-sm font-medium'>Profit/Loss</span>
        <div className='flex align-middle'>
          <span className='text-xl font-bold inline-block'> {profitValueSign} {formatPrice(Math.abs(profitValue))}</span>
          <span className='text-sm font-bold inline-block ml-1'><PriceMovementIndicator value={profitPercentage} /></span>
        </div>
      </div>
    </div>
  );
};

// Export the component
export default TokenTransactionsSummary;
