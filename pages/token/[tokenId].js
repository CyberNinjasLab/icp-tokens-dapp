import React, { useContext, lazy, Suspense } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../ui/components/_base/Layout';
import useTokenData from '../../ui/hooks/useTokenData'; // Import the hook
import TokenDetailsHeader from '../../ui/components/tokens/details/TokenHeader';

// Lazy load components
const ChartComponent = lazy(() => import('../../ui/components/tokens/details/ChartComponent'));
const TokenDetailsInfo = lazy(() => import('../../ui/components/tokens/details/TokenInfo'));

const TokenPage = () => {
  const router = useRouter();
  const { tokenId } = router.query;
  const { tokenData, isLoading, error } = useTokenData(tokenId); // Use the hook

  return (
    <Layout>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {!isLoading && !error && tokenData && (
        <Suspense fallback={<div>Loading...</div>}>
          <TokenDetailsHeader tokenData={tokenData} />
          <div className="flex flex-col xl:flex-row gap-4">
            <div className="w-full">
              <ChartComponent canister_id={tokenData.canister_id} />
            </div>
            <TokenDetailsInfo data={tokenData} />
          </div>
        </Suspense>
      )}
    </Layout>
  );
};

export default TokenPage;
