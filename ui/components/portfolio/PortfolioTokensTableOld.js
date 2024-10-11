/* eslint-disable @next/next/no-img-element */
import React, { useContext, useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { Paper } from '@mui/material';
import TokenLogoAndName from '../tokens/TokenLogoAndName';
import DefaultCell from '../_base/table/DefaultCell';
import { isMobile } from 'react-device-detect';
import { GeneralContext } from '../../../contexts/general/General.Context';
import HoldingsCellOld from './HoldingsCellOld';
import ProfitLossCellOld from './ProfitLossCellOld';
import useWindowWidthUnder from '../../hooks/useWindowWidthUnder';
import { useRouter } from 'next/router';
import TokenActionsCell from './TokenActionsCell';

function PortfolioTokensTableOld({ tokens }) {
  const router = useRouter();
  const { formatPrice, currency, roundPrice, theme } = useContext(GeneralContext);
  const [gridApi, setGridApi] = useState(null);
  const [isGridReady, setIsGridReady] = useState(false);
  const isWindowUnder1370 = useWindowWidthUnder(1370);
  const isWindowUnder800 = useWindowWidthUnder(800);

  const colDefs = [
    {
      field: 'name',
      headerName: 'Name',
      cellRenderer: TokenLogoAndName,
      width: `${isMobile ? 115 : 210}`,
      pinned: isWindowUnder1370 ? 'left' : null,
      cellStyle: {
        'padding': isMobile ? '0px 5px 0 15px' : '0px 15px'
      },
    },
    {
      field: `metrics.price.${currency}`,
      headerName: 'Price',
      // flex: 1,
      width: isWindowUnder1370 ? 124 : 160,
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-right',
      cellRendererSelector: params => {
        return {
          component: DefaultCell,
          params: {value: formatPrice(params.value)}
        };
      },
      hide: isWindowUnder1370,
      comparator: (valueA, valueB, nodeA, nodeB, isDescending) => Number(valueA) - Number(valueB)
    },
    {
      // field: ``,
      headerName: 'Holdings',
      width: isWindowUnder1370 ? 130 : 160,
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-right',
      cellRendererSelector: params => {
        return {
          component: HoldingsCellOld,
          params: {value: params.data}
        };
      }
    },
    {
      field: `portfolio.avgBuyPrice`,
      headerName: isWindowUnder1370 ? 'Avg. Price' : 'Avg. Buy Price',
      width: 165,
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-right',
      cellRendererSelector: params => {
        return {
          component: DefaultCell,
          params: {value: formatPrice(params.value)}
        };
      }
    },
    {
      field: ``,
      headerName: 'Profit/Loss',
      width: 160,
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-right',
      cellRendererSelector: params => {
        return {
          component: ProfitLossCellOld,
          params: {value: params.data}
        };
      }
    },
    {
      field: ``,
      headerName: 'Actions',
      width: 90,
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-right',
      flex: isWindowUnder800 ? 0 : 1,
      cellRendererSelector: params => {
        return {
          component: TokenActionsCell,
          params: {value: '...'}
        };
      }
    }
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

  const onCellClicked = params => {
    const clickedField = params.colDef?.field; // Safely get the field of the clicked cell

    const canisterId = params.data['canister_id'];

    if (clickedField === 'name') {
        router.push(`/token/${canisterId}`);
    } else {
        router.push(`/portfolio/transactions/${canisterId}`);
    }
  };

  return (
    <>
      {tokens && (
        <Paper className="max-w-1500 mx-auto relative" style={{ margin: '1rem 0px' }}>
          <Paper className={`${theme == 'dark' ? 'ag-theme-quartz-dark' : 'ag-theme-quartz'} w-full h-full`} style={{ margin: '1rem 0px' }}>
            <AgGridReact
              rowData={tokens}
              rowHeight={60}
              columnDefs={colDefs}
              domLayout="autoHeight"
              suppressMovableColumns={true}
              defaultColDef={defaultColDef}
              onGridReady={onGridReady}
              onCellClicked={onCellClicked}
              rowClass="cursor-pointer"
            />
          </Paper>
        </Paper>
      )}
    </>
  );
}

export default PortfolioTokensTableOld;
