import React, { useEffect } from 'react';
import { Container, Grid, Heading, Link, Text } from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';
import PlaneCard from '../../components/Cards/PlaneCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPlane } from '../../flux/actions/planeAction';

function Planes() {
  const planes = useSelector((state) => state.plane.planes);
  const isLoading = useSelector((state) => state.plane.isLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPlane());
  }, [dispatch]);

  return (
    <Container maxW='container.xl'>
      <Heading as='h1' mb={8} textAlign='center'>
        Plane List
      </Heading>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <Grid
          templateColumns={{
            sm: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
            xl: 'repeat(4, 1fr)',
          }}
          gap={6}
        >
          {planes.map((plane) => (
            <Link key={plane.uuid} as={ReachLink} to={`/planes/${plane.uuid}`}>
              <PlaneCard
                name={plane.name}
                owner={plane.owner}
                flightHour={1000}
                aircraftNumber={plane.aircraft_number}
                tailNumber={plane.tail_number}
              />
            </Link>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default Planes;
