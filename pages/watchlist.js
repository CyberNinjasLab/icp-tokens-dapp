import React, { useContext } from 'react';
import Layout from '../ui/components/_base/Layout';
import TokensTable from '../ui/components/tokens/table/TokensTable';
import { AuthContext } from '../contexts/auth/Auth.Context';
import LoginMessage from '../ui/components/_base/LoginMessage';
import { FavoriteTokensProvider } from '../contexts/general/FavoriteTokensProvider';
import Head from 'next/head';

const Watchlist = () => {
  const { isAuthenticated } = useContext(AuthContext);

	return (
    <>
      <Head>
        <title>Watchlist | ICP Tokens</title>
      </Head>
      <Layout extraClass={'xl:max-w-[1430px]'}>
        <h1 className='h1'>Tokens Watchlist</h1>
        { !isAuthenticated ? (
          <LoginMessage />
        ) : (
          <div>
            <FavoriteTokensProvider>
              <TokensTable showFavoritesOnly={true} />
            </FavoriteTokensProvider>
          </div>
        ) }
      </Layout>
    </>
	);
};

export default Watchlist;
