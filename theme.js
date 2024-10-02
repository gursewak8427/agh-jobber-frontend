import { createTheme } from '@mui/material/styles';

// Function to create the theme dynamically based on mode (light/dark)
const theme = (mode) => createTheme({
  palette: {
    mode: mode, // Dynamic mode (light or dark)
    primary: {
      main: mode === 'dark' ? '#171B1C' : '#FFFFFF', // Primary color for light/dark
    },
    secondary: {
      main: mode === 'dark' ? '#273135' : '#E7E7E7', // Secondary color for light/dark
    },
    background: {
      default: mode === 'dark' ? '#171B1C' : '#F1F0E9', // Background for light/dark
      paper: mode === 'dark' ? '#273135' : '#FFFFFF', // Paper background for light/dark
    },
    text: {
      primary: mode === 'dark' ? '#f5f5f5' : '#032B3A', // Text color for light/dark
      secondary: mode === 'dark' ? '#aaaaaa' : '#666666', // Optional secondary text color
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif', // Consistent typography
  },
});

export default theme;

