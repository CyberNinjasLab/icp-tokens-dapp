import React, { useState } from 'react';
import { TokensTableContext } from './TokensTableContext';

const TokensTableContextProvider = ({ children }) => {
  const [identity, setIdentity] = useState(233456);
  const contextValues = {
    identity,
    setIdentity
  };

  return (
    <TokensTableContext.Provider value={contextValues}>
      {children}
    </TokensTableContext.Provider>
  );
};

export default TokensTableContextProvider;
