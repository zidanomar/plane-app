import { Box, Grid, GridItem, Heading, VStack } from '@chakra-ui/react';
import Chart from 'react-apexcharts';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCompany } from '../../flux/actions/companyAction';
import { getAllPlane } from '../../flux/actions/planeAction';

function AdminHome() {
  const dispatch = useDispatch();

  const companies = useSelector((state) => state.company.companies);
  const planes = useSelector((state) => state.plane.planes);

  useEffect(() => {
    dispatch(getAllPlane());
    dispatch(getAllCompany());
  }, [dispatch]);

  const companyChart = {
    options: {
      chart: {
        width: '100%',
        type: 'pie',
      },
      labels: companies.map((c) => c.name.split(' ')),
    },
    series: companies.map((c) => c.planes.length),
  };

  const planeChart = {
    options: {
      chart: {
        height: 350,
        type: 'bar',
        events: {
          click: function (chart, w, e) {
            // console.log(chart, w, e)
          },
        },
      },
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: planes.map((p) => p.name.split(' ')),
        labels: {
          style: {
            colors: 'teal',
            fontSize: '12px',
          },
        },
      },
    },
    series: [
      {
        data: planes.map((p) => p.flight_hour),
      },
    ],
  };

  const peformanceChart = {
    series: [
      {
        name: 'processed plane',
        data: [31, 40, 28, 51, 42, 109, 31, 40, 28, 51, 42, 100],
      },
      {
        name: 'delivered plane',
        data: [11, 32, 45, 32, 34, 52, 54, 22, 30, 59, 82, 41],
      },
    ],
    options: {
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
    },
  };

  return (
    <VStack spacing='6' width='100%'>
      <Grid templateColumns='repeat(2, 1fr)' gap={6} w='100%'>
        <GridItem w='100%'>
          <Heading mb={6}>Plane owned by company</Heading>
          <Chart
            options={companyChart.options}
            series={companyChart.series}
            type='donut'
            height={320}
          />
        </GridItem>

        <GridItem w='100%'>
          <Heading mb={6}>Yearly plane flight hour</Heading>
          <Chart
            options={planeChart.options}
            series={planeChart.series}
            type='bar'
            height={350}
          />
        </GridItem>
      </Grid>
      <Heading mb={6}>Company performance</Heading>
      <Box w='100%'>
        <Chart
          options={peformanceChart.options}
          series={peformanceChart.series}
          type='area'
          height={350}
        />
      </Box>
    </VStack>
  );
}

export default AdminHome;
