import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Typography,
  Tooltip
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import ViewWeekOutlinedIcon from '@mui/icons-material/ViewWeekOutlined';
import { isMobile } from 'react-device-detect';
import { GeneralContext } from '../../../../contexts/general/General.Context';
import { ScatterPlot } from '@mui/icons-material';
import { useRouter } from 'next/router';

const TokensTableColumnsFilter = ({ gridApi, showFilters, setShowFilters }) => {
  // Initialize selectedColumns with an empty array
  const [selectedColumns, setSelectedColumns] = useState([]);
  const { theme } = useContext(GeneralContext)
  const router = useRouter();

  useEffect(() => {
    if (gridApi?.getAllGridColumns()) {
      const allColumns = gridApi.getAllGridColumns();
      // Update selectedColumns after gridApi is ready and columns are fetched
      setSelectedColumns(allColumns.map(column => column.getColId()));
    }
  }, [gridApi]); // Depend on gridApi to update state when it changes

  const defaultVisibleColumns = ['favorites', 'rank', 'name', 'price'];

  useEffect(() => {
    if (gridApi?.getAllGridColumns()) {
      updateColumnVisibility();
    }
  }, [selectedColumns, gridApi]);

  const updateColumnVisibility = () => {
    const allColumns = gridApi?.getAllGridColumns();
    allColumns?.forEach(column => {
      const colId = column.getColId();
      const isVisible =
        (selectedColumns.includes(colId) || defaultVisibleColumns.includes(colId)) &&
        (!isMobile || colId !== 'rank');
      
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
        <span className='absolute right-0 sm:bottom-0 top-100 sm:mt-0 mt-[13px] sm:right-[140px]'>
          <Tooltip title="Bubbles chart">
            <Button
              variant="text"
              startIcon={<ScatterPlot />}
              onClick={() => router.push('/bubbles')}
              sx={{ py: 1 }}
              color="gray"
              style={{
                color: theme == 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'inerhit'
              }}
            >
              Bubbles
            </Button>
          </Tooltip>
        </span>
        <span className='sm:inline-block hidden'>
          <Tooltip title="Customize columns">
            <Button
              variant="text"
              startIcon={<ViewWeekOutlinedIcon />}
              onClick={handleShowFilters}
              sx={{ py: 1 }}
              color="gray"
              style={{
                color: theme == 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'inerhit'
              }}
            >
              Customize
            </Button>
          </Tooltip>
        </span>
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
            {gridApi?.getAllGridColumns()?.map(column => {
              const colId = column.getColId();
              const isSelected = selectedColumns.includes(colId);
              const isDefaultVisible = defaultVisibleColumns.includes(colId);
              return (
                <ToggleButton
                  value={colId}
                  key={colId}
                  disabled={isDefaultVisible}
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
