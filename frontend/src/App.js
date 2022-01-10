import { ChakraProvider } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import ErrorDialog from './components/Dialog/ErrorDialog';
import Header from './components/Header';
import theme from './utility/theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <ErrorDialog />
      <Outlet />
    </ChakraProvider>
  );
}

export default App;
