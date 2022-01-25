import { Container, Flex } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

function Dashboard({ links }) {
  return (
    <Flex width='full'>
      <Sidebar links={links} />
      <Container maxW='container.xl' py={10}>
        <Outlet />
      </Container>
    </Flex>
  );
}

export default Dashboard;
