import React from 'react';
const { version } = require('/package.json');


const Footer = () => {
  return (
    <footer className="text-center py-4">
      <p>
        &copy; {new Date().getFullYear()} ICPTokens v{version}<br />
        Powered by the <a href="https://internetcomputer.org/" className='underline'>Internet Computer</a> & <a href="https://www.tradingview.com/" className='underline'>Trading View</a>
      </p>
    </footer>
  );
};

export default Footer;
