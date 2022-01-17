import { Link } from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';
import React from 'react';

function LinkTemplate({ rowData }) {
  return (
    <Link as={ReachLink} to={`/flights/${rowData}`}>
      {rowData}
    </Link>
  );
}

export default LinkTemplate;
