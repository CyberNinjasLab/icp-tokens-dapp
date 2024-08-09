import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    type: 'light',
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
    green: {
      color: 'rgb(34 197 94)'
    },
    error: {
      color: 'rgb(255 58 51)'
    },
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
    MuiInputBase: {
      styleOverrides: {
        input: {
          fontSize: '16px',  // Set the base font size to prevent zooming on iOS
          height: '20px',
          lineHeight: 'normal',
        }
      }
    },
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

export const darkTheme = createTheme({
  palette: {
    type: 'dark',
    background: {
      default: "#0f0f26"
    },
    primary: {
      main: '#28abe596',
    },
    secondary: {
      main: '#ffa93d'
    },
    black: {
      main: "#fff",
    },
    gray: {
      main: '#818aa3'
    },
    lightGray: {
      main: 'rgba(255, 255, 255, 0.1)'
    },
    error: {
      main: '#FF3A33',
      contrastText: '#fff'
    },
  },
  typography: {
    green: {
      color: 'rgb(34 197 94)'
    },
    error: {
      color: 'rgb(255 58 51)'
    },
    body1: { color: 'white' },
    body2: { color: 'white' },
    caption: { color: 'white' },
    h1: { color: 'white', fontSize: '4rem' },
    h2: { color: 'white', fontSize: '3.5rem' },
    h3: { color: 'white', fontSize: '3rem' },
    h4: { color: 'white', fontSize: '2.5rem' },
    h5: { color: 'white', fontSize: '2rem' },
    h6: { color: 'white', fontSize: '1.5rem' },
    h7: { color: 'white', fontSize: '1.2rem', fontWeight: 600 },
    h8: { color: 'white', fontSize: '1rem', fontWeight: 600 },
    subtitle1: {
      color: 'white',
      fontSize: '1rem',
      fontWeight: 600,
      marginBottom: '6px'
    },
    subtitle2: { color: 'white', fontSize: '0.5rem' },
    textSemiBold: { fontWeight: 600 },
    textBold: { fontWeight: 800 },
    fontFamily: 'inherit',
    fontSize: 12
  },
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: 'rgba(255, 255, 255, 0.7)', // Default unchecked color
          '&.Mui-checked': {
            color: '#ffffff', // Checked color
          },
          '& .MuiSvgIcon-root': {
            fill: 'white', // Ensures the icon itself is white
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          '& .MuiSwitch-switchBase': {
            color: 'rgba(255, 255, 255, 0.7)', // Default unchecked color
            '&.Mui-checked': {
              color: '#ffffff', // Checked color
              '& .MuiSwitch-thumb': {
                backgroundColor: '#ffffff', // Color of the thumb when checked
              },
              '& + .MuiSwitch-track': {
                backgroundColor: '#ffffff', // Color of the track when checked
              },
            },
            '& .MuiSwitch-thumb': {
              backgroundColor: 'rgba(255, 255, 255, 0.7)', // Thumb color for unchecked state
            },
          },
          '& .MuiSwitch-track': {
            backgroundColor: 'rgba(255, 255, 255, 0.3)', // Track color for unchecked state
          },
        },
      },
    },
    MuiPickersPopper: {
      styleOverrides: {
        paper: {
          color: '#fff',
        }
      }
    },
    MuiPickersToolbarText: {
      styleOverrides: {
        paper: {
          color: '#fff',
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: ({ ownerState, theme }) => ({ // The paper key targets the Dialog's internal Paper component
          backgroundColor: theme.palette.background.default, // Dialog background color
          color: '#fff',
          border: '1px solid rgb(75 85 99)'
        })
      }
    },
    MuiDialogContentText: {
      styleOverrides: {
        root: {
          color: '#fff', // Text color inside the dialog content
        }
      }
    },
    MuiPickersDay: { // Theming the day elements inside the calendar
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          color: '#fff !important',
          '&.Mui-selected': {
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            '&:hover': {
              // backgroundColor: theme.palette.primary.main,
            },
          },
          '&.Mui-disabled': {
            color: '#ccc',
          },
          '&:not(.Mui-selected)': { 
            borderColor: 'rgba(255, 255, 255, 0.2)'
          },
        }),
      }
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: 'white',
          fontSize: '16px',  // Set the base font size to prevent zooming on iOS
          height: '20px',
          lineHeight: 'normal',
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          // Default styles here
          color: 'inherit',
        },
        contained: {
          color: '#fff',
          // backgroundColor: '#28abe57d'
        },
        containedGray: {
          border: '1px solid #555',
          backgroundColor: '#2e2e38', // Darker background for contained buttons
          color: '#fff', // White text for contrast
          '&:hover': {
            backgroundColor: '#2e2e38' // Slightly lighter on hover
          },
        },
        outlinedGray: {
          border: '1px solid #555',
          // borderColor: '#555', // Adjusted for better visibility in dark mode
          color: '#aaa', // Light gray text, good for dark themes
          backgroundColor: 'transperant',
          '&:hover': {
            color: '#fff'
          },
        }
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
            color: '#000',
            '.MuiListItemIcon-root': {
              color: theme.palette.primary.main
            }
          }
        })
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: '#fff'
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "gray"
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "backgroundColor": "#1e1e2c",
          "borderRadius": "4px",
          "color": "#fff",
          '&:hover': {
            backgroundColor: '#2e2e38'
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& fieldset': {
            borderColor: 'rgb(75 85 99) !important', // Default border color
          },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          "border": "1px solid rgb(75 85 99)",
          // '&.Mui-disabled': {
            "color": "#aaaaaa", // Light gray for text/icon
            "backgroundColor": "none", // Darker background for the button
          // }
          '&.Mui-selected': {
            color: "#fff",
            "backgroundColor": "rgba(255, 255, 255, 0.1) !important",
          }
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#fff'
        }
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
          backgroundColor: '#1e1e2c',
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
        tooltip: {
          background: 'rgb(55,65,81)',
          '& .MuiTooltip-arrow': {
            color: 'rgb(55,65,81)', // Change to your desired arrow color
          }
        },
        root: ({ ownerState, theme }) => ({
          backgroundColor: 'white',
          boxShadow: theme.shadows[1],
          color: 'white'
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