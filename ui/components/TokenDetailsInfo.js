import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LanguageIcon from '@mui/icons-material/Language';
import { Typography } from '@mui/material';

const style = {
  py: 0,
  width: '100%',
  border: 'none'
  // borderRadius: 2,
  // border: '1px solid',
  // borderColor: 'divider'
};

const questionMarkStyle = {
  ml: '3px',
  opacity: '0.3'
};

export default function TokenDetailsInfo({ data }) {
  return (
    <div className="w-full max-w-sm m-auto">
      <List sx={style}>
        <ListItem>
          <div className="flex justify-between items-center w-full">
            <Typography variant="textSemiBold">
              Market Cap
              <HelpOutlineIcon sx={questionMarkStyle} fontSize="small" />
            </Typography>
            <Typography>{data.price} ICP</Typography>
          </div>
        </ListItem>
        <ListItem>
          <div className="flex justify-between items-center w-full">
            <Typography variant="textSemiBold">
              Volume (24h)
              <HelpOutlineIcon sx={questionMarkStyle} fontSize="small" />{' '}
            </Typography>
            <Typography>{data.volume} ICP</Typography>
          </div>
        </ListItem>
        {/*<Divider variant="middle" component="li" />*/}
        <ListItem>
          <div className="flex justify-between items-center w-full">
            <Typography variant="textSemiBold">
              Circulating Supply
              <HelpOutlineIcon sx={questionMarkStyle} fontSize="small" />{' '}
            </Typography>
            <Typography>No API Data</Typography>
          </div>
        </ListItem>
        {/*<Divider variant="middle" component="li" />*/}
        <ListItem>
          <div className="flex justify-between items-center w-full">
            <Typography variant="textSemiBold">
              Max Supply
              <HelpOutlineIcon sx={questionMarkStyle} fontSize="small" />{' '}
            </Typography>
            <Typography>{data.total_supply}</Typography>
          </div>
        </ListItem>
        <Divider variant="middle" component="li" className="hidden md:block" />
        <Divider variant="middle" component="li" className="hidden md:block" />
        <ListItem>
          <div className="hidden md:block">
            <Typography variant="subtitle1">Description</Typography>
            <Typography>{data.introduction}</Typography>
          </div>
        </ListItem>
        <ListItem>
          <div className="hidden md:block">
            <Typography variant="subtitle1" className="mb-4">
              Links
            </Typography>
            <div className="flex flex-wrap gap-2">
              {data.token_links.map(link => (
                <a
                  key={link.id}
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col justify-center items-center"
                >
                  <LanguageIcon
                    fontSize="large"
                    className="opacity-50"
                  ></LanguageIcon>
                  {link.mediaType}
                </a>
              ))}
            </div>
          </div>
        </ListItem>
      </List>
    </div>
  );
}
