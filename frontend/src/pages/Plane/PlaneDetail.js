import React from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function PlaneDetail({ match, imageURI, name, aircraftNumber, tailNumber }) {
  return (
    <div className='d-flex justify-content-center align-items-center'>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant='top' src={imageURI} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
        </Card.Body>
        <ListGroup className='list-group-flush'>
          <ListGroup.Item>Aircraft Number: {aircraftNumber}</ListGroup.Item>
          <ListGroup.Item>Tail Number: {tailNumber}</ListGroup.Item>
        </ListGroup>
        {/* change id to dynamic value */}
        <Link to={`/id/edit`} className='text-center'>
          {/* change name to dynamic value */}
          <Button variant='success'>{`Edit name`}</Button>
        </Link>
      </Card>
    </div>
  );
}

export default PlaneDetail;
