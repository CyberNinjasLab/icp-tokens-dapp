import React, { useContext, useState } from 'react';
import { LoadingContext } from './Loading.Context';

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
  const [loadingState, setLoadingState] = useState(false);

  return (
    <LoadingContext.Provider value={{ loadingState, setLoadingState }}>
      {children}
    </LoadingContext.Provider>
  );
};
