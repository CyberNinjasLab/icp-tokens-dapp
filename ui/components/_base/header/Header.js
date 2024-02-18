// Header.js - Simplified for demonstration
import React, { useState } from 'react';
import Logo from '../Logo';
import Link from 'next/link';
import MainNav from './MainNav';

const Header = () => {
  return (
    <header className="z-[100] fixed w-full bg-white">
			<div className="w-full bg-white fixed top-0 flex justify-between lg:justify-start items-center lg:flex-start lg:space-x-12 border-b border-solid px-4 lg:py-0 overflow-visible lg:px-8">
				<div className="flex items-center space-x-4">
					{/* Use Link without <a> */}
					<Link href="/">
						<Logo />
					</Link>
				</div>
				<MainNav />
      </div>
    </header>
  );
};

export default Header;
