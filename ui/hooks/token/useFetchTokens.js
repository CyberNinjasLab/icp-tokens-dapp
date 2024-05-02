// hooks/useFetchTokens.js
import { useState, useEffect } from 'react';

const useFetchTokens = (url) => {
  const [data, setData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const jsonData = await response.json();
        setData(jsonData);
        setLoaded(true);
      } catch (error) {
        setError('There was an error loading the data!');
      }
    };

    fetchData();
  }, [url]);

  return { data, loaded, error };
};

export default useFetchTokens;
