import { ChakraProvider, Container } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import ErrorDialog from './components/Dialog/ErrorDialog';
import Header from './components/Header';
import theme from './utility/theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <ErrorDialog />
      <Container maxW='container.xl' mt={8}>
        <Outlet />
      </Container>
    </ChakraProvider>
  );
}

export default App;
