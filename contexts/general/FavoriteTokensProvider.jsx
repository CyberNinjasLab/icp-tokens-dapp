import React, { createContext, useState, useContext } from 'react';
import useTokenFavorites from '../../ui/hooks/token/useTokenFavorites';

const FavoriteTokensContext = createContext();

export const FavoriteTokensProvider = ({ children }) => {
  const { favoriteTokenIds, loading, addTokenToFavorites, removeTokenFromFavorites } = useTokenFavorites();

  const contextValues = {
    favoriteTokenIds: favoriteTokenIds,
    loadingFavorites: loading,
    addTokenToFavorites: addTokenToFavorites,
    removeTokenFromFavorites: removeTokenFromFavorites,
  };

  return (
    <FavoriteTokensContext.Provider value={contextValues}>
      {children}
    </FavoriteTokensContext.Provider>
  );
};

export const useFavoriteTokens = () => useContext(FavoriteTokensContext);
