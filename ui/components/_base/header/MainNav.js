// MainNav.js
import React, { useContext, useState } from 'react';
import AccountNav from './AccountNav';
import MobileNav from './MobileNav';
import DesktopNav from './DesktopNav';
import { useRouter } from 'next/router';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import PortfolioLink from '../PortfolioLink';
import WatchlistLink from '../WatchlistLink';
import CurrencySelector from '../CurrencySelector';
import { DarkMode, InsertDriveFile, PieChart, Visibility } from '@mui/icons-material';
import LightMode from '@mui/icons-material/LightMode';
import { GeneralContext } from '../../../../contexts/general/General.Context';
import Link from 'next/link';
import Search from './Search';
import useWindowWidthUnder from '../../../hooks/useWindowWidthUnder';

const MainNav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useContext(GeneralContext);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const isWindowUnder1200 = useWindowWidthUnder(1200);

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
      id: 'dex',
      href: '/dex',
      label: 'DEX',
      isDropdown: false,
      desktopOnly: true,
    },
    {
      id: 'nft',
      href: '/nft',
      label: 'NFT',
      isDropdown: false,
      desktopOnly: true,
    },
    {
      id: 'wallets',
      href: '/wallets',
      label: 'Wallets',
      isDropdown: false,
      desktopOnly: true,
    },
    {
      id: 'launchpads',
      href: '/launchpads',
      label: 'Launchpads',
      isDropdown: false,
      desktopOnly: true,
    },
    {
      id: 'pages',
      label: 'Pages',
      icon: <InsertDriveFile fontSize="large" />,
      isDropdown: true,
      isOpen: false, // This can be dynamically checked/updated based on `isMenuOpen` state
      mobileOnly: true,
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
        {
          id: 'wallets',
          href: '/wallets',
          label: 'Wallets',
        },
        {
          id: 'launchpads',
          href: '/launchpads',
          label: 'Launchpads',
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
    <nav className='flex items-center w-full justify-between'>
      <div className='flex items-center w-full sm:w-auto'>
        <DesktopNav navLinks={navConfig} path={path} />
        {/* Bubbles button */}
        <div className='font-semibold'>
          <Link href="/bubbles" className={`bubbles-button py-4 px-4 block sm:hidden md:block sm:hover:text-primary relative`}>
            Bubbles <span className='uppercase rounded-3xl bg-orange text-black dark:text-dark-bg absolute top-2 sm:left-[87%] left-[85%] text-[10px] font-extrabold px-2 py-[2px] scale-[0.85] sm:scale-90'>Hot</span>
          </Link>
        </div>
      </div>

      <div className='flex items-center'>
        <div></div>
        <div className='flex items-center'>
          <div className='inline-block'>
            <div>
              <span className={`sm:mr-4 ${isWindowUnder1200 ? 'lg:mr-0 xl:mr-4' : '' }`}><Search /></span>
              <span className={`mr-4 ${isWindowUnder1200 ? 'lg:mr-0 xl:mr-4' : '' } hidden sm:inline-block`}><WatchlistLink /></span>
              <span className='hidden sm:inline-block'><PortfolioLink /></span>
            </div>
          </div>
          <div className='sm:mx-4 mr-4 inline-block'>
            <CurrencySelector />
          </div>
          <div className='hidden lg:inline-block'>
            <AccountNav />
          </div>
        </div>
        <MobileNav navLinks={navConfig} isMobileMenuOpen={isMobileMenuOpen} toggleMobileMenu={toggleMobileMenu} path={path} />
      </div>
    </nav>
  );
};

export default MainNav;
