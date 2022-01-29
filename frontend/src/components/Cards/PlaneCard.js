import {
  Box,
  Heading,
  Image,
  Text,
  VStack,
  useColorMode,
  Flex,
} from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import LikedBy from '../LikedBy';

function PlaneCard({ name, owner, flightHour, imgUrl, likes }) {
  const { colorMode } = useColorMode();
  const activeUser = useSelector(
    (state) => state.userCredential.credential.username
  );

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
          <Flex gap={1}>
            <LikedBy likes={likes} />
            {likes.length > 0 && <Text>liked this plane</Text>}
          </Flex>
        </VStack>
      </Box>
    </Box>
  );
}

export default PlaneCard;
