import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';

import { getCompanyByUser } from '../../../flux/actions/companyAction';
import PlaneListTable from '../../../components/Table/PlaneListTable';

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

  useEffect(() => {
    if (Object.keys(company).length > 0) {
      setSelectedPlane(company.planes[0]);
    }
  }, [company]);

  return (
    <React.Fragment>
      <Flex w={'100%'} justifyContent={'center'} mb={8}>
        <Image w={'25%'} src={company?.imgUrl} alt={'company logo'} />
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
            <PlaneListTable
              caption={`${company?.name} plane list`}
              planes={company?.planes}
              onClick={selectPlaneHandler}
              activeState={selectedPlane?.uuid}
            />
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
