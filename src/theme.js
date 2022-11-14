import { grey, indigo } from '@mui/material/colors'

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: {
            main: indigo[900]
          },
          info: {
            main: indigo[900]
          },
          divider: grey[300],
          background: {
            default: grey[50],
            paper: grey[50]
          },
          text: {
            primary: grey[900],
            secondary: grey[800]
          }
        }
      : {
          // palette values for dark mode
          primary: {
            main: indigo.A100
          },
          info: {
            main: indigo.A100
          },
          divider: grey[700],
          background: {
            default: grey[900],
            paper: grey[900]
          },
          text: {
            primary: '#fff',
            secondary: grey[400]
          }
        })
  }
})

export const getThemedComponents = (mode) => ({
  components: {
    ...(mode === 'light'
      ? {
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundColor: 'RGBA(255, 255, 255, 0.5)',
                backdropFilter: 'blur(15px)',
                color: grey[900]
              }
            }
          },
          MuiButtonBase: {
            styleOverrides: {
              root: {
                '&.MuiListItem-root': {
                  '&.MuiListItem-button': {
                    '&.Mui-selected': {
                      backgroundColor: indigo[900],
                      color: '#fff'
                    }
                  }
                },
                '&.MuiFab-root': {
                  letterSpacing: '2px'
                },
                '&.MuiToggleButton-root': {
                  borderRadius: '5rem',
                  '&.Mui-selected': {
                    backgroundColor: indigo[900],
                    color: '#fff',
                    border: `1px solid ${indigo[900]}`
                  }
                }
              }
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
              root: {
                '& .MuiDrawer-paper': {
                  backgroundColor: 'RGBA(255, 255, 255, 0.60)',
                  backdropFilter: 'blur(15px)'
                },
                '& .MuiBackdrop-root': {
                  backgroundColor: 'RGBA(0, 0, 0, 0.1)'
                }
              }
            }
          }
        }
      : {
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundColor: 'RGBA(0, 0, 0, 0.5)',
                backdropFilter: 'blur(15px)',
                color: '#fff'
              }
            }
          },
          MuiButtonBase: {
            styleOverrides: {
              root: {
                '&.MuiListItem-root': {
                  '&.MuiListItem-button': {
                    '&.Mui-selected': {
                      backgroundColor: 'RGBA(140, 158, 255, 0.5)'
                    }
                  }
                },
                '&.MuiFab-root': {
                  backgroundColor: 'RGBA(140, 158, 255, 0.5)',
                  color: '#fff',
                  backdropFilter: 'blur(10px)',
                  letterSpacing: '2px'
                },
                '&.MuiToggleButton-root': {
                  borderRadius: '5rem',
                  '&.Mui-selected': {
                    backgroundColor: 'RGBA(140, 158, 255, 0.5)',
                    color: '#fff'
                  }
                }
              }
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
              root: {
                '& .MuiDrawer-paper': {
                  backgroundColor: 'RGBA(0, 0, 0, 0.60)',
                  backdropFilter: 'blur(15px)'
                },
                '& .MuiBackdrop-root': {
                  backgroundColor: 'RGBA(0, 0, 0, 0.1)'
                }
              }
            }
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                '&.MuiDialog-paper': {
                  backgroundColor: 'RGBA(33, 33, 33, 0.3)',
                  backdropFilter: 'blur(15px)'
                }
              }
            }
          }
        })
  }
})
