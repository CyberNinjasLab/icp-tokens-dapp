import { useRouter } from 'next/router';
import ChartComponent from '../../ui/components/ChartComponent';
import Layout from '../../ui/components/_base/Layout';
import { testData } from '../table/seedData';
import TokenDetailsInfo from '../../ui/components/TokenDetailsInfo';

const TokenPage = () => {
  const router = useRouter();
  const { symbol } = router.query; // Access the "symbol" parameter

  return (
    <Layout>
      <div>
        <div className="flex items-center gap-1">
          <img src={testData[2].icon} alt="icp-icon" className="w-10" />
          <p>
            {testData[2].name} ({symbol})
          </p>
        </div>
        <h1 className="text-lg font-semibold">$9,999</h1>
        <ChartComponent />
        <TokenDetailsInfo />
      </div>
    </Layout>
  );
};

export default TokenPage;
