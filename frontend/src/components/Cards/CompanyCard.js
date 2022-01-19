import { Badge, Box, Image, useColorMode } from '@chakra-ui/react';
import React from 'react';

import logo from '../../images/garuda.png';

function CompanyCard({ name, totalPlane }) {
  const { colorMode } = useColorMode();

  let message;

  if (totalPlane === 1) {
    message = 'plane';
  } else if (totalPlane === 0) {
    message = 'no plane';
  } else {
    message = 'planes';
  }

  return (
    <Box
      width='100%'
      maxW='sm'
      backgroundColor={colorMode === 'light' ? 'white' : 'gray.800'}
      boxShadow={colorMode === 'light' ? 'lg' : 'purple'}
      borderRadius='lg'
      overflow='hidden'
      transition='200ms all ease-in-out'
      _hover={{
        cursor: 'pointer',
        transform: 'scale(1.05)',
      }}
    >
      <Box padding={4}>
        <Image src={logo} objectFit='cover' alt='card image' />
      </Box>

      <Box p='6'>
        <Box fontWeight='bold' as='h4' lineHeight='tight'>
          {name}
        </Box>

        <Box mt='2' isTruncated>
          <Box as='span' color='gray.600' fontSize='sm'>
            <Badge borderRadius='full' px='2' colorScheme='teal'>
              {totalPlane >= 1 ? `${totalPlane} ${message}` : message}
            </Badge>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default CompanyCard;
