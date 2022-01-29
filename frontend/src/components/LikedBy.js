import { Text } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';

function LikedBy({ likes }) {
  const activeUser = useSelector(
    (state) => state.userCredential.credential.username
  );

  if (likes?.length >= 1) {
    if (activeUser) {
      const liked = likes.find((x) => x.username === activeUser);
      if (liked) {
        if (likes.length > 1) {
          return <Text>{`you and ${likes.length - 1} other`}</Text>;
        } else {
          return <Text>{`you`}</Text>;
        }
      } else {
        if (likes.length > 1) {
          return <Text>{`${likes.length} people`}</Text>;
        } else {
          return <Text>{`${likes.length} person`}</Text>;
        }
      }
    } else {
      if (likes.length === 1) {
        return <Text>{`${likes.length} person`}</Text>;
      } else if (likes.length > 1) {
        return <Text>{`${likes.length} people`}</Text>;
      } else {
        return <Text>No like yet</Text>;
      }
    }
  } else {
    return <Text>No like yet</Text>;
  }
}

export default LikedBy;
