import { Container, Flex } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

function Admin() {
  return (
    <Flex width='full'>
      <Sidebar />
      <Container maxW='container.xl' mt={8}>
        <Outlet />
      </Container>
    </Flex>
  );
}

export default Admin;
