import { HStack } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

function Admin() {
  return (
    <HStack width='full' flex={1} overflow='hidden'>
      <Sidebar />
      <Outlet />
    </HStack>
  );
}

export default Admin;
