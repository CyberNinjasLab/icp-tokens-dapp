// tokenTableColDefs.js

import PriceMovementIndicator from '../PriceMovementIndicator';
import TokenLogoAndName from '../TokenLogoAndName';
import Favorites from '../Favorites';
import DefaultCell from '../../_base/table/DefaultCell';
import useWindowWidthUnder from '../../../hooks/useWindowWidthUnder';
import PriceTrendLineChart from '../PriceTrendLineChart';

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
      width: `${isWindowUnder800 ? 101 : isWindowUnder1370 ? 248 : 295}`,
      pinned: isWindowUnder1370 ? 'left' : null,
      cellStyle: {
        'padding': isWindowUnder800 ? '0px 5px 0 0' : '0px 15px'
      },
    },
    {
      field: `metrics.price.${currency}`,
      headerName: 'Price',
      width: 130,
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
      width: 85,
      cellStyle: { 
        textAlign: 'right',
        padding: '0 5px'
      },
      headerClass: 'text-right px5',
      cellRenderer: PriceMovementIndicator,
    },
    {
      field: `metrics.change.7d.${currency}`,
      headerName: '7d %',
      width: 85,
      cellStyle: { 
        textAlign: 'right',
        padding: '0 5px'
      },
      headerClass: 'text-right px5',
      cellRenderer: PriceMovementIndicator
    },
    {
      field: `metrics.change.30d.${currency}`,
      headerName: '30d %',
      width: 85,
      cellStyle: { 
        textAlign: 'right',
        padding: '0 5px'
      },
      headerClass: 'text-right px5',
      cellRenderer: PriceMovementIndicator
    },
    {
      field: `metrics.volume.${currency}.24h`,
      headerName: '24h Volume',
      autoHeight: true,
      width: 140,
      cellStyle: { 
        textAlign: 'right',
        padding: '0 5px'
      },
      headerClass: 'text-right px5',
      cellRendererSelector: params => {
        return {
          component: DefaultCell,
          params: {value: params.data.metrics.volume ? showPriceCurrency(params.value.toLocaleString()) : ''}
        };
      }
    },
    {
      field: `metrics.volume.${currency}.7d`,
      headerName: '7d Volume',
      autoHeight: true,
      width: 140,
      cellStyle: { 
        textAlign: 'right',
        padding: '0 5px'
      },
      headerClass: 'text-right px5',
      cellRendererSelector: params => {
        return {
          component: DefaultCell,
          params: {value: params.data.metrics.volume ? showPriceCurrency(params.value.toLocaleString()) : ''}
        };
      }
    },
    // {
    //   field: `metrics.volume.${currency}.30d`,
    //   headerName: '30d Volume',
    //   autoHeight: true,
    //   width: 125,
    //   cellStyle: { textAlign: 'right' },
    //   headerClass: 'text-right',
        // cellRendererSelector: params => {
        //   return {
        //     component: DefaultCell,
        //     params: {value: params.data.volume ? showPriceCurrency(params.value.toLocaleString()) : ''}
        //   };
        // }
    // },
    {
      field: `metrics.fully_diluted_market_cap.${currency}`,
      headerName: 'Market Cap',
      width: 150,
      cellStyle: { 
        textAlign: 'right',
        padding: '0 5px'
      },
      headerClass: 'text-right px5',
      cellRendererSelector: params => {
        return {
          component: DefaultCell,
          params: {value: showPriceCurrency(parseFloat(params.value).toLocaleString())}
        };
      },
      comparator: (valueA, valueB, nodeA, nodeB, isDescending) => Number(valueA) - Number(valueB)
    },
    {
      field: ``,
      headerName: 'Last 7 Days',
      flex: isWindowUnder1370 ? 0 : 1,
      width: 170,
      cellStyle: { 
        textAlign: 'right',
        padding: '0 5px'
      },
      headerClass: 'text-right',
      cellRendererSelector: params => {
        const priceData = params.data.metrics.chartLast7Days ? params.data.metrics.chartLast7Days[currency.toUpperCase()] : [];

        return {
          component: PriceTrendLineChart,
          params: { priceData, lineColor: params.data.metrics.change['7d'][currency] >= 0 ? 'rgb(34 197 94)' : 'rgb(255 58 51)' },
        };
      }
    }
  ];
}

export default getTokenTableColDefs;
