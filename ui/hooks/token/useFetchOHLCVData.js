import React, { useState, useEffect, useContext } from 'react';
import { GeneralContext } from '../../../contexts/general/General.Context';

const useFetchOHLCVData = (canisterId, interval, timeframe) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {currency} = useContext(GeneralContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_WEB2_API_URL}/api/tokens/ohlcv/${canisterId}/${currency}?interval=${interval}&timeframe=${timeframe}`;
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
  }, [canisterId, interval, timeframe, currency]); // Refetch when any of these dependencies change

  return { data, loading, error };
};

export default useFetchOHLCVData;