import React, { useState } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import copy from 'copy-to-clipboard';

const CopyButton = ({ value }) => {
  const [open, setOpen] = useState(false);

  // Function to handle copy to clipboard
  const handleCopy = () => {
    copy(value);
    setOpen(true);  // Open the Snackbar on copy
  };

  return (
    <div onClick={handleCopy} className="cursor-pointer">
      <ContentCopyIcon fontSize="small" />
    </div>
  );
};

export default CopyButton;