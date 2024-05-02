import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Tooltip from '@mui/material/Tooltip';

const FavoriteToggle = ({ value, setValue }) => {
  return (
    <div className='sm:hidden block'>
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
            marginTop: 0
          }
        }}
      >
        <Tooltip title="View all tokens">
          <ToggleButton value="all">All Tokens</ToggleButton>
        </Tooltip>
        <Tooltip title="View watchlist">
          <ToggleButton value="favorites">Watchlist</ToggleButton>
        </Tooltip>
      </ToggleButtonGroup>
    </div>
  );
};

export default FavoriteToggle;
