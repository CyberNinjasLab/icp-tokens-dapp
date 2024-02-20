// FavoriteToggle.js
import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const FavoriteToggle = ({ value, setValue }) => {
  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={(event, currentSelection) => setValue(currentSelection)}
      color="primary"
      sx={{
        gap: '10px',
        flexWrap: 'wrap',
        '& .Mui-selected': { color: 'primary' },
        '& .MuiToggleButtonGroup-grouped': {
          fontWeight: 'normal',
          flexGrow: 1,
          borderRadius: '40px !important',
          border: 'none !important',
          marginTop: 2
        }
      }}
    >
      <ToggleButton value="all">All Tokens</ToggleButton>
      <ToggleButton value="favorites">Watchlist</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default FavoriteToggle;
