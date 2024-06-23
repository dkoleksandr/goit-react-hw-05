import { Link } from "react-router-dom";

const MovieList = ({ movieResults, location }) => {
  return (
    <>
      {movieResults.map((movie) => (
        <div key={movie.id}>
          <Link to={`/movies/${movie.id}`} state={location}>
            {movie.title}
          </Link>
        </div>
      ))}
    </>
  );
};

export default MovieList;
