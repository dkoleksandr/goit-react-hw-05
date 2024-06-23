import { Link } from "react-router-dom";
import css from "./MoveList.module.css";

const MovieList = ({ movieResults, location }) => {
  return (
    <ul className={css.movieList}>
      {movieResults.map((movie) => (
        <li key={movie.id}>
          <Link
            to={`/movies/${movie.id}`}
            className={css.movieItem}
            state={location}
          >
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
