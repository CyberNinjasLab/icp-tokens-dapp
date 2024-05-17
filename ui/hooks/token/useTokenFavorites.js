import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../contexts/auth/Auth.Context';
import { useLoading } from '../../../contexts/general/Loading.Provider';

const useTokenFavorites = () => {
  const { backendCoreActor, isAuthenticated } = useContext(AuthContext);
  const [favoriteTokenIds, setFavoriteTokenIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setLoadingState } = useLoading();

  async function fetchTokenFavorites() {
    if (!backendCoreActor) return;
    setLoading(true);
    try {
      const response = await backendCoreActor.getWatchlist();
      const tokenIds = response && Array.isArray(response[0]) ? response[0].map(String) : [];
      setFavoriteTokenIds(tokenIds);
    } catch (error) {
      console.error('Fetch failed:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchTokenFavorites();
    } else {
      // Set favoriteTokenIds to an empty array if isAuthenticated is false
      setFavoriteTokenIds([]);
    }
  }, [backendCoreActor, isAuthenticated]);

  const ensureValidIds = (tokenIds) => tokenIds.map(id => {
    if (typeof id !== 'string' || id.trim() === '') {
      throw new Error(`Invalid ID: ${id}. Must be a non-empty string.`);
    }
    return id.trim();  // Ensuring no leading/trailing whitespace
  });  

  const updateTokenFavorites = async (newTokenIds) => {
    if (!backendCoreActor) return;
    const uniqueTokenIds = [...new Set(newTokenIds.map(String))];  // Ensure all IDs are strings
    const validTokenIds = ensureValidIds(uniqueTokenIds);  // Validate as strings
  
    setLoadingState(true);
  
    try {
      await backendCoreActor.updateWatchlist(validTokenIds);  // Send as validated string IDs
      setFavoriteTokenIds(validTokenIds);
    } catch (error) {
      console.error('Update failed:', error);
    } finally {
      setLoadingState(false);
    }
  };

  const addTokenToFavorites = async tokenId => {
    const tokenString = String(tokenId);  // Convert to string
    await updateTokenFavorites([...favoriteTokenIds, tokenString]);
  };
  
  const removeTokenFromFavorites = async tokenId => {
    const tokenString = String(tokenId);
    await updateTokenFavorites(favoriteTokenIds.filter(id => id !== tokenString));
  };

  return { favoriteTokenIds, loading, addTokenToFavorites, removeTokenFromFavorites, fetchTokenFavorites };
};

export default useTokenFavorites;
