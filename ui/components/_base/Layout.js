import React from 'react';
import Header from './header/Header';
import Footer from './Footer';
import ThemeRegistry from '../../../utils/ThemeRegistry';
import DonateBanner from './DonateBanner';

const Layout = ({ children, footer=true, extraClass='' }) => {
  return (
    <div>
      <ThemeRegistry options={{ key: 'mui-theme' }}>
        <Header />
          <main className={`pt-[84px] mx-auto container ${extraClass} px-4 md:px-8`}>
            {children}
          </main>
        {footer ? <Footer /> : ""}
        <DonateBanner />
      </ThemeRegistry>
    </div>
  );
};

export default Layout;
