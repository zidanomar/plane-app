import React from 'react';
import { Link as ReachLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Icon,
  Link,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { MdLogin, MdWbSunny, MdNightsStay } from 'react-icons/md';

function Header() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <HStack h='20'>
      <Container
        maxW='container.xl'
        display='flex'
        alignItems='center'
        justifyContent='space-between'
      >
        <Flex>
          <Text as='h3' fontSize='xl' fontWeight='bold'>
            Plane App
          </Text>
        </Flex>

        <Flex gap='10'>
          <Link as={ReachLink} to='/'>
            <Text as='p' fontSize='xl'>
              Home
            </Text>
          </Link>
          <Link as={ReachLink} to='/plane'>
            <Text as='p' fontSize='xl'>
              Plane
            </Text>
          </Link>
          <Link as={ReachLink} to='/customer'>
            <Text as='p' fontSize='xl'>
              Customer
            </Text>
          </Link>
          <Link as={ReachLink} to='/flight'>
            <Text as='p' fontSize='xl'>
              Flight
            </Text>
          </Link>
        </Flex>

        <Flex alignItems='center' gap={6}>
          <Box
            borderRadius='4'
            display='flex'
            alignItems='center'
            fontSize='xl'
            backgroundColor='purple.400'
            color='white'
            py='2'
            px='4'
          >
            <Icon as={MdLogin} mr='2' display='inline-block' />
            <Link as={ReachLink} to='/login'>
              <Text as='p'>Login</Text>
            </Link>
          </Box>
          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? (
              <Icon as={MdNightsStay} />
            ) : (
              <Icon as={MdWbSunny} />
            )}
          </Button>
        </Flex>
      </Container>
    </HStack>
  );
}

export default Header;
