import Link from 'next/link';
import Logo from './Logo';

const Header = () => {
  const navLinks = [
    { href: '/markets', label: 'Markets' },
    { href: '/useful-links', label: 'Useful Links' },
    // Add more links as need
  ];

  return (
    <header className="mx-auto container px-4 md:px-8 py-4">
      <div className="flex items-center space-x-12">
        <div className="flex items-center space-x-4">
          {/* Use Link without <a> */}
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <nav>
          <ul className="flex space-x-12">
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
