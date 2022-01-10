import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';

function Home() {
  const username = useSelector(
    (state) => state.userCredential.credential.username
  );

  return (
    <Flex
      alignItems='center'
      width='100%'
      justifyContent='center'
      textAlign='center'
      mt='16'
    >
      <Text as='h3' fontSize='2xl' mr='4'>
        Hello
      </Text>
      <Text as='h1' fontSize='4xl' fontWeight='bold' mr='4'>
        {username ? `${username}~!` : 'peeps~!'}
      </Text>
      <Text as='h3' fontSize='2xl'>
        How could i help you
      </Text>
    </Flex>
  );
}

export default Home;
