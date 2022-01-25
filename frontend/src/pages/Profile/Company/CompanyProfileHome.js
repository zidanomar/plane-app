import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Flex,
  Heading,
  Image,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

import logo from '../../../images/garuda.png';
import { getCompanyByUser } from '../../../flux/actions/companyAction';

function CompanyProfileHome() {
  const dispatch = useDispatch();

  const company = useSelector((state) => state.company.companyDetail);

  const arr = Array(12)
    .fill('')
    .map((x) => (x = Math.floor(Math.random() * (240 - 100 + 1) + 100)));

  const [selectedPlane, setSelectedPlane] = useState(null);

  const selectPlaneHandler = (planeData) => {
    setSelectedPlane(planeData);
  };

  const series = [
    {
      name: 'Flight Hours',
      data: arr,
    },
  ];
  const options = {
    chart: {
      height: 350,
      type: 'area',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      type: 'string',
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm',
      },
    },
  };

  useEffect(() => {
    dispatch(getCompanyByUser());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Flex w={'100%'} justifyContent={'center'} mb={8}>
        <Image w={'25%'} src={logo} alt={'company logo'} />
      </Flex>
      <Heading textAlign={'center'} mb={8}>
        {company?.name}
      </Heading>
      <Flex gap={6}>
        <Box w='100%' h={'max-content'} padding={6}>
          {company?.planes?.length < 1 ? (
            <Text as='h3' mb={6}>
              No Plane data
            </Text>
          ) : (
            <Table variant='simple'>
              <TableCaption>Imperial to metric conversion factors</TableCaption>
              <Thead>
                <Tr>
                  <Th>Plane</Th>
                  <Th>Flight Hours</Th>
                  <Th isNumeric>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {company?.planes?.map((plane) => (
                  <Tr
                    key={plane?.uuid}
                    backgroundColor={
                      plane?.uuid === selectedPlane?.uuid
                        ? 'teal.300'
                        : 'transparent'
                    }
                    transition='all 300ms ease-in-out'
                    _hover={{ backgroundColor: 'teal.300', cursor: 'pointer' }}
                    onClick={() => selectPlaneHandler(plane)}
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
          )}
        </Box>
        <Box w='100%' padding={6} textAlign='center'>
          {selectedPlane ? (
            <React.Fragment>
              <Text as='h3'>{`${new Date().getFullYear() - 1} ${
                selectedPlane?.name
              } flight data`}</Text>
              <Chart
                options={options}
                series={series}
                type='area'
                height={350}
              />
            </React.Fragment>
          ) : (
            <Text as='h3'>{`${new Date().getFullYear() - 1} flight data`}</Text>
          )}
        </Box>
      </Flex>
    </React.Fragment>
  );
}

export default CompanyProfileHome;
