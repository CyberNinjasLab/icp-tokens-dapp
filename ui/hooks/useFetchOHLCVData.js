import React, { useState, useEffect } from 'react';

const useFetchOHLCVData = (canisterId, interval, timeframe) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_WEB2_API_URL}/tokens/ohlcv/${canisterId}?interval=${interval}&timeframe=${timeframe}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok.');
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [canisterId, interval, timeframe]); // Refetch when any of these dependencies change

  return { data, loading, error };
};

export default useFetchOHLCVData;