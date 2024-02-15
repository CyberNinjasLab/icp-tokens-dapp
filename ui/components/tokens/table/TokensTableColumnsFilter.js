import {
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Typography
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import React, { useEffect } from 'react';
import ViewWeekOutlinedIcon from '@mui/icons-material/ViewWeekOutlined';
import useLocalStorage from '../../../hooks/useLocalStorage';

const TokensTableColumnsFilter = ({
  gridApi,
  gridColumnApi,
  showFilters,
  setShowFilters
}) => {
  const initialVisibility = gridApi
    .getAllGridColumns()
    .map(column => column.getColId());
  const [selectedColumns, setSelectedColumns] = useLocalStorage(
    'visibleColumns',
    initialVisibility
  );
  // const [selectedColumns, setSelectedColumns] = useState(() => {
  //   const all = gridApi.getAllGridColumns();
  //   console.log(all);
  //   const selected = all.map(column => column.getColId());
  //   return selected;
  // });

  const handleColumnChange = (event, colId) => {
    const updatedColumns = selectedColumns.includes(colId)
      ? selectedColumns.filter(id => id !== colId)
      : [...selectedColumns, colId];
    setSelectedColumns(updatedColumns);
  };

  useEffect(() => {
    updateColumnVisibility();
  }, [selectedColumns]);

  const updateColumnVisibility = () => {
    const allColumns = gridApi?.getAllGridColumns();

    allColumns?.forEach(column => {
      const colId = column.getColId();
      const isVisible = selectedColumns.includes(colId);
      gridColumnApi.setColumnVisible(colId, isVisible);
    });
  };
  const handleShowFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div>
      <Button
        variant="text"
        startIcon={<ViewWeekOutlinedIcon />}
        onClick={handleShowFilters}
        sx={{ py: 1 }}
      >
        Columns
      </Button>
      {showFilters && (
        <div>
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
                border: 'none !important'
              }
            }}
          >
            {gridApi?.getAllGridColumns().map(column => {
              const isSelected = selectedColumns.includes(column.getColId());
              return (
                <ToggleButton value={column.getColId()} key={column.getColId()}>
                  <Typography component="p" fontSize={12}>
                    {column.getColDef().headerName || 'rank'}
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
