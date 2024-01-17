import React, { useMemo } from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';

const CustomTooltip = (props) => {
  const data = useMemo(
    () => props.api.getDisplayedRowAtIndex(props.rowIndex).data,
    []
  );

  return (
    <>
      {data.circulatingSupply.percent < 100 && (
        <Box
        className="custom-tooltip p-3 shadow-lg rounded-md"
        style={{ backgroundColor: props.color || '#999' }}
      >
        <Box className='flex justify-between'>
          <Typography component='span' fontWeight='500' gutterBottom>Percentage: </Typography>
          <Typography component='span'>{data.circulatingSupply.percent}%</Typography>
        </Box>
          <LinearProgress
          value={data.circulatingSupply.percent}
          variant="determinate"
          sx={{
            '& .MuiLinearProgress-bar': {
              backgroundColor: 'primary'
            }
          }}
        />
        <Box className='flex justify-between'>
          <Typography component='span' fontWeight='500' gutterBottom>Circulating Supply: </Typography>
          <Typography component='span' sx={{ml: 1}}>{data.circulatingSupply.circulatingSupply}</Typography>
        </Box>
        <Box className='flex justify-between'>
          <Typography component='span' fontWeight='500' gutterBottom>Max Supply: </Typography>
          <Typography component='span'>{data.circulatingSupply.maxSupply}</Typography>
        </Box>
      </Box>
      )}
    </>
  );
};
export default CustomTooltip;
