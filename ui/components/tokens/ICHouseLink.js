import React from 'react';

const ICHouseLink = ({ canisterId }) => {
  return (
    <a href={`https://ic.house/token/${canisterId}`} className='hover:underline flex items-center' target='_blank'>
      <img src="/logos/icdex_logo.webp" className='inline-block w-[14px] mr-1' /> ICHouse
    </a>
  );
};

export default ICHouseLink;
