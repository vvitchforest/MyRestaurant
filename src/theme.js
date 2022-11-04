import { createTheme } from '@mui/material/styles'
import { green, purple } from '@mui/material/colors'

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500]
    },
    secondary: {
      main: green[500]
    },
    info: {
      main: purple[500]
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
      letterSpacing: '1px'
    },
    MuiToolbar: {
      fontFamily: 'Roboto Mono',
      letterSpacing: '1px'
    }
  }
})

export default theme
