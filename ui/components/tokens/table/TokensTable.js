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
import useFetchTokens from '../../../hooks/token/useFetchTokens'; // Adjust the path as needed
import getTokenTableColDefs from './tokenTableColDefs';
import TokensTableColumnsFilter from './TokensTableColumnsFilter';
import FavoriteToggle from './TokensTableFavoritesFilter';
import { TokensTableContext } from '../../../../contexts/tokensTable/TokensTableContext';

function TokensTable(props) {
  const {
    showFavoritesOnly = false
  } = props;
  const { formatPrice, showPriceCurrency, currency } = useContext(GeneralContext);
  const { favorites, loading } = useContext(TokensTableContext);
  const [gridApi, setGridApi] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [isGridReady, setIsGridReady] = useState(false);
  const { data, loaded, error } = useFetchTokens(
    `${process.env.NEXT_PUBLIC_WEB2_API_URL}/api/tokens`
  );

  const [showFavorites, setShowFavorites] = useState(showFavoritesOnly ? 'favorites' : 'all');
  
  const router = useRouter();
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
        const favoriteIds = favorites || [];
        return data.filter(row => favoriteIds.includes(row.canister_id));
      }
      return data;
    }
  }, [showFavorites, data, favorites]);
  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      {!loaded && !error && loading && (
        <Skeleton variant="rounded" className="max-w-1500 mt-4" height={800} />
      )}
      {loaded && data && !loading && (
        <Paper className="max-w-1500 mx-auto relative" style={{
          margin: '1rem 0px'
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
          <Paper className="ag-theme-quartz w-full h-full" style={{
            margin: '1rem 0px'
          }}>
            <AgGridReact
              rowData={filteredData}
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
        </Paper>
      )}
    </>
  );
}
export default TokensTable;
