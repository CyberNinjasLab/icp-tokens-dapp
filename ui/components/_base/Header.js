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
import { MenuList, Paper } from '@mui/material';

import useOnClickOutside from '../../hooks/clickOutsideHook';

const Header = () => {
	const marketsMenuWrapperRef = useRef(null);
	const accountMenuWrapperRef = useRef(null);
	const path = useRouter().route;
	const [hamburgerIsOpen, setHamburgerIsOpen] = useState(false);
	const [marketsIsOpenMobile, setmarketsIsOpenMobile] = useState(false);
	const [marketsIsOpenDesktop, setmarketsIsOpenDesktop] = useState(false);
	const [ffIsOpen, setFFIsOpen] = useState(false);
	const [ffIsOpenMobile, setFFIsOpenMobile] = useState(false);
	const [ff2IsOpen, setFF2IsOpen] = useState(false);
	const [ff2IsOpenMobile, setFF2IsOpenMobile] = useState(false);
	const [accountIsOpen, setAccountIsOpen] = useState(false);

	//close if click outside
	useOnClickOutside(marketsMenuWrapperRef, () => setmarketsIsOpenDesktop(false));
	useOnClickOutside(accountMenuWrapperRef, () => setAccountIsOpen(false));

// for mobile dropdown,toggles open close
	const toggleHandler = (e) => {
		console.log(e.currentTarget);
		if (e.currentTarget.id === "account-button") {
			setAccountIsOpen(!accountIsOpen);
		}
		else if (e.currentTarget.id === "mobile-menu") {
			setHamburgerIsOpen(!hamburgerIsOpen);
		}
		else if (e.currentTarget.id === "Markets") {
			setmarketsIsOpenMobile(!marketsIsOpenMobile);
		}else if(e.currentTarget.id === "FFFFFF") {
			setFFIsOpenMobile(!ffIsOpenMobile);
		}else if(e.currentTarget.id === "FFFFF123") {
			setFF2IsOpenMobile(!ff2IsOpenMobile);
		}
	};

	//if you add dropdown li you should create state for each dropdown and implement additionally isMenuButton,dropdownMenuItems(for desktop and mobile) und for mobile:buttonHandler(implementt logic in mobileDropdownButtonHandler),isMenuOpenMobile , for desktop:isMenuOpenDesktop,events
	const navLinks = [
		{ href: '/currencies', label: 'Cryptocurrencies', icon: <AllInclusiveIcon className={`${path === '/currencies' ? "text-active-link-green" : "text-mobile-menu-grey"}`} fontSize="large" />, isMenuButton: false },
		{ href: '/feed', label: 'Feed', icon: <FeedIcon className={`${path === '/feed' ? "text-active-link-green" : "text-mobile-menu-grey"}`} fontSize="large" />, isMenuButton: false },
		{ href: '/library', label: 'Library', icon: <MenuBookIcon className={`${path === '/library' ? "text-active-link-green" : "text-mobile-menu-grey"}`} fontSize="large" />, isMenuButton: false },
		{
			href: '/markets', label: 'Markets', icon: <SwapHorizIcon className={`${(path === '/dex' || path === '/nft') ? "text-active-link-green" : "text-mobile-menu-grey"}`} fontSize="large" />, isMenuButton: false,
			//in dropdownMenuItems should add item/Link for mobile and for desktop
			isMenuButton: true,
			dropdownMenuItems: [
				{
					href: '/dex', label: 'DEX'
					, item: <Link href="/dex" className={`${path === '/dex' ? "text-active-link-green" : "text-mobile-menu-grey"}`}>DEX</Link>
					, mobileItem: <Link href="/dex"  className={`${path === '/dex' ? "text-active-link-green" : "text-mobile-menu-grey"}`}>DEX</Link>
				},
				{
					href: '/nft', label: 'NFT'
					, item: <Link href="/nft" className={`${path === '/nft' ? "text-active-link-green" : "text-mobile-menu-grey"}`}>NFT</Link>
					, mobileItem: <Link href="/nft"  className={`${path === '/nft' ? "text-active-link-green" : "text-mobile-menu-grey"}`}>NFT</Link>
				}
			],
			desktop: {
				events: {
					mouseEnter: () => setmarketsIsOpenDesktop(true),
					mouseLeave: () => setmarketsIsOpenDesktop(false),

				},
				isMenuOpenDesktop: marketsIsOpenDesktop
			},
			//for Mobile
			mobile: {
				buttonHandler: toggleHandler,
				isMenuOpenMobile: marketsIsOpenMobile
			},
		},
		{
			href: '/ff', label: 'FFFFFF', icon: <SwapHorizIcon className={`${(path === '/qwe' || path === '/nftt3' || path === '/test35') ? "text-active-link-green" : "text-mobile-menu-grey"}`} fontSize="large" />, isMenuButton: false,
			dropdownMenuItems: [
				{
					href: '/qwe', label: 'QWE35', item: <Link href="/qwe" className={`${path === '/qwe' ? "text-active-link-green" : "text-mobile-menu-grey"}`}>QWE34</Link>
					, mobileItem: <Link href="/qwe"  className={`${path === '/qwe' ? "text-active-link-green" : "text-mobile-menu-grey"}`}>QWE34</Link>
				},
				{
					href: '/nf3', label: 'NFT3', item: <Link href="/nft3" className={`${path === '/nf3' ? "text-active-link-green" : "text-mobile-menu-grey"}`}>NFT3</Link>
					, mobileItem: <Link href="/nf3"  className={`${path === '/nft3' ? "text-active-link-green" : "text-mobile-menu-grey"}`}>NFT3</Link>
				},
				{
					href: '/test35', label: 'TEST35', item: <Link href="/test35" className={`${path === '/test35' ? "text-active-link-green" : "text-mobile-menu-grey"}`}>TEST35</Link>,
					mobileItem: <Link href="/test35"  className={`${path === '/test35' ? "text-active-link-green" : "text-mobile-menu-grey"}`}>TEST35</Link>
				}
			],
			isMenuButton: true,
			desktop: {
				events: {
					mouseEnter: () => setFFIsOpen(true),
					mouseLeave: () => setFFIsOpen(false),
				},
				isMenuOpenDesktop: ffIsOpen,
			},
			mobile: {
				buttonHandler: toggleHandler,
				isMenuOpenMobile: ffIsOpenMobile
			}
		},
		{
			href: '/f123321', label: 'FFFFF123', icon: <SwapHorizIcon className={`${(path === '/qwe' || path === '/nftt3' || path === '/test35') ? "text-active-link-green" : "text-mobile-menu-grey"}`} fontSize="large" />, isMenuButton: false,
			dropdownMenuItems: [
				{
					href: '/f123321', label: 'QWE35123321', item: <Link href="/qwe" className={`${path === '/qwe' ? "text-active-link-green" : "text-mobile-menu-grey"}`}>QWE35123321</Link>
					, mobileItem: <Link href="/f123321"  className={`${path === '/qwe' ? "text-active-link-green" : "text-mobile-menu-grey"}`}>QWE35123321</Link>
				},
				{
					href: '/nf3', label: 'NFT3', item: <Link href="/nft3" className={`${path === '/nf3' ? "text-active-link-green" : "text-mobile-menu-grey"}`}>NFT3</Link>
					, mobileItem: <Link href="/nf3"  className={`${path === '/nft3' ? "text-active-link-green" : "text-mobile-menu-grey"}`}>NFT3</Link>
				},
				{
					href: '/test35', label: 'TEST35', item: <Link href="/test35" className={`${path === '/test35' ? "text-active-link-green" : "text-mobile-menu-grey"}`}>TEST35</Link>,
					mobileItem: <Link href="/test35"  className={`${path === '/test35' ? "text-active-link-green" : "text-mobile-menu-grey"}`}>TEST35</Link>
				}
			],
			isMenuButton: true,
			desktop: {
				events: {
					mouseEnter: () => setFF2IsOpen(true),
					mouseLeave: () => setFF2IsOpen(false),
				},
				isMenuOpenDesktop: ff2IsOpen,
			},
			mobile: {
				buttonHandler: toggleHandler,
				isMenuOpenMobile: ff2IsOpenMobile
			}
		}

		// Add more links if needed
	];


	return (
		<header className="z-[100] fixed w-full bg-white">
			<div className="w-full bg-white fixed top-0 flex justify-between lg:justify-start items-center lg:flex-start lg:space-x-12 border-b border-solid px-4 py-4 lg:py-0 overflow-visible lg:px-8">
				<div className="flex items-center space-x-4">
					{/* Use Link without <a> */}
					<Link href="/">
						<span className="relative bottom-px flex items-center space-x-4 cursor-pointer">
							<img src="/logo.png" alt="ICP Tokens logo" className="w-[35px]" />
							<span className="font-semibold uppercase tracking-wide text-base">
								ICP<span className="text-token-title-green">Tokens</span>
							</span>
						</span>
					</Link>
				</div>
				<nav>
					<ul className="hidden lg:flex lg:items-center lg:space-x-4 lg:gap-4">
						{/* Desktop - links */}
						{navLinks.map(link =>
							link.isMenuButton != true
								?
								// link li
								<li key={link.href} className={`lg:py-4 lg:after:w-0 hover:after:w-full lg:hover:after:bg-active-link-green
							 after:m-auto lg:relative after:content-[''] after:rounded-sm after:block after:h-1 after:bg-transparent
							  after:transition-all after:duration-300 ${path === link.href && "lg:after:w-full lg:after:bg-active-link-green"}`}>
									<div className="relative flex gap-[0.8rem] items-center">
										<Link href={link.href} className={`${path === link.href ? "text-active-link-green" : "text-mobile-menu-grey"}`}>{link.label}</Link>
									</div>
								</li>
								:

								// dropdown menu li
								<li key={link.href} onMouseEnter={link.desktop.events.mouseEnter} onMouseLeave={link.desktop.events.mouseLeave} className={`lg:flex lg:flex-col lg:items-center lg:py-4 lg:after:w-0 hover:after:w-full lg:hover:after:bg-active-link-green after:m-auto lg:relative 
						after:content-[''] after:rounded-sm after:block after:h-1 after:bg-transparent after:transition-all after:duration-300
						  ${(link.dropdownMenuItems.some(item => path === item.href)) && "lg:after:w-full lg:after:bg-active-link-green"}`}>
									<div className="flex justify-between">
										<div className="relative flex gap-[0.8rem] items-center">
											<button className={`${(link.dropdownMenuItems.some(item => path === item.href)) ? "text-active-link-green" : "text-mobile-menu-grey"}`}>{link.label}</button>
										</div>
										<div>
										</div>
									</div>
									{  link.desktop.isMenuOpenDesktop &&
										<div className="lg:absolute lg:text-center lg:z-50 top-14">
											<Paper ref={marketsMenuWrapperRef}>
												<MenuList>
													{link.dropdownMenuItems.map(sublink => (
														<li key={sublink.href} className="lg:px-4 py-3 hover:bg-background-hover-menu">
															{sublink.item}
														</li>
													))}
												</MenuList>
											</Paper>
										</div>
									}
								</li>
						)}
					</ul>

					{/* Mobile */}
					<div id="mobile-menu" onClick={toggleHandler} className="lg:hidden ">
						{hamburgerIsOpen
							? <CloseIcon className="text-mobile-menu-grey" fontSize="large" />
							: <MenuIcon className="text-mobile-menu-grey" fontSize="large" />
						}
					</div>
					{/* If hamburger-menu is clicked */}
					<div className={`z-[100] ${hamburgerIsOpen ? 'visible animate-fadeInLeft' : 'invisible animate-fadeInRight'} flex flex-col justify-between transition-visible ease-in-out delay-150 duration-300 py-6 left-0 bg-white w-full top-[68px] fixed h-[calc(100%-68px)] shadow-xl`} >
						<ul className="pb-16 overflow-y-scroll">
							{/* Before Element For Active Link */}
							{navLinks.map(link =>
								link.isMenuButton != true
									?
									<li key={link.href} className={`${path === link.href && "before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:border-l-4 before:border-solid before:border-active-link-green"} relative mb-4 px-4 py-2`}>
										<div className="relative flex gap-[0.8rem] items-center">
											{link.icon}
											<Link href={link.href} className={`${path === link.href ? "text-active-link-green" : "text-mobile-menu-grey"}`}>{link.label}</Link>
										</div>
									</li>
									:
									<li key={link.href}  className="relative mb-4 py-2">
										<div className="flex justify-between">
											<div className={`px-4 ${(link.dropdownMenuItems.some(item => path === item.href)) && " before:content-[''] before:absolute before:left-0 before:h-[51px] before:border-l-4 before:border-solid before:border-active-link-green"} relative flex gap-[0.8rem] items-center`}>
												{link.icon}
												<button className={`${(link.dropdownMenuItems.some(item => path === item.href)) ? "text-active-link-green" : "text-mobile-menu-grey"}`}>{link.label}</button>
											</div>
											<div id={link.label} onClick={link.mobile.buttonHandler}>
												{link.mobile.isMenuOpenMobile
													? <KeyboardArrowUpIcon className="text-mobile-menu-grey cursor-pointer" sx={{ fontSize: 35 }} />
													: <KeyboardArrowDownIcon className="text-mobile-menu-grey cursor-pointer" sx={{ fontSize: 35 }} />
												}
											</div>
										</div>
										{link.mobile.isMenuOpenMobile &&
											<div className="m-4 px-4">
												{link.dropdownMenuItems.map(sublink => (
													<li key={sublink.href} className="mb-2 py-2">
														{sublink.mobileItem}
													</li>
												))}
											</div>
										}
									</li>
							)}

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
							<AccountCircleIcon id="account-button" onClick={toggleHandler} className="text-mobile-menu-grey" sx={{ fontSize: 28 }} />
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