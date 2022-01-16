import { Box, Heading } from '@chakra-ui/react';
import React from 'react';

function NotFound() {
  return (
    <Box width='100%' height='100vh'>
      <Heading as='h1' fontSize='4xl'>
        not found
      </Heading>
    </Box>
  );
}

export default NotFound;
