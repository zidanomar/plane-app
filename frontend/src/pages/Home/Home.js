import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react';
import { useSelector } from 'react-redux';

import rocket from '../../images/rocket.png';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionText = motion(Text);

const imageVariants = {
  hidden: {
    y: '50',
  },
  visible: {
    y: 0,
    transition: {
      yoyo: Infinity,
      duration: 1,
    },
  },
};

const textVariants = {
  hidden: {
    opacity: 0,
    x: '-100vw',
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
    },
  },
};

const childrenVariant = {
  visible: {
    color: [
      '#CBD5E0',
      '#FC8181',
      '#F6AD55',
      '#F6E05E',
      '#68D391',
      '#4FD1C5',
      '#63B3ED',
      '#76E4F7',
      '#B794F4',
      '#F687B3',
    ],
    transition: { duration: 10, repeat: Infinity },
  },
};

function Home() {
  const username = useSelector(
    (state) => state.userCredential.credential.username
  );
  return (
    <Container maxW='container.xl'>
      <Grid templateColumns='repeat(2, 1fr)' gap={6}>
        <GridItem
          w='100%'
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <MotionFlex
            key={Math.random()}
            variants={textVariants}
            initial='hidden'
            animate='visible'
            h='max-content'
            alignItems='center'
          >
            <Text as='h3' fontSize='2xl' mr='4'>
              Hello
            </Text>
            <MotionText
              key={Math.random()}
              as='h1'
              fontSize='4xl'
              fontWeight='bold'
              mr='4'
              variants={childrenVariant}
              initial='hidden'
              animate='visible'
            >
              {username ? `${username}~!` : 'peeps~!'}
            </MotionText>
            <Text as='h3' fontSize='2xl'>
              How can i help you
            </Text>
          </MotionFlex>
        </GridItem>
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
          <Image src={rocket} alt='rocket' w='80%' />
        </MotionBox>
      </Grid>
    </Container>
  );
}

export default Home;
