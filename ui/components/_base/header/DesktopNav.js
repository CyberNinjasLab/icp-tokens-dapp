// DesktopNav.js
import React from 'react';
import Link from 'next/link'; // Assuming you're using Next.js for routing
import DropdownMenu from './DropdownMenu'; // DropdownMenu component we will create next

const DesktopNav = ({ navLinks, path }) => {
  return (
    <ul className="hidden lg:flex lg:items-center font-semibold">
      {navLinks.map((link) => {
        if (!link.mobileOnly) {
          if (!link.isDropdown) {
            return (
              <li key={link.id} className={``}>
                <div className="relative flex gap-[0.8rem] items-center">
                  <Link href={link.href} className={`py-4 px-4 hover:text-primary`}>
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
        }
      })}
    </ul>
  );
};

export default DesktopNav;
