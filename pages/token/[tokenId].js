import { useRouter } from 'next/router';
import ChartComponent from '../../ui/components/ChartComponent';
import Layout from '../../ui/components/_base/Layout';
import TokenDetailsInfo from '../../ui/components/TokenDetailsInfo';
import { useEffect, useState } from 'react';

const TokenPage = () => {
  const router = useRouter();
  const { tokenId } = router.query; // Access the "tokenId" parameter
  const [tokenData, setTokenData] = useState(null);

  useEffect(() => {
    const fetchTokenData = async () => {
      if (!tokenId) return;

      const response = await fetch(
        `http://icptokens.net/api/tokens/${tokenId}`
      );
      const data = await response.json();
      setTokenData(data);
    };

    fetchTokenData();
  }, [tokenId]);

  return tokenData ? (
    <Layout>
      <div className="xl:flex">
        <div className="w-full">
          <div className="flex items-center gap-1">
            {/*<img src={testData[2].icon} alt="icp-icon" className="w-10" />*/}
            <p>
              {tokenData?.name} ({tokenData?.symbol})
            </p>
          </div>
          <h1 className="text-lg font-semibold">{tokenData?.price} ICP</h1>
          <ChartComponent data={tokenData} />
        </div>
        <TokenDetailsInfo data={tokenData} />
      </div>
    </Layout>
  ) : null;
};

export default TokenPage;
