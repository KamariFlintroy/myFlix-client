export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre.Name}</span>
        <br />
        <span>Description:</span>
        <span>{movie.Genre.Description}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director.Name}</span>
        <br />
        <span>Birth Year: </span>
        <span>{movie.Director.Birth}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};
