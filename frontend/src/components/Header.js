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
  useColorMode,
} from '@chakra-ui/react';
import { MdLogin, MdLogout, MdWbSunny, MdNightsStay } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../flux/actions/authAction';

const navigations = [
  {
    path: '/planes',
    name: 'Plane',
  },
  {
    path: '/companies',
    name: 'Company',
  },
  {
    path: '/flights',
    name: 'Flight',
  },
];

function DashboardLink({ to, name }) {
  const { pathname } = useLocation();

  return (
    <Link
      to={to}
      as={ReachLink}
      display='flex'
      fontSize='xl'
      width='100%'
      position='relative'
      transition='all 300ms ease-in-out'
      _after={
        pathname === to && {
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
      {name}
    </Link>
  );
}

function Header() {
  const { pathname } = useLocation();

  const { colorMode, toggleColorMode } = useColorMode();

  const credential = useSelector(
    (state) => state.userCredential.credential.uuid
  );
  const username = useSelector(
    (state) => state.userCredential.credential.username
  );
  const role = useSelector((state) => state.userCredential.credential.role);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logoutHandler = () => {
    if (credential) {
      dispatch(logout(navigate));
    } else return;
  };

  return (
    <HStack
      h='20'
      position='sticky'
      top='0'
      left='0'
      backgroundColor={colorMode === 'light' ? 'white' : 'gray.800'}
      zIndex='sticky'
    >
      <Container
        maxW='container.xl'
        display='flex'
        alignItems='center'
        justifyContent='space-between'
      >
        <Flex>
          <Link as={ReachLink} to='/' fontSize='xl' fontWeight='bold'>
            Plane App
          </Link>
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
        </Flex>

        <Flex alignItems='center' gap={6}>
          {role === 'admin' && <DashboardLink to='/admin' name='Admin' />}
          {role === 'company' && (
            <DashboardLink to='/companyprofile' name='Company' />
          )}
          {credential && <DashboardLink to='/userprofile' name={username} />}
          <Link as={ReachLink} to='/auth' textDecoration='none'>
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
