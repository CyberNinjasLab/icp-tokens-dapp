import Layout from '../ui/components/_base/Layout';
import TokensTable from '../ui/components/tokens/table/TokensTable';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { FavoriteTokensProvider } from '../contexts/general/FavoriteTokensProvider';
import Gainers from '../ui/components/tokens/gainers/Gainers';
import Loosers from '../ui/components/tokens/loosers/Loosers';
const Home = () => {
  const router = useRouter();
  useEffect(() => {
    if (window.location.pathname != router.pathname) {
      router.push(`/${window.location.pathname}`)
    }
  }, [])

  return (
    <Layout>
      <div>
        <h1 className='h1'>Internet Computer Tokens <span className='block xs:inline'>by Market Cap</span></h1>
        <FavoriteTokensProvider>
        <Gainers/>
        <Loosers/>
          <TokensTable />
        </FavoriteTokensProvider>
      </div>
    </Layout>
  );
};

export default Home;
