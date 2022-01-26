import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Flex,
  HStack,
  Link,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';

import { getFlightById } from '../../flux/actions/flightAction';

function FlightDetail() {
  const { flightId } = useParams();
  const dispatch = useDispatch();

  const flight = useSelector((state) => state.flight.flightDetail);
  useEffect(() => {
    dispatch(getFlightById(flightId));
  }, [dispatch, flightId]);

  return (
    <Flex
      height='80vh'
      mt={-16}
      alignItems='center'
      justifyContent='center'
      backgroundImage='url(https://images.unsplash.com/photo-1569154941061-e231b4725ef1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)'
      backgroundAttachment='fixed'
      backgroundSize='cover'
      backgroundRepeat='no-repeat'
      borderRadius='8'
    >
      <HStack
        spacing={6}
        backgroundColor='white'
        color='gray.600'
        w='max-content'
        h='max-content'
        padding={6}
        borderRadius={6}
        divider={<StackDivider borderColor='gray.400' />}
      >
        <VStack spacing='4'>
          <Text fontWeight='bold' color='teal.300'>
            Flight Id
          </Text>
          <Text>{flight.uuid}</Text>
        </VStack>
        <VStack spacing='4'>
          <Text fontWeight='bold' color='teal.300'>
            Depature Date
          </Text>
          <Text>{flight.depature_date}</Text>
        </VStack>
        <VStack spacing='4'>
          <Text fontWeight='bold' color='teal.300'>
            Arrival Date
          </Text>
          <Text>{flight.arrival_date}</Text>
        </VStack>
        <VStack spacing='4'>
          <Text fontWeight='bold' color='teal.300'>
            Plane
          </Text>
          <Link as={ReachLink} to={`/planes/${flight.planeDetail?.uuid}`}>
            <Text>{flight.planeDetail?.name}</Text>
          </Link>
        </VStack>
      </HStack>
    </Flex>
  );
}

export default FlightDetail;
