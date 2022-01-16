import { ChakraProvider } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { Outlet } from 'react-router-dom';
import ErrorDialog from './components/Dialog/ErrorDialog';
import Footer from './components/Footer';
import Header from './components/Header';
import theme from './utility/theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AnimatePresence exitBeforeEnter>
        <Header />
        <ErrorDialog />
        <Outlet />
        <Footer />
      </AnimatePresence>
    </ChakraProvider>
  );
}

export default App;
