import React, { useState } from 'react';
import { GeneralContext } from './General.Context';

const GeneralContextProvider = ({ children }) => {
  const [identity, setIdentity] = useState(233456);
  const contextValues = {
      identity,
      setIdentity,
  }

  return (
    <GeneralContext.Provider value={contextValues}>
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;