const Header = () => {
  const navLinks = [
    { href: '/useful-links', label: 'Useful Links' },
    // Add more links as needed
  ];

  return (
    <header className="py-4 px-4">
      <div className="flex items-center space-x-12">
        <div className="flex items-center space-x-4">
          <a href="/" className="flex items-center space-x-4">
            <img src="/logo.png" alt="ICP Tokens logo" className="w-[28px]" />
            <span className="font-semibold uppercase tracking-wide">
              ICP<span className="text-[#019a9a]">Tokens</span>
            </span>
          </a>
        </div>
        <nav>
          <ul className="flex space-x-4">
            {navLinks.map(link => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
