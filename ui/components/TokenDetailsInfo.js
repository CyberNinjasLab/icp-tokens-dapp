import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const style = {
  py: 0,
  width: '100%',
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'divider',
  backgroundColor: 'background.paper',
  maxWidth: '400px'
};

const questionMarkStyle = {
  fontSize: 'medium',
  ml: '3px',
  opacity: '0.3'
};

export default function TokenDetailsInfo({ data }) {
  return (
    <div style={{ maxWidth: style.maxWidth }}>
      <List sx={style}>
        <ListItem>
          <div className="flex justify-between items-center w-full">
            <span>
              Market Cap
              <HelpOutlineIcon sx={questionMarkStyle} />
            </span>
            <span>{data.price} ICP</span>
          </div>
        </ListItem>
        <Divider variant="middle" component="li" />
        <ListItem>
          <div className="flex justify-between items-center w-full">
            <span>
              Volume (24h)
              <HelpOutlineIcon sx={questionMarkStyle} />
            </span>
            <span>{data.volume} ICP</span>
          </div>
        </ListItem>
        <Divider variant="middle" component="li" />
        <ListItem>
          <div className="flex justify-between items-center w-full">
            <span>
              Circulating Supply
              <HelpOutlineIcon sx={questionMarkStyle} />
            </span>
            <span>No API Data</span>
          </div>
        </ListItem>
        <Divider variant="middle" component="li" />
        <ListItem>
          <div className="flex justify-between items-center w-full">
            <span>
              Max Supply
              <HelpOutlineIcon sx={questionMarkStyle} />
            </span>
            <span>{data.total_supply}</span>
          </div>
        </ListItem>
      </List>
      <div className="hidden md:block">
        <h2>Links</h2>

        <ul>
          {data.token_links.map(link => (
            <li key={link.id}>
              <a href={link.link} target="_blank" rel="noopener noreferrer">
                {link.mediaType}
              </a>
            </li>
          ))}
        </ul>

        <h2>Description</h2>
        <span>{data.introduction}</span>
      </div>
    </div>
  );
}
