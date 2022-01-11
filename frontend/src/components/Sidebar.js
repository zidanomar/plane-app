import { HStack, Icon, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { MdAccountCircle } from 'react-icons/md';
import NavLink from './NavLink';

function Sidebar() {
  return (
    <VStack
      alignItems='flex-start'
      width='full'
      height='calc(100vh - 10rem)'
      maxW={{ base: 32, '2xl': 48 }}
      borderRightColor='gray.dark'
      borderRightWidth={2}
      paddingTop={8}
      paddingLeft={4}
      paddingRight={4}
      flexShrink={0}
      spacing='8'
    >
      {Array(5)
        .fill('')
        .map((_, i) => (
          <NavLink to={`${i}`}>
            <HStack key={i} spacing={4}>
              <Icon as={MdAccountCircle} />
              <Text as='h3'>Users</Text>
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
  );
}

export default Sidebar;
