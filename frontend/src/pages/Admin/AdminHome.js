import { Grid, GridItem } from '@chakra-ui/react';
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

  const options = {
    chart: {
      width: '100%',
      type: 'pie',
    },
    labels: companies.map((c) => c.name.split(' ')),
  };

  const series = companies.map((c) => c.planes.length);

  const planeSeries = [
    {
      data: planes.map((p) => p.flight_hour),
    },
  ];

  const planeOptions = {
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
  };

  return (
    <Grid templateColumns='repeat(2, 1fr)' gap={6}>
      <GridItem w='100%'>
        <Chart options={options} series={series} type='donut' height={320} />
      </GridItem>

      <GridItem w='100%'>
        <Chart
          options={planeOptions}
          series={planeSeries}
          type='bar'
          height={350}
        />
      </GridItem>
    </Grid>
  );
}

export default AdminHome;
