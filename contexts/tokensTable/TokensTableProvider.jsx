import React from 'react';
import { TokensTableContext } from './TokensTableContext';
import useLocalStorage from '../../ui/hooks/useLocalStorage';

const TokensTableContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useLocalStorage('favorites', []);
  const contextValues = {
    favorites,
    setFavorites
  };
  return (
    <TokensTableContext.Provider value={contextValues}>
      {children}
    </TokensTableContext.Provider>
  );
};

export default TokensTableContextProvider;
