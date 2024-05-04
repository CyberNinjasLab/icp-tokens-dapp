// SocialLinks.js
import React from 'react';
import TwitterIcon from '@mui/icons-material/Twitter';
import OpenChatIcon from './icons/OpenChatIcon'
import { Link } from '@mui/material';

const SocialLinks = () => {
  return (
    <>
      <Link href="https://twitter.com/ICPTokens" target="_blank">
        <TwitterIcon className="text-mobile-menu" style={{ fontSize: 33 }} />
      </Link>
      <Link href="https://oc.app/community/5bgep-3aaaa-aaaar-a3toq-cai/" target="_blank">
        <OpenChatIcon className="text-mobile-menu w-[30px] grayscale" style={{ fontSize: 38 }} />
      </Link>
    </>
  );
};

export default SocialLinks;
