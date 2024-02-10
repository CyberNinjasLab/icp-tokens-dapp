import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';

const CirculatingSupplyIndicator = ({ circulatingSupply, percent, barColor = '#019a9a' }) => (
  <Box className="items-center leading-normal">
    <Typography className="overflow-hidden whitespace-nowrap overflow-ellipsis">
      {circulatingSupply}
    </Typography>
    {percent < 100 && (
      <LinearProgress
        value={percent}
        variant="determinate"
        sx={{
          '& .MuiLinearProgress-bar': {
            backgroundColor: barColor
          }
        }}
      />
    )}
  </Box>
);

export default CirculatingSupplyIndicator;
