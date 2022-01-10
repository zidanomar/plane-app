import { Text, VStack } from '@chakra-ui/react';
import React from 'react';

function Sidebar() {
  return (
    <VStack
      alignItems='flex-start'
      width='full'
      height='calc(100vh - 10rem)'
      maxW={{ base: 56, '2xl': 72 }}
      borderRightColor='gray.dark'
      borderRightWidth={2}
      flexShrink={0}
      spacing='12'
    >
      <Text>a</Text>
      <Text>a</Text>
    </VStack>
  );
}

export default Sidebar;
