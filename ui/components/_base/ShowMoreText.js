import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';

const ShowMoreText = ({ text, limit = 185 }) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div>
      <Typography variant="body1">
        {showMore ? text : `${text.slice(0, limit)}${text.length > limit ? '... ' : ''}`}
        {text.length > limit && (
          <p onClick={toggleShowMore} className='inline-block font-semibold cursor-pointer'>
            {showMore ? 'Show Less' : 'Read More'}
          </p>
        )}
      </Typography>
    </div>
  );
};

export default ShowMoreText