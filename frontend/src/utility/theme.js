import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const styles = {
  global: (props) => ({
    '*, *::before, &::after': {
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
    },
    body: {
      color: mode('gray.600', 'whiteAlpha.900')(props),
      bg: mode('gray.50', 'gray.800')(props),
    },
  }),
};

const theme = extendTheme({
  styles,
  config,
  shadows: {
    purple:
      '0 10px 15px -3px rgba(159, 122, 234, 0.1), 0 4px 6px -2px rgba(159, 122, 234, 0.05)',
  },
});

export default theme;
