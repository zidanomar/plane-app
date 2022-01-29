import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Link,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link as ReachLink } from 'react-router-dom';
import { MdThumbDown, MdThumbUp } from 'react-icons/md';

import LikedBy from '../../components/LikedBy';
import { getPlaneById } from '../../flux/actions/planeAction';
import saly from '../../images/saly.png';
import { postLike } from '../../flux/actions/likeAction';

const MotionBox = motion(Box);

const imageVariants = {
  hidden: {
    y: 25,
  },
  visible: {
    y: -25,
    transition: {
      yoyo: Infinity,
      duration: 1,
    },
  },
};

function PlaneDetail() {
  const { planeId } = useParams();
  const dispatch = useDispatch();

  const plane = useSelector((state) => state.plane.planeDetail);
  const fetching = useSelector((state) => state.plane.isLoading);
  const activeUser = useSelector(
    (state) => state.userCredential.credential.username
  );

  let alreadyLiked = false;
  if (plane?.likedBy?.length > 0) {
    alreadyLiked = plane.likedBy.find((x) => x.username === activeUser);
  }

  console.log(plane.likedBy);
  useEffect(() => {
    dispatch(getPlaneById(planeId));
  }, [dispatch, planeId]);

  const postLikeHandler = () => {
    dispatch(postLike({ planeId: plane.uuid }));
  };

  return (
    <Container maxW='container.xl'>
      <Grid templateColumns='repeat(5, 1fr)' gap={6} mb={6}>
        <GridItem w='100%' h='100%' colSpan={3}>
          <Image
            src={plane.imgUrl}
            alt='plane'
            width='100%'
            height='400'
            borderRadius={6}
            objectFit='cover'
            objectPosition='center'
          />
        </GridItem>
        <GridItem w='100%' colSpan={2}>
          <VStack
            divider={<StackDivider borderColor='gray.200' />}
            spacing={4}
            align='stretch'
          >
            <Heading as='h3'>{plane.name}</Heading>
            <HStack spacing={6}>
              <Text>Owner :</Text>
              <Link as={ReachLink} to={`/companies/${plane.owner?.uuid}`}>
                <Text>{plane.owner?.name}</Text>
              </Link>
            </HStack>
            <HStack spacing={6}>
              <Text>Flight Hours :</Text>
              <Text>{plane.flight_hour} hours</Text>
            </HStack>
            <HStack spacing={6}>
              <Text>Aircraft Number :</Text>
              <Text>{plane.aircraft_number}</Text>
            </HStack>
            <HStack spacing={6}>
              <Text>Tail Number :</Text>
              <Text>{plane.tail_number}</Text>
            </HStack>
            <HStack spacing={6}>
              <Text>Liked By :</Text>
              <LikedBy likes={plane?.likedBy} />
            </HStack>
          </VStack>
        </GridItem>
      </Grid>
      <Box w='100%' mb={6}>
        {activeUser && (
          <Button
            isLoading={fetching}
            loadingText='Loading'
            rightIcon={alreadyLiked ? <MdThumbDown /> : <MdThumbUp />}
            onClick={postLikeHandler}
          >
            {alreadyLiked ? 'dislike' : 'like'}
          </Button>
        )}
      </Box>
      <Grid templateColumns='repeat(2,1fr)' gap={6}>
        <GridItem w='100%' alignSelf='center'>
          <Heading as='h3' mb={6}>
            The {plane.name}
          </Heading>
          <Text>
            This cat happen now, it was too purr-fect!!! fight own tail. Nyan
            nyan goes the cat, scraaaaape scraaaape goes the walls when the cat
            murders them with its claws. Poop on grasses drool and making sure
            that fluff gets into the owner's eyes so sit as close as possible to
            warm fire without sitting on cold floor. Rub face on owner if it
            fits i sits yet just going to dip my paw in your coffee and do a
            taste test - oh never mind i forgot i don't like coffee - you can
            have that back now more napping, more napping all the napping is
            exhausting.
          </Text>
        </GridItem>
        <GridItem w='100%'>
          <MotionBox
            w='100%'
            display='flex'
            alignItems='center'
            justifyContent='center'
            variants={imageVariants}
            initial='hidden'
            animate='visible'
          >
            <Image src={saly} alt='rocket' w='80%' />
          </MotionBox>
        </GridItem>
      </Grid>
    </Container>
  );
}

export default PlaneDetail;
