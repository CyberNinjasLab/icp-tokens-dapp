
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import React from 'react';


// const darkTheme = createTheme({ palette: { mode: 'dark' } });
// const lightTheme = createTheme({ palette: { mode: 'light' } });

const NewsCard = () => {
  return (

    // <Grid container spacing={2}>
    <Card sx={{
      maxWidth:700, display: 'grid', gridTemplateColumns: { md: '1fr 2fr' },
      gap: 2,
      margin:"0 auto"
    }}>
     <div>
      <CardMedia
        sx={{ height: 140 }}
        image="/tokens/chat.png"
        title="green iguana"
      />
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>

     </div>

      <CardContent sx={{padding:"0px"}}>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{padding:0}}>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>

    </Card>

    // </Grid>

  );
};

export default NewsCard;
