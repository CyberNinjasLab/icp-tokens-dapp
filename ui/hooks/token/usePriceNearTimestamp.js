function usePriceNearTimestamp() {
  async function fetchPriceNearTimestamp(canisterId, timestamp, currency) {
    try {
      const url = new URL(`${process.env.NEXT_PUBLIC_WEB2_API_URL}/api/tokens/price-near-timestamp`);

      url.searchParams.append('canister_id', canisterId);
      url.searchParams.append('timestamp', timestamp);
      url.searchParams.append('currency', currency);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();

      return result;
    } catch (e) {
    } finally {
    }
  }

  return { fetchPriceNearTimestamp };
}

export default usePriceNearTimestamp;
