import Link from 'next/link';

const Header = () => {
  const navLinks = [
    { href: '/useful-links', label: 'Useful Links' },
    // Add more links as needed
  ];

  return (
    <header className="py-4 px-4">
      <div className="flex items-center space-x-12">
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
          <ul className="flex space-x-4">
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
