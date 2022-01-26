import {
  Box,
  Heading,
  Image,
  Text,
  VStack,
  useColorMode,
} from '@chakra-ui/react';
import React from 'react';

function PlaneCard({
  name,
  owner,
  flightHour,
  aircraftNumber,
  tailNumber,
  imgUrl,
}) {
  const { colorMode } = useColorMode();

  return (
    <Box
      borderRadius={4}
      overflow='hidden'
      boxShadow={colorMode === 'light' ? 'lg' : 'purple'}
      backgroundColor={colorMode === 'light' ? 'white' : 'gray.800'}
    >
      <Image
        src={imgUrl}
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
