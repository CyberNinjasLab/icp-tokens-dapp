/* eslint-disable @next/next/no-img-element */
import React  from 'react'
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { LineChart, Line, ResponsiveContainer, } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortUp } from '@fortawesome/free-solid-svg-icons';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import { testData } from './seedData'
import { LinearProgress } from '@mui/material'
import {isMobile} from 'react-device-detect';


const CurrencyPriceChart = ({value}) => {
    return (
    <ResponsiveContainer>
      <LineChart width={600} height={300} data={value} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <Line type="natural" dataKey="price" stroke="#019a9a" dot={false}/>
      </LineChart>
    </ResponsiveContainer>
    );
  };
  const PriceMovementIndicatorRenderer = ({ value }) => (
    <span className="inline-flex justify-center h-full items-center">
    <FontAwesomeIcon className={`w-4 h-4 ${value.movement === 'up'? 'text-green-500' : 'text-red-500'}`} icon={ value.movement === 'up'? faSortUp : faSortDown}/>
      <p className='ml-2'>
        {value.percent}%
      </p>
    </span>
  );
  const TokensLogoRenderer = ({ value, data }) => (
    <span className="inline-flex h-full w-full items-center">
      {value && (
        <img
          alt={`${value} Logo`}
          src={data.icon}
          className="block w-30 h-30 mr-2 brightness-110"
          style={{width: '30px', height: '30px'}}
        />
      )}
      {isMobile && (
        <p>{data.symbol}</p>
      )}
      {!isMobile && (
        <p>
        {value} {data.symbol}
      </p>
      )}
    </span>
  );
function TokensTable(){
    const colDefs = [
        {
          field: 'id',
          width: 50,
          headerName: '#',
          pinned: 'left',
        },
        {
          field: 'name',
          headerName: 'Coin',
          cellRenderer: TokensLogoRenderer,
          filter: true,
          autoWidth: `${!isMobile ? true : false }`,
          width: `${isMobile && 100}`,
          pinned: 'left',
        },
        {
            field: 'price',
            headerName: 'Price',
            autoWidth: `${!isMobile ? true : false }`,
            width: `${isMobile && 100}`,
            valueFormatter: (params) => {
              return '$' + params.value.toLocaleString();
            },
          },
        {
          field: '24%',
          headerName: '24h %',
          autoWidth: true,
          cellRenderer: PriceMovementIndicatorRenderer,
        },
        {
          field: 'marketCap',
          headerName: 'Market Cap',
          autoWidth: true,
          valueFormatter: (params) => {
            return '$' + params.value.toLocaleString();
          },
        },
        {
            field: 'volume24H',
            headerName: 'Volume(24h)',
            autoWidth: true,
            autoHeight: true,
            cellRenderer: (params) => (
                <div className='leading-normal items-center'>
                    <p>{params.value.dollars}</p>
                    <p>{params.value.currency}</p>
                </div>
            ),
          },
        {
          field: 'circulatingSupply',
          headerName: 'Circulating Supply',
          autoWidth: true,
          autoHeight: true,
          cellRenderer: (param) => (
            <div className="items-center leading-normal">
                <p className="overflow-hidden whitespace-nowrap overflow-ellipsis">{param.value.circulatingSupply}</p>
                {param.value.percent < 100 && (
                <LinearProgress value={param.value.percent} variant="determinate" sx={{'& .MuiLinearProgress-bar': {backgroundColor:'#019a9a'}}}/>
                )}
            </div>
          ),
        },
        {
            field: 'chartData',
            headerName: 'Last 7 Days',
            width: 200,
            cellRenderer: CurrencyPriceChart
          },
      ];
    return(
        <div className='max-w-1500 mx-auto'>
         <div className="ag-theme-quartz w-full h-full">
          <AgGridReact
           rowData={testData}
           columnDefs={colDefs}
           domLayout='autoHeight'
          />
       </div>
      </div>
    )
}
export default TokensTable;