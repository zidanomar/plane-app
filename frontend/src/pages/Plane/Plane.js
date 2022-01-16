import React from 'react';
import { useParams } from 'react-router-dom';

function Plane() {
  const params = useParams();
  return <div>{params.planeId}</div>;
}

export default Plane;
