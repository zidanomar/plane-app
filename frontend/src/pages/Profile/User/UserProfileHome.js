import React, { useEffect } from 'react';
import { Container, Heading } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import { getUsersLikedPlanes } from '../../../flux/actions/userAction';

function UserProfileHome() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userDetail);

  useEffect(() => {
    dispatch(getUsersLikedPlanes());
  }, [dispatch]);

  return (
    <Container maxW='container.xl'>
      <Heading mb={10} textAlign='center'>
        {`${user?.username}`}'s favorite planes
      </Heading>
    </Container>
  );
}

export default UserProfileHome;
