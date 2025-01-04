import { useState, useEffect, useCallback } from 'react';

const useFetchTokens = (url) => {
  const [data, setData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  // Function to check if the cached data is still valid
  const isCacheValid = (timestamp) => {
    const now = new Date().getTime();
    return now - timestamp < 60000; // 60000 milliseconds = 1 minute
  };

  // Fetch data from local storage or API
  const fetchData = useCallback(async () => {
    setLoaded(false); // Reset the loaded state on each fetch

    try {
      const cacheKey = `cache_${url}`;
      const cachedData = localStorage.getItem(cacheKey);

      if (cachedData) {
        const { data: cachedDataValue, timestamp } = JSON.parse(cachedData);
        if (isCacheValid(timestamp)) {
          setData(cachedDataValue);
          setLoaded(true);
          return; // Return if we use cached data
        }
      }

      // If there's no valid cache, fetch new data
      const response = await fetch(url);
      const jsonData = await response.json();

      // Save to local storage
      localStorage.setItem(cacheKey, JSON.stringify({
        data: jsonData,
        timestamp: new Date().getTime()
      }));

      setData(jsonData);
      setLoaded(true);
      setError(null); // Clear any previous errors on successful fetch
    } catch (error) {
      setError('There was an error loading the data!');
      setLoaded(true); // Ensure loaded is set even on error to avoid perpetual loading state
    }
  }, [url]);

  // Use useEffect to trigger fetchData on initial mount and url change
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Return both the state and the refetch function
  return { data, loaded, error, refetch: fetchData };
};

export default useFetchTokens;