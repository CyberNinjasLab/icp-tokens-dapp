import Link from 'next/link';
import { useState } from 'react';
import { svg } from '../../../public/svgs/svgs';
import { useRouter } from 'next/router'

const Header = () => {
    const navLinks = [
        { href: '/useful-links', label: 'Useful Links' },
        // Add more links as needed
    ];

    const path = useRouter().route;
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
                                ICP<span className="text-token-title-green">Tokens</span>
                            </span>
                        </span>
                    </Link>
                </div>
                <nav>
                    {/* Mobile */}
                    <div onClick={hamburgerMenuHandler} className="lg:hidden">
                        {hamburgerIsOpen
                            ? svg.closeSvg
                            : svg.hamburgerMenuSvg
                        }
                    </div>
                    {/* If hamburger-menu is clicked */}
                    <ul className={`${hamburgerIsOpen ? 'visible animate-fadeInLeft' : 'invisible animate-fadeInRight'} absolute  z-[100] transition-visible ease-in-out delay-150 duration-300 top-14 left-0 bg-white w-full h-full shadow-xl px-4 py-8`}>
                         {/* Before Element For Active Link */}
                        <li className={`${path === '/currencies' && "before:content-[''] before:absolute before:-left-4 before:top-0 before:h-full before:border-l-4 before:border-solid before:border-green-500"} relative mb-4 py-2`}>
                            <div className="relative flex gap-[0.8rem] items-center">
                                <img src="/logo.png" alt="ICP Tokens logo" className="w-[24px] h-[24px]" />
                                <Link href="/currencies" onClick={hamburgerMenuHandler} className={`${path === '/currencies' && "text-active-link-green"}`}>Cryptocurrencies</Link>
                            </div>
                        </li>
                        <li className={`${path === '/feed' && "before:content-[''] before:absolute before:-left-4 before:top-0 before:h-full before:border-l-4 before:border-solid before:border-green-500"} relative mb-4 py-2`}>
                            <div className="relative flex gap-[0.8rem] items-center">
                                <img src="/logo.png" alt="ICP Tokens logo" className="w-[24px] h-[24px]" />
                                <Link href="/feed" onClick={hamburgerMenuHandler} className={`${path === '/feed' && "text-active-link-green"}`}>Feed</Link>
                            </div>
                        </li>
                        <li className={`${path === '/library' && "before:content-[''] before:absolute before:-left-4 before:top-0 before:h-full before:border-l-4 before:border-solid before:border-green-500"} relative mb-4 py-2`}>
                            <div className="relative flex gap-[0.8rem] items-center">
                                <img src="/logo.png" alt="ICP Tokens logo" className="w-[24px] h-[24px]" />
                                <Link href="/library" onClick={hamburgerMenuHandler} className={`${path === '/library' && "text-active-link-green"}`}>Library</Link>
                            </div>
                        </li>
                        <li className={`${path === '/markets' && "before:content-[''] before:absolute before:-left-4 before:top-0 before:h-full before:border-l-4 before:border-solid before:border-green-500"} relative mb-4 py-2`}>
                            <div className="relative flex gap-[0.8rem] items-center">
                                <img src="/logo.png" alt="ICP Tokens logo" className="w-[24px] h-[24px]" />
                                <Link href="/markets" onClick={hamburgerMenuHandler} className={`${path === '/marketts' && "text-active-link-green"}`}>Markets</Link>
                            </div>
                        </li>
                    </ul>

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
