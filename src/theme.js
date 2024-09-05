// src/theme.js (or src/theme.jsx)
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'light', // Set the initial color mode to light
    useSystemColorMode: false, // Don't use the system's color mode
  },
});

export default theme;
