import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#28abe5',
    },
    secondary: {
      main: '#ffa93d'
    },
    black: {
      main: "#000"
    },
    gray: {
      main: '#616e85'
    },
    lightGray: {
      main: 'rgba(24, 29, 31, 0.4)'
    },
    error: {
      main: '#FF3A33',
      contrastText: '#fff'
    },
  },
  typography: {
    body1: { color: 'black' },
    body2: { color: 'black' },
    caption: { color: 'black' },
    h1: { color: 'black', fontSize: '4rem' },
    h2: { color: 'black', fontSize: '3.5rem' },
    h3: { color: 'black', fontSize: '3rem' },
    h4: { color: 'black', fontSize: '2.5rem' },
    h5: { color: 'black', fontSize: '2rem' },
    h6: { color: 'black', fontSize: '1.5rem' },
    h7: { color: 'black', fontSize: '1.2rem', fontWeight: 600 },
    h8: { color: 'black', fontSize: '1rem', fontWeight: 600 },
    subtitle1: {
      color: 'black',
      fontSize: '1rem',
      fontWeight: 600,
      marginBottom: '6px'
    },
    subtitle2: { color: 'black', fontSize: '0.5rem' },
    textSemiBold: { fontWeight: 600 },
    textBold: { fontWeight: 800 },
    fontFamily: 'inherit',
    fontSize: 12
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          // Default styles here
        },
        contained: {
          color: '#fff'
        },
        containedGray: {
          // Active button styles
          backgroundColor: '#fff', // Dark gray for active buttons
          color: '#000', // White text for contrast
          boxShadow: 'none',
          border: '1px solid #D3D3D3',
          '&:hover': {
            backgroundColor: '#fff', // Even darker for hover state
            boxShadow: 'none',
          },
        },
        outlinedGray: {
          padding: '0px',
          // Inactive button styles
          borderColor: '#D3D3D3', // Light gray border for inactive buttons
          color: '#616e85', // Light gray text for inactive buttons
          backgroundColor: '#e0e4e8',
          '&:hover': {
            borderColor: '#D3D3D3', // Slightly darker border on hover
            color: '#616e85', // Slightly darker text on hover
            backgroundColor: '#e0e4e8',
          },
        },
        // ... any other styles you want to override
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          padding: '0px',
          border: 'solid 1px #ddd',
          borderRadius: '5px'
        }
      }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          '&.Mui-selected': {
            '&:hover': {
              backgroundColor: theme.palette.primary.main
            },
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            '.MuiListItemIcon-root': {
              color: theme.palette.primary.main
            }
          }
        })
      }
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          '&.MuiSvgIcon-fontSizeLarge': {
            fontSize: '30px'
          },
          '&.MuiSvgIcon-fontSizeMedium': {
            fontSize: '20px'
          },
          '&.MuiSvgIcon-fontSizeSmall': {
            fontSize: '15px'
          }
        })
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          padding: '0px',
        }
      }
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          '& [class*="MuiGuid-item"]': {
            padding: '5px'
          }
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          backgroundColor: 'white',
          boxShadow: theme.shadows[1],
          color: 'black'
        })
      }
    },
    MuiAutocomplete: {
      styleOverrides: {
          popper: {
              borderWidth: 1,
              borderStyle: 'solid',
              borderRadius: 4,
          },
      },
  },
  }
});
