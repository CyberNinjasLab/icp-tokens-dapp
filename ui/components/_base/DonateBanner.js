import React from 'react';
import { Typography, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useLocalStorage from '../../hooks/useLocalStorage';

const DonateBanner = () => {
  const [open, setOpen] = useLocalStorage("donate_banner", true);

  const handleClose = () => {
    setOpen(false);
  };

  if (!open) {
    return null;
  }

  return (
    <div className='fixed z-50 bottom-3 left-1/2 -translate-x-1/2 transform px-4 leading-normal lg:w-auto max-w-[580px]'>
      <div className="bg-dark-bg border w-full border-gray-500 shadow-xl rounded-xl p-3 flex items-center justify-between">
        <div className='pr-4'>  
          Support our mission and drive the vision!
        </div>
        <Button
          variant="contained"
          color="primary"
          href="/donate"
          disableElevation
          style={{
            paddingLeft: "10px",
            paddingRight: "10px",
            paddingTop: "4px",
            paddingBottom: "4px",
          }}
        >
          Donate
        </Button>
        <IconButton onClick={handleClose} aria-label="close">
          <CloseIcon style={{fontSize:16}} />
        </IconButton>
      </div>
    </div>
  );
};

export default DonateBanner;
