/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useContext, useState, useMemo } from 'react';

import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import 'ag-grid-community/styles/ag-grid.css'; // Core CSS
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Theme
import { Alert, Paper, Skeleton, Button, Stack } from '@mui/material';
import { GeneralContext } from '../../../../contexts/general/General.Context';
import { isMobile } from 'react-device-detect';
import SupplyDetailsTooltip from '../SupplyDetailsTooltip';
import { useRouter } from 'next/router';
import useFetchTokens from '../../../hooks/token/useFetchTokens'; // Adjust the path as needed
import getTokenTableColDefs from './tokenTableColDefs';
import TokensTableColumnsFilter from './TokensTableColumnsFilter';
import FavoriteToggle from './TokensTableFavoritesFilter';
import { useFavoriteTokens } from '../../../../contexts/general/FavoriteTokensProvider';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

function TokensTable(props) {
  const {
    showFavoritesOnly = false
  } = props;
  const { formatPrice, showPriceCurrency, currency, theme } = useContext(GeneralContext);
  const { favoriteTokenIds, loadingFavorites } = useFavoriteTokens();
  const [gridApi, setGridApi] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [isGridReady, setIsGridReady] = useState(false);
  const { data, loaded, error } = useFetchTokens(
    `${process.env.NEXT_PUBLIC_WEB2_API_URL}/api/tokens`
  );

  const [showFavorites, setShowFavorites] = useState(showFavoritesOnly ? 'favorites' : 'all');
  
  const router = useRouter();
  const { page: pageParam } = router.query;
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 100;

  const colDefs = getTokenTableColDefs({ formatPrice, isMobile, showPriceCurrency, currency });
  const rowHeight = 60;
  const defaultColDef = useMemo(() => {
    return {
      tooltipComponent: SupplyDetailsTooltip,
      resizable: false,
    };
  }, []);
  const onRowClicked = params => {
    if (
      !params.event.target.classList.contains('favorite-icon') &&
      params.event.target.classList.length > 0
    ) {
      // Only proceed with row click if the click did not originate from the star icon
      const canisterId = params.data['canister_id'];
      if (canisterId) {
        router.push(`/token/${canisterId}`);
      }
    }
  };
  const onGridReady = params => {
    setGridApi(params.api);
    setIsGridReady(true);
  };
  useEffect(() => {
    // Update the local storage when the showFavorites state changes
    setShowFavorites(showFavorites);
  }, [showFavorites, setShowFavorites]);
  
  const filteredData = useMemo(() => {
    if (data) {
      if (showFavorites === 'favorites') {
        const favoriteIds = favoriteTokenIds || [];
        return data.filter(row => favoriteIds.includes(row.canister_id));
      }
      return data;
    }
  }, [showFavorites, data, favoriteTokenIds]);

  // Set initial page from URL parameter
  useEffect(() => {
    const pageNumber = parseInt(pageParam) || 1;
    setCurrentPage(pageNumber);
  }, [pageParam]);

  // Handle page changes
  const handlePageChange = (newPage) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: newPage },
    });
  };

  const paginatedData = useMemo(() => {
    if (!filteredData) return [];
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  const totalPages = useMemo(() => {
    return filteredData ? Math.ceil(filteredData.length / ITEMS_PER_PAGE) : 0;
  }, [filteredData]);

  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      {!loaded && !error && loadingFavorites && (
        <Skeleton variant="rounded" className="max-w-1500 mt-4" height={800} />
      )}
      {loaded && data && !loadingFavorites && (
        <Paper className="max-w-1500 mx-auto relative" style={{
          margin: '1rem 0px',
          background: 'none'
        }}>
          {isGridReady && (
            <TokensTableColumnsFilter
              gridApi={gridApi}
              showFilters={showFilters}
              setShowFilters={setShowFilters}
            />
          )}
          {isGridReady && !showFavoritesOnly && (
            <FavoriteToggle value={showFavorites} setValue={setShowFavorites} />
          )}
          <Paper className={`${theme == 'dark' ? 'ag-theme-quartz-dark' : 'ag-theme-quartz'} w-full h-full`} style={{
            margin: '1rem 0px'
          }}>
            <AgGridReact
              rowData={paginatedData}
              columnDefs={colDefs}
              rowHeight={rowHeight}
              domLayout="autoHeight"
              suppressMovableColumns={true}
              defaultColDef={defaultColDef}
              tooltipShowDelay={0}
              onRowClicked={onRowClicked}
              onGridReady={onGridReady}
              rowClass="cursor-pointer"
            />
          </Paper>
          
          {/* Pagination Controls */}
          <Stack 
            direction="row" 
            spacing={2} 
            justifyContent="center" 
            alignItems="center" 
            sx={{ mt: 2, mb: 2 }}
          >
            <Button
              variant="contained"
              startIcon={<NavigateBeforeIcon />}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
            >
              Previous
            </Button>
            <span className='text-black dark:text-white'>Page {currentPage} of {totalPages}</span>
            <Button
              variant="contained"
              endIcon={<NavigateNextIcon />}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
            >
              Next
            </Button>
          </Stack>
        </Paper>
      )}
    </>
  );
}
export default TokensTable;
