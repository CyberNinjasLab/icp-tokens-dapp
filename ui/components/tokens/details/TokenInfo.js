import React, { useContext } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Typography } from '@mui/material';
import TokenLinks from './TokenLinks';
import { GeneralContext } from '../../../../contexts/general/General.Context';
import ICHouseLink from '../ICHouseLink';
import ContractButton from '../ContractButton';
import StandardLink from '../StandardLink';

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
  const { formatTotalSupply, currency, showPriceCurrency } = useContext(GeneralContext)

  return (
    <div className='bg-[#28abe508] border border-[#D3D3D3] dark:border-[#555] rounded-md max-w-[400px] mx-auto'>
      <List sx={style}>
        <ListItem>
          <div className="flex justify-between items-center w-full">
            <Typography variant="textSemiBold">
              Fully Diluted M Cap
              {/* <HelpOutlineIcon sx={questionMarkStyle} fontSize="small" /> */}
            </Typography>
            <Typography>{showPriceCurrency(parseFloat(data.metrics.fully_diluted_market_cap[currency])?.toLocaleString())}</Typography>
          </div>
        </ListItem>
        {data.metrics.volume && data.metrics.volume[currency] && (
          <>
            {data.metrics.volume[currency]['24h'] != null ? (
              <ListItem>
                <div className="flex justify-between items-center w-full">
                  <Typography variant="textSemiBold">
                    Volume (24h)
                    {/* <HelpOutlineIcon sx={questionMarkStyle} fontSize="small" />{' '} */}
                  </Typography>
                  <Typography>{showPriceCurrency(data.metrics.volume[currency]['24h'].toLocaleString())}</Typography>
                </div>
              </ListItem>
            ) : null}

            {data.metrics.volume[currency]['7d'] != null ? (
              <ListItem>
                <div className="flex justify-between items-center w-full">
                  <Typography variant="textSemiBold">
                    Volume (7d)
                    {/* <HelpOutlineIcon sx={questionMarkStyle} fontSize="small" />{' '} */}
                  </Typography>
                  <Typography>{showPriceCurrency(data.metrics.volume[currency]['7d'].toLocaleString())}</Typography>
                </div>
              </ListItem>
            ) : null}
          </>
        )}
        <ListItem style={{display: 'none'}}>
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
            <Typography>{formatTotalSupply(data)} {data.symbol}</Typography>
          </div>
        </ListItem>
        <ListItem>
          <div className="flex justify-between items-center w-full">
            <Typography variant="textSemiBold">
              Contract
              {/* <HelpOutlineIcon sx={questionMarkStyle} fontSize="small" />{' '} */}
            </Typography>
            <Typography>
              <ContractButton canisterId={data.canister_id} />
            </Typography>
          </div>
        </ListItem>
        <ListItem>
          <div className="flex justify-between items-center w-full">
            <Typography variant="textSemiBold">
              Explorer
              {/* <HelpOutlineIcon sx={questionMarkStyle} fontSize="small" />{' '} */}
            </Typography>
            <Typography>
              <ICHouseLink canisterId={data.canister_id} />
            </Typography>
          </div>
        </ListItem>
        {/* <ListItem>
          <div className="flex justify-between items-center w-full">
            <Typography variant="textSemiBold">
              Standard
              <HelpOutlineIcon sx={questionMarkStyle} fontSize="small" />{' '}
            </Typography>
            <Typography>
              <StandardLink standard={data.token_standard} />
            </Typography>
          </div>
        </ListItem> */}
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
