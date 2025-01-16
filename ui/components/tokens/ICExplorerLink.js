import React from 'react';

const ICExplorerLink = ({ canisterId }) => {
  return (
    <a href={`https://www.icexplorer.io/token/details/${canisterId}`} target='_blank' className='flex items-center hover:underline'>
      <img src="/logos/ICExplorer.svg" className='inline-block w-[17px] mr-1' /> IC Explorer
    </a>
  );
};

export default ICExplorerLink;
