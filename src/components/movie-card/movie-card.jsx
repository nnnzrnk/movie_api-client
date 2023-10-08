import PropTypes from 'prop-types'
import { Button, Card, Container, Row, Col } from 'react-bootstrap';

export const MovieCard = ({ movieData, onMovieClick }) => {
    return (
      <Row className='m-3 justify-content-md-center'>
      <Col md={6} >
      <Card className='shadow p-4 border-0'>
      <Container>
        <Row>
      <Col>  
      <Card.Img className='m-2'  src={movieData.image}/> 
      </Col>
          <Col>
       <Card.Body >
        <Card.Title>{movieData.title}</Card.Title>
        <Card.Text>{movieData.description}</Card.Text>
        <Button className='close-open-btn' onClick={() => {
          onMovieClick(movieData);
        }}>Open</Button>
       </Card.Body>
     
          </Col>
        </Row>
      </Container>
      </Card>
      </Col>
      </Row>
    );
  };

  MovieCard.propTypes = {
    movieData: PropTypes.shape({ title: PropTypes.string }).isRequired, 
    onMovieClick: PropTypes.func.isRequired
  }




