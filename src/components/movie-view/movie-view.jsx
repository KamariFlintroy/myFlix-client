import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
export const MovieView = ({ movies, user, setUser, token }) => {
  const { movieId } = useParams();
  const [ isFavorite, setIsFavorite ] = useState(false);
  useEffect(() => {
      const isFavorited = user.FavoriteMovies.includes(movieId)
      setIsFavorite(isFavorited)
  }, []);
  const removeFavorite = () => {
      fetch(`https://rocky-ravine-68908-c80297ae2b6b.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
          }
      }).then((response) => {
          if (response.ok) {
              return response.json()
          }
      }).then((data) => {
          setIsFavorite(false);
          localStorage.setItem("user", JSON.stringify(data));
          setUser(data);
      })
  };
  const addFavorite = () => {
      fetch(`https://rocky-ravine-68908-c80297ae2b6b.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
          }
      }).then((response) => {
          if (response.ok) {
              return response.json()
          }
      }).then((data) => {
          setIsFavorite(true);
          localStorage.setItem("user", JSON.stringify(data));
          setUser(data);
      })
  };
  const movie = movies.find((movie) => movie.id === movieId);
  return (
    <div>
      <div>
        <span>Title: </span>
        <span>{movie?.Title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie?.Description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie?.Genre?.Name}</span>
        <br />
        <span>Description:</span>
        <span>{movie?.Genre?.Description}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie?.Director?.Name}</span>
        <br />
        <span>Birth Year: </span>
        <span>{movie?.Director?.Birth}</span>
      </div>
      {isFavorite ? (
                <Button onClick={removeFavorite}>Remove from favorites</Button>
            ) : (
                <Button onClick={addFavorite}>Add to favorites</Button>
            )}
            <Link to={"/"}>
                <Button className="back-button">Back</Button>
            </Link>
    </div>
  );
};

MovieView.PropTypes = {
  movie: PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      Genre: PropTypes.shape({
          Name: PropTypes.string.isRequired,
          Description: PropTypes.string.isRequired
      }),
      Director: PropTypes.shape({
          Name: PropTypes.string.isRequired,
          Birth: PropTypes.string.isRequired
      }),
  }).isRequired
};