/* eslint-disable @next/next/no-img-element */
import React, { useContext, useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { Paper } from '@mui/material';
import DefaultCell from '../_base/table/DefaultCell';
import { isMobile } from 'react-device-detect';
import { GeneralContext } from '../../../contexts/general/General.Context';
import useWindowWidthUnder from '../../hooks/useWindowWidthUnder';
import TransactionTypeCell from './TransactionTypeCell';
import TransactionActionsCell from './TransactionActionsCell';
import { useLoading } from '../../../contexts/general/Loading.Provider';
import TransactionAmountCell from './TransactionAmountCell';

function PortfolioTransactionsTableOld({ summary, fetchPortfolios }) {
  const [gridApi, setGridApi] = useState(null);
  const [isGridReady, setIsGridReady] = useState(false);
  const { formatPrice, theme, currency } = useContext(GeneralContext);
  const isWindowUnder800 = useWindowWidthUnder(800);
  const { setLoadingState } = useLoading();

  const colDefs = [
    {
      field: `type`,
      headerName: 'Type',
      width: isWindowUnder800 ? 150 : 170,
      flex: isWindowUnder800 ? 0 : 1,
      cellRendererSelector: params => {
        return {
          component: TransactionTypeCell,
          params: {value: params.data}
        };
      }
    },
    {
      field: `price_per_token`,
      headerName: 'Price Per Coin',
      width: 110,
      flex: isWindowUnder800 ? 0 : 1,
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-right',
      hide: isMobile,
      cellRendererSelector: params => {
        return {
          component: DefaultCell,
          params: {value: formatPrice(params.data['price_per_token_' + currency])}
        };
      }
    },
    {
      field: ``,
      headerName: 'Amount',
      width: 110,
      flex: isWindowUnder800 ? 0 : 1,
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-right',
      cellRendererSelector: params => {
        return {
          component: TransactionAmountCell,
          params: {value: params.data}
        };
      }
    },
    {
      field: `id`,
      maxWidth: 400,
      minWidth: 100,
      headerName: 'Actions',
      flex: 1,
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-right',
      cellRendererSelector: params => {
        return {
          component: TransactionActionsCell,
          params: {transactionId: params.value, setLoadingState: setLoadingState, fetchPortfolios: fetchPortfolios}
        };
      }
    },
  ];

  const defaultColDef = useMemo(() => {
    return {
      resizable: false,
      sortable: false
    };
  }, []);

  const onGridReady = params => {
    setGridApi(params.api);
    setIsGridReady(true);
  };

  return (
    <>
      {summary && (
        <Paper className="max-w-1500 mx-auto relative" style={{ margin: '1rem 0px' }}>
          <Paper className={`${theme == 'dark' ? 'ag-theme-quartz-dark' : 'ag-theme-quartz'} w-full h-full`} style={{ margin: '1rem 0px' }}>
            <AgGridReact
              rowData={summary.tokens[0].portfolio.transactions}
              rowHeight={60}
              columnDefs={colDefs}
              domLayout="autoHeight"
              suppressMovableColumns={true}
              defaultColDef={defaultColDef}
              onGridReady={onGridReady}
            />
          </Paper>
        </Paper>
      )}
    </>
  );
}

export default PortfolioTransactionsTableOld;
