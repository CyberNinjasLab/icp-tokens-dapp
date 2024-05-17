import { useState, useEffect } from 'react';

const useTokenData = (tokenId) => {
  const [tokenData, setTokenData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTokenData = async () => {
      if (!tokenId) return;
      setIsLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_WEB2_API_URL}/api/tokens/${tokenId}`);
        if (!response.ok) throw new Error('Failed to fetch token data');
        const data = await response.json();
        setTokenData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTokenData();
  }, [tokenId]);

  return { tokenData, isLoading, error };
};

export default useTokenData;
