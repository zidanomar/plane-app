import { Container, Flex, Heading, Icon, Text } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import React from 'react';

function Footer() {
  return (
    <footer>
      <Container maxW='container.xl' paddingY='16'>
        <Flex justifyContent='space-between'>
          <Heading as='h3' size='lg'>
            Plane App
          </Heading>
          <Flex gap='4'>
            <Text as='p' size='md'>
              Planes
            </Text>
            <Text as='p' size='md'>
              Flights
            </Text>
            <Text as='p' size='md'>
              Companies
            </Text>
          </Flex>
          <Flex alignItems='center'>
            <Icon as={FaGithub} mr='4' />
            <Text as='p' size='md'>
              Github
            </Text>
          </Flex>
        </Flex>
        <Text mt='8' textAlign='center'>
          &copy; 2022
        </Text>
      </Container>
    </footer>
  );
}

export default Footer;
