// tokenTableColDefs.js

import PriceMovementIndicator from '../PriceMovementIndicator';
import TokenLogoAndName from '../TokenLogoAndName';

const getTokenTableColDefs = ({ formatPrice, isMobile }) => [
  {
    field: 'rank',
    width: 60,
    headerName: '',
    pinned: 'left',
    sort: 'asc',
    cellStyle: { textAlign: 'center' },
  },
  {
    field: 'name',
    headerName: 'Name',
    cellRenderer: TokenLogoAndName,
    filter: true,
    width: `${isMobile ? 120 : 210}`,
    pinned: 'left'
  },
  {
    field: 'price',
    headerName: 'Price',
    // autoWidth: `${!isMobile ? true : false}`,
    width: 150,
    cellStyle: { textAlign: 'right' },
    headerClass: 'text-right',
    valueFormatter: params => {
      return formatPrice(params.value)
    }
  },
  {
    field: 'change_24h',
    headerName: '24h %',
    width: 150,
    cellStyle: { textAlign: 'right' },
    headerClass: 'text-right',
    cellRenderer: PriceMovementIndicator
  },
  {
    field: 'change_7d',
    headerName: '7d %',
    width: 110,
    cellStyle: { textAlign: 'right' },
    headerClass: 'text-right',
    cellRenderer: PriceMovementIndicator
  },
  {
    field: 'change_30d',
    headerName: '30d %',
    width: 110,
    cellStyle: { textAlign: 'right' },
    headerClass: 'text-right',
    cellRenderer: PriceMovementIndicator
  },
  {
    field: 'volume_24h',
    headerName: '24h Volume',
    autoHeight: true,
    width: 150,
    cellStyle: { textAlign: 'right' },
    headerClass: 'text-right',
    valueFormatter: params => {
      return params.value.toLocaleString() + ' ICP';
    }
  },
  {
    field: 'volume_7d',
    headerName: '7d Volume',
    autoHeight: true,
    width: 115,
    cellStyle: { textAlign: 'right' },
    headerClass: 'text-right',
    valueFormatter: params => {
      return params.value.toLocaleString() + ' ICP';
    }
  },
  // {
  //   field: 'volume_30d',
  //   headerName: '30d Volume',
  //   autoHeight: true,
  //   width: 150,
  //   cellStyle: { textAlign: 'right' },
  //   headerClass: 'text-right',
  //   valueFormatter: params => {
  //     return params.value.toLocaleString() + ' ICP';
  //   }
  // },
  {
    field: 'fully_diluted_market_cap',
    headerName: 'Fully Diluted M Cap',
    // width: ,
    cellStyle: { textAlign: 'right' },
    headerClass: 'text-right',
    valueFormatter: params => {
      return params.value.toLocaleString() + ' ICP';
    }
  }
];

export default getTokenTableColDefs;
