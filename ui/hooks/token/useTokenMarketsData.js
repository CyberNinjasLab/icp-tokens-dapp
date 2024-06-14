import { useState, useEffect } from 'react';

const useTokenMarketsData = (tokenId) => {
  const [tokenMarketsData, setTokenMarketsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTokenMarketsData = async () => {
      if (!tokenId) return;
      setIsLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_WEB2_API_URL}/api/tokens/markets/${tokenId}`);
        if (!response.ok) throw new Error('Failed to fetch token markets data');
        const data = await response.json();
        setTokenMarketsData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTokenMarketsData();
  }, [tokenId]);

  return { tokenMarketsData, isLoading, error };
};

export default useTokenMarketsData;
