import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#c8eadd',
      dark: '#8dceb3',
      light: '#8daea3',
    },
    secondary: {
      main: '#f4c458',
      dark: '#f4a111',
    },
    grey: {
      '100': '#a1b2aa',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    body1: {
      fontSize: 15,
    },
    body2: {
      fontSize: 300,
    },
  },
});

export default theme;
