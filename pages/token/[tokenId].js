import React, { lazy, Suspense, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head'; // Import the Head component
import Layout from '../../ui/components/_base/Layout';
import useTokenData from '../../ui/hooks/token/useTokenData';
import TokenHeader from '../../ui/components/tokens/details/TokenHeader';
import { GeneralContext } from '../../contexts/general/General.Context';
import { FavoriteTokensProvider } from '../../contexts/general/FavoriteTokensProvider';
import TradingViewWidget from '../../ui/components/tokens/trading-view/TradingViewWidget';
import useWindowWidthUnder from '../../ui/hooks/useWindowWidthUnder';
import TokenMainNav from '../../ui/components/tokens/details/TokenMainNav';

// Lazy load components
const TradingViewCustomWidget = lazy(() => import('../../ui/components/tokens/trading-view/TradingViewCustomWidget'));
const TokenInfo = lazy(() => import('../../ui/components/tokens/details/TokenInfo'));

const TokenPage = () => {
  const router = useRouter();
  const { tokenId } = router.query; // Get tab from the query
  const { tokenData, isLoading, error } = useTokenData(tokenId);
  const { getTokenName } = useContext(GeneralContext);
  const isWindowUnder1024 = useWindowWidthUnder(1024);

  // Store the selected tab
  const [selectedTab, setSelectedTab] = useState('chart');

  // Callback function to handle tab change
  const handleTabChange = (newTab) => {
    setSelectedTab(newTab);
  };

  // Example dynamic title. Adjust accordingly based on your tokenData properties.
  const pageTitle = tokenData ? `${getTokenName(tokenData)} | ICP Tokens` : "ICP Tokens";

  return (
    <>
      <Head>
        <title>{pageTitle} | ICP Tokens by Market Cap</title>
        <meta name="description" content={`Learn more about ${pageTitle}`} />
        <meta property="og:title" content={`${ pageTitle } | ICP Tokens by Market Cap`} />
        <meta property="og:description" content={`Learn more about ${pageTitle}`} />          
        <meta name="robots" content="index,follow"/> 
        {/* If you have specific meta tags that should change with the page, include them here */}
        {/* <meta name="description" content=" {pageTitle} | ICP Tokens by Market Cap"></meta> */}
      </Head>
      <Layout extraClass={'max-w-[6000px] lg:h-screen lg:fixed'} footer={false}>
        {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {!isLoading && !error && tokenData && (
          <FavoriteTokensProvider>
            <Suspense fallback={<div>Loading...</div>}>
              <div>
                {/* Render TokenHeader only if selectedTab == 'info' */}
                {(!isWindowUnder1024 || selectedTab === 'info') && <TokenHeader tokenData={tokenData} />}

                <div className="flex flex-col lg:flex-row xl:gap-6 lg:gap-4 gap-10">
                  {/* Render TradingViewWidget or TradingViewCustomWidget only if selectedTab == 'chart' */}
                  {(!isWindowUnder1024 || selectedTab === 'chart') && (
                    <div className={`w-full ${isWindowUnder1024 ? (selectedTab === 'chart' ? 'block fixed z-50 bottom-[57px] left-0' : 'hidden') : ''}`}>
                      {tokenData.canister_id !== 'ryjl3-tyaaa-aaaaa-aaaba-cai' ? (
                        <div>
                          <TradingViewCustomWidget canister_id={tokenData.canister_id} />
                        </div>
                      ) : (
                        <TradingViewWidget symbol='ICPUSD' />
                      )}
                    </div>
                  )}

                  {/* Render TokenInfo only if selectedTab == 'info' */}
                  {(!isWindowUnder1024 || selectedTab === 'info') && (
                    <div className={`w-full lg:max-w-[320px] xl:max-w-[374px] lg:overflow-y-auto lg:max-h-[calc(100vh-195px)] pb-24 lg:pb-0`}>
                      <TokenInfo data={tokenData} />
                    </div>
                  )}
                </div>

                <div className='lg:hidden block'>
                  <TokenMainNav onTabChange={handleTabChange} />
                </div>
              </div>
            </Suspense>
          </FavoriteTokensProvider>
        )}
      </Layout>
    </>
  );
};

export default TokenPage;
