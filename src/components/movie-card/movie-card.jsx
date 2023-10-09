import PropTypes from 'prop-types'
import { Button, Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const MovieCard = ({ movieData }) => {
    return (
      <Card className='shadow p-4 border-0 h-100' > 
      <Card.Img className='m-2' src={movieData.image}/> 
       <Card.Body >
        <Card.Title>{movieData.title}</Card.Title>
        <Card.Text>{movieData.description}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movieData._id)}`}>    
        <Button className='close-open-btn'>Open</Button>
        </Link>
       </Card.Body>
      </Card>

    );
  };

  MovieCard.propTypes = {
    movieData: PropTypes.shape({ 
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired}).isRequired
  }




