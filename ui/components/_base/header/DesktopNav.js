// DesktopNav.js
import React from 'react';
import Link from 'next/link'; // Assuming you're using Next.js for routing
import DropdownMenu from './DropdownMenu'; // DropdownMenu component we will create next

const DesktopNav = ({ navLinks, path }) => {
  return (
    <ul className="hidden lg:flex lg:items-center">
      {navLinks.map((link) => {
        if (!link.isDropdown) {
          return (
            <li key={link.id} className={`lg:after:w-0 hover:after:w-full lg:hover:after:bg-primary
              after:m-auto lg:relative after:content-[''] after:rounded-sm after:block after:h-1 after:bg-transparent
              after:transition-all after:duration-300 ${path === link.href && "lg:after:w-full lg:after:bg-primary"}`}>
              <div className="relative flex gap-[0.8rem] items-center">
                <Link href={link.href} className={`py-4 px-4 ${path === link.href ? "text-primary" : "text-mobile-menu"}`}>
                  {link.label}
                </Link>
              </div>
            </li>
          );
        } else {
          return (
            <DropdownMenu key={link.id} link={link} path={path} />
          );
        }
      })}
    </ul>
  );
};

export default DesktopNav;
