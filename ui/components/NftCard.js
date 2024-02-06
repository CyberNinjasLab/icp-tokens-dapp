import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Chip } from '@mui/material';

const NftCard = () => {
  return (
      <Card className="flex flex-col justify-start" sx={{ maxWidth: 280,
      boxShadow: "rgba(88, 102, 126, 0.12) 0px 1px 2px 0px, rgba(88, 102, 126, 0.08) 0px 4px 24px 0px",
      transition: "transform 0.5s ease 1s",
      borderRadius: 4,
      marginTop: 8,
      position:'relative',
      ':hover': {
        bottom:8,
      boxShadow: 20,
    }, }}>
        <CardMedia
          sx={{ height: 200 }}
          image="/tokens/sonic.png"
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
  );
};

export default NftCard;