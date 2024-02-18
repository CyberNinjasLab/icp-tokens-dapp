// MainNav.js
import React, { useState } from 'react';
import AccountNav from './AccountNav';
import MobileNav from './MobileNav';
import DesktopNav from './DesktopNav';
import { useRouter } from 'next/router';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import FeedIcon from '@mui/icons-material/Feed';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

const MainNav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    {
      id: 'feed',
      href: '/feed',
      label: 'Feed',
      icon: <FeedIcon fontSize="large" />,
      isDropdown: false,
    },
    {
      id: 'library',
      href: '/library',
      label: 'Library',
      icon: <MenuBookIcon fontSize="large" />,
      isDropdown: false,
    },
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
    // Add more navigation items as needed
  ];  

  return (
    <nav className='flex items-center w-full justify-end lg:justify-between'>
      <DesktopNav navLinks={navConfig} path={path} />
      <AccountNav />
      <MobileNav navLinks={navConfig} isMobileMenuOpen={isMobileMenuOpen} toggleMobileMenu={toggleMobileMenu} path={path} />
    </nav>
  );
};

export default MainNav;
