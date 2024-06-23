import { useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { getMovieDetailsAPI } from "../../api/search-api";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import css from "./MovieDetailsPage.module.css";

const POSTER_URL = "https://image.tmdb.org/t/p/w500";
const defaultImg =
  "<https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg>";

const MovieDetailsPage = () => {
  const [movieDetails, setMovieDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const { movieId } = useParams();

  const location = useLocation();
  const backLocation = useRef(location.state ?? "/movies");

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setIsLoading(true);
        const data = await getMovieDetailsAPI(movieId);
        setMovieDetails(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieDetails();
  }, [movieId]);

  return (
    <>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      <NavLink to={backLocation.current}>Go back</NavLink>
      <div className={css.movieInfo}>
        <img
          className={css.movieImage}
          src={
            movieDetails.poster_path
              ? `${POSTER_URL}${movieDetails.poster_path}`
              : defaultImg
          }
          alt={movieDetails.overview ? movieDetails.overview : "poster"}
        />
        <div>
          <h4>{movieDetails.original_title}</h4>
          <p>User Score: {movieDetails.vote_count}</p>
          <h5>Overview</h5>
          <p>{movieDetails.overview}</p>
          <h5>Genres</h5>
          <p>
            {movieDetails.genres &&
              movieDetails.genres.map(({ id, name }) => {
                return <span key={id}>{name} </span>;
              })}
          </p>
        </div>
      </div>
      <hr />
      <br />
      <div>Additional Information</div>

      <Link to={`/movies/${movieId}/cast`} state={location}>
        Cast
      </Link>
      <br />
      <Link to={`/movies/${movieId}/reviews`} state={location}>
        Reviews
      </Link>
      <hr />
      <Outlet />
    </>
  );
};

export default MovieDetailsPage;
