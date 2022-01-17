import { HStack, Icon, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { MdAccountCircle, MdFlight, MdFlightTakeoff } from 'react-icons/md';

import NavLink from './NavLink';

const lists = [
  {
    to: '/admin/planes',
    name: 'Plane',
    icon: MdFlight,
  },
  {
    to: '/admin/companies',
    name: 'Company',
    icon: MdFlight,
  },
  {
    to: '/admin/flights',
    name: 'Flight',
    icon: MdFlightTakeoff,
  },
];

function Sidebar() {
  return (
    <HStack
      alignItems='flex-start'
      width='full'
      height='100vh'
      maxW={{ base: 32, '2xl': 48 }}
      borderRightColor='gray.dark'
      paddingTop={8}
      paddingLeft={4}
      paddingRight={4}
      flexShrink={0}
    >
      <VStack spacing='8' position='sticky' top='100px'>
        {lists.map((list, i) => (
          <NavLink key={i} to={list.to}>
            <HStack spacing={4}>
              <Icon as={list.icon} />
              <Text as='h3'>{list.name}</Text>
            </HStack>
          </NavLink>
        ))}
        <NavLink to='/admin'>
          <HStack spacing={4}>
            <Icon as={MdAccountCircle} />
            <Text as='h3'>Users</Text>
          </HStack>
        </NavLink>
      </VStack>
    </HStack>
  );
}

export default Sidebar;
