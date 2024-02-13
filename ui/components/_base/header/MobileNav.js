// MobileNav.js
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu'; // Icons should be replaced with appropriate imports
import CloseIcon from '@mui/icons-material/Close';
import SocialLinks from '../SocialLinks';
import Link from 'next/link';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const MobileNav = ({ navLinks, isMobileMenuOpen, toggleMobileMenu, path }) => {
  const [dropdownStates, setDropdownStates] = useState({});

  const toggleDropdown = (isOpen) => {
    console.log(isOpen)
    setDropdownStates(prevState => ({
      ...prevState,
      [isOpen]: !prevState[isOpen]
    }));
  };

  return (
    <>
      <div id="mobile-toggler" onClick={toggleMobileMenu} className="lg:hidden">
        {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
      </div>
      <div className={`z-[100] ${isMobileMenuOpen ? 'visible animate-fadeInLeft' : 'invisible animate-fadeInRight'} flex flex-col justify-between transition-visible ease-in-out delay-150 duration-300 py-6 left-0 bg-white w-full top-[61px] fixed h-[calc(100%-61px)] shadow-xl`}>
        <ul className="pb-16 overflow-y-scroll">
          {navLinks.map((link) =>
            link.isDropdown !== true ? (
              <li key={link.href} className={`${path === link.href && "before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:border-l-4 before:border-solid before:border-primary"} relative mb-4 px-4`}>
                <div className="relative flex items-center">
                  <Link href={link.href} className={`${path === link.href ? "text-primary" : "text-mobile-menu"} py-2`}>
                    <span className={`${path === link.href && "text-primary"} pr-5`}>{link.icon}</span>
                    {link.label}
                  </Link>
                </div>
              </li>
            ) : (
              <li key={link.href} className="relative mb-4">
                <div className="flex justify-between py-2" onClick={() => toggleDropdown(link.isOpen)}>
                  <div className={`px-4 ${(link.dropdownItems.some(item => path === item.href)) && " before:content-[''] before:absolute before:left-0 before:h-[51px] before:border-l-4 before:border-solid before:border-primary"} relative flex items-center`}>
                    <span className={`${(link.dropdownItems.some(item => path === item.href)) ? "text-primary" : "text-mobile-menu"} pr-5`}>{link.icon}</span>
                    <button className={`${(link.dropdownItems.some(item => path === item.href)) ? "text-primary" : "text-mobile-menu"}`}>{link.label}</button>
                  </div>
                  <div id={link.label} className='px-4'>
                    {dropdownStates[link.isOpen]
                      ? <KeyboardArrowUpIcon className="text-mobile-menu cursor-pointer" sx={{ fontSize: 35 }} />
                      : <KeyboardArrowDownIcon className="text-mobile-menu cursor-pointer" sx={{ fontSize: 35 }} />
                    }
                  </div>
                </div>
                {dropdownStates[link.isOpen] &&
                  <div className="m-4 px-4">
                    {link.dropdownItems.map(sublink => (
                      <li key={sublink.id} className="mb-2 py-2 text-mobile-menu">
                        <Link href={sublink.href}>{sublink.label}</Link>
                      </li>
                    ))}
                  </div>
                }
              </li>
            )
          )}
        </ul>
        <div className={`flex justify-center gap-5 items-center`}>
          <SocialLinks />
        </div>
      </div>
    </>
  );
};

export default MobileNav;
