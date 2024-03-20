// tokenTableColDefs.js

import PriceMovementIndicator from '../PriceMovementIndicator';
import TokenLogoAndName from '../TokenLogoAndName';
import Favorites from '../Favorites';
import DefaultCell from './DefaultCell';
import { useEffect, useState } from 'react';

const getTokenTableColDefs = ({ formatPrice, isMobile }) => {
  const [isWindowUnder1370, setIsWindowUnder1370] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsWindowUnder1370(window.innerWidth < 1370);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    // Cleanup function to remove the event listener when component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array means this effect runs only once after the initial render

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
      width: `${isMobile ? 120 : 210}`,
      pinned: isWindowUnder1370 ? 'left' : null,
    },
    {
      field: 'price',
      headerName: 'Price',
      flex: 1,
      minWidth: isMobile ? 120 : 140,
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
      field: 'metrics.change_24h',
      headerName: '24h %',
      width: 91,
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-right',
      cellRenderer: PriceMovementIndicator
    },
    {
      field: 'metrics.change_7d',
      headerName: '7d %',
      width: 110,
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-right',
      cellRenderer: PriceMovementIndicator
    },
    {
      field: 'metrics.change_30d',
      headerName: '30d %',
      width: 110,
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-right',
      cellRenderer: PriceMovementIndicator
    },
    {
      field: 'metrics.volume_24h',
      headerName: '24h Volume',
      autoHeight: true,
      width: 160,
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-right',
      cellRendererSelector: params => {
        return {
          component: DefaultCell,
          params: {value: params.value.toLocaleString() + ' ICP'}
        };
      }
    },
    {
      field: 'metrics.volume_7d',
      headerName: '7d Volume',
      autoHeight: true,
      width: 115,
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-right',
      cellRendererSelector: params => {
        return {
          component: DefaultCell,
          params: {value: params.value.toLocaleString() + ' ICP'}
        };
      }
    },
    // {
    //   field: 'metrics.volume_30d',
    //   headerName: '30d Volume',
    //   autoHeight: true,
    //   width: 150,
    //   cellStyle: { textAlign: 'right' },
    //   headerClass: 'text-right',
        // cellRendererSelector: params => {
        //   return {
        //     component: DefaultCell,
        //     params: {value: params.value.toLocaleString() + ' ICP'}
        //   };
        // }
    // },
    {
      field: 'fully_diluted_market_cap',
      headerName: 'Fully Diluted M Cap',
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-right',
      cellRendererSelector: params => {
        return {
          component: DefaultCell,
          params: {value: parseFloat(params.value).toLocaleString() + ' ICP'}
        };
      }
    }
  ];
}

export default getTokenTableColDefs;
