import { createTheme } from '@mui/material/styles'
import { green } from '@mui/material/colors'

const theme = createTheme({
  palette: {
    primary: {
      main: green[600]
    },
    secondary: {
      main: '#000000'
    },
    info: {
      main: green[500]
    }
  },
  typography: {
    fontFamily: [
      'Montserrat'
    ].join(','),
    h4: {
      fontFamily: 'Roboto Mono'
    },
    h5: {
      fontFamily: 'Roboto Mono'
    },
    button: {
      fontFamily: 'Roboto Mono',
      letterSpacing: '1px'
    },
    subtitle2: {
      fontFamily: 'Roboto Mono',
      letterSpacing: '2px'
    }
  },
  components: {
    MuiButtonBase: {
      variants: [
        {
          props: { variant: 'navlink' },
          style: {
            borderRadius: '0.25rem'
          }
        }
      ]
    },
    MuiDrawer: {
      styleOverrides: {
        root: {
          '& .MuiDrawer-paper': {
            backgroundColor: 'RGBA(255, 255, 255, 0.80)',
            backdropFilter: 'blur(15px)'
          },
          '& .MuiBackdrop-root': {
            backgroundColor: 'RGBA(0, 0, 0, 0.1)'
          }
        }
      }
    }
  }
})

export default theme
