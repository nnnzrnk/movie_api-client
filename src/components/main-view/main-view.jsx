import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import  Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // const storedUser = JSON.parse(localStorage.getItem("user")); // got an error 'SyntaxError: "undefined" is not valid JSON'
  const storedUser = localStorage.getItem("user");   //works as as it should
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] =  useState(storedToken ? storedToken : null)


  useEffect(() => {
    if(!token) {
      return
    }
    fetch('https://movie-api-da5i.onrender.com/movies')
    .then((response) => response.json())
    .then((data) => {
      const movieFromApi = data.map((movie) => {
        return {
          id: movie._id,
          title: movie.title,
          genre: movie.genre.name,
          description: movie.description,
          director: movie.director.name,
          image: movie.image

        }
      })
      setMovies(movieFromApi)
      })
    }, [token])

  return (
    
    !user ? (
      <Container>
          <Row >
            <Col > 
            <LoginView 
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
          </Col>
          <Col>
          <SignupView />
          </Col>
          </Row>
        </Container>
    ) : selectedMovie ? (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    ) : movies.length === 0 ? (
      <div>The list is empty!</div>
    ) : (
      <div>
      {movies.map((movie) => {
        return (
          <MovieCard
            key={movie.id}
            movieData={movie}
            onMovieClick={(newSelectedMovie) =>
              setSelectedMovie(newSelectedMovie)
            }
          />
        );
      })}
      <button
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear()
        }}
      >
        Logout
      </button>

    </div>
    )
    
  );
};
