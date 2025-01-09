import React, { useState } from 'react';
import { Tooltip, Snackbar, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import copy from 'copy-to-clipboard';

const CopyButton = ({ value }) => {
  const [open, setOpen] = useState(false);

  // Function to handle copy to clipboard
  const handleCopy = () => {
    copy(value);
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
    <div onClick={handleCopy} className="cursor-pointer">
      <ContentCopyIcon fontSize="small" />
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Copied to clipboard!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CopyButton;