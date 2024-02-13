import React from 'react';
import { SocialIcon } from 'react-social-icons';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
// Import MUI icons
import PaperIcon from '@mui/icons-material/Article'; // Example icon for 'Whitepaper'
import AppIcon from '@mui/icons-material/Apps'; // Example icon for 'App'
import SiteIcon from '@mui/icons-material/Web'; // Example icon for 'Site'
import LinkIcon from '@mui/icons-material/Link'; // Example icon for 'Link'
// Import the SVG file as a React component
import DscvrIcon from '../../_base/icons/DscvrIcon';
import OpenChatIcon from '../../_base/icons/OpenChatIcon';
import { styled } from '@mui/material/styles';

export default function TokenLinks({ links }) {
  // Function to determine which icon to use
  const getIconComponent = (link) => {
    const type = link.link_type.type.toLowerCase();
    let iconComponent;
    switch (type) {
      case 'dscvr':
        iconComponent = <div className='w-[36px] h-[36px] flex justify-center items-center'><DscvrIcon className="w-[36px]" /></div>;
        break;
      case 'openchat':
        iconComponent = <OpenChatIcon className="w-[36px]" />;
        break;
      case 'whitepaper':
        iconComponent = <div className='w-[36px] h-[36px] bg-black text-white rounded-full flex justify-center items-center'><PaperIcon /></div>;
        break;
      case 'app':
        iconComponent = <div className='w-[36px] h-[36px] bg-primary text-white rounded-full flex justify-center items-center'><AppIcon /></div>;
        break;
      case 'site':
        iconComponent = <div className='w-[36px] h-[36px] bg-primary text-white rounded-full flex justify-center items-center'><SiteIcon /></div>;
        break;
      case 'link':
        iconComponent = <div className='w-[36px] h-[36px] bg-black text-white rounded-full flex justify-center items-center'><LinkIcon /></div>;
        break;
      default:
        // Use SocialIcon as the default without additional wrapping
        return <div><SocialIcon url={link.url} target="_blank" style={{ height: 36, width: 36 }} network={type} /></div>;
    }
    // Wrap non-SocialIcon components
    return (
      <>
        {iconComponent}
      </>
    );
  };

  const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} arrow placement="top" />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: 'dark-gray',
      color: 'white',
      boxShadow: theme.shadows[1],
      fontSize: 12,
      paddingTop: '6px',
      paddingBottom: '6px',
      paddingLeft: '12px',
      paddingRight: '12px',
    },
    [`& .${tooltipClasses.arrow}`]: {
      color: 'dark-gray', // Set the arrow color to match the tooltip background
    },
  }));

  const CustomIconButton = styled(IconButton)(({ theme }) => ({
    // Adjustments for hover state
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)', // Example: change the background color on hover
    },
    // Adjustments for focus state
    '&:focus': {
      // Similar adjustments as for ':hover' can be done for focus state
      border: 'none', // Example: removing border on focus
    },
    // Add other custom styles as needed
  }));  

  return (
    <div className="flex flex-wrap">
      {links.map((link) => (
        <CustomTooltip key={link.id} title={link.link_type.type || 'Visit'}>
          <CustomIconButton
            component="a"
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            color="default"
            size="small"
          >
            {getIconComponent(link)}
          </CustomIconButton>
        </CustomTooltip>
      ))}
    </div>
  );
}
