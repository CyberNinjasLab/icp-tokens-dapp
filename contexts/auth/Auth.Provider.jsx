import React, { useState, useEffect } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { AuthContext } from "./Auth.Context"; // Ensure the path matches your file structure
import { createActor } from "../../src/declarations/backend_core"
import LoginModal from "../../ui/components/_base/LoginModal";
import ThemeRegistry from "../../utils/ThemeRegistry";

const AuthContextProvider = ({ children }) => {
  const [authClient, setAuthClient] = useState(undefined);
  const [user, setUser] = useState(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [identity, setIdentity] = useState(null);
  const [backendCoreActor, setBackendCoreActor] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const sessionDurationInDays = 30;

  const initAuth = async () => {
    const client = await AuthClient.create({
      idleOptions: {
        disableIdle: true,
        disableDefaultIdleCallback: true,
      },
    });
    setAuthClient(client);
    const isAuthenticated = await client.isAuthenticated();
    
    setIsAuthenticated(isAuthenticated);
    
    if (isAuthenticated) {
      await initializeUserSession(client);
    }
  };

  useEffect(() => {
    initAuth();
  }, []);

  const initializeUserSession = async (client) => {
    const identityObj = client.getIdentity();
    setIdentity(identityObj);

    const actor = createActor(process.env.NEXT_PUBLIC_BACKEND_CORE_CANISTER_ID, {
      agentOptions: {
        identity: identityObj,
        host: process.env.DFX_NETWORK === 'ic' ?
          ('https://' + process.env.NEXT_PUBLIC_BACKEND_CORE_CANISTER_ID + '.ic0.app') :
          ('http://127.0.0.1:4943/?canisterId=' + process.env.NEXT_PUBLIC_BACKEND_CORE_CANISTER_ID)
      },
    });
    setBackendCoreActor(actor);

    let user = await actor.getCurrentUser();
    
    if(!user.length) {
      user = await actor.createUser();
    }

    setUser(user);
  };

  const login = async () => {
    // Init auth again to guarantee proper session!
    await initAuth();
    
    if (!authClient) return; // Ensure the auth client is initialized

    authClient.login({
      maxTimeToLive: BigInt(sessionDurationInDays * 24 * 60 * 60 * 1000 * 1000 * 1000),
      disableIdle: true,
      identityProvider: process.env.DFX_NETWORK === 'ic' ? 
        'https://identity.ic0.app/#authorize' : 
        `http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943/#authorize`,
      onSuccess: async () => {
        setIsAuthenticated(await authClient.isAuthenticated());
        setIsLoginModalOpen(false);
        await initializeUserSession(authClient);
      },
    });
  };

  const logout = async () => {
    if (!authClient) return; // Ensure the auth client is initialized
    await authClient.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  const contextValue = {
    isAuthenticated,
    identity,
    user,
    authClient,
    backendCoreActor,
    initializeUserSession,
    login,
    logout,
    isLoginModalOpen,
    openLoginModal: () => setIsLoginModalOpen(true),
    closeLoginModal: () => setIsLoginModalOpen(false)
  };

  return (
    <AuthContext.Provider value={contextValue}>
      <ThemeRegistry options={{ key: 'mui-theme' }}>
        <LoginModal open={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
        {children}
      </ThemeRegistry>
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
