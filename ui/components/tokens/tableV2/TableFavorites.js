import React, { useContext } from 'react';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { Tooltip } from '@mui/material';
import { AuthContext } from '../../../../contexts/auth/Auth.Context';
import { useFavoriteTokens } from '../../../../contexts/general/FavoriteTokensProvider';

const TableFavorites = ({ data, size = "small" }) => {
  const { favoriteTokenIds, addTokenToFavorites, removeTokenFromFavorites } = useFavoriteTokens();
  const { isAuthenticated, openLoginModal } = useContext(AuthContext);
  
  // Use canister_id from real API data structure
  const id = data.canister_id;
  const isFavorite = (favoriteTokenIds ?? []).includes(id);
  
  const onClick = (e) => {
    e.stopPropagation(); // Prevent row click navigation
    
    if (isAuthenticated) {
      const index = favoriteTokenIds.indexOf(id);
      if (index !== -1) {
        // ID is already in the array, remove it
        removeTokenFromFavorites(id);
      } else {
        // ID is not in the array, add it
        addTokenToFavorites(id);
      }
    } else {
      openLoginModal();
    }
  };

  return (
    <div
      onClick={onClick}
      style={{ cursor: 'pointer' }}
      className="favorite-icon inline-flex justify-center h-[40px] items-center w-[20px]"
    >
      {isFavorite ? (
        <Tooltip title="Remove from Watchlist">
          <StarIcon 
            color="secondary" 
            className="favorite-icon dark:text-yellow-500" 
            style={{ fontSize: `${size === 'small' ? '16px' : '18px'}` }} 
          />
        </Tooltip>
      ) : (
        <Tooltip title="Add to Watchlist">
          <StarBorderIcon 
            color="lightGray" 
            className="favorite-icon" 
            style={{ fontSize: `${size === 'small' ? '16px' : '18px'}` }} 
          />
        </Tooltip>
      )}
    </div>
  );
};

export default TableFavorites; 