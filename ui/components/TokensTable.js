/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { GeneralContext } from '../../contexts/general/General.Context';
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import 'ag-grid-community/styles/ag-grid.css'; // Core CSS
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Theme
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
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

const CurrencyPriceChart = ({ value, data }) => {
  // Convert the data to the format expected by Recharts
  const chartData = value.map((avgPrice, index) => ({
    price: avgPrice
  }));

  return (
    <div className='h-[50px]'>
      <ResponsiveContainer>
        <LineChart
          width={600}
          height={300}
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <Line type="natural" dataKey="price" stroke={data.change_7d >= 0 ? 'green' : 'red'} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
const PriceMovementIndicatorRenderer = ({ value }) => (
  <Typography
    component="span"
    className="inline-flex justify-center h-full items-center"
  >
    {value >= 0 ? (
      <KeyboardArrowUpIcon className="text-green-500" fontSize="medium" />
    ) : (
      <KeyboardArrowDownIcon className="text-red-500" fontSize="medium" />
    )}
    <span className={`${value >= 0 ? 'text-green-500' : 'text-red-500'} min-w-[53px] inline-block`}>{value.toFixed(2)}%</span>
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
      field: 'rank',
      width: 60,
      headerName: '',
      pinned: 'left',
      sort: 'asc',
      cellStyle: { textAlign: 'center' },
      headerStyle: { textAlign: 'center' }
    },
    {
      field: 'name',
      headerName: 'Coin',
      cellRenderer: TokensLogoRenderer,
      filter: true,
      width: `${isMobile ? 100 : 236}`,
      pinned: 'left'
    },
    {
      field: 'price',
      headerName: 'Price',
      // autoWidth: `${!isMobile ? true : false}`,
      width: 130,
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-right',
      valueFormatter: params => {
        // TODO: Move this logic, it can be reused into details page
        let result = params.value
        if (params.value >= 1 && params.value < 10) {
            result = params.value.toFixed(4);
        } else if (params.value >= 10 && params.value <= 200) {
            result = params.value.toFixed(2);
        } else if (params.value > 200) {
            result = params.value.toFixed(0);
        } else {
            // For values under 1, show all leading zeros and up to the first four non-zero digits
            let matches = params.value.toString().match(/0\.(0*?[1-9]{1})(\d{0,2})/);
            result = matches ? matches[0] : params.value.toString();
    
            // Check for more than five zeros in a row and replace them with 0...0
            if (/0\.0{4,}/.test(result)) {
                result = result.replace(/0\.0{4,}/, '0.0...0');
            }
        }
        return result.toLocaleString() + ' ICP';
      }
    },
    {
      field: 'change_24h',
      headerName: '24h %',
      width: 130,
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-right',
      cellRenderer: PriceMovementIndicatorRenderer
    },
    {
      field: 'change_7d',
      headerName: '7d %',
      width: 130,
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-right',
      cellRenderer: PriceMovementIndicatorRenderer
    },
    {
      field: 'change_30d',
      headerName: '30d %',
      width: 130,
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-right',
      cellRenderer: PriceMovementIndicatorRenderer
    },
    {
      field: 'volume_24h',
      headerName: '24h Volume',
      autoWidth: true,
      autoHeight: true,
      width: 130,
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-right',
      valueFormatter: params => {
        return params.value.toLocaleString() + ' ICP';
      }
    },
    // {
    //   field: 'volume_7d',
    //   headerName: '7d Volume',
    //   autoWidth: true,
    //   autoHeight: true,
    //   width: 140,
    //   cellStyle: { textAlign: 'right' },
    //   headerClass: 'text-right',
    //   valueFormatter: params => {
    //     return params.value.toLocaleString() + ' ICP';
    //   }
    // },
    {
      field: 'fully_diluted_market_cap',
      headerName: 'Fully Diluted M Cap',
      width: 170,
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-right',
      valueFormatter: params => {
        return params.value.toLocaleString() + ' ICP';
      }
    },
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
    {
      field: 'avg_price_last_7_days',
      headerName: 'Last 7 Days',
      width: 185,
      sortable: false,
      cellRenderer: CurrencyPriceChart
    }
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
      {!loaded && !error && <Skeleton variant="rounded" className='max-w-1500 mt-4' height={200} />}
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
