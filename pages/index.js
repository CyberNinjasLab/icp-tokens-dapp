import Layout from '../ui/components/_base/Layout';
import TokensTable from '../ui/components/tokens/table/TokensTable';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { FavoriteTokensProvider } from '../contexts/general/FavoriteTokensProvider';
import Head from 'next/head';
const Home = () => {
  const router = useRouter();
  useEffect(() => {
    if (window.location.pathname != router.pathname) {
      router.push(`/${window.location.pathname}`)
    }
  }, [])

  return (
    <>
      <Head>
        <title>ICP Tokens by Market Cap</title>
      </Head>
      <Layout extraClass={'xl:max-w-[1430px]'}>
        <div>
          <h1 className='h1'>Internet Computer Tokens <span className='block xs:inline'>by Market Cap</span></h1>
          <FavoriteTokensProvider>
            <TokensTable />
          </FavoriteTokensProvider>
        </div>
      </Layout>
    </>
  );
};

export default Home;
