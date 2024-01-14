import Link from 'next/link';

const Header = () => {
  const navLinks = [
    { href: '/useful-links', label: 'Useful Links' },
    // Add more links as needed
  ];

  return (
    <header className="border-b border-solid lg:border-none py-4 px-4">
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
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 lg:hidden" fill="#686583" width="24" height="24" viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
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
