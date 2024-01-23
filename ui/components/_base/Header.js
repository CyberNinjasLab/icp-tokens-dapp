import * as React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router'
import { useRef } from "react"

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import RedditIcon from '@mui/icons-material/Reddit';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import FeedIcon from '@mui/icons-material/Feed';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { MenuItem, MenuList, Paper } from '@mui/material';

import useOnClickOutside from '../../hooks/clickOutsideHook';

const Header = () => {
	const marketsMenuWrapperRef = useRef(null);
	const accountMenuWrapperRef = useRef(null);

	const path = useRouter().route;
	const [hamburgerIsOpen, setHamburgerIsOpen] = useState(false);
	const [marketsIsOpenMobile, setmarketsIsOpenMobile] = useState(false);
	const [marketsIsOpenDesktop, setmarketsIsOpenDesktop] = useState(false);
	const [accountIsOpen, setAccountIsOpen] = useState(false);
	useOnClickOutside(marketsMenuWrapperRef, () => setmarketsIsOpenDesktop(false));
	useOnClickOutside(accountMenuWrapperRef, () => setAccountIsOpen(false));

	const hamburgerMenuHandler = () => {
		setHamburgerIsOpen(!hamburgerIsOpen);
	};

	const marketButtonHandlerMobile = () => {
		setmarketsIsOpenMobile(!marketsIsOpenMobile);
	};

	const accountButtonHandler = () => {
		setAccountIsOpen(!accountIsOpen);
	};

	const navLinks = [
		{ href: '/currencies', label: 'Cryptocurrencies', icon: <AllInclusiveIcon className={`${path === '/currencies' ? "text-active-link-green" : "text-mobile-menu-grey"}`} fontSize="large" /> },
		{ href: '/feed', label: 'Feed', icon: <FeedIcon className={`${path === '/feed' ? "text-active-link-green" : "text-mobile-menu-grey"}`} fontSize="large" /> },
		{ href: '/library', label: 'Library', icon: <MenuBookIcon className={`${path === '/library' ? "text-active-link-green" : "text-mobile-menu-grey"}`} fontSize="large" /> },
		// Add more links as needed
	];

	return (
		<header className={`${hamburgerIsOpen && "fixed w-full bg-white"}`}>
			<div className="flex justify-between lg:justify-start items-center lg:flex-start lg:space-x-12 border-b border-solid px-4 py-4 lg:py-0 overflow-visible lg:px-8">
				<div className="flex items-center space-x-4">
					{/* Use Link without <a> */}
					<Link href="/">
						<span className="relative bottom-px flex items-center space-x-4 cursor-pointer">
							<img src="/logo.png" alt="ICP Tokens logo" className="w-[35px]" />
							<span className="font-semibold uppercase tracking-wide">
								ICP<span className="text-token-title-green">Tokens</span>
							</span>
						</span>
					</Link>
				</div>
				<nav>
					<ul className="hidden lg:flex lg:items-center lg:space-x-4 lg:gap-4">
						{/* Desktop - links */}
						{navLinks.map(link =>
							<li key={link.href} className={`lg:py-4 lg:after:w-0 hover:after:w-full lg:hover:after:bg-active-link-green
							 after:m-auto lg:relative after:content-[''] after:rounded-sm after:block after:h-1 after:bg-transparent
							  after:transition-all after:duration-300 ${path === link.href && "lg:after:w-full lg:after:bg-active-link-green"}`}>
								<div className="relative flex gap-[0.8rem] items-center">
									<Link href={link.href} className={`${path === link.href ? "text-active-link-green" : "text-mobile-menu-grey"}`}>{link.label}</Link>
								</div>
							</li>
						)}
						<li onMouseEnter={() => setmarketsIsOpenDesktop(true)} onMouseLeave={() => setmarketsIsOpenDesktop(false)}  className={`lg:py-4 lg:after:w-0 hover:after:w-full lg:hover:after:bg-active-link-green after:m-auto lg:relative 
						after:content-[''] after:rounded-sm after:block after:h-1 after:bg-transparent after:transition-all after:duration-300
						  ${(path === '/dex' || path === '/nft') && "lg:after:w-full lg:after:bg-active-link-green"}`}>
							<div className="flex justify-between">
								<div className="relative flex gap-[0.8rem] items-center">
									<button className={`${(path === '/dex' || path === '/nft') ? "text-active-link-green" : "text-mobile-menu-grey"}`}>Markets</button>
								</div>
								<div>
									{marketsIsOpenDesktop
										? <KeyboardArrowUpIcon className="text-mobile-menu-grey cursor-pointer" sx={{ fontSize: 24, position: 'absolute' }} />
										: <KeyboardArrowDownIcon className="text-mobile-menu-grey cursor-pointer" sx={{ fontSize: 24, position: 'absolute' }} />
									}
								</div>
							</div>
							{marketsIsOpenDesktop &&
								<div className="lg:absolute lg:top-[50px] lg:w-[60px] lg:text-center">
									<Paper ref={marketsMenuWrapperRef}>
										<MenuList>
											<li className="py-2 hover:bg-background-hover-menu">
												<Link href="/dex" className={`${path === '/dex' ? "text-active-link-green" : "text-mobile-menu-grey"}`}>DEX</Link>
											</li>
											<li className="py-2 hover:bg-background-hover-menu">
												<Link href="/nft" className={`${path === '/nft' ? "text-active-link-green" : "text-mobile-menu-grey"}`}>NFT</Link>
											</li>
										</MenuList>
									</Paper>
								</div>
							}
						</li>
					</ul>

					{/* Mobile */}
					<div onClick={hamburgerMenuHandler} className="lg:hidden">
						{hamburgerIsOpen
							? <CloseIcon className="text-mobile-menu-grey" fontSize="large" />
							: <MenuIcon className="text-mobile-menu-grey" fontSize="large" />
						}
					</div>
					{/* If hamburger-menu is clicked */}
					<div className={`${hamburgerIsOpen ? 'visible animate-fadeInLeft' : 'invisible animate-fadeInRight'} flex flex-col justify-between transition-visible ease-in-out delay-150 duration-300 px-4 py-6  z-[100] left-0 bg-white w-full top-[68px] fixed h-[calc(100%-68px)] shadow-xl`} >
						<ul className="overflow-y-scroll pb-16">
							{/* Before Element For Active Link */}
							{navLinks.map(link =>
								<li key={link.href} className={`${path === link.href && "before:content-[''] before:absolute before:-left-4 before:top-0 before:h-full before:border-l-4 before:border-solid before:border-active-link-green"} relative mb-4 py-2`}>
									<div className="relative flex gap-[0.8rem] items-center">
										{link.icon}
										<Link href={link.href} onClick={hamburgerMenuHandler} className={`${path === link.href ? "text-active-link-green" : "text-mobile-menu-grey"}`}>{link.label}</Link>
									</div>
								</li>
							)}
							<li className={`${(path === '/dex' || path === '/nft') && "before:content-[''] before:absolute before:-left-4 before:top-0 before:h-full before:border-l-4 before:border-solid before:border-active-link-green"} relative mb-4 py-2`}>
								<div className="flex justify-between">
									<div className="relative flex gap-[0.8rem] items-center">
										<SwapHorizIcon className={`${(path === '/dex' || path === '/nft') ? "text-active-link-green" : "text-mobile-menu-grey"}`} fontSize="large" />
										<button className={`${(path === '/dex' || path === '/nft') ? "text-active-link-green" : "text-mobile-menu-grey"}`}>Markets</button>
									</div>
									<div onClick={marketButtonHandlerMobile}>
										{marketsIsOpenMobile
											? <KeyboardArrowUpIcon className="text-mobile-menu-grey" sx={{ fontSize: 35 }} />
											: <KeyboardArrowDownIcon className="text-mobile-menu-grey" sx={{ fontSize: 35 }} />
										}
									</div>
								</div>
							</li>
							{marketsIsOpenMobile &&
								<div className="mx-4">
									<li className="mb-4 py-2">
										<Link href="/dex" onClick={hamburgerMenuHandler} className={`${path === '/dex' ? "text-active-link-green" : "text-mobile-menu-grey"}`}>DEX</Link>
									</li>
									<li className="mb-4 py-2">
										<Link href="/nft" onClick={hamburgerMenuHandler} className={`${path === '/nft' ? "text-active-link-green" : "text-mobile-menu-grey"}`}>NFT</Link>
									</li>
								</div>
							}
						</ul>
						{/* If hamburger-menu is clicked social media will be showed */}
						<div className={`${hamburgerIsOpen ? 'visible animate-fadeInLeft absolute w-full bottom-0 left-0 py-4 bg-white' : 'invisible animate-fadeInRight'} flex justify-center gap-4 transition-visible ease-in-out delay-150 duration-300`}>
							<TwitterIcon className="text-mobile-menu-grey" sx={{ fontSize: 38 }} />
							<FacebookRoundedIcon className="text-mobile-menu-grey" sx={{ fontSize: 38 }} />
							<InstagramIcon className="text-mobile-menu-grey" sx={{ fontSize: 38 }} />
							<RedditIcon className="text-mobile-menu-grey" sx={{ fontSize: 38 }} />
						</div>
					</div>
				</nav>

				{/* Desktop  - notification and account */}
				<div className="hidden lg:flex lg:items-center lg:!ml-auto lg:gap-4">
					<button>
						<NotificationsNoneIcon className="text-mobile-menu-grey" sx={{ fontSize: 28 }} />
					</button>
					<div className="relative">
						<button>
							<AccountCircleIcon onClick={accountButtonHandler} className="text-mobile-menu-grey" sx={{ fontSize: 28 }} />
						</button>
						{accountIsOpen &&
							<Paper ref={accountMenuWrapperRef} sx={{
								position: 'absolute',
								width: 80,
								textAlign: 'center',
								top: 36,
								right: -25,
							}}>
								<MenuList>
									<li className="py-2 hover:bg-background-hover-menu">
										<Link href="/profile" className={`${path === '/profile' ? "text-active-link-green" : "text-mobile-menu-grey"}`}>Profile</Link>
									</li>
									<li className="py-2 hover:bg-background-hover-menu">
										<Link href="/account-settings" className={`${path === '/accout-settings' ? "text-active-link-green" : "text-mobile-menu-grey"}`}>Settings</Link>
									</li>
									<li className="py-2 hover:bg-background-hover-menu">
										<Link href="/logout" className="text-mobile-menu-grey">Logout</Link>
									</li>
								</MenuList>
							</Paper>
						}
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;