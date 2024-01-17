import { useRouter } from 'next/router';
import ChartComponent from '../../ui/components/ChartComponent';
import Layout from '../../ui/components/_base/Layout';
import { testData } from '../table/seedData';
import TokenDetailsInfo from '../../ui/components/TokenDetailsInfo';
import { Button, ButtonGroup } from '@mui/material';

const TokenPage = () => {
  const router = useRouter();
  const { symbol } = router.query; // Access the "symbol" parameter

  const buttons = [
    <Button key="1d">1D</Button>,
    <Button key="1w">1W</Button>,
    <Button key="1m">1M</Button>,
    <Button key="1y">1Y</Button>
  ];

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
        <ButtonGroup
          variant="outlined"
          aria-label="outlined primary button group"
          fullWidth={true}
          className="my-3"
        >
          {buttons}
        </ButtonGroup>
        <TokenDetailsInfo />
      </div>
    </Layout>
  );
};

export default TokenPage;
