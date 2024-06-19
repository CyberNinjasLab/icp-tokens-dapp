import Link from 'next/link';
import React from 'react';

const StandardLink = ({ standard }) => {
  return (
    <Link href={`/standards/${standard.name}`} className='underline' target='_blank'>{standard.name}</Link>
  );
};

export default StandardLink;
