import { useState, useEffect } from 'react';
import { GraphQLClient } from 'graphql-request';

const endpoint = 'https://api.sonic.ooo/graphql';

const useSonicDexGraphQL = (query, variables) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const graphQLClient = new GraphQLClient(endpoint, {
        headers: {
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'en-GB,en;q=0.9,en-US;q=0.8,bg;q=0.7',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
          'Content-Type': 'application/json',
          'Origin': 'https://data.sonic.ooo',
          'Referer': 'https://data.sonic.ooo/',
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
        }
      });

      try {
        const result = await graphQLClient.request(query, variables);
        setData(result);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [query, variables]);

  return { data, loading, error };
};

export default useSonicDexGraphQL;
