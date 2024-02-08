
import {Card, CardContent, CardMedia, Link, Typography } from '@mui/material';
import React from 'react';

const NewsCard = ({news}) => {
  return (
    <div>
      <Card sx={{
        maxWidth: 1000, display: 'grid', gridTemplateColumns: { md: '1fr 2fr' },
        gap: 2,
        margin: "0 auto",
        variant: 'outlined',
        // border: '1px solid #000',
        padding: "38px 8px",
        borderBottom: "1px dashed transperent",
      }}>
        <div className='rounded-lg'>
        <Link className="!no-underline" href={"https://google.com/"} target="_blank">
          <CardMedia
            sx={{ height: 200, borderRadius: "8px" }}
            image={`/tokens/${news.image}`}
            title={news.image}
          />
          </Link>
        </div>
        {/* overflow: "hidden", textOverflow:"ellipsis",whiteSpace: "nowrap" */}
        <div className="h-[200px] flex flex-col justify-between items-start m-auto">
          <CardContent sx={{ padding: 1, '&:last-child': { pb: 1 },}}>
            <Link className="!no-underline" href={"https://google.com/"} target="_blank">
              <Typography className="line-clamp-2" gutterBottom variant="h6" component="div">
                {news.title}
              </Typography>
            </Link>
            <Typography className="line-clamp-2" variant="subtitle1" color="text.secondary" sx={{ padding: 0,  }}>
              {news.description} 
            </Typography>
          </CardContent>
          <Typography variant="overline" display="block" gutterBottom sx={{fontSize:14, padding: 1 }}>
            {news.source}
          </Typography>
        </div>
      </Card>
    </div >
  );
};

export default NewsCard;
