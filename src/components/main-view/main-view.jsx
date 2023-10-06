import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

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
  

    if (!user) {
      return (
        <>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
          or
          <SignupView />
        </>
      );
    }

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }
  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
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
  );
};
