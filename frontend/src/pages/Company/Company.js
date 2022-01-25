import React, { useEffect } from 'react';
import {
  Container,
  Flex,
  Heading,
  Image,
  Link,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as ReachLink } from 'react-router-dom';

import logo from '../../images/garuda.png';
import { useParams } from 'react-router-dom';
import { getCompanyById } from '../../flux/actions/companyAction';

function Company() {
  const dispatch = useDispatch();
  const { companyId } = useParams();

  const company = useSelector((state) => state.company.companyDetail);
  useEffect(() => {
    dispatch(getCompanyById(companyId));
  }, [companyId, dispatch]);
  return (
    <Container maxW='container.xl' minH='100vh'>
      <Flex gap={8}>
        <Image
          position='sticky'
          top={20}
          left={0}
          w='30%'
          h={40}
          src={logo}
          alt='company logo'
          objectFit='contain'
          objectPosition='center'
        />
        <VStack spacing={6} w='70%'>
          <Heading as='h3' objectFit='contain'>
            {company.name}
          </Heading>
          <Table variant='striped' colorScheme='teal'>
            <Thead>
              <Tr>
                <Th>Number</Th>
                <Th>Name</Th>
                <Th isNumeric>Flight Hours</Th>
              </Tr>
            </Thead>
            <Tbody>
              {company.planes?.length > 0 ? (
                company.planes.map((c, i) => (
                  <Tr key={i}>
                    <Td>{i + 1}</Td>
                    <Td>
                      <Link as={ReachLink} to={`/planes/${c.uuid}`}>
                        {c.name}
                      </Link>
                    </Td>
                    <Td isNumeric>25.4 hours</Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={3}>No Plane recorded</Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </VStack>
      </Flex>
    </Container>
  );
}

export default Company;
