import { useState, useEffect, useCallback } from 'react';

const useFetchTokens = (url) => {
  const [data, setData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  // Define the fetchData function using useCallback to ensure it doesn't change if the url doesn't
  const fetchData = useCallback(async () => {
    setLoaded(false); // Reset the loaded state on each fetch
    try {
      const response = await fetch(url);
      const jsonData = await response.json();
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
