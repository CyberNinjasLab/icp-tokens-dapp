import React, { useContext } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import LoginIcon from '@mui/icons-material/Login';
import Settings from '@mui/icons-material/Settings';
import { AuthContext } from '../../../../contexts/auth/Auth.Context'; // Adjust the import path as needed
import { useRouter } from 'next/router';

const AccountNav = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { isAuthenticated, openLoginModal, logout } = useContext(AuthContext); // Use the authentication context
  const router = useRouter();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMyAccount = () => {
    router.push('/account'); // Navigate to the /account page
    handleClose(); // Close the menu after navigation
  };
  
  // Handle login action
  const handleLogin = () => {
    openLoginModal();
  };

  // Handle logout action
  const handleLogout = () => {
    logout();
    handleClose();
  };

  return (
    <>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="large"
          sx={{ ml: 2, my: 0 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <AccountCircleIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {!isAuthenticated && (
          <MenuItem onClick={handleLogin} className='text-gray-700' fontSize="medium" style={{
            padding: '15px'
          }} >
            <ListItemIcon>
              <LoginIcon fontSize='medium' />
            </ListItemIcon>
            Login
          </MenuItem>
        )}
        {isAuthenticated && (
            <MenuItem onClick={handleMyAccount} style={{
              padding: '15px'
            }}>
              <div className='min-w-[36px]'>
                <Avatar style={{
                  width: 25,
                  height: 25,
                }} />
              </div>
               My account
            </MenuItem>
        )}
        {isAuthenticated && (
            <Divider style={{
              margin: '0'
            }} />
        )}
            {/* <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Settings fontSize="medium" />
              </ListItemIcon>
              Settings
            </MenuItem> */}
        {isAuthenticated && (
            <MenuItem onClick={handleLogout} style={{
              padding: '15px'
            }}>
              <ListItemIcon>
                <Logout fontSize="medium" />
              </ListItemIcon>
              Logout
            </MenuItem>
        )}
      </Menu>
    </>
  );
}

export default AccountNav;
