import PropTypes from 'prop-types'
import { Button, Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const MovieCard = ({ movieData, token, setUser, user }) => {
 
  const [isFavorite, setIsFavorite] = useState(
    user.FavoriteMovies.includes(movieData._id)
  );

const addFavoriteMovie = () => {
  fetch(`https://movie-api-da5i.onrender.com/users/${user.name}/movies/${movieData._id}`),
      { method: "POST", headers: { Authorization: `Bearer ${token}` } }
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("failed to add fav movie");
        }
      })
      .then((user) => {
        if (user) {
          alert('successfully added to favorites');
          localStorage.setItem("user", JSON.stringify(user)); 
          setUser(user);
          setIsFavorite(true);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const removeFavoriteMovie = () => {
    fetch(
      `https://movie-api-da5i.onrender.com/users/${user.name}/movies/${movieData._id}`,
      { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert('Failed');
        }
      })
      .then((user) => {
        if (user) {
          alert('successfully deleted from favorites');
          localStorage.setItem("user", JSON.stringify(user)); 
          setUser(user); 
          setIsFavorite(false);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

    return (
      <Card className='shadow p-4 border-0 h-100' > 
      <Card.Img className='m-2' src={movieData.image}/> 


       <Card.Body >
        <Card.Title>{movieData.title}</Card.Title>
        <Card.Text>{movieData.description}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movieData._id)}`}>    
        <Button className='close-open-btn'>Open</Button>
        </Link>
        <Card.Footer>
          {!isFavorite ? (
            <Button onClick={addFavoriteMovie}>+</Button>
          ) : (
            <Button onClick={removeFavoriteMovie}>-</Button>
          )}
        </Card.Footer>
       </Card.Body>

      </Card>

    );

    }


  MovieCard.propTypes = {
    movieData: PropTypes.shape({ 
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired}).isRequired
  }




