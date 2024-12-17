import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import React from "react";
import { Button, Card } from "react-bootstrap";
import './movie-card.scss';
export const MovieCard = ({ movie }) => {
  return (
    <Card className="h-100">
        <Card.Body>
            <Card.Title>{movie?.Title}</Card.Title>
            <Card.Text>{movie?.Description}</Card.Text>
            <Link to= {`/movies/${encodeURIComponent(movie?.id)}`}>
              <Button variant="link">
                  Open
              </Button>
            </Link>
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
  }).isRequired
};