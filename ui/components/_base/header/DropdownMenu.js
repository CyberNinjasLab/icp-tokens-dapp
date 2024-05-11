// DropdownMenu.js
import React, { useState, useRef } from 'react';
import Link from 'next/link'; // Assuming you're using Next.js for routing
import Paper from '@mui/material/Paper'; // Assuming you're using Material-UI for components
import MenuList from '@mui/material/MenuList';

const DropdownMenu = ({ link, path }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuWrapperRef = useRef(null);

  return (
    <li key={link.id} 
        onMouseEnter={() => setIsOpen(true)} 
        onMouseLeave={() => setIsOpen(false)}
        className={`lg:flex lg:flex-col lg:items-center lg:relative`}>
      <div className="flex justify-between">
        <div className="relative flex gap-[0.8rem] items-center">
          <button className={`py-4 px-4 hover:text-primary`}>
            {link.label}
          </button>
        </div>
      </div>
      {isOpen &&
        <div className="lg:absolute lg:text-center lg:z-50 top-[42px]" ref={menuWrapperRef}>
          <Paper style={{
            margin: '1rem 0px'
          }}>
            <MenuList>
              {link.dropdownItems.map(sublink => (
                <li key={sublink.id} className=" hover:bg-background-hover-menu rounded-[4px] dark:hover:bg-dark-hover-menu dark:text-white">
                  <Link href={sublink.href} className='py-4 px-6 min-w-[80px] block'>
                    {sublink.label}
                  </Link>
                </li>
              ))}
            </MenuList>
          </Paper>
        </div>
      }
    </li>
  );
};

export default DropdownMenu;
