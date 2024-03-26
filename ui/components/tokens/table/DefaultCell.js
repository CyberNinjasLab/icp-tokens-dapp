// Import React and any other dependencies
import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';

// Define the component
const DefaultCell = ({ value }) => {
  return (
    <Typography
      component="span"
      className="inline-flex justify-center h-[60px] items-center"
    >
      {value}
    </Typography>
  );
};

// Export the component
export default DefaultCell;