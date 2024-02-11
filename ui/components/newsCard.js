
import { Card, CardContent, CardMedia, Link, Typography } from '@mui/material';
import React from 'react';

const NewsCard = ({ news }) => {
  return (
    <div className="mx-auto">
      <Card className="!px-4 !py-14 !lg:py-18 lg:max-w-[1000px]" sx={{
        display: 'grid', gridTemplateColumns: {sm: '1fr 2fr' },
        gap: 2,
        margin: "0 auto",
        variant: 'outlined',
        // border: '1px solid #000',
        borderBottom: "1px dashed transperent",
      }}>
        <div className='rounded-lg'>
          <Link className="!no-underline" href={"https://google.com/"} target="_blank">
            <CardMedia
              component='img'
              sx={{borderRadius: "8px", display: 'flex', flex: "1 1 0%" }}
              image={`https://cryptocdn.fra1.cdn.digitaloceanspaces.com/sites/2/bitcoin-coin-with-etf-text-stone-background-concept-entering-digital-money-fund-etf-bitcoin-cryptocurrency-concept_Easy-Resize.com_.jpg`}
              title={news.image}
            />
          </Link>
        </div>
        {/* overflow: "hidden", textOverflow:"ellipsis",whiteSpace: "nowrap" */}
        <div className="h-[200px] flex flex-col justify-between items-start m-auto">
          <CardContent sx={{ padding: 0, '&:last-child': { pb: 1 }, }}>
            <Link className="!no-underline" href={"https://google.com/"} target="_blank">
              <Typography className="line-clamp-2" gutterBottom variant="h6" component="div">
                {news.title}
              </Typography>
            </Link>
            <Typography className="line-clamp-4 sm:line-clamp-2" variant="subtitle1" color="text.secondary" sx={{ padding: 0, }}>
              {news.description}
            </Typography>
          </CardContent>
          <Typography variant="overline" display="block" gutterBottom sx={{ fontSize: 14}}>
            {news.source}
          </Typography>
        </div>
      </Card>
    </div >
  );
};

export default NewsCard;
