/* eslint-disable @next/next/no-img-element */
import React, { useContext, useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { Paper } from '@mui/material';
import TokenLogoAndName from '../tokens/TokenLogoAndName';
import DefaultCell from '../tokens/table/DefaultCell';
import { isMobile } from 'react-device-detect';
import { GeneralContext } from '../../../contexts/general/General.Context';
import HoldingsCell from './HoldingsCell';
import ProfitLossCell from './ProfitLossCell';
import useWindowWidthUnder from '../../hooks/useWindowWidthUnder';
import TransactionTypeCell from './TransactionTypeCell';

function PortfolioTransactionsTable({ transactions }) {
  const { formatPrice, currency, roundPrice } = useContext(GeneralContext);
  const [gridApi, setGridApi] = useState(null);
  const [isGridReady, setIsGridReady] = useState(false);
  const isWindowUnder1370 = useWindowWidthUnder(1370);
  const isWindowUnder800 = useWindowWidthUnder(800);

  const colDefs = [
    {
      field: `type`,
      headerName: 'Type',
      flex: 1,
      cellRendererSelector: params => {
        return {
          component: TransactionTypeCell,
          params: {value: params.data}
        };
      }
    },
    {
      field: `price_per_token`,
      headerName: 'Price',
      flex: 1,
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-right',
      cellRendererSelector: params => {
        return {
          component: DefaultCell,
          params: {value: roundPrice(params.value) + ' ICP'}
        };
      }
    },
    {
      field: `quantity`,
      headerName: 'Amount',
      flex: 1,
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-right',
      cellRendererSelector: params => {
        return {
          component: DefaultCell,
          params: {value: roundPrice(params.value)}
        };
      }
    },
    {
      field: `quantity`,
      headerName: 'Actions',
      flex: 1,
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-right',
      cellRendererSelector: params => {
        return {
          component: DefaultCell,
          params: {value: '...'}
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
      {transactions && (
        <Paper className="max-w-1500 mx-auto relative" style={{ margin: '1rem 0px' }}>
          <Paper className="ag-theme-quartz w-full h-full" style={{ margin: '1rem 0px' }}>
            <AgGridReact
              rowData={transactions}
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

export default PortfolioTransactionsTable;
