import React, { useState, useEffect } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { AuthContext } from "./Auth.Context"; // Ensure the path matches your file structure
import { createActor } from "../../src/declarations/backend_core"
import { useRouter } from "next/router";

const AuthContextProvider = ({ children }) => {
  const [authClient, setAuthClient] = useState(undefined);
  const [user, setUser] = useState(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [identity, setIdentity] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      const client = await AuthClient.create();
      setAuthClient(client);
      const isAuthenticated = await client.isAuthenticated();
      setIsAuthenticated(isAuthenticated);
      
      if (isAuthenticated) {
        await initializeUserSession(client);
      }
    };

    initAuth();
  }, []);

  const initializeUserSession = async (client) => {
    const identityObj = client.getIdentity();
    setIdentity(identityObj);

    const backendCoreActor = createActor(process.env.NEXT_PUBLIC_BACKEND_CORE_CANISTER_ID, {
      agentOptions: {
        identity: identityObj,
        host: process.env.DFX_NETWORK === 'ic' ? ('https://' + process.env.NEXT_PUBLIC_BACKEND_CORE_CANISTER_ID + '.ic0.app') : 'http://127.0.0.1:4943'
      },
    });

    let data = await backendCoreActor.getCurrentUser()

    setUser(await backendCoreActor.getCurrentUser())
  };

  const login = async () => {
    if (!authClient) return; // Ensure the auth client is initialized
    authClient.login({
      maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000),
      disableIdle: true,
      identityProvider: process.env.DFX_NETWORK === 'ic' ? 
        'https://identity.ic0.app/#authorize' : 
        `http://localhost:4943?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai#authorize`,
      onSuccess: async () => {
        setIsAuthenticated(await authClient.isAuthenticated());
        await initializeUserSession(authClient);
        router.push('/account')
      },
    });
  };

  const logout = async () => {
    if (!authClient) return; // Ensure the auth client is initialized
    await authClient.logout();
    setIsAuthenticated(false);
    setIdentity(null);
    setUser(null);
  };

  const contextValue = {
    isAuthenticated,
    identity,
    user,
    authClient,
    initializeUserSession,
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
