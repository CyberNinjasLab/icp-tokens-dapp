import Link from 'next/link';
import { useState } from 'react';

const Header = () => {
    const navLinks = [
        { href: '/useful-links', label: 'Useful Links' },
        // Add more links as needed
    ];

    const [hamburgerIsOpen, setHamburgerIsOpen] = useState(false);
    const hamburgerMenuHandler = () => {
        setHamburgerIsOpen(!hamburgerIsOpen);
    };

    return (
        <header className="border-b border-solid lg:border-none py-4 px-4 overflow-hidden">
            <div className="flex justify-between items-center lg:flex-start lg:space-x-12">
                <div className="flex items-center space-x-4">
                    {/* Use Link without <a> */}
                    <Link href="/">
                        <span className="flex items-center space-x-4 cursor-pointer">
                            <img src="/logo.png" alt="ICP Tokens logo" className="w-[28px]" />
                            <span className="font-semibold uppercase tracking-wide">
                                ICP<span className="text-[#019a9a]">Tokens</span>
                            </span>
                        </span>
                    </Link>
                </div>
                <nav>
                    {/* Mobile */}
                    <svg onClick={hamburgerMenuHandler} xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 lg:hidden" fill="#686583" width="24" height="24" viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" /></svg>
                    {/* If hamburger-menu is clicked */}

                    <div >
                        <ul className={`${hamburgerIsOpen ? 'visible animate-fadeInLeft' : 'invisible animate-fadeInRight'} absolute  z-[100] transition-visible ease-in-out delay-150 duration-300 top-20 left-0  bg-white w-full h-full shadow-xl`}>
                            <li onClick={hamburgerMenuHandler}>
                                <Link href="/">Cryptocurrencies</Link>
                            </li>
                            <li onClick={hamburgerMenuHandler}>
                                <Link href="/">Feed</Link>
                            </li>
                            <li onClick={hamburgerMenuHandler}>
                                <Link href="/">Library</Link>
                            </li>
                            <li onClick={hamburgerMenuHandler}>
                                <Link href="/">Markets</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Desktop */}
                    <ul className="hidden lg:flex lg:space-x-4">
                        {navLinks.map(link => (
                            <li key={link.href}>
                                {/* Use Link without <a> */}
                                <Link href={link.href}>
                                    <span className="cursor-pointer">{link.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
