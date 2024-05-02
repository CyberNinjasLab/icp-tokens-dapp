import React from 'react';
import { TokensTableContext } from './TokensTableContext';
import useTokenFavorites from '../../ui/hooks/token/useTokenFavorites';

const TokensTableContextProvider = ({ children }) => {
  const { favoriteTokenIds, loading, addTokenToFavorites, removeTokenFromFavorites } = useTokenFavorites();
  
  const contextValues = {
    favorites: favoriteTokenIds,
    loadingFavorites: loading,
  };
  return (
    <TokensTableContext.Provider value={contextValues}>
      {children}
    </TokensTableContext.Provider>
  );
};

export default TokensTableContextProvider;
