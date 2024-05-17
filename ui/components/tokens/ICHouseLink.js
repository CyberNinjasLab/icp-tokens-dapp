import React from 'react';

const ICHouseLink = ({ canisterId }) => {
  return (
    <a href={`https://ic.house/token/${canisterId}`} className='underline' target='_blank'>ICHouse</a>
  );
};

export default ICHouseLink;
