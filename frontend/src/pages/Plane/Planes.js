import React, { useEffect, useState } from 'react';
import { Container, Grid, Heading, Text } from '@chakra-ui/react';
import PlaneCard from '../../components/Cards/PlaneCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPlane } from '../../flux/actions/planeAction';

function Planes() {
  const dispatch = useDispatch();

  const planes = useSelector((state) => state.plane.planes);
  const isLoading = useSelector((state) => state.plane.isLoading);
  const activeUser = useSelector(
    (state) => state.userCredential.credential.username
  );

  const [fetchFromServer, setFetchFromServer] = useState(false);

  useEffect(() => {
    setFetchFromServer(true);
    dispatch(getAllPlane());
    setFetchFromServer(false);
  }, [dispatch]);

  return (
    <Container maxW='container.xl'>
      <Heading as='h1' mb={8} textAlign='center'>
        Plane List
      </Heading>
      {fetchFromServer ? (
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
            <PlaneCard
              key={plane.uuid}
              uuid={plane.uuid}
              name={plane.name}
              owner={plane.owner}
              flightHour={plane.flight_hour}
              aircraftNumber={plane.aircraft_number}
              tailNumber={plane.tail_number}
              imgUrl={plane.imgUrl}
              likes={plane.likedBy}
              activeUser={activeUser}
              isLoading={isLoading}
            />
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default Planes;
