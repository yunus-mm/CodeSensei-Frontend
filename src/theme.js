import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#e6f4ff',
      paper: '#e6f4ff',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontFamily: 'Montserrat, Roboto, Arial, sans-serif',
      fontWeight: 700,
    },
    h3: {
      fontFamily: 'Montserrat, Roboto, Arial, sans-serif',
      fontWeight: 700,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: '#e6f4ff',
        },
      },
    },
  },
});

export default theme;
