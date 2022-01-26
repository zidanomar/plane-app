import {
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React from 'react';

function PlaneListTable({ caption, planes, onClick, activeState }) {
  return (
    <Table variant='simple'>
      <TableCaption>{caption}</TableCaption>
      <Thead>
        <Tr>
          <Th>Plane</Th>
          <Th>Flight Hours</Th>
          <Th isNumeric>Status</Th>
        </Tr>
      </Thead>
      <Tbody>
        {planes?.map((plane) => (
          <Tr
            key={plane.uuid}
            backgroundColor={
              activeState === plane.uuid ? 'teal.300' : 'transparent'
            }
            transition='all 300ms ease-in-out'
            _hover={{ backgroundColor: 'teal.300', cursor: 'pointer' }}
            onClick={() => onClick(plane)}
          >
            <Td>{plane.name}</Td>
            <Td>{plane.flight_hour} hours</Td>
            <Td isNumeric>
              {plane.isDelivered ? 'Delivered' : 'Processing at TAI'}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default PlaneListTable;
