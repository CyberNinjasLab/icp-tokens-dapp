import React from 'react';
import { useRouter } from 'next/router';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';

function WatchlistLink() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/watchlist');
  };

  return (
    <Tooltip title="Token Watchlist">
      <IconButton
        onClick={handleClick}
        size="large"
        sx={{
            ml: 0,
            my: 0,
            '&:hover': {
              borderRadius: '12px',  // Change this value to your desired radius
              backgroundColor: 'rgba(0, 0, 0, 0.04)'  // Optional: background color on hover
            }
        }}
        aria-label="watchlist"
        style={{
          fontSize: '14px'
        }}
      >
        <VisibilityIcon fontSize="inherit" className='mr-1' /> Watchlist
      </IconButton>
    </Tooltip>
  );
}

export default WatchlistLink;
