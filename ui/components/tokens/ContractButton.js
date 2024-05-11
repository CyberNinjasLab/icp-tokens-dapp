import React, { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import copy from 'copy-to-clipboard';

const ContractButton = ({ canisterId }) => {
  const [open, setOpen] = useState(false);

  // Function to format canisterId
  const formatCanisterId = (id) => {
    if (id.length > 12) {
      return `${id.slice(0, 11)}...${id.slice(-9)}`;
    }
    return id; // If the ID is too short to format, return it as is.
  };

  // Function to handle copy to clipboard
  const handleCopy = () => {
    copy(canisterId);
    setOpen(true);  // Open the Snackbar on copy
  };

  // Close Snackbar
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;  // Don't close if clicked away
    }
    setOpen(false);  // Close otherwise
  };

  return (
    <div onClick={handleCopy}>
      {formatCanisterId(canisterId)}
      <Tooltip title="Copy contract ID" className='cursor-pointer'>
          <ContentCopyIcon fontSize='12' className='ml-1 relative bottom-[1px]' />
      </Tooltip>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Contract ID copied to clipboard!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ContractButton;
