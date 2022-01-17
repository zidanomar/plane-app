import { Container, Heading } from '@chakra-ui/react';
import React from 'react';
import FlightTable from '../../components/Table/FlightTable';

function Flights() {
  return (
    <Container maxW={'container.xl'}>
      <Heading as='h1' mb={8} textAlign='center'>
        Flight List
      </Heading>
      <FlightTable />
    </Container>
  );
}

export default Flights;
