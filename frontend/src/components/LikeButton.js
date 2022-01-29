import { Button } from '@chakra-ui/react';
import React from 'react';
import { MdThumbDown, MdThumbUp } from 'react-icons/md';

function LikeButton({ isLoading, isLiked, onClick }) {
  return (
    <Button
      isLoading={isLoading}
      loadingText='Loading'
      rightIcon={isLiked ? <MdThumbDown /> : <MdThumbUp />}
      onClick={onClick}
    >
      {isLiked ? 'dislike' : 'like'}
    </Button>
  );
}

export default LikeButton;
