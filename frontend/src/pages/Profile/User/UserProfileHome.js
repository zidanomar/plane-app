import React, { useEffect } from 'react';
import { Link as ReachLink } from 'react-router-dom';
import { Container, Grid, Heading, Link, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import { getUsersLikedPlanes } from '../../../flux/actions/userAction';
import PlaneCard from '../../../components/Cards/PlaneCard';
function UserProfileHome() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userDetail);
  const activeUser = useSelector(
    (state) => state.userCredential.credential.username
  );

  useEffect(() => {
    dispatch(getUsersLikedPlanes());
  }, [dispatch]);

  return (
    <Container maxW='container.xl'>
      <Heading mb={10} textAlign='center'>
        {`${user?.username}`}'s favorite planes
      </Heading>

      {user.likedPlanes.length > 0 ? (
        <Grid
          templateColumns={{
            sm: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
            xl: 'repeat(4, 1fr)',
          }}
          gap={6}
        >
          {user.likedPlanes.map((plane) => (
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
              isLoading={false}
              isLiked={true}
            />
          ))}
        </Grid>
      ) : (
        <Text>
          No plane are liked,{' '}
          <Link as={ReachLink} to='/planes'>
            {' '}
            see plane list here
          </Link>
        </Text>
      )}
    </Container>
  );
}

export default UserProfileHome;
