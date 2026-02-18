import React, { useContext } from 'react';
import Layout from '../ui/components/_base/Layout';
import { AuthContext } from '../contexts/auth/Auth.Context';
import LoginMessage from '../ui/components/_base/LoginMessage';
import { FavoriteTokensProvider } from '../contexts/general/FavoriteTokensProvider';
import Head from 'next/head';
import CryptoTable from '../ui/components/tokens/tableV2/CryptoTable';

const Watchlist = () => {
  const { isAuthenticated } = useContext(AuthContext);

	return (
    <>
      <Head>
        <title>Watchlist | ICP Tokens by Market Cap</title>
        <meta name="description" content="Create a personalized watchlist for ICP Tokens. Track your favorite tokens in real-time and stay updated on price changes within the Internet Computer ecosystem." />
        <meta name="twitter:title" content="Watchlist | ICP Tokens by Market Cap"/>
        <meta name="twitter:description" content="Create a personalized watchlist for ICP Tokens. Track your favorite tokens in real-time and stay updated on price changes within the Internet Computer ecosystem."/>
        <link rel="canonical" href="https://icptokens.net/watchlist" />
      </Head>
      <Layout extraClass={'max-w-[1430px]'}>
        <h1 className='h1'>Tokens Watchlist</h1>
        { !isAuthenticated ? (
          <LoginMessage />
        ) : (
          <div>
            <FavoriteTokensProvider>
              <CryptoTable showFavoritesOnly={true} />
            </FavoriteTokensProvider>
          </div>
        ) }
      </Layout>
    </>
	);
};

export default Watchlist;
