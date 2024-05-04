// tokenTableColDefs.js

import PriceMovementIndicator from '../PriceMovementIndicator';
import TokenLogoAndName from '../TokenLogoAndName';
import Favorites from '../Favorites';
import DefaultCell from './DefaultCell';
import useWindowWidthUnder from '../../../hooks/useWindowWidthUnder';

const getTokenTableColDefs = ({ formatPrice, isMobile, showPriceCurrency, currency }) => {
  const isWindowUnder1370 = useWindowWidthUnder(1370);
  const isWindowUnder800 = useWindowWidthUnder(800);

  return [
    {
      field: 'favorites',
      width: 32,
      headerName: '',
      pinned: isWindowUnder1370 ? 'left' : null,
      cellStyle: { textAlign: 'center' },
      cellRenderer: Favorites,
      cellClass: 'favorite-icon',
      cellStyle: {
        'padding': '0px 10px'
      },
    },
    {
      field: 'rank',
      width: 32,
      pinned: isWindowUnder1370 ? 'left' : null,
      sort: 'asc',
      headerClass: 'no-header-name',
      headerName: '',
      cellStyle: {
        'padding': '0px 5px',
        textAlign: 'center'
      },
      cellRenderer: DefaultCell,
    },
    {
      field: 'name',
      headerName: 'Name',
      cellRenderer: TokenLogoAndName,
      filter: true,
      width: `${isWindowUnder800 ? 101 : 210}`,
      pinned: isWindowUnder1370 ? 'left' : null,
      cellStyle: {
        'padding': isWindowUnder800 ? '0px 5px 0 0' : '0px 15px'
      },
    },
    {
      field: `metrics.price.${currency}`,
      headerName: 'Price',
      flex: 1,
      minWidth: isMobile ? 124 : 140,
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-right',
      cellRendererSelector: params => {
        return {
          component: DefaultCell,
          params: {value: formatPrice(params.value)}
        };
      },
      comparator: (valueA, valueB, nodeA, nodeB, isDescending) => Number(valueA) - Number(valueB)
    },
    {
      field: `metrics.change.24h.${currency}`,
      headerName: '24h %',
      width: 110,
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-right',
      cellRenderer: PriceMovementIndicator,
    },
    {
      field: `metrics.change.7d.${currency}`,
      headerName: '7d %',
      width: 110,
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-right',
      cellRenderer: PriceMovementIndicator
    },
    {
      field: `metrics.change.30d.${currency}`,
      headerName: '30d %',
      width: 110,
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-right',
      cellRenderer: PriceMovementIndicator
    },
    {
      field: `metrics.volume.${currency}.24h`,
      headerName: '24h Volume',
      autoHeight: true,
      width: 160,
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-right',
      cellRendererSelector: params => {
        return {
          component: DefaultCell,
          params: {value: showPriceCurrency(params.value.toLocaleString())}
        };
      }
    },
    {
      field: `metrics.volume.${currency}.7d`,
      headerName: '7d Volume',
      autoHeight: true,
      width: 115,
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-right',
      cellRendererSelector: params => {
        return {
          component: DefaultCell,
          params: {value: showPriceCurrency(params.value.toLocaleString())}
        };
      }
    },
    // {
    //   field: `metrics.volume.${currency}.30d`,
    //   headerName: '30d Volume',
    //   autoHeight: true,
    //   width: 150,
    //   cellStyle: { textAlign: 'right' },
    //   headerClass: 'text-right',
        // cellRendererSelector: params => {
        //   return {
        //     component: DefaultCell,
        //     params: {value: showPriceCurrency(params.value.toLocaleString())}
        //   };
        // }
    // },
    {
      field: `metrics.fully_diluted_market_cap.${currency}`,
      headerName: 'Fully Diluted M Cap',
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-right',
      cellRendererSelector: params => {
        return {
          component: DefaultCell,
          params: {value: showPriceCurrency(parseFloat(params.value).toLocaleString())}
        };
      },
      comparator: (valueA, valueB, nodeA, nodeB, isDescending) => Number(valueA) - Number(valueB)
    }
  ];
}

export default getTokenTableColDefs;
