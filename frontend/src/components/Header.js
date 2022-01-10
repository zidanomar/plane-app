import React from 'react';
import { Link as ReachLink, useNavigate } from 'react-router-dom';
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
import { MdLogin, MdLogout, MdWbSunny, MdNightsStay } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../flux/actions/authAction';

function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const credential = useSelector(
    (state) => state.userCredential.credential.uuid
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    if (credential) {
      dispatch(logout(navigate));
    } else return;
  };

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
          <Link as={ReachLink} to='/login' textDecoration='none'>
            <Box
              onClick={logoutHandler}
              borderRadius='4'
              display='flex'
              alignItems='center'
              fontSize='xl'
              backgroundColor='purple.400'
              color='white'
              py='2'
              px='4'
              transition='all 300ms ease-in-out'
              _hover={{
                cursor: 'pointer',
                backgroundColor: 'purple.500',
              }}
            >
              {credential ? (
                <>
                  <Icon as={MdLogout} mr='2' display='inline-block' />

                  <Text as='p' textDecoration='none'>
                    Logout
                  </Text>
                </>
              ) : (
                <>
                  <Icon as={MdLogin} mr='2' display='inline-block' />

                  <Text as='p' textDecoration='none'>
                    Login
                  </Text>
                </>
              )}
            </Box>
          </Link>
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
