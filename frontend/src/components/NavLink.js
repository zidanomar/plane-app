import React from 'react';
import { Link as ReachLink, useLocation } from 'react-router-dom';
import { Link, useColorMode } from '@chakra-ui/react';

function NavLink({ to, children }) {
  const { colorMode } = useColorMode();
  let location = useLocation();
  let isActive = location.pathname === to;

  return (
    <Link
      as={ReachLink}
      to={to}
      fontSize='xl'
      backgroundColor={isActive ? 'teal.300' : 'transparent'}
      color={colorMode === 'light' ? 'gray.600' : 'white'}
      paddingX={4}
      paddingY={2}
      borderRadius='4'
      width='100%'
      transition='all 300ms ease-in-out'
      _hover={{
        backgroundColor: 'teal.300',
      }}
    >
      {children}
    </Link>
  );
}

export default NavLink;
