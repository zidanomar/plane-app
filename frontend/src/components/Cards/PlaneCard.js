import {
  Box,
  Heading,
  Image,
  Text,
  VStack,
  useColorMode,
} from '@chakra-ui/react';
import React from 'react';

function PlaneCard({ name, owner, flightHour, aircraftNumber, tailNumber }) {
  const { colorMode } = useColorMode();

  return (
    <Box
      borderRadius={4}
      overflow='hidden'
      boxShadow={colorMode === 'light' ? 'lg' : 'purple'}
      backgroundColor={colorMode === 'light' ? 'white' : 'gray.800'}
    >
      <Image
        src={
          'https://images.unsplash.com/photo-1484320775925-2609d111d8b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80'
        }
        alt='plane'
        width='100%'
        height={64}
        objectFit='cover'
        objectPosition='center'
      />
      <Box padding={6}>
        <Heading as='h5' fontSize='xl' mb={4}>
          {name}
        </Heading>
        <VStack spacing={2} align='flex-start'>
          <Text>Owner: {owner.name}</Text>
          <Text mr='2'>Flight Hour: {flightHour} hours</Text>;
          <Text>Aircraft Number: {aircraftNumber}</Text>
          <Text>Tail Number: {tailNumber}</Text>
        </VStack>
      </Box>
    </Box>
  );
}

export default PlaneCard;
