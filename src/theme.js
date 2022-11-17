import { grey, indigo, green, red } from '@mui/material/colors'
import { alpha } from '@mui/material'

/**
 * @Author Irina Konovalova
 * Function that returns object for creating theme in ColorModeContext
 * @param {string} mode dark or light theme
 * @returns object containing typography and palette for MUI theme
 */
export const getDesignTokens = (mode) => ({

  typography: {
    fontFamily: [
      'Montserrat', 'Fira Sans'].join(','),
    h4: {
      fontFamily: 'Fira Sans'
    },
    h5: {
      fontFamily: 'Fira Sans'
    },
    h6: {
      fontFamily: 'Fira Sans'
    },
    button: {
      fontFamily: 'Fira Sans'
    },
    subtitle2: {
      fontFamily: 'Fira Sans'
    }
  },

  palette: {
    mode,
    ...(mode === 'light'
      ? {
          /* palette values for light mode */
          primary: {
            main: indigo[700],
            contrastText: '#fff'
          },
          info: {
            main: indigo.A200
          },
          success: {
            main: green[300]
          },
          error: {
            main: red[300],
            dark: red[600],
            contrastText: '#000000'
          },
          grey: {
            700: grey[600],
            600: grey[200]
          },
          divider: grey[300],
          background: {
            default: grey[100],
            paper: grey[100]
          },
          text: {
            primary: grey[900],
            secondary: grey[800]
          }
        }
      : {
          /* palette values for dark mode */
          primary: {
            main: indigo.A100
          },
          info: {
            main: indigo.A100
          },
          success: {
            main: green[600]
          },
          error: {
            main: red[400],
            dark: red[600],
            contrastText: '#fff'
          },
          grey: {
            700: grey[700]
          },
          divider: grey[700],
          background: {
            default: grey[900],
            paper: grey[900]
          },
          text: {
            primary: '#fff',
            secondary: grey[300]
          }
        })
  }
})

/**
 * @Author Irina Konovalova
 * Function that returns object for creating theme in ColorModeContext
 * @param {string} mode dark or light theme
 * @returns object containing styles for overriding default MUI component styles
 */

export const getComponentThemes = (mode) => ({
  components: {
    ...(mode === 'light'
      ? {
          MuiAppBar: {
            styleOverrides: {
              root: ({ theme }) => ({
                backgroundColor: alpha(theme.palette.common.white, 0.5),
                backdropFilter: 'blur(15px)',
                color: theme.palette.text.primary
              })
            }
          },
          MuiButtonBase: {
            styleOverrides: {
              root: ({ theme }) => ({
                '&.MuiListItem-root': {
                  '&.MuiListItem-button': {
                    '&.Mui-selected': {
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.primary.contrastText
                    }
                  }
                },
                '&.MuiFab-root': {
                  letterSpacing: '2px'
                },
                '&.MuiToggleButton-root': {
                  borderRadius: '5rem',
                  '&.Mui-selected': {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    border: `1px solid ${theme.palette.primary.main}`
                  }
                }
              })
            },
            variants: [
              {
                props: { variant: 'navlink' },
                style: {
                  borderRadius: '5rem',
                  marginRight: '1rem'
                }
              }
            ]
          },
          MuiDrawer: {
            styleOverrides: {
              root: ({ theme }) => ({
                '& .MuiDrawer-paper': {
                  backgroundColor: alpha(theme.palette.common.white, 0.8),
                  backdropFilter: 'blur(15px)'
                },
                '& .MuiBackdrop-root': {
                  backgroundColor: alpha(theme.palette.common.black, 0.3)
                }
              })
            }
          }
        }
      : {
          MuiAppBar: {
            styleOverrides: {
              root: ({ theme }) => ({
                backgroundColor: alpha(theme.palette.common.black, 0.5),
                backdropFilter: 'blur(15px)',
                color: theme.palette.text.primary
              })
            }
          },
          MuiButtonBase: {
            styleOverrides: {
              root: ({ theme }) => ({
                '&.MuiListItem-root': {
                  '&.MuiListItem-button': {
                    '&.Mui-selected': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.5)
                    }
                  }
                },
                '&.MuiFab-root': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.5),
                  color: '#fff',
                  backdropFilter: 'blur(10px)',
                  letterSpacing: '2px'
                },
                '&.MuiToggleButton-root': {
                  borderRadius: '5rem',
                  '&.Mui-selected': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.5),
                    color: '#fff'
                  }
                }
              })
            },
            variants: [
              {
                props: { variant: 'navlink' },
                style: {
                  borderRadius: '5rem',
                  marginRight: '1rem'
                }
              }
            ]
          },
          MuiDrawer: {
            styleOverrides: {
              root: ({ theme }) => ({
                '& .MuiDrawer-paper': {
                  backgroundColor: alpha(theme.palette.common.black, 0.8),
                  backdropFilter: 'blur(15px)'
                },
                '& .MuiBackdrop-root': {
                  backgroundColor: alpha(theme.palette.common.black, 0.3)
                }
              })
            }
          },
          MuiPaper: {
            styleOverrides: {
              root: ({ theme }) => ({
                '&.MuiDialog-paper': {
                  backgroundColor: alpha(grey[900], 0.8),
                  backdropFilter: 'blur(15px)'
                },
                '&.MuiAlert-root': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  backdropFilter: 'blur(15px)'

                }
              })
            }
          }
        })
  }
})
