import React, { useContext, useEffect } from 'react';
import Layout from '../ui/components/_base/Layout';
import TokensTable from '../ui/components/tokens/table/TokensTable';
import TokensTableContextProvider from '../contexts/tokensTable/TokensTableProvider';
import { AuthContext } from '../contexts/auth/Auth.Context';
import LoginMessage from '../ui/components/_base/LoginMessage';

const Watchlist = () => {
  const { isAuthenticated } = useContext(AuthContext);


	return (
    <Layout>
      <h1 className='h1'>Tokens Watchlist</h1>
      { !isAuthenticated ? (
        <LoginMessage />
      ) : (
        <div>
          <TokensTableContextProvider>
            <TokensTable showFavoritesOnly={true} />
          </TokensTableContextProvider>
        </div>
      ) }
    </Layout>
	);
};

export default Watchlist;
