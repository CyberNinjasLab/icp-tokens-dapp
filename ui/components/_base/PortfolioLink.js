import React from 'react';
import { useRouter } from 'next/router';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import PieChartIcon from '@mui/icons-material/PieChart';

function PortfolioLink() {
  const router = useRouter();
  const handleClick = () => {
    router.push('/portfolio');
  };

  return (
    <Tooltip title="Portfolio Overview">
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
        aria-label="portfolio"
        style={{
          fontSize: '14px'
        }}
      >
        <PieChartIcon fontSize="inherit" className='mr-1' /> Portfolio
      </IconButton>
    </Tooltip>
  );
}

export default PortfolioLink;
