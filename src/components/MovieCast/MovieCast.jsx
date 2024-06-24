import { useEffect, useState } from "react";
import { getCastAndReviewsAPI } from "../../api/search-api";
import { useParams } from "react-router-dom";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import css from "./MovieCast.module.css";

const POSTER_URL = "https://image.tmdb.org/t/p/w500";
const defaultImg =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

const MovieCast = () => {
  const [movieCasts, setMovieCasts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    const getMovieCasts = async () => {
      try {
        setIsLoading(true);
        const data = await getCastAndReviewsAPI(movieId, "credits");

        setMovieCasts(data.cast);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieCasts();
  }, [movieId]);

  return (
    <>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      <div>
        {movieCasts.length
          ? movieCasts.map((movieCast) => {
              return (
                <li key={movieCast.id} className={css.castItem}>
                  <img
                    className={css.castImage}
                    src={
                      movieCast.profile_path
                        ? `${POSTER_URL}${movieCast.profile_path}`
                        : defaultImg
                    }
                    alt={
                      movieCast.original_name
                        ? movieCast.original_name
                        : "profile"
                    }
                  />
                  <div>Name: {movieCast.name}</div>
                  <div>Character: {movieCast.character}</div>
                </li>
              );
            })
          : "No cast"}
      </div>
    </>
  );
};

export default MovieCast;
