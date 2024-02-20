/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useContext, useState, useMemo } from 'react';

import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import 'ag-grid-community/styles/ag-grid.css'; // Core CSS
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Theme
import { Alert, Paper, Skeleton } from '@mui/material';
import { GeneralContext } from '../../../../contexts/general/General.Context';
import { isMobile } from 'react-device-detect';
import SupplyDetailsTooltip from '../SupplyDetailsTooltip';
import { useRouter } from 'next/router';
import useFetchTokens from '../../../hooks/useFetchTokens'; // Adjust the path as needed
import getTokenTableColDefs from './tokenTableColDefs';
import TokensTableColumnsFilter from './TokensTableColumnsFilter';
import useLocalStorage from '../../../hooks/useLocalStorage';
import FavoriteToggle from './TokensTableFavoritesFilter';
import { TokensTableContext } from '../../../../contexts/tokensTable/TokensTableContext';

function TokensTable() {
  const { formatPrice } = useContext(GeneralContext);
  const { favorites } = useContext(TokensTableContext);
  const [gridApi, setGridApi] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [isGridReady, setIsGridReady] = useState(false);
  const { data, loaded, error } = useFetchTokens(
    `${process.env.NEXT_PUBLIC_WEB2_API_URL}/api/tokens`
  );
  const [showFavorites, setShowFavorites] = useLocalStorage(
    'showFavorites',
    'all'
  );
  const router = useRouter();
  const colDefs = getTokenTableColDefs({ formatPrice, isMobile });
  const defaultColDef = useMemo(() => {
    return {
      tooltipComponent: SupplyDetailsTooltip
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
        const favoriteIds = JSON.parse(localStorage.getItem('favorites')) || [];
        return data.filter(row => favoriteIds.includes(row.rank));
      }
      return data;
    }
  }, [showFavorites, data, favorites]);
  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      {!loaded && !error && (
        <Skeleton variant="rounded" className="max-w-1500 mt-4" height={800} />
      )}
      {loaded && data && (
        <Paper className="max-w-1500 mx-auto relative">
          {isGridReady && (
            <TokensTableColumnsFilter
              gridApi={gridApi}
              showFilters={showFilters}
              setShowFilters={setShowFilters}
            />
          )}
          {isGridReady && (
            <FavoriteToggle value={showFavorites} setValue={setShowFavorites} />
          )}
          <Paper className="ag-theme-quartz w-full h-full">
            <AgGridReact
              rowData={filteredData}
              columnDefs={colDefs}
              domLayout="autoHeight"
              defaultColDef={defaultColDef}
              tooltipShowDelay={0}
              onRowClicked={onRowClicked}
              onGridReady={onGridReady}
              rowClass="cursor-pointer"
            />
          </Paper>
        </Paper>
      )}
    </>
  );
}
export default TokensTable;
