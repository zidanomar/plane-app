import React from 'react';
import { Link as ReachLink, useLocation, useNavigate } from 'react-router-dom';
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

const navigations = [
  {
    path: '/',
    name: 'Home',
  },
  {
    path: '/plane',
    name: 'Plane',
  },
  {
    path: '/customer',
    name: 'Customer',
  },
  {
    path: '/flight',
    name: 'Flight',
  },
];

function Header() {
  const { pathname } = useLocation();

  const { colorMode, toggleColorMode } = useColorMode();

  const credential = useSelector(
    (state) => state.userCredential.credential.uuid
  );

  const role = useSelector((state) => state.userCredential.credential.role);
  console.log(role);
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
          {navigations.map((nav, i) => (
            <Link
              key={i}
              to={nav.path}
              as={ReachLink}
              fontSize='xl'
              width='100%'
              position='relative'
              transition='all 300ms ease-in-out'
              _after={
                pathname === nav.path && {
                  content: `''`,
                  position: 'absolute',
                  width: '50%',
                  height: '3px',
                  backgroundColor: 'teal.100',
                  bottom: '-15px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  borderRadius: 'full',
                }
              }
              _hover={{
                _after: {
                  content: `''`,
                  position: 'absolute',
                  width: '50%',
                  height: '3px',
                  backgroundColor: 'teal.100',
                  bottom: '-15px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  borderRadius: 'full',
                  transition: 'all 300ms ease-in-out',
                },
              }}
            >
              {nav.name}
            </Link>
          ))}

          <Link
            to='/admin'
            as={ReachLink}
            display={role === 'admin' ? 'flex' : 'none'}
            fontSize='xl'
            width='100%'
            position='relative'
            transition='all 300ms ease-in-out'
            _after={
              pathname === '/admin' && {
                content: `''`,
                position: 'absolute',
                width: '50%',
                height: '3px',
                backgroundColor: 'teal.100',
                bottom: '-15px',
                left: '50%',
                transform: 'translateX(-50%)',
                borderRadius: 'full',
              }
            }
            _hover={{
              _after: {
                content: `''`,
                position: 'absolute',
                width: '50%',
                height: '3px',
                backgroundColor: 'teal.100',
                bottom: '-15px',
                left: '50%',
                transform: 'translateX(-50%)',
                borderRadius: 'full',
                transition: 'all 300ms ease-in-out',
              },
            }}
          >
            Admin
          </Link>
        </Flex>

        <Flex alignItems='center' gap={6}>
          <Link as={ReachLink} to='/login' textDecoration='none'>
            <Box
              onClick={logoutHandler}
              borderRadius={4}
              display='flex'
              alignItems='center'
              fontSize='xl'
              backgroundColor='teal.400'
              color='white'
              py='2'
              px='4'
              transition='all 300ms ease-in-out'
              _hover={{
                cursor: 'pointer',
                backgroundColor: 'teal.500',
              }}
            >
              {credential ? (
                <>
                  <Icon as={MdLogout} mr='2' display='inline-block' />
                  Logout
                </>
              ) : (
                <>
                  <Icon as={MdLogin} mr='2' display='inline-block' />
                  Login
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
