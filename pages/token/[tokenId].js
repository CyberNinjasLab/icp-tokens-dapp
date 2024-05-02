import React, { lazy, Suspense, useContext } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head'; // Import the Head component
import Layout from '../../ui/components/_base/Layout';
import useTokenData from '../../ui/hooks/token/useTokenData';
import TokenHeader from '../../ui/components/tokens/details/TokenHeader';
import { GeneralContext } from '../../contexts/general/General.Context';
import { TokensTableContext } from '../../contexts/tokensTable/TokensTableContext';

// Lazy load components
const ChartComponent = lazy(() => import('../../ui/components/tokens/details/ChartComponent'));
const TokenInfo = lazy(() => import('../../ui/components/tokens/details/TokenInfo'));
const TokenDetails = lazy(() => import('../../ui/components/tokens/details/TokenDetails'));

const TokenPage = () => {
  const router = useRouter();
  const { tokenId } = router.query;
  const { tokenData, isLoading, error } = useTokenData(tokenId);
  const { getTokenName } = useContext(GeneralContext);

  // Example dynamic title. Adjust accordingly based on your tokenData properties.
  const pageTitle = tokenData ? `${getTokenName(tokenData)} | ICP Tokens` : "ICP Tokens";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        {/* If you have specific meta tags that should change with the page, include them here */}
      </Head>
      <Layout>
        {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {!isLoading && !error && tokenData && (
          <Suspense fallback={<div>Loading...</div>}>
            <div className='mt-4 lg:mt-0'>
              <TokenHeader tokenData={tokenData} />
              <div className="flex flex-col xl:flex-row xl:gap-20 gap-10">
                <div className="w-full">
                  <ChartComponent canister_id={tokenData.canister_id} />
                  <div className='w-full xl:max-w-sm block xl:hidden mt-12'>
                    <TokenInfo data={tokenData} />
                  </div>
                  <TokenDetails data={tokenData} />
                </div>
                <div className='w-full xl:max-w-sm hidden xl:block'>
                  <TokenInfo data={tokenData} />
                </div>
              </div>
            </div>
          </Suspense>
        )}
      </Layout>
    </>
  );
};

export default TokenPage;
