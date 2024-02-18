import React, { useState, useEffect } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { AuthContext } from "./Auth.Context"; // Ensure the path matches your file structure

const AuthContextProvider = ({ children }) => {
  const [authClient, setAuthClient] = useState(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [identity, setIdentity] = useState(null);

  useEffect(() => {
    // Initialize the auth client and check the current authentication status on component mount
    const initAuth = async () => {
      const client = await AuthClient.create();
      setAuthClient(client);
      const isAuthenticated = await client.isAuthenticated();
      setIsAuthenticated(isAuthenticated);
      if (isAuthenticated) {
        setIdentity(client.getIdentity());
      }
    };

    initAuth();
  }, []);

  const login = async () => {
    if (!authClient) return; // Ensure the auth client is initialized
    authClient.login({
      identityProvider: process.env.DFX_NETWORK === 'ic' ? 
        'https://identity.ic0.app/#authorize' : 
        `http://localhost:4943?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai#authorize`,
      onSuccess: async () => {
        setIsAuthenticated(await authClient.isAuthenticated());
        setIdentity(authClient.getIdentity());
      },
    });
  };

  const logout = async () => {
    if (!authClient) return; // Ensure the auth client is initialized
    await authClient.logout();
    setIsAuthenticated(false);
    setIdentity(null);
  };

  const contextValue = {
    isAuthenticated,
    identity,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
