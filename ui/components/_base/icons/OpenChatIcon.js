// DscvrIcon.jsx

import React from 'react';

function OpenChatIcon(props) {
  const { style, className } = props;

  return (
    <img src="/icons/OpenChat.svg"
      style={style} 
      className={className} 
      alt="OpenChat Icon"
    />
  );
}

export default OpenChatIcon;
