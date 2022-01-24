import { HStack, Icon, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import NavLink from './NavLink';

function Sidebar({ links }) {
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
        {links.map((link, i) => (
          <NavLink key={i} to={link.to}>
            <HStack spacing={4}>
              <Icon as={link.icon} />
              <Text as='h3'>{link.name}</Text>
            </HStack>
          </NavLink>
        ))}
      </VStack>
    </HStack>
  );
}

export default Sidebar;
