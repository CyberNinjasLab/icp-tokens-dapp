import React, { useMemo, useState, useContext, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import { useRouter } from 'next/router';
import Link from 'next/link';
import TableFavorites from './TableFavorites';
import PriceTrendLineChart from '../PriceTrendLineChart';
import { GeneralContext } from '../../../../contexts/general/General.Context';
import { AuthContext } from '../../../../contexts/auth/Auth.Context';
import useFetchTokens from '../../../hooks/token/useFetchTokens';
import { Alert, Skeleton } from '@mui/material';
import FavoriteToggle from '../table/TokensTableFavoritesFilter';
import { useFavoriteTokens } from '../../../../contexts/general/FavoriteTokensProvider';
import { LazyLoadImage } from 'react-lazy-load-image-component';

/**
 * Example boilerplate for a crypto‐style table (200–300+ rows).
 * - Uses TanStack Table (headless) for sorting, row modeling, etc.
 * - Sticky first column (rank + name).
 * - Dark theme CSS that you can customize.
 */

export default function CryptoTable({ 
  data: propData, // Optional prop data, if not provided will fetch from API
  showFavoritesOnly = false
}) {
  const { formatPrice, currency } = useContext(GeneralContext);
  const { isAuthReady } = useContext(AuthContext);
  const { favoriteTokenIds, loadingFavorites } = useFavoriteTokens();
  const router = useRouter();
  
  // Fetch data from API if not provided as prop
  const { data: fetchedData, loaded, error } = useFetchTokens(
    propData ? null : `${process.env.NEXT_PUBLIC_WEB2_API_URL}/api/tokens`
  );
  
  // Use prop data if provided, otherwise use fetched data
  const rawData = propData || fetchedData || [];
  
  const [showFavorites, setShowFavorites] = useState(showFavoritesOnly ? 'favorites' : 'all');
  
  useEffect(() => {
    // Update the local storage when the showFavorites state changes
    setShowFavorites(showFavorites);
  }, [showFavorites, setShowFavorites]);
  
  const filteredData = useMemo(() => {
    if (rawData) {
      if (showFavorites === 'favorites') {
        const favoriteIds = favoriteTokenIds || [];
        return rawData.filter(row => favoriteIds.includes(row.canister_id));
      }
      return rawData;
    }
    return [];
  }, [showFavorites, rawData, favoriteTokenIds]);
  
  // Use filtered data for the table
  const data = filteredData;
  
  // These styles make sticky column‐pinning work.
// You can copy them into your CSS file or keep them inline as shown.
const getCommonPinningStyles = (column) => {
    const isPinned = column.getIsPinned()
  
    return {
      left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
      right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
      opacity: isPinned ? 0.95 : 1,
      position: isPinned ? 'sticky' : 'relative',
      width: column.getSize(),
      zIndex: isPinned ? 1 : 0,
    }
  }

    // ------------------------
  // 1. Column Definitions
  // ------------------------
  const columns = useMemo(
    () => [
        // Favorites column here
        {
            id: 'favorites',
            header: () => (
                <div className="th-content">
                    
                </div>
            ),
            cell: info => {
                const row = info.row.original;
                return (
                    <TableFavorites data={row} />
                );
            },
            enablePinning: false,
            meta: {
                sticky: 'left'
            },
            enableSorting: false,
            size: 27,
            className: "favorites-cell"
        },
        {
            id: 'rank',
            header: () => (
                <div className="th-content">
                    
                </div>
            ),
            cell: info => {
                const row = info.row.original;
                return (
                    <div>
                        {row.rank}
                    </div>
                );
            },
            accessorFn: row => row.rank,
            enablePinning: false,
            meta: {
                sticky: 'left'
            },
            enableSorting: true,
            size: 0,
            className: "rank-cell hidden md:table-cell"
        },
      {
        id: 'name',
        header: () => (
          <div className="th-content">
            Name
          </div>
        ),
        cell: info => {
          const row = info.row.original;
          return (
            <div className="name-cell-wrap">
              <Link 
                href={`/token/${row.canister_id}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  color: 'inherit',
                  gap: '0.5rem'
                }}
                onClick={(e) => {
                  // For middle click or ctrl+click, let the default behavior handle it
                  if (e.button === 1 || e.ctrlKey || e.metaKey) {
                    return;
                  }
                  // For regular left click, prevent default and use router navigation
                  e.preventDefault();
                  e.stopPropagation();
                  router.push(`/token/${row.canister_id}`);
                }}
                onAuxClick={(e) => {
                  // Handle middle mouse click
                  if (e.button === 1) {
                    window.open(`/token/${row.canister_id}`, '_blank');
                  }
                }}
              >
                <LazyLoadImage src={`https://web2.icptokens.net/storage/${row.logo}`} alt={`${row.name} icon`} className="coin-icon" />
                <div className="name-symbol">
                  <span className="coin-name hidden md:block">{row.name}</span>
                  <span className="coin-symbol md:text-gray-500 md:dark:text-gray-400 text-gray-900 dark:text-white md:text-xs text-sm font-medium">{row.symbol}</span>
                </div>
              </Link>
            </div>
          );
        },
        enablePinning: false,
        meta: {
            sticky: 'left'
        },
        className: "name-cell",
        size: 200
      },
      {
        accessorKey: `metrics.price.${currency}`,
        header: () => (
          <div className="th-content">
            Price
          </div>
        ),
        cell: info => formatPrice(info.getValue() ?? 0),
        enableSorting: true,
        enablePinning: false,
        sortUndefined: 0,
        sortingFn: (rowA, rowB, columnId) => {
          const a = rowA.getValue(columnId);
          const b = rowB.getValue(columnId);
          
          // Check if values are null, undefined, NaN, or 0
          const aIsEmpty = !a || isNaN(parseFloat(a)) || parseFloat(a) === 0;
          const bIsEmpty = !b || isNaN(parseFloat(b)) || parseFloat(b) === 0;
          
          // If both are empty, they're equal
          if (aIsEmpty && bIsEmpty) return 0;
          
          // For price column: empty values go first in ASC, last in DESC
          // We need to check the current sort direction
          const sortDirection = rowA.table?.getState().sorting?.find(s => s.id === columnId)?.desc;
          
          if (aIsEmpty) {
            return sortDirection ? 1 : -1; // If desc, go last (1), if asc, go first (-1)
          }
          if (bIsEmpty) {
            return sortDirection ? -1 : 1; // If desc, go first (-1), if asc, go last (1)
          }
          
          // Both have values, sort normally
          const numA = parseFloat(a);
          const numB = parseFloat(b);
          return numA - numB;
        },
        size: 150,
        className: "price-cell"
      },
      {
        accessorKey: `metrics.change.24h.${currency}`,
        header: () => (
          <div className="th-content">
            24h %
          </div>
        ),
        cell: info => {
          const val = info.getValue();
          return (
            <span className={val >= 0 ? 'percentage positive' : 'percentage negative'}>
              {val?.toFixed(2)}%
            </span>
          );
        },
        enableSorting: true,
        enablePinning: false,
        size: 80
      },
      {
        accessorKey: `metrics.change.7d.${currency}`,
        header: () => (
          <div className="th-content">
            7d %
          </div>
        ),
        cell: info => {
          const val = info.getValue();
          return (
            <span className={val >= 0 ? 'percentage positive' : 'percentage negative'}>
              {val?.toFixed(2)}%
            </span>
          );
        },
        enableSorting: true,
        enablePinning: false,
        size: 50
      },
      {
        accessorKey: `metrics.change.30d.${currency}`,
        header: () => (
          <div className="th-content">
            30d %
          </div>
        ),
        cell: info => {
          const val = info.getValue();
          return (
            <span className={val >= 0 ? 'percentage positive' : 'percentage negative'}>
              {val?.toFixed(2)}%
            </span>
          );
        },
        enableSorting: true,
        enablePinning: false,
        size: 50
      },
      {
        accessorKey: `metrics.volume.${currency}.24h`,
        header: '24h Volume',
        cell: info => {
          const value = info.getValue();
          return formatPrice(value ?? 0);
        },
        enableSorting: true,
        enablePinning: false,
      },
      {
        accessorKey: `metrics.volume.${currency}.7d`,
        header: '7d Volume',
        cell: info => {
          const value = info.getValue();
          return formatPrice(value ?? 0);
        },
        enableSorting: true,
        enablePinning: false,
      },
      {
        accessorKey: `metrics.fully_diluted_market_cap.${currency}`,
        header: 'Market Cap',
        cell: info => {
          const value = info.getValue();
          return formatPrice(value ?? 0);
        },
        enableSorting: true,
        enablePinning: false,
        sortUndefined: 0,
      },
      {
        id: 'sparkline',
        header: 'Last 7 Days',
        className: 'last7Days',
        cell: info => {
          const row = info.row.original;
          const priceData = row.metrics?.chartLast7Days?.[currency.toUpperCase()] || [];
          const lineColor = (row.metrics?.change?.['7d']?.[currency] || 0) >= 0 ? 'rgb(34 197 94)' : 'rgb(255 58 51)';
          
          // Transform array of numbers to array of objects with price and name
          const transformedPriceData = priceData.map((pricePoint, index) => ({ 
            price: Number(pricePoint.price || pricePoint), 
            name: index.toString() 
          }));
          
          return (
            <div className="sparkline-cell" style={{ height: '58px', width: '190px' }}>
              {transformedPriceData.length > 0 ? (
                <PriceTrendLineChart 
                  priceData={transformedPriceData} 
                  lineColor={lineColor}
                />
              ) : (
                <></>
              )}
            </div>
          );
        },
        enableSorting: false,
        enablePinning: false,
        size: 170
      },
    ],
    [currency, formatPrice, router]
  );

  // ------------------------
  // 2. State & Table Setup
  // ------------------------
  const [sorting, setSorting] = useState([]);
  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: false,
    initialState: {
        columnPinning: {
          left: ['favorites', 'rank', 'name'],
          right: [],
        },
      },
      columnResizeMode: 'onChange',
      defaultColumn: {
        minSize: 0,
        maxSize: 600,
      },
  });

  // Show loading state - only show skeleton if we're actually waiting for data or auth
  // Don't show loading during auth initialization unless we explicitly need favorites
  if (!propData && (!loaded || (loadingFavorites && isAuthReady)) && !error) {
    return <Skeleton variant="rounded" className="max-w-1500 mt-4" height={800} />;
  }

  // Show error state
  if (!propData && error) {
    return <Alert severity="error">{error}</Alert>;
  }

  // ------------------------
  // 3. Render
  // ------------------------
  return (
    <>
      {!showFavoritesOnly && (
        <FavoriteToggle value={showFavorites} setValue={setShowFavorites} />
      )}
      <div className="crypto-table-container mt-4">
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                // check meta.sticky to apply CSS
                const column = header.column
                const isSticky = header.column.columnDef.meta?.sticky === 'left';
                const extraClass = header.column.columnDef.className ?? '';
                const isSortable = header.column.getCanSort();
                const thClassName = [
                  isSticky ? 'th-sticky' : '',
                  extraClass,
                  isSortable ? 'sortable' : ''
                ].filter(Boolean).join(' ');
                
                return (
                  <th
                    key={header.id}
                    className={thClassName}
                    onClick={header.column.getToggleSortingHandler()}
                    style={getCommonPinningStyles(column)}
                  >
                    <div className="th-content">
                    {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      {{
                        asc: ' ↑',
                        desc: ' ↓',
                      }[header.column.getIsSorted()] ?? null}
                    </div>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr 
              key={row.id} 
              className="clickable-row"
              onClick={(e) => {
                // Only navigate if the click wasn't on an anchor tag or favorites icon
                if (e.target.tagName !== 'A' && 
                    !e.target.closest('a') && 
                    !e.target.closest('.favorite-icon') &&
                    !e.target.closest('.favorites-cell')) {
                  // Check for ctrl/cmd key for opening in new tab
                  if (e.ctrlKey || e.metaKey) {
                    window.open(`/token/${row.original.canister_id}`, '_blank');
                  } else {
                    router.push(`/token/${row.original.canister_id}`);
                  }
                }
              }}
              style={{ cursor: 'pointer' }}
            >
              {row.getVisibleCells().map(cell => {
                const isSticky = cell.column.columnDef.meta?.sticky === 'left';
                const column = cell.column
                const extraClass = cell.column.columnDef.className ?? '';
                const tdClassName = [
                  isSticky ? 'td-sticky' : '',
                  extraClass
                ].filter(Boolean).join(' ');
                
                return (
                  <td key={cell.id} className={tdClassName} style={getCommonPinningStyles(column)}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}
