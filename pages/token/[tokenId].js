import { useRouter } from 'next/router';
import ChartComponent from '../../ui/components/ChartComponent';
import Layout from '../../ui/components/_base/Layout';
import TokenDetailsInfo from '../../ui/components/TokenDetailsInfo';
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

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
      <div className="flex flex-col xl:flex-row gap-2">
        <div className="w-full">
          <div className="flex items-center gap-1">
            {/*<img src={testData[2].icon} alt="icp-icon" className="w-10" />*/}
            <Typography variant="h7">
              {tokenData?.name} ({tokenData?.symbol})
            </Typography>
          </div>
          <div className="flex gap-2 items-center">
            <Typography variant="h8">
              {parseFloat(tokenData?.price).toFixed(8)} ICP
            </Typography>
            <Typography color="primary">
              <ArrowUpwardIcon fontSize="small" /> 2,45% (1d)
            </Typography>
          </div>
          <ChartComponent data={tokenData} />
        </div>
        <TokenDetailsInfo data={tokenData} />
      </div>
    </Layout>
  ) : null;
};

export default TokenPage;
