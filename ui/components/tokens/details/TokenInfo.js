import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Typography } from '@mui/material';

const style = {
  py: 1,
  px: 1,
  width: '100%',
  border: 'none',
};

const iconsMapping = {
  Instagram: (
    <img
      src="/icons/instagram.svg"
      className="opacity-50 w-7"
      color="primary"
      alt="instagram-img"
    ></img>
  ),
  Twitter: (
    <img
      src="/icons/twitter.svg"
      className="opacity-50 w-7"
      color="primary"
      alt="instagram-img"
    ></img>
  ),
  Discord: (
    <img
      src="/icons/discord.svg"
      className="opacity-50 w-7"
      color="primary"
      alt="instagram-img"
    ></img>
  ),
  Default: (
    <img
      src="/icons/instagram.svg"
      className="opacity-50 w-7"
      color="primary"
      alt="instagram-img"
    ></img>
  )
};

const questionMarkStyle = {
  ml: '3px',
  opacity: '0.3',
};

export default function TokenDetailsInfo({ data }) {
  return (
    <div className="w-full xl:max-w-sm">
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
              <Typography>{data.volume_24h.toLocaleString()} ICP</Typography>
            </div>
          </ListItem>
          <ListItem>
            <div className="flex justify-between items-center w-full">
              <Typography variant="textSemiBold">
                Volume (7d)
                {/* <HelpOutlineIcon sx={questionMarkStyle} fontSize="small" />{' '} */}
              </Typography>
              <Typography>{data.volume_7d.toLocaleString()} ICP</Typography>
            </div>
          </ListItem>
          <ListItem>
            <div className="flex justify-between items-center w-full">
              <Typography variant="textSemiBold">
                Circulating Supply
                {/* <HelpOutlineIcon sx={questionMarkStyle} fontSize="small" />{' '} */}
              </Typography>
              <Typography>No API Data</Typography>
            </div>
          </ListItem>
          <ListItem>
            <div className="flex justify-between items-center w-full">
              <Typography variant="textSemiBold">
                Max Supply
                {/* <HelpOutlineIcon sx={questionMarkStyle} fontSize="small" />{' '} */}
              </Typography>
              <Typography>{Math.round(data.total_supply).toLocaleString()} {data.symbol}</Typography>
            </div>
          </ListItem>
          {data.details && (
            <>
              <Divider variant="middle" component="li" className="hidden md:block pt-4" />
              <ListItem>
                <div className="hidden md:block">
                  <Typography variant="subtitle1">Short Description</Typography>
                  <Typography>{data.details?.long_description}</Typography>
                </div>
              </ListItem>
            </>
          )}
          {data.links && data.links.length > 0 && (
          <>
            <Divider variant="middle" component="li" className="hidden md:block pt-4" />
            <ListItem>
              <div className="hidden md:block">
                <Typography variant="subtitle1" className="mb-4">
                  Links
                </Typography>
                <div className="flex flex-wrap gap-3">
                  {data.links.map(link => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col justify-center items-center gap-1"
                    >
                      {iconsMapping[link.link_type.type]
                        ? iconsMapping[link.link_type.type]
                        : iconsMapping['Default']}
                      {link.mediaType}
                    </a>
                  ))}
                </div>
              </div>
            </ListItem>
          </>
        )}

        </List>
      </div>
    </div>
  );
}
