import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#019A9AFF'
    }
  },
  typography: {
    body1: {color: 'black'},
    body2: {color: 'black'},
    caption: {color: 'black'},
    h1: {color: 'black'},
    h2: {color: 'black'},
    h3: {color: 'black'},
    h4: {color: 'black'},
    h5: {color: 'black'},
    h6: {color: 'black'},
    subtitle1: {color: 'black'},
    subtitle2: {color: 'black'},
    fontSize: '20px',
    fontFamily: 'inherit'
  },
  components: {
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: '5px',
              fontWeight: '400',
            },
          },
        },
        MuiList: {
          styleOverrides: {
            root: {
              padding: '0px',
              border: 'solid 1px #ddd',
              borderRadius: '5px',
            },
          },
        },
        MuiListItemButton: {
          styleOverrides: {
            root: ({ ownerState, theme }) => ({
              '&.Mui-selected': {
                '&:hover': {
                  backgroundColor: theme.palette.primary.main,
                },
                backgroundColor: theme.palette.primary.main,
                color: 'white',
                '.MuiListItemIcon-root': {
                  color: theme.palette.primary.main,
                },
              },
            }),
          },
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
              margin: '1rem 0px',
            },
          },
        },
        MuiGrid: {
          styleOverrides: {
            root: {
              '& [class*="MuiGuid-item"]': {
                padding: '5px',
              },
            },
          },
        },
        MuiTooltip: {
          styleOverrides: {
            root: ({ ownerState, theme }) => ({
              backgroundColor: 'white',
              boxShadow: theme.shadows[1],
              color: 'black'
            })
          }
        }
      }
});
