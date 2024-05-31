import React, { useContext, useState } from 'react';
import Header from './header/Header';
import Footer from './Footer';
import ThemeRegistry from '../../../utils/ThemeRegistry';
import { GeneralContext } from '../../../contexts/general/General.Context';

const Layout = ({ children, footer=true }) => {
  const {currency} = useContext(GeneralContext);
  const [timeframe, setTimeFrame] = useState('24h');
  

  return (
    <div>
      <ThemeRegistry options={{ key: 'mui-theme' }}>
        <Header />
          <main className="pt-[84px] mx-auto container px-4 md:px-8">
            {children}
          </main>
        {footer ? <Footer /> : ""}
      </ThemeRegistry>
    </div>
  );
};

export default Layout;
