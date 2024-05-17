// DscvrIcon.jsx

import React from 'react';

function DscvrIcon(props) {
  const { style, className } = props;

  return (
    <img src="/icons/Dscvr.svg"
      style={style} 
      className={className} 
      alt="Dscvr Icon"
    />
  );
}

export default DscvrIcon;
