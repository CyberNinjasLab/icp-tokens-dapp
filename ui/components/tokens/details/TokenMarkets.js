/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { Paper } from '@mui/material';
import DefaultCell from '../../_base/table/DefaultCell';
import { GeneralContext } from '../../../../contexts/general/General.Context';
import { isMobile } from 'react-device-detect';
import DexLogoAndNameCell from '../../markets/MarketLogoAndNameCell';
import MarketPairLinkCell from '../../markets/MarketPairLinkCell';
import useWindowWidthUnder from '../../../hooks/useWindowWidthUnder';

function TokenMarkets({ token, tokenMarkets }) {
  const { theme, currency, formatPrice, showPriceCurrency, getTokenName } = useContext(GeneralContext);
  const [gridApi, setGridApi] = useState(null);
  const [isGridReady, setIsGridReady] = useState(false);
  const [formattedMarketsData, setFormattedMarketsData] = useState([]);
  const isWindowUnder600 = useWindowWidthUnder(600);

  useEffect(() => {
    if (tokenMarkets) {
      // First, sort the markets by 24h Volume in descending order
      const sortedMarkets = tokenMarkets.sort((a, b) => {
        // Assuming 'volume24h' is the key for 24h Volume data in your market objects
        // and it's properly formatted as a number or can be coerced into one.
        return b.volume['24h'][currency] - a.volume['24h'][currency];  // Descending order
      });
  
      // Then, map the sorted data to format for display
      const newData = sortedMarkets.map((market, index) => ({
        ...market,
        '#': index + 1,  // Add an index starting from 1
      }));
  
      setFormattedMarketsData(newData);
    }
  }, [tokenMarkets, token.canister_id, currency]);  

  const colDefs = [
    {
      field: '#',
      headerName: 'ID',
      width: 30,
      hide: isWindowUnder600,
      cellRendererSelector: params => {
        return {
          component: DefaultCell,
          params: {value: params.value}
        };
      },
    },
    {
      field: 'display_name',
      headerName: 'Name',
      flex: 1,
      cellRendererSelector: params => {
        return {
          component: DexLogoAndNameCell,
          params: params
        };
      },
    },
    {
      field: 'display_name',
      headerName: 'Pair',
      flex: 1,
      cellRendererSelector: params => {
        return {
          component: MarketPairLinkCell,
          params: {params: params, token: token}
        };
      },
    },
    {
      sort: 'desc',
      field: `volume.24h.${currency}`,
      headerName: '24h Volume',
      autoHeight: true,
      flex: 1,
      cellRendererSelector: params => {
        return {
          component: DefaultCell,
          params: {value: params.data.volume ? showPriceCurrency(params.value.toLocaleString()) : ''}
        };
      }
    },
    {
      hide: isWindowUnder600,
      field: `price.${currency}`,
      headerName: 'Price',
      sortable: true,
      flex: 1,
      cellRendererSelector: params => {
        return {
          component: DefaultCell,
          params: {value: formatPrice(params.value)}
        };
      },
      comparator: (valueA, valueB, nodeA, nodeB, isDescending) => Number(valueA) - Number(valueB)
    }
  ];

  const defaultColDef = {
    resizable: false,
    sortable: false
  };

  const onGridReady = params => {
    setGridApi(params.api);
    setIsGridReady(true);
  };

  return (
    <>
      <div className='markdown-content'>
        <h2 className='h2'>Markets</h2>
        <Paper className="max-w-1500 mx-auto relative">
          <Paper className={`${theme === 'dark' ? 'ag-theme-quartz-dark' : 'ag-theme-quartz'} w-full h-full`}>
            <AgGridReact
              rowData={formattedMarketsData}
              rowHeight={60}
              columnDefs={colDefs}
              domLayout="autoHeight"
              suppressMovableColumns={true}
              defaultColDef={defaultColDef}
              onGridReady={onGridReady}
            />
          </Paper>
        </Paper>
      </div>
    </>
  );
}

export default TokenMarkets;
