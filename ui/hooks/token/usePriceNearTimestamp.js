function usePriceNearTimestamp() {
  async function fetchPricesNearTimestamps(requests) {
    try {
      const url = `${process.env.NEXT_PUBLIC_WEB2_API_URL}/api/tokens/price-near-timestamp`;

      // Convert BigInt values in requests to strings or numbers
      const sanitizedRequests = requests.map(request => ({
        ...request,
        timestamp: typeof request.timestamp === 'bigint' ? request.timestamp.toString() : request.timestamp,
        // Convert other BigInt fields if necessary
      }));

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requests: sanitizedRequests }), // Send the sanitized requests array as JSON payload
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (e) {
      console.error('Error fetching prices near timestamps:', e);
      return null;
    }
  }

  return { fetchPricesNearTimestamps };
}

export default usePriceNearTimestamp;
