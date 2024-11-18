import PropTypes from "prop-types";
import React from "react";
import { Button, Card } from "react-bootstrap";
import './movie-card.scss';
export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100">
        <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Description}</Card.Text>
            <Button onClick={() => onMovieClick(movie)} variant="link">
                Open
            </Button>
        </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
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
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};