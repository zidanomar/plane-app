import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  styles: {
    global: {
      '*, *::before, &::after': {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
      },
      body: {
        padding: 0,
        color: 'purple.500',
      },
      a: {
        color: 'teal.500',
        _hover: {
          textDecoration: 'none',
        },
      },
    },
  },
  config,
});

export default theme;
