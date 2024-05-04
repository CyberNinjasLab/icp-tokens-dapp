import React, { useContext } from 'react';
import Layout from '../ui/components/_base/Layout';
import TokensTable from '../ui/components/tokens/table/TokensTable';
import { AuthContext } from '../contexts/auth/Auth.Context';
import LoginMessage from '../ui/components/_base/LoginMessage';
import { FavoriteTokensProvider } from '../contexts/general/FavoriteTokensProvider';

const Watchlist = () => {
  const { isAuthenticated } = useContext(AuthContext);

	return (
    <Layout>
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
	);
};

export default Watchlist;
