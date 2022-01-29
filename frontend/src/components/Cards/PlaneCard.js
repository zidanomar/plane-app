import {
  Box,
  Heading,
  Image,
  Text,
  VStack,
  useColorMode,
  Flex,
  HStack,
  Button,
  Link,
} from '@chakra-ui/react';
import React from 'react';
import { MdOutlineArrowForward } from 'react-icons/md';
import { Link as ReachLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { postLike } from '../../flux/actions/likeAction';
import LikeButton from '../LikeButton';
import LikedBy from '../LikedBy';

function PlaneCard({
  uuid,
  name,
  owner,
  flightHour,
  imgUrl,
  likes,
  activeUser,
  isLoading,
}) {
  const { colorMode } = useColorMode();
  const dispatch = useDispatch();

  let alreadyLiked = false;

  if (likes.length > 0) {
    alreadyLiked = likes.find((x) => x.username === activeUser);
  }

  const postLikeHandler = () => {
    dispatch(postLike({ planeId: uuid }));
  };

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
        <VStack spacing={2} align='flex-start' mb={4}>
          <Text>Owner: {owner?.name}</Text>
          <Text mr='2'>Flight Hour: {flightHour} hours</Text>;
          {likes && (
            <Flex gap={1}>
              <LikedBy likes={likes} />
              {likes.length > 0 && <Text>liked this plane</Text>}
            </Flex>
          )}
        </VStack>
        <HStack gap={6}>
          {activeUser && (
            <LikeButton
              isLoading={false}
              isLiked={alreadyLiked}
              onClick={postLikeHandler}
            />
          )}
          <Link as={ReachLink} to={`${uuid}`}>
            <Button variant='outline' rightIcon={<MdOutlineArrowForward />}>
              Detail
            </Button>
          </Link>
        </HStack>
      </Box>
    </Box>
  );
}

export default PlaneCard;
