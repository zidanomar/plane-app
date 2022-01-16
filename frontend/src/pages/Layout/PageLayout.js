import { Container } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router-dom';

function PageLayout() {
  return (
    <Container maxW='container.xl' mt='16'>
      <Outlet />
    </Container>
  );
}

export default PageLayout;
