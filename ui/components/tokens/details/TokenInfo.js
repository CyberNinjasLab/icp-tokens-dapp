import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Typography } from '@mui/material';
import TokenLinks from './TokenLinks';

const style = {
  py: 1,
  px: { xs: 0, md: 1 },
  width: '100%',
  border: 'none',
};

const questionMarkStyle = {
  ml: '3px',
  opacity: '0.3',
};

export default function TokenInfo({ data }) {
  return (
    <div className='bg-gray-50/90 rounded-md'>
      <List sx={style}>
        <ListItem>
          <div className="flex justify-between items-center w-full">
            <Typography variant="textSemiBold">
              Fully Diluted M Cap
              {/* <HelpOutlineIcon sx={questionMarkStyle} fontSize="small" /> */}
            </Typography>
            <Typography>{data.fully_diluted_market_cap.toLocaleString()} ICP</Typography>
          </div>
        </ListItem>
        <ListItem>
          <div className="flex justify-between items-center w-full">
            <Typography variant="textSemiBold">
              Volume (24h)
              {/* <HelpOutlineIcon sx={questionMarkStyle} fontSize="small" />{' '} */}
            </Typography>
            <Typography>{data.metrics.volume_24h.toLocaleString()} ICP</Typography>
          </div>
        </ListItem>
        <ListItem>
          <div className="flex justify-between items-center w-full">
            <Typography variant="textSemiBold">
              Volume (7d)
              {/* <HelpOutlineIcon sx={questionMarkStyle} fontSize="small" />{' '} */}
            </Typography>
            <Typography>{data.metrics.volume_7d.toLocaleString()} ICP</Typography>
          </div>
        </ListItem>
        <ListItem>
          <div className="flex justify-between items-center w-full">
            <Typography variant="textSemiBold">
              Circulating Supply
              {/* <HelpOutlineIcon sx={questionMarkStyle} fontSize="small" />{' '} */}
            </Typography>
            <Typography><i>No API Data</i></Typography>
          </div>
        </ListItem>
        <ListItem>
          <div className="flex justify-between items-center w-full">
            <Typography variant="textSemiBold">
              Total Supply
              {/* <HelpOutlineIcon sx={questionMarkStyle} fontSize="small" />{' '} */}
            </Typography>
            <Typography>{Math.round(data.total_supply).toLocaleString()} {data.symbol}</Typography>
          </div>
        </ListItem>
        {data.details?.short_description && (
          <>
            <Divider variant="middle" component="li" className="pt-4" />
            <ListItem>
              <div className="mt-2">
                <Typography>{data.details?.short_description}</Typography>
              </div>
            </ListItem>
          </>
        )}
        {data.links && data.links.length > 0 && (
          <>
            <Divider variant="middle" component="li" className="pt-2" />
            <ListItem>
              <div>
                <TokenLinks links={data.links} />
              </div>
            </ListItem>
          </>
        )}

      </List>
    </div>
  );
}
