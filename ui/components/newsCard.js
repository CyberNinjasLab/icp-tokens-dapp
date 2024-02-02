
import {Card, CardContent, CardMedia, Link, Typography } from '@mui/material';
import React from 'react';

const NewsCard = () => {
  return (
    <div>
      <Card sx={{
        maxWidth: 800, display: 'grid', gridTemplateColumns: { md: '1fr 2fr' },
        gap: 2,
        margin: "0 auto",
        variant: 'outlined',
        // border: '1px solid #000',
        padding: "64px 8px"
      }}>
        <div className='rounded-lg'>
        <Link className="!no-underline" href={"https://google.com/"} target="_blank">
          <CardMedia
            sx={{ height: 200, borderRadius: "8px" }}
            image="/tokens/chat.png"
            title="green iguana"
          />
          </Link>
        </div>
        <div className='max-h-[200px] m-auto'>
          <CardContent sx={{ padding: 1, '&:last-child': { pb: 1 } }}>
            <Link className="!no-underline" href={"https://google.com/"} target="_blank">
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
            </Link>
            <Typography variant="subtitle1" color="text.secondary" sx={{ padding: 0 }}>
              Lizards are a widespread group of squamate reptiles, with over 6,000
              species, ranging across all continents except Antarctica 
            </Typography>
          </CardContent>
          <Typography variant="overline" display="block" gutterBottom sx={{fontSize:14, padding: 1 }}>
            Bg-mama
          </Typography>
        </div>
      </Card>

      <Card sx={{
        maxWidth: 800, display: 'grid', gridTemplateColumns: { md: '1fr 2fr' },
        gap: 2,
        margin: "0 auto",
        variant: 'outlined',
        // border: '1px solid #000',
        padding: "64px 8px"
      }}>
        <div className='rounded-lg'>
        <Link className="!no-underline" href={"https://gong.bg/"} target="_blank">
          <CardMedia
            sx={{ height: 200, borderRadius: "8px" }}
            image="/tokens/mod.png"
            title="green iguana"
          />
          </Link>
        </div>
        <div className='max-h-[200px] m-auto'>
          <CardContent sx={{ padding: 1, '&:last-child': { pb: 1 } }}>
            <Link className="!no-underline" href={"https://gong.bg/"} target="_blank">
              <Typography gutterBottom variant="h5" component="div">
                Chicken
              </Typography>
            </Link>
            <Typography variant="body1" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000
              species, ranging across all continents except Antarctica Lizards are a widespread group of squamate reptiles, with over 6,000
              species
            </Typography>
          </CardContent>
          <Typography variant="overline" display="block" gutterBottom sx={{ fontSize:14 ,padding: 1 }}>
            Bg-mama
          </Typography>
        </div>
      </Card >
    </div >
  );
};

export default NewsCard;
