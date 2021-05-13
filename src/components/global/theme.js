import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#67c1f5',
      main: '#0c5786',
      dark: '#293a4f',
      darker: '#242d35',
    },
    secondary: {
      light: '#afafaf',
      main: '#8c8c8c',
      dark: '#6e6e6e',
      darker: '#505050',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#606d7b',
    },
    gradient: {
      primary: '#192334',
      secondary: '#171e26',
      primaryOpaque: '#19233499',
      secondaryOpaque: '#171e2699',
    },
  },
});

export default theme;
