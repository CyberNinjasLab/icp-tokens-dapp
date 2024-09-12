import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import BarChartIcon from '@mui/icons-material/BarChart';

const TokenMainNav = ({ onTabChange }) => {
  const router = useRouter();
  const { query } = router;

  // Initialize with undefined to avoid setting the wrong value before query is ready
  const [value, setValue] = React.useState(undefined);

  // Effect to set the initial tab based on query param
  useEffect(() => {
    if (value === undefined) {
      // Only set the state the first time to avoid flickering
      if (query.tab === 'info') {
        setValue(1);
        if (onTabChange) onTabChange('info');
      } else {
        setValue(0);
        if (onTabChange) onTabChange('chart');
      }
    }
  }, [query.tab, value, onTabChange]);

  const handleChange = (event, newValue) => {
    const newTab = newValue === 1 ? 'info' : 'chart';
    setValue(newValue);

    // Trigger the parent callback on change
    if (onTabChange) onTabChange(newTab);

    // Set query parameter when the value changes
    router.push({
      pathname: router.pathname,
      query: { ...router.query, tab: newTab }, // Add or update the tab parameter in the URL
    }, undefined, { shallow: true });
  };

  // If value is undefined (waiting for the query to initialize), return null
  if (value === undefined) return null;

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <div className="border-t border-solid dark:border-gray-600">
        <BottomNavigation value={value} showLabels={true} onChange={handleChange}>
          {/* Chart Button */}
          <BottomNavigationAction label="Chart" icon={<BarChartIcon />} />
          {/* Info Button */}
          <BottomNavigationAction label="Info" icon={<InfoIcon />} />
        </BottomNavigation>
      </div>
    </Paper>
  );
};

export default TokenMainNav;
