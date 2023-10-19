import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  // const storedUser = JSON.parse(localStorage.getItem("user")); // got an error 'SyntaxError: "undefined" is not valid JSON'
  const storedUser = localStorage.getItem("user"); //works as as it should
  const storedToken = localStorage.getItem("token");
  const parseUser = JSON.parse(storedUser)


  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser ? parseUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);



  useEffect(() => {

    if (!token) {
      return;
    }
    fetch(`https://movie-api-da5i.onrender.com/movies`, {
			headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
		})
    .then((response) => response.json())
    .then((data) => {
      setMovies(data);
    });
  }, [token]);


  
  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          localStorage.clear();
        }}
      />

      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={6}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={6}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col className="m-4 justify-content-md-center" md={10}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col
                        key={movie._id}
                        md={3}
                        className="mx-2 my-3 justify-content-md-center"
                      >
                        <MovieCard movie={movie} 
                                   user={user}
													         token={token}
													         setUser={setUser} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col>
                    <Row>
                      <ProfileView
                       user={user}
                       token={token}
                       setUser={setUser}
                        movies={movies}
                        onDelete={() => {
                          setUser(null);
                          setToken(null);
                          localStorage.clear();
                        }}
                      />
                    </Row>
                  </Col>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};