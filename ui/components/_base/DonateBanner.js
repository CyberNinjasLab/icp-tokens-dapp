import React from 'react';
import { Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Cookies from 'js-cookie';

const DonateBanner = () => {
  const [open, setOpen] = React.useState(Cookies.get('donate_popup') !== 'closed');

  const handleClose = () => {
    setOpen(false);
    Cookies.set('donate_popup', 'closed', { expires: 1 }); // Store for 7 days
  };

  const handleDonate = () => {
    Cookies.set('donate_popup', 'closed', { expires: 1 }); // Store for 7 days on donate click
  };

  if (!open) {
    return null;
  }

  return (
    <div className='fixed z-50 bottom-3 left-1/2 -translate-x-1/2 transform px-4 leading-normal lg:w-auto w-full xs:w-[450px]'>
      <div className="dark:bg-dark-bg bg-white border w-full border-gray-200 dark:border-gray-500 shadow-xl justify-center items-center rounded-xl p-2 px-3 flex">
        <div className='pr-4 flex-grow flex text-left'>
          Support our mission and drive the vision!
        </div>
        <div className='flex justify-center'>
          <div className='flex justify-center'>
            <Button
              variant="contained"
              color="primary"
              href="/donate"
              onClick={handleDonate} // Add onClick handler
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
            <IconButton onClick={handleClose} aria-label="close" className='relative left-1'>
              <CloseIcon style={{fontSize:16}} />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonateBanner;