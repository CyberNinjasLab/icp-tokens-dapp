import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router'

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

import * as React from 'react';

const Header = () => {
    const navLinks = [
        { href: '/useful-links', label: 'Useful Links' },
        // Add more links as needed
    ];

    const path = useRouter().route;
    const [hamburgerIsOpen, setHamburgerIsOpen] = useState(false);
    const [marketsIsOpen, setmarketsIsOpen] = useState(false);
    const hamburgerMenuHandler = () => {
        setHamburgerIsOpen(!hamburgerIsOpen);
    };

    const marketButtonHandler = () => {
        setmarketsIsOpen(!marketsIsOpen);
    };


    return (
        <header className="border-b border-solid lg:border-none py-4 px-4 overflow-hidden">
            <div className="flex justify-between lg:justify-start items-center lg:flex-start lg:space-x-12">
                <div className="flex items-center space-x-4">
                    {/* Use Link without <a> */}
                    <Link href="/">
                        <span className="flex items-center space-x-4 cursor-pointer">
                            <img src="/logo.png" alt="ICP Tokens logo" className="w-[35px]" />
                            <span className="font-semibold uppercase tracking-wide">
                                ICP<span className="text-token-title-green">Tokens</span>
                            </span>
                        </span>
                    </Link>
                </div>
                <nav>
                    {/* Desktop */}
                    {/* Use Link without <a> */}
                        <ul className="hidden lg:flex lg:items-center lg:space-x-4">
                            <li className={`${path === '/currencies' && "before:content-[''] before:absolute before:-left-4 before:top-0 before:h-full before:border-l-4 before:border-solid before:border-green-500"}`}>
                                <div className="relative flex gap-[0.8rem] items-center">
                                    <Link href="/currencies" className={`${path === '/currencies' && "text-active-link-green"} text-mobile-menu-grey`}>Cryptocurrencies</Link>
                                </div>
                            </li>
                            <li className={`${path === '/feed' && "before:content-[''] before:absolute before:-left-4 before:top-0 before:h-full before:border-l-4 before:border-solid before:border-green-500"}`}>
                                <div className="relative flex gap-[0.8rem] items-center">
                                    <Link href="/feed" className={`${path === '/feed' && "text-active-link-green"} text-mobile-menu-grey`}>Feed</Link>
                                </div>
                            </li>
                            <li className={`${path === '/library' && "before:content-[''] before:absolute before:-left-4 before:top-0 before:h-full before:border-l-4 before:border-solid before:border-green-500"}`}>
                                <div className="relative flex gap-[0.8rem] items-center">
                                    <Link href="/library" className={`${path === '/library' && "text-active-link-green"} text-mobile-menu-grey`}>Library</Link>
                                </div>
                            </li>
                            <li className={`${(path === '/dex' || path === '/nft') && "before:content-[''] before:absolute before:-left-4 before:top-0 before:h-full before:border-l-4 before:border-solid before:border-green-500"}`}>
                                <div className="flex justify-between">
                                    <div className="relative flex gap-[0.8rem] items-center">
                                        <button className="text-mobile-menu-grey">Markets</button>
                                    </div>
                                    <div onClick={marketButtonHandler}>
                                        {marketsIsOpen
                                            ? <KeyboardArrowUpIcon className="text-mobile-menu-grey" sx={{ fontSize: 35 }} />
                                            : <KeyboardArrowDownIcon className="text-mobile-menu-grey" sx={{ fontSize: 35 }} />
                                        }
                                    </div>
                                </div>
                            </li>
                            {marketsIsOpen &&
                                <div className="lg:absolute lg:top-9 lg:mx-4">
                                    <li className="mb-4 py-2">
                                        <Link href="/dex" onClick={hamburgerMenuHandler} className={`${path === '/dex' && "text-active-link-green"}`}>DEX</Link>
                                    </li>
                                    <li className="mb-4 py-2">
                                        <Link href="/nft" onClick={hamburgerMenuHandler} className={`${path === '/nft' && "text-active-link-green"}`}>NFT</Link>
                                    </li>
                                </div>
                            }
                        </ul>

                    {/* Mobile */}
                    <div onClick={hamburgerMenuHandler} className="lg:hidden">
                        {hamburgerIsOpen
                            ? <CloseIcon className="text-mobile-menu-grey" fontSize="large" />
                            : <MenuIcon className="text-mobile-menu-grey" fontSize="large" />
                        }
                    </div>
                    {/* If hamburger-menu is clicked */}
                    <div className={`${hamburgerIsOpen ? 'visible animate-fadeInLeft' : 'invisible animate-fadeInRight'} flex flex-col justify-between transition-visible ease-in-out delay-150 duration-300 px-4 py-8 absolute  z-[100] top-14 left-0 bg-white w-full h-[93%] shadow-xl`} >
                        <ul >
                            {/* Before Element For Active Link */}
                            <li className={`${path === '/currencies' && "before:content-[''] before:absolute before:-left-4 before:top-0 before:h-full before:border-l-4 before:border-solid before:border-green-500"} relative mb-4 py-2`}>
                                <div className="relative flex gap-[0.8rem] items-center">
                                    <AllInclusiveIcon className="text-mobile-menu-grey" fontSize="large" />
                                    <Link href="/currencies" onClick={hamburgerMenuHandler} className={`${path === '/currencies' && "text-active-link-green"} text-mobile-menu-grey`}>Cryptocurrencies</Link>
                                </div>
                            </li>
                            <li className={`${path === '/feed' && "before:content-[''] before:absolute before:-left-4 before:top-0 before:h-full before:border-l-4 before:border-solid before:border-green-500"} relative mb-4 py-2`}>
                                <div className="relative flex gap-[0.8rem] items-center">
                                    <FeedIcon className="text-mobile-menu-grey" fontSize="large" />
                                    <Link href="/feed" onClick={hamburgerMenuHandler} className={`${path === '/feed' && "text-active-link-green"} text-mobile-menu-grey`}>Feed</Link>
                                </div>
                            </li>
                            <li className={`${path === '/library' && "before:content-[''] before:absolute before:-left-4 before:top-0 before:h-full before:border-l-4 before:border-solid before:border-green-500"} relative mb-4 py-2`}>
                                <div className="relative flex gap-[0.8rem] items-center">
                                    <MenuBookIcon className="text-mobile-menu-grey" fontSize="large" />
                                    <Link href="/library" onClick={hamburgerMenuHandler} className={`${path === '/library' && "text-active-link-green"} text-mobile-menu-grey`}>Library</Link>
                                </div>
                            </li>
                            <li className={`${(path === '/dex' || path === '/nft') && "before:content-[''] before:absolute before:-left-4 before:top-0 before:h-full before:border-l-4 before:border-solid before:border-green-500"} relative mb-4 py-2`}>
                                <div className="flex justify-between">
                                    <div className="relative flex gap-[0.8rem] items-center">
                                        <SwapHorizIcon className="text-mobile-menu-grey" fontSize="large" />
                                        <button className="text-mobile-menu-grey">Markets</button>
                                    </div>
                                    <div onClick={marketButtonHandler}>
                                        {marketsIsOpen
                                            ? <KeyboardArrowUpIcon className="text-mobile-menu-grey" sx={{ fontSize: 35 }} />
                                            : <KeyboardArrowDownIcon className="text-mobile-menu-grey" sx={{ fontSize: 35 }} />
                                        }
                                    </div>
                                </div>
                            </li>
                            {(marketsIsOpen) &&
                                <div className="mx-4">
                                    <li className="mb-4 py-2">
                                        <Link href="/dex" onClick={hamburgerMenuHandler} className={`${path === '/dex' && "text-active-link-green"}`}>DEX</Link>
                                    </li>
                                    <li className="mb-4 py-2">
                                        <Link href="/nft" onClick={hamburgerMenuHandler} className={`${path === '/nft' && "text-active-link-green"}`}>NFT</Link>
                                    </li>
                                </div>
                            }
                        </ul>
                        {/* If hamburger-menu is clicked social media will be showed */}
                        <div className={`${hamburgerIsOpen ? 'visible animate-fadeInLeft' : 'invisible animate-fadeInRight'} flex justify-center gap-4 transition-visible ease-in-out delay-150 duration-300`}>
                            <TwitterIcon className="text-mobile-menu-grey" sx={{ fontSize: 38 }} />
                            <FacebookRoundedIcon className="text-mobile-menu-grey" sx={{ fontSize: 38 }} />
                            <InstagramIcon className="text-mobile-menu-grey" sx={{ fontSize: 38 }} />
                            <RedditIcon className="text-mobile-menu-grey" sx={{ fontSize: 38 }} />
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
