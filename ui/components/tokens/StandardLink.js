import Link from 'next/link';
import React from 'react';

const StandardLink = ({ standard }) => {
  const isICRC = ['ICRC-1', 'ICRC-2', 'ICRC-3'].includes(standard.name);

  return (
    <Link 
      href={isICRC ? `/standards/${standard.name}` : `${standard.link}`} 
      className='underline' 
      target='_blank'
    >
      {standard.name}
    </Link>
  );
};

export default StandardLink;
