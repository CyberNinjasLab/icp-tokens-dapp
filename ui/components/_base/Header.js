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
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import * as React from 'react';
import { MenuList, Paper } from '@mui/material';

const Header = () => {
    const path = useRouter().route;
    const [hamburgerIsOpen, setHamburgerIsOpen] = useState(false);
    const [marketsIsOpen, setmarketsIsOpen] = useState(false);
    const [accountIsOpen, setAccountIsOpen] = useState(false);

    const hamburgerMenuHandler = () => {
        setHamburgerIsOpen(!hamburgerIsOpen);
    };

    const marketButtonHandler = () => {
        setmarketsIsOpen(!marketsIsOpen);
    };

    const accountButtonHandler = () => {
        setAccountIsOpen(!accountIsOpen);
    };


    return (
        <header className="border-b border-solid py-4 px-4 overflow-visible lg:px-8">
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
                    {/* Desktop - links */}
                    <ul className="hidden lg:flex lg:items-center lg:space-x-4">
                        <li className={`lg:after:w-0 hover:after:w-full lg:hover:after:bg-active-link-green after:m-auto lg:relative after:content-[''] after:rounded-sm after:block after:h-1 after:bg-transparent after:transition-all ${path === '/currencies' && "lg:after:w-full lg:after:bg-active-link-green"}`}>
                            <div className="relative flex gap-[0.8rem] items-center">
                                <Link href="/currencies" className={`${path === '/currencies' && "text-active-link-green"} text-mobile-menu-grey`}>Cryptocurrencies</Link>
                            </div>
                        </li>
                        <li className={`lg:after:w-0 hover:after:w-full lg:hover:after:bg-active-link-green after:m-auto lg:relative after:content-[''] after:rounded-sm after:block after:h-1 after:bg-transparent after:transition-all ${path === '/feed' && "lg:after:w-full lg:after:bg-active-link-green"}`}>
                            <div className="relative flex gap-[0.8rem] items-center">
                                <Link href="/feed" className={`${path === '/feed' && "text-active-link-green"} text-mobile-menu-grey`}>Feed</Link>
                            </div>
                        </li>
                        <li className={`lg:after:w-0 hover:after:w-full lg:hover:after:bg-active-link-green after:m-auto lg:relative after:content-[''] after:rounded-sm after:block after:h-1 after:bg-transparent after:transition-all ${path === '/library' && "lg:after:w-full lg:after:bg-active-link-green"}`}>
                            <div className="relative flex gap-[0.8rem] items-center">
                                <Link href="/library" className={`${path === '/library' && "text-active-link-green"} text-mobile-menu-grey`}>Library</Link>
                            </div>
                        </li>
                        <li className={`lg:after:w-0 hover:after:w-full lg:hover:after:bg-active-link-green after:m-auto lg:relative after:content-[''] after:rounded-sm after:block after:h-1 after:bg-transparent after:transition-all ${(path === '/dex' || path === '/nft') && "lg:after:w-full lg:after:bg-active-link-green"}`}>
                            <div className="flex justify-between">
                                <div className="relative flex gap-[0.8rem] items-center">
                                    <button className="text-mobile-menu-grey">Markets</button>
                                </div>
                                <div onClick={marketButtonHandler}>
                                    {marketsIsOpen
                                        ? <KeyboardArrowUpIcon className="text-mobile-menu-grey cursor-pointer" sx={{ fontSize: 24, position: 'absolute' }} />
                                        : <KeyboardArrowDownIcon className="text-mobile-menu-grey cursor-pointer" sx={{ fontSize: 24, position: 'absolute' }} />
                                    }
                                </div>
                            </div>
                            {marketsIsOpen &&
                                <div className="lg:absolute lg:top-9 lg:w-[60px] lg:text-center">
                                    <Paper>
                                        <MenuList>
                                            <li className="py-2">
                                                <Link href="/dex" className={`${path === '/dex' && "text-active-link-green"}`}>DEX</Link>
                                            </li>
                                            <li className="py-2">
                                                <Link href="/nft" className={`${path === '/nft' && "text-active-link-green"}`}>NFT</Link>
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
                    <div className={`${hamburgerIsOpen ? 'visible animate-fadeInLeft' : 'invisible animate-fadeInRight'} flex flex-col justify-between transition-visible ease-in-out delay-150 duration-300 px-4 py-8 absolute  z-[100] top-14 left-0 bg-white w-full h-[93%] shadow-xl`} >
                        <ul >
                            {/* Before Element For Active Link */}
                            <li className={`${path === '/currencies' && "before:content-[''] before:absolute before:-left-4 before:top-0 before:h-full before:border-l-4 before:border-solid before:border-active-link-green"} relative mb-4 py-2`}>
                                <div className="relative flex gap-[0.8rem] items-center">
                                    <AllInclusiveIcon className={`${path === '/currencies' ? "text-active-link-green" : "text-mobile-menu-grey"}`} fontSize="large" />
                                    <Link href="/currencies" onClick={hamburgerMenuHandler} className={`${path === '/currencies' ? "text-active-link-green" : "text-mobile-menu-grey"}`}>Cryptocurrencies</Link>
                                </div>
                            </li>
                            <li className={`${path === '/feed' && "before:content-[''] before:absolute before:-left-4 before:top-0 before:h-full before:border-l-4 before:border-solid before:border-active-link-green"} relative mb-4 py-2`}>
                                <div className="relative flex gap-[0.8rem] items-center">
                                    <FeedIcon className={`${path === '/feed' ? "text-active-link-green" : "text-mobile-menu-grey"}`} fontSize="large" />
                                    <Link href="/feed" onClick={hamburgerMenuHandler} className={`${path === '/feed' ? "text-active-link-green" : "text-mobile-menu-grey"}`}>Feed</Link>
                                </div>
                            </li>
                            <li className={`${path === '/library' && "before:content-[''] before:absolute before:-left-4 before:top-0 before:h-full before:border-l-4 before:border-solid before:border-active-link-green"} relative mb-4 py-2`}>
                                <div className="relative flex gap-[0.8rem] items-center">
                                    <MenuBookIcon className={`${path === '/library' ? "text-active-link-green" : "text-mobile-menu-grey"}`} fontSize="large" />
                                    <Link href="/library" onClick={hamburgerMenuHandler} className={`${path === '/library' ? "text-active-link-green" : "text-mobile-menu-grey"}`}>Library</Link>
                                </div>
                            </li>
                            <li className={`${(path === '/dex' || path === '/nft') && "before:content-[''] before:absolute before:-left-4 before:top-0 before:h-full before:border-l-4 before:border-solid before:border-active-link-green"} relative mb-4 py-2`}>
                                <div className="flex justify-between">
                                    <div className="relative flex gap-[0.8rem] items-center">
                                        <SwapHorizIcon className={`${(path === '/dex' || path === '/nft') ? "text-active-link-green" : "text-mobile-menu-grey"}`} fontSize="large" />
                                        <button className={`${(path === '/dex' || path === '/nft') ? "text-active-link-green" : "text-mobile-menu-grey"}`}>Markets</button>
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
                            <Paper sx={{
                                position:'absolute',
                                width:60,
                                textAlign:'center',
                                top:36,
                                right:-15,
                                
                            }}>
                                <MenuList>
                                    <li className="py-2">
                                        <Link href="/dex" className={`${path === '/dex' && "text-active-link-green"}`}>DEX</Link>
                                    </li>
                                    <li className="py-2">
                                        <Link href="/nft" className={`${path === '/nft' && "text-active-link-green"}`}>NFT</Link>
                                    </li>
                                </MenuList>
                            </Paper>
                        }
                    </div>
                </div>
            </div>
        </header >
    );
};

export default Header;
