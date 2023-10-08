import { Button, Card, Container, Row, Col } from 'react-bootstrap';

export const MovieView = ({ movie, onBackClick }) => {
    return (
<Container className='justify-content-md-center mt-4'>
  <Row>
    <Col>
    <Card className='shadow p-4 border-0'>
      <Row>
        <Col>
      <Card.Img 
            className='m-2'
            src={movie.image}
            alt=""/>
      </Col>
      <Col>
      <Card.Body>
        <Card.Title className='mt-2'>{movie.title}</Card.Title>
        <Card.Text>{movie.description}</Card.Text>
        <Card.Text><span className='text-title'>Genre:</span> {movie.genre}</Card.Text>
        <Card.Text><span className='text-title'>Director:</span> {movie.director}</Card.Text>
        <Button className='close-open-btn' onClick={onBackClick}>Back</Button>
      </Card.Body>
      </Col>
      </Row>
    </Card>
    </Col>
  </Row>
</Container>
    );
  };
  
  