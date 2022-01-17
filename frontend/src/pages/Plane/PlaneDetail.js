import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPlaneById } from '../../flux/actions/planeAction';
import saly from '../../images/saly.png';

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

  useEffect(() => {
    dispatch(getPlaneById(planeId));
  }, [dispatch, planeId]);

  return (
    <Container maxW='container.xl'>
      <Grid templateColumns='repeat(5, 1fr)' gap={6}>
        <GridItem w='100%' h='64' colSpan={2}>
          <Image
            src={
              'https://images.unsplash.com/photo-1484320775925-2609d111d8b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80'
            }
            alt='plane'
            width='100%'
            height='100%'
            objectFit='cover'
            objectPosition='center'
          />
        </GridItem>
        <GridItem w='100%' colSpan={3}>
          <VStack
            divider={<StackDivider borderColor='gray.200' />}
            spacing={4}
            align='stretch'
          >
            <Heading as='h3'>{plane.name}</Heading>
            <HStack spacing={6}>
              <Text>Owner :</Text>
              <Text>{plane.owner?.name}</Text>
            </HStack>
            <HStack spacing={6}>
              <Text>Flight Hours :</Text>
              <Text>10000 hours</Text>
            </HStack>
            <HStack spacing={6}>
              <Text>Aircraft Number :</Text>
              <Text>{plane.eaircraft_number}</Text>
            </HStack>
            <HStack spacing={6}>
              <Text>Tail Number :</Text>
              <Text>{plane.tail_number}</Text>
            </HStack>
          </VStack>
        </GridItem>
      </Grid>
      <Grid templateColumns='repeat(2,1fr)' gap={6} mt={10}>
        <GridItem w='100%' alignSelf='center'>
          <Heading as='h3' mb={6}>
            About {plane.name}
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
            key={Math.random()}
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
