import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Chip } from '@mui/material';

const NftCard = () => {
  return (
    <div className=''>
      <Card className="flex flex-col justify-start shadow-md" sx={{ maxWidth: 280,border:"1px solid black" }}>
        <CardMedia
          sx={{ height: 200 }}
          image="/tokens/mod.png"
          title="green iguana"
          
        />
        <CardContent  sx={{ height: 150 }}>
          <Typography gutterBottom variant="h6" sx={{ fontSize:16 }} component="div">
            Nft Name
          </Typography>
          <Chip label="ICP" />
          <div className="flex justify-between">
            <div>
              <Typography variant="overline" display="block" gutterBottom>
                Starts
              </Typography>
              <Typography gutterBottom variant="h6" sx={{ fontSize:16 }} component="div">
                March 08
              </Typography>
            </div>
            <div>
              <Typography variant="overline" display="block" gutterBottom>
                Mint Price
              </Typography>
              <Typography gutterBottom variant="h6" sx={{ fontSize:16 }} component="div">
                0.01 ICP
              </Typography>
            </div>
          </div>
        </CardContent>
        {/* <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions> */}
      </Card>
    </div >
  );
};

export default NftCard;