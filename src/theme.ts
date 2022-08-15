import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#00c33d',
      dark: '#8dceb3',
      light: '#8daea3',
    },
    secondary: {
      main: '#fda20d',
      dark: '#f4a111',
    },
    info: {
      main: '#7e8784',
      light: '#c7c7c7',
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
