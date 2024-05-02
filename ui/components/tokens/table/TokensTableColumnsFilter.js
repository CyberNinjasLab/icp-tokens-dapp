import {
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Typography,
  Tooltip
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import React, { useEffect, useState } from 'react';
import ViewWeekOutlinedIcon from '@mui/icons-material/ViewWeekOutlined';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { isMobile } from 'react-device-detect';

const TokensTableColumnsFilter = ({ gridApi, showFilters, setShowFilters }) => {
  const allColumns = gridApi?.getAllGridColumns();
  const [selectedColumns, setSelectedColumns] = useState(allColumns.map(column => column.getColId()));

  const defaultVisibleColumns = ['favorites', 'rank', 'name', 'price'];

  useEffect(() => {
    updateColumnVisibility();
  }, [selectedColumns]);

  const updateColumnVisibility = () => {
    allColumns?.forEach(column => {
      const colId = column.getColId();

      // Check if the column should be visible:
      // - It is selected by the user or it's a default visible column,
      // - AND it's not the "rank" column on a mobile device.
      const isVisible =
      (selectedColumns.includes(colId) || defaultVisibleColumns.includes(colId)) && // User-selected or default visible column
      (!isMobile || colId !== 'rank'); // Not the "rank" column on a mobile device
      
      gridApi.setColumnVisible(colId, isVisible);
    });
  };

  const handleColumnChange = (event, colId) => {
    if (defaultVisibleColumns.includes(colId)) {
      return;
    }

    const updatedColumns = selectedColumns.includes(colId)
      ? selectedColumns.filter(id => id !== colId)
      : [...selectedColumns, colId];
    setSelectedColumns(updatedColumns);
  };

  const handleShowFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className={`${showFilters ? 'relative' : 'absolute bottom-full right-0 mb-[9px]'}`}>
      <div className={`text-right ${showFilters ? 'absolute right-0 bottom-full mb-[9px]' : ''}`}>
        <Tooltip title="Customize columns">
          <Button
            variant="text"
            startIcon={<ViewWeekOutlinedIcon />}
            onClick={handleShowFilters}
            sx={{ py: 1 }}
            color="gray"
          >
            Columns
          </Button>
        </Tooltip>
      </div>
      {showFilters && (
        <div className='mb-3'>
          <ToggleButtonGroup
            exclusive
            onChange={handleColumnChange}
            color="primary"
            value={selectedColumns}
            sx={{
              gap: '10px',
              flexWrap: 'wrap',
              '& .Mui-selected': { color: 'primary' },
              '& .MuiToggleButtonGroup-grouped': {
                fontWeight: 'normal',
                flexGrow: 1,
                borderRadius: '40px !important',
                border: 'none !important',
              }
            }}
          >
            {allColumns?.map(column => {
              const colId = column.getColId();
              const isSelected = selectedColumns.includes(colId);
              const isDefaultVisible = defaultVisibleColumns.includes(colId);
              return (
                <ToggleButton
                  value={colId}
                  key={colId}
                  disabled={isDefaultVisible} // Disable toggle for default columns
                  style={{display: (isDefaultVisible ? 'none' : 'flex')}}
                >
                  <Typography component="p" fontSize={12}>
                    {column.getColDef().headerName !== ''
                      ? column.getColDef().headerName
                      : column.getColDef().field}
                  </Typography>
                  {isSelected && <CancelIcon sx={{ ml: 1 }} />}
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
        </div>
      )}
    </div>
  );
};

export default TokensTableColumnsFilter;
