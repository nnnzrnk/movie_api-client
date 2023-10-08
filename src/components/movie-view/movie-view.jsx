import { Button, Card} from 'react-bootstrap';

export const MovieView = ({ movie, onBackClick }) => {
    return (
    <Card className='shadow p-4 border-0'>
      <Card.Img 
            className='m-2'
            src={movie.image}
            alt=""/>
      <Card.Body>
        <Card.Title className='mt-2'>{movie.title}</Card.Title>
        <Card.Text>{movie.description}</Card.Text>
        <Card.Text><span className='text-title'>Genre:</span> {movie.genre}</Card.Text>
        <Card.Text><span className='text-title'>Director:</span> {movie.director}</Card.Text>
        <Button className='close-open-btn' onClick={onBackClick}>Back</Button>
      </Card.Body>
    </Card>

    );
  };
  
  