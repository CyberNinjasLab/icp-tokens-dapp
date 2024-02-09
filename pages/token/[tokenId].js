import { useRouter } from 'next/router';
import ChartComponent from '../../ui/components/ChartComponent';
import Layout from '../../ui/components/_base/Layout';
import TokenDetailsInfo from '../../ui/components/TokenDetailsInfo';
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

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
          <div className="flex items-center gap-2 mb-3">
            <img
              src={`http://127.0.0.1:8000/storage/${tokenData.logo}`}
              alt="icp-icon"
              className="w-10 rounded-full"
            />
            <Typography variant="h7">
              {tokenData?.name} ({tokenData?.symbol})
            </Typography>
          </div>
          <div className="flex gap-6 items-center mb-3">
            <Typography variant="h8">
              {/* TODO: Use same round function as homepage */}
              {parseFloat(tokenData?.price).toFixed(8)} ICP
            </Typography>
            <Typography color={tokenData?.change_24h > 0 ? 'green' : 'red'}>
              {tokenData?.change_24h > 0 ? (
                <ArrowUpwardIcon fontSize="small" />
              ) : (
                <ArrowDownwardIcon fontSize="small" />
              )}
              {tokenData?.change_24h}% (24h)
            </Typography>
            
            <Typography color={tokenData?.change_7d > 0 ? 'green' : 'red'}>
              {tokenData?.change_7d > 0 ? (
                <ArrowUpwardIcon fontSize="small" />
              ) : (
                <ArrowDownwardIcon fontSize="small" />
              )}
              {tokenData?.change_7d}% (7d)
            </Typography>   

            <Typography color={tokenData?.change_30d > 0 ? 'green' : 'red'}>
              {tokenData?.change_30d > 0 ? (
                <ArrowUpwardIcon fontSize="small" />
              ) : (
                <ArrowDownwardIcon fontSize="small" />
              )}
              {tokenData?.change_30d}% (30d)
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
