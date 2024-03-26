import React, { useContext } from 'react';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { TokensTableContext } from '../../../contexts/tokensTable/TokensTableContext';
import { Tooltip } from '@mui/material';

const Favorites = props => {
  const { favorites, setFavorites } = useContext(TokensTableContext);
  const id = props.data.id;
  const isFavorite = (favorites ?? []).includes(id);
  const onClick = () => {
    const index = favorites.indexOf(id);
    if (index !== -1) {
      // ID is already in the array, remove it
      setFavorites([
        ...favorites.slice(0, index),
        ...favorites.slice(index + 1)
      ]);
    } else {
      // ID is not in the array, add it
      setFavorites([...favorites, id]);
    }
  };
  return (
    <div
      onClick={() => onClick()}
      style={{ cursor: 'pointer' }}
      className="favorite-icon inline-flex justify-center h-[60px] items-center w-[10px]"
    >
      {isFavorite ? (
        <Tooltip title="Remove from Watchlist">
          <StarIcon color="primary" className="favorite-icon" style={{ fontSize: '16px' }} />
        </Tooltip>
      ) : (
        <Tooltip title="Add to Watchlist">
          <StarBorderIcon color="primary" className="favorite-icon" style={{ fontSize: '16px' }} />
        </Tooltip>
      )}
    </div>
  );
};
export default Favorites;
