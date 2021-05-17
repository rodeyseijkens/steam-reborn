import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';
import createPalette from '@material-ui/core/styles/createPalette';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface ThemeOptions {
    toHex: (arg: number) => string;
  }

  interface Theme {
    toHex: (arg: number) => string;
  }
}

declare module '@material-ui/core/styles/createPalette' {
  interface SimplePaletteColorOptions {
    darker?: string;
  }

  interface Palette {
    gradient: {
      primary: string;
      secondary: string;
    };
  }

  interface PaletteOptions {
    gradient: {
      primary: string;
      secondary: string;
    };
  }
}

const toHex = (percent: number) => {
  const p = Math.max(0, Math.min(100, percent)); // bound percent from 0 to 100
  const intValue = Math.round((p / 100) * 255); // map percent to nearest integer (0 - 255)
  const hexValue = intValue.toString(16); // get hexadecimal representation

  return hexValue.padStart(2, '0').toUpperCase(); // format with leading 0 and upper case characters
};
const theme = createMuiTheme({
  spacing: 4,
  typography: {
    fontFamily: ['Titillium Web', 'Helvetica', 'Arial', 'sans-serif'].join(','),
  },
  palette: createPalette({
    common: {
      black: '#000000',
      white: '#ffffff',
    },
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
      paper: '#8c8c8c',
    },
    gradient: {
      primary: '#192334',
      secondary: '#171e26',
    },
    text: {
      primary: '#ffffff',
      secondary: '#8c8c8c',
      disabled: `#8c8c8c${toHex(5)}`,
      hint: '#67c1f5',
    },
  }),
  toHex,
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          userSelect: 'none',
        },
        body: {},
      },
    },
  },
});

export default theme;
