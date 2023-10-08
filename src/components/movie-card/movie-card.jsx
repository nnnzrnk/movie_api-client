import PropTypes from 'prop-types'
import { Button, Card} from 'react-bootstrap';

export const MovieCard = ({ movieData, onMovieClick }) => {
    return (
      <Card className='shadow p-4 border-0 h-100' > 
      <Card.Img className='m-2' src={movieData.image}/> 
       <Card.Body >
        <Card.Title>{movieData.title}</Card.Title>
        <Card.Text>{movieData.description}</Card.Text>
        <Button className='close-open-btn' onClick={() => {
          onMovieClick(movieData);
        }}>Open</Button>
       </Card.Body>
      </Card>

    );
  };

  MovieCard.propTypes = {
    movieData: PropTypes.shape({ title: PropTypes.string }).isRequired, 
    onMovieClick: PropTypes.func.isRequired
  }




