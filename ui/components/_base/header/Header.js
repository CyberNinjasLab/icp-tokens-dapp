// Header.js - Simplified for demonstration
import React, { useState } from 'react';
import Logo from '../Logo';
import Link from 'next/link';
import MainNav from './MainNav';
import CurrencySelector from '../CurrencySelector';

const Header = () => {
  return (
    <header className="z-[100] fixed w-full bg-white">
			<div className="w-full bg-white fixed top-0 flex justify-between lg:justify-start items-center lg:flex-start lg:space-x-12 border-b border-solid px-4 lg:py-0 overflow-visible lg:px-8">
				<div className="flex items-center">
					{/* Use Link without <a> */}
					<Link href="/" className='w-[130px]'>
						<Logo />
					</Link>

					<CurrencySelector />
				</div>
				<MainNav />
      </div>
    </header>
  );
};

export default Header;
