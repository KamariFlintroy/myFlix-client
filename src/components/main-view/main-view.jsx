import { useState, useEffect } from 'react';
import { NavigationBar } from "../../navigation-bar/navigation-bar.jsx"
import { ProfileView } from "../profile-view/profile-view.jsx";
import { MovieCard } from '../movie-card/movie-card.jsx';
import { MovieView } from '../movie-view/movie-view.jsx';
import { LoginView } from '../login-view/login-view.jsx';
import { SignupView } from '../signup-view/signup-view.jsx';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
export const MainView = () => {
  const [movies, setMovies] = useState([]);
  // const [selectedMovie, setSelectedMovie] = useState(null);
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [Search, setSearch] = useState("");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const onLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  }
  useEffect(() => {
    if (!token) {
      return;
    }
    fetch('https://rocky-ravine-68908-c80297ae2b6b.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            Title: movie.Title,
            Description: movie.Description,
            Genre: {
              Name: movie.Genre.Name,
              Description: movie.Genre.Description,
            },
            Director: {
              Name: movie.Director.Name,
              Birth: movie.Director.Birth,
            },
          };
        });
        console.log('movies from api: ', data);
        setMovies(moviesFromApi);
      });
  }, [token]);
  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null)
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
                  <Col md={5}>
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
                  <Col md={5}>
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
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col>
                    <ProfileView
                      user={user}
                      token={token}
                      setUser={setUser}
                      movies={movies}
                      onLogout={onLogout}
                    />
                  </Col>
                )}</>
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
                  <Col md={8}>
                    <MovieView style={{ border: "1px solid green" }} movies={movies} user={user} setUser={setUser} token={token} />
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
                          <Row className="search-bar">
                            <form>
                                <InputGroup>
                                    <Form.Control
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search"
                                    aria-label="Search"
                                    />
                                </InputGroup>
                            </form>
                        </Row>
                        {movies.filter((movie) =>
                        movie.Title.toLowerCase().includes(Search.toLowerCase())).map((movie) => (
                            <Col className="mb-4" key={movie._id} md={3}>
                                <MovieCard
                                movie={movie}
                                token={token}
                                user={user}
                                setUser={setUser}
                                />
                            </Col>
                        ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
        {user && (
          <Col md={1}>
            <Button
              variant="secondary"
              onClick={onLogout}
            >
              Logout
            </Button>
          </Col>
        )}
      </Row>
    </BrowserRouter>
  );
};