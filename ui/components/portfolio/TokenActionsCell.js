// Import React and any other dependencies
import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ListIcon from '@mui/icons-material/List';

// Define the component
const TokenActionsCell = ({ value }) => {
  return (
    <Typography
      component="span"
      className="flex justify-end h-[60px] items-center"
    >
      <Tooltip title="View">
        <IconButton>
          <ListIcon />
        </IconButton>
      </Tooltip>
    </Typography>
  );
};

// Export the component
export default TokenActionsCell;
