import React, { lazy, Suspense, useContext } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head'; // Import the Head component
import useTokenData from '../../../ui/hooks/token/useTokenData';
import { GeneralContext } from '../../../contexts/general/General.Context';
import TradingViewWidget from '../../../ui/components/tokens/trading-view/TradingViewWidget';

// Lazy load components
const TradingViewCustomWidget = lazy(() => import('../../../ui/components/tokens/trading-view/TradingViewCustomWidget'));

const TokenPage = () => {
  const router = useRouter();
  const { tokenId } = router.query;
  const { tokenData, isLoading, error } = useTokenData(tokenId);
  const { getTokenName, currency } = useContext(GeneralContext);

  // Example dynamic title. Adjust accordingly based on your tokenData properties.
  const pageTitle = tokenData ? `${getTokenName(tokenData)} | ICP Tokens` : "ICP Tokens";

  return (
    <>
      <Head>
        <title>{pageTitle} | ICP Tokens by Market Cap</title>
        {/* If you have specific meta tags that should change with the page, include them here */}
      </Head>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {!isLoading && !error && tokenData && (
        <Suspense fallback={<div>Loading...</div>}>
          {tokenData.canister_id !== 'ryjl3-tyaaa-aaaaa-aaaba-cai' ? (
            <TradingViewCustomWidget canister_id={tokenData.canister_id} fullscreen={true} />
          ) : currency === 'usd' && (
            <TradingViewWidget symbol='ICPUSD' canister_id={tokenData.canister_id}  />
          )}
        </Suspense>
      )}
    </>
  );
};

export default TokenPage;
