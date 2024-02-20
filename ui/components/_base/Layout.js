import React, { useContext, useState, useEffect } from 'react';
import Header from './header/Header';
import Footer from './Footer';
import ThemeRegistry from '../../../utils/ThemeRegistry';
import { Button } from '@mui/material';
import { AuthContext } from '../../../contexts/auth/Auth.Context';
import { useRouter } from 'next/router';

const Layout = ({ children }) => {
  const { isAuthenticated, login, user, identity } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Effect to monitor user initialization and update loading state accordingly
  useEffect(() => {
    if (user !== undefined) {
      setIsLoading(false);
    }
  }, [user, identity]);

  const handleRequestAccessButton = () => {
    if(isAuthenticated && showAccessRequest && !(user && user[0] && user[0]['hasAccess'])) {
      router.push('/account')
    } else {
      login();
    }
  };

  const isAccountPage = router.pathname === '/account';
  const hasTwitterAcc = user && user[0] && user[0]['twitterAcc'];
  const showAccessRequest = !isAuthenticated || isLoading || (!(user && user[0] && user[0]['hasAccess']) && !isAccountPage);

  return (
    <div>
      <Header />
      <ThemeRegistry options={{ key: 'mui-theme' }}>
        <main className="pt-[84px] mx-auto container px-4 md:px-8">
          {showAccessRequest ? (
            <div className='w-full text-center md:mt-6'>
              <span className='text-center block text-3xl md:text-4xl uppercase font-semibold'>Preview Our App</span>
              <img src="/illustrations/early-access.svg" className='max-w-[380px] inline mt-8' alt="Early Access Illustration" />
              <div className='mt-6'>
                {hasTwitterAcc ? (
                  <span className='text-xl font-semibold'>Your request is under review...</span>
                ) : (
                  <Button onClick={handleRequestAccessButton} variant="contained" size='large' color='primary'>Start Exploring</Button>
                )}
              </div>
            </div>
          ) : children}
        </main>
      </ThemeRegistry>
      <Footer />
    </div>
  );
};

export default Layout;
