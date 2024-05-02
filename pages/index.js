import Layout from '../ui/components/_base/Layout';
import TokensTable from '../ui/components/tokens/table/TokensTable';
import TokensTableContextProvider from '../contexts/tokensTable/TokensTableProvider';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
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
        <TokensTableContextProvider>
          <TokensTable />
        </TokensTableContextProvider>
      </div>
    </Layout>
  );
};

export default Home;
