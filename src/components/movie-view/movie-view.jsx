import { Button, Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export const MovieView = ({movies}) => {

const movieId = useParams()
const movie = movies.find((m) => m._id === movieId);

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
        <Link to='/'>
        <Button className='close-open-btn'>Back</Button>
        </Link>
      </Card.Body>
    </Card>

    );
  };

  
  























  