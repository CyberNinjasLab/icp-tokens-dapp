/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { GeneralContext } from '../../contexts/general/General.Context';
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import 'ag-grid-community/styles/ag-grid.css'; // Core CSS
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Theme
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { testData } from '../../utils/seedData';
import {
  Alert,
  Box,
  LinearProgress,
  Paper,
  Skeleton,
  Typography
} from '@mui/material';
import CustomTooltip from './CustomTooltip';
import { isMobile } from 'react-device-detect';
import { useRouter } from 'next/router';

const CurrencyPriceChart = ({ value }) => {
  return (
    <ResponsiveContainer>
      <LineChart
        width={600}
        height={300}
        data={value}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <Line type="natural" dataKey="price" stroke="#019a9a" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};
const PriceMovementIndicatorRenderer = ({ value }) => (
  <Typography
    component="span"
    className="inline-flex justify-center h-full items-center"
  >
    {value.movement === 'up' ? (
      <ArrowUpwardIcon className="text-green-500" fontSize="large" />
    ) : (
      <ArrowDownwardIcon className="text-red-500" fontSize="large" />
    )}
    <Typography className="ml-2">{value.percent}%</Typography>
  </Typography>
);
const TokensLogoRenderer = ({ value, data }) => (
  <Typography
    component="span"
    className="inline-flex h-full w-full items-center"
  >
    {value && (
      <img
        alt={`${value} Logo`}
        src={`http://icptokens.net/storage/${data.avatar}`}
        className="block w-30 h-30 mr-2 brightness-110"
        style={{ width: '30px', height: '30px' }}
      />
    )}
    {isMobile && <Typography>{data.symbol}</Typography>}
    {!isMobile && (
      <>
        <Typography className="text-30" component="span" sx={{ mr: 1 }}>
          {data.name}
        </Typography>
        <Typography
          className="text-30"
          component="span"
          color="darkgray"
          fontSize={12}
        >
          {data.symbol}
        </Typography>
      </>
    )}
  </Typography>
);
const CirculatingSupplyRenderer = ({ value }) => (
  <Box className="items-center leading-normal">
    <Typography className="overflow-hidden whitespace-nowrap overflow-ellipsis">
      {value.circulatingSupply}
    </Typography>
    {value.percent < 100 && (
      <LinearProgress
        value={value.percent}
        variant="determinate"
        sx={{
          '& .MuiLinearProgress-bar': {
            backgroundColor: '#019a9a'
          }
        }}
      />
    )}
  </Box>
);
function TokensTable() {
  // const {identity, setIdentity} = useContext(GeneralContext);
  const [data, setData] = useState();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const colDefs = [
    {
      field: 'id',
      width: 70,
      headerName: '#',
      pinned: 'left',
      sort: 'asc'
    },
    {
      field: 'name',
      headerName: 'Coin',
      cellRenderer: TokensLogoRenderer,
      filter: true,
      width: `${isMobile ? 100 : 250}`,
      pinned: 'left'
    },
    {
      field: 'price',
      headerName: 'Price',
      autoWidth: `${!isMobile ? true : false}`,
      width: `${isMobile && 100}`,
      valueFormatter: params => {
        return params.value.toLocaleString() + ' ICP';
      }
    }
    // {
    //   field: '24%',
    //   headerName: '24h %',
    //   autoWidth: true,
    //   cellRenderer: PriceMovementIndicatorRenderer
    // },
    // {
    //   field: 'marketCap',
    //   headerName: 'Market Cap',
    //   autoWidth: true,
    //   valueFormatter: params => {
    //     return '$' + params.value.toLocaleString();
    //   }
    // },
    // {
    //   field: 'volume24H',
    //   headerName: 'Volume(24h)',
    //   autoWidth: true,
    //   autoHeight: true,
    //   sortable: false,
    //   cellRenderer: params => (
    //     <Box className="leading-normal items-center">
    //       <Typography>{params.value.dollars}</Typography>
    //       <Typography>{params.value.currency}</Typography>
    //     </Box>
    //   )
    // },
    // {
    //   field: 'circulatingSupply',
    //   headerName: 'Circulating Supply',
    //   autoWidth: true,
    //   autoHeight: true,
    //   sortable: false,
    //   tooltipField: 'circulatingSupply',
    //   tooltipComponentParams: { color: 'white' },
    //   cellRenderer: CirculatingSupplyRenderer
    // },
    // {
    //   field: 'chartData',
    //   headerName: 'Last 7 Days',
    //   width: 220,
    //   sortable: false,
    //   cellRenderer: CurrencyPriceChart
    // }
  ];
  const defaultColDef = useMemo(() => {
    return {
      tooltipComponent: CustomTooltip
    };
  }, []);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://icptokens.net/api/tokens', {
          method: 'GET'
        });
        const data = await response.json();
        setData(data);
        setLoaded(true);
      } catch (err) {
        setData(null);
        setError('There was an error loading the data!');
      }
    }
    fetchData();
  }, []);
  const onRowClicked = params => {
    const canisterId = params.data['canister_id'];
    if (canisterId) {
      router.push(`/token/${canisterId}`);
    }
  };
  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      {!loaded && <Skeleton variant="rounded" width={210} height={60} />}
      {loaded && data && (
        <Paper className="max-w-1500 mx-auto">
          <Paper className="ag-theme-quartz w-full h-full">
            <AgGridReact
              rowData={data}
              columnDefs={colDefs}
              domLayout="autoHeight"
              defaultColDef={defaultColDef}
              tooltipShowDelay={0}
              onRowClicked={onRowClicked}
            />
          </Paper>
        </Paper>
      )}
    </>
  );
}
export default TokensTable;
