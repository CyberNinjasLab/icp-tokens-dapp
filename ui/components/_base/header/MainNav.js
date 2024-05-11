// MainNav.js
import React, { useContext, useState } from 'react';
import AccountNav from './AccountNav';
import MobileNav from './MobileNav';
import DesktopNav from './DesktopNav';
import { useRouter } from 'next/router';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import FeedIcon from '@mui/icons-material/Feed';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import PortfolioLink from '../PortfolioLink';
import WatchlistLink from '../WatchlistLink';
import CurrencySelector from '../CurrencySelector';
import { DarkMode, PieChart, Visibility } from '@mui/icons-material';
import LightMode from '@mui/icons-material/LightMode';
import { GeneralContext } from '../../../../contexts/general/General.Context';

const MainNav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useContext(GeneralContext);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const path = useRouter().route;

  const navConfig = [
    {
      id: 'cryptocurrencies',
      href: '/',
      label: 'Coins',
      icon: <AllInclusiveIcon fontSize="large" />, // Use the icon name, and dynamically render the actual icon in the component
      isDropdown: false,
    },
    // {
    //   id: 'feed',
    //   href: '/feed',
    //   label: 'Feed',
    //   icon: <FeedIcon fontSize="large" />,
    //   isDropdown: false,
    // },
    // {
    //   id: 'library',
    //   href: '/library',
    //   label: 'Library',
    //   icon: <MenuBookIcon fontSize="large" />,
    //   isDropdown: false,
    // },
    {
      id: 'markets',
      label: 'Markets',
      icon: <SwapHorizIcon fontSize="large" />,
      isDropdown: true,
      isOpen: false, // This can be dynamically checked/updated based on `isMenuOpen` state
      dropdownItems: [
        {
          id: 'dex',
          href: '/dex',
          label: 'DEX',
        },
        {
          id: 'nft',
          href: '/nft',
          label: 'NFT',
        },
      ],
    },
    {
      id: 'watchlist',
      href: '/watchlist',
      label: 'Watchlist',
      icon: <Visibility fontSize="large" />,
      isDropdown: false,
      mobileOnly: true,
    },
    {
      id: 'portfolio',
      href: '/portfolio',
      label: 'Portfolio',
      icon: <PieChart fontSize="large" />,
      isDropdown: false,
      mobileOnly: true,
    },
    {
      id: 'toggle-theme',
      href: '#toggle-theme',
      label: theme == 'dark' ? 'Light mode': 'Dark mode',
      icon: theme == 'dark' ? <LightMode fontSize="large" /> : <DarkMode fontSize="large" />,
      mobileOnly: true
    }
    // Add more navigation items as needed
  ];  

  return (
    <nav className='flex items-center w-full justify-end lg:justify-between'>
      <DesktopNav navLinks={navConfig} path={path} />
      <div></div>
      <div>
        <div className='inline-block'>
          <div className='hidden sm:inline-block'>
            <span className='mr-4'><WatchlistLink /></span>
            <PortfolioLink />
          </div>
        </div>
        <div className='mx-4 inline-block'>
          <CurrencySelector />
        </div>
        <div className='hidden lg:inline-block'>
          <AccountNav />
        </div>
      </div>
      <MobileNav navLinks={navConfig} isMobileMenuOpen={isMobileMenuOpen} toggleMobileMenu={toggleMobileMenu} path={path} />
    </nav>
  );
};

export default MainNav;
