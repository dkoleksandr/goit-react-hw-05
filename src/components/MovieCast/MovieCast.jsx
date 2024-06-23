import { useEffect, useState } from "react";
import { getCastAndReviewsAPI } from "../../api/search-api";
import { useParams } from "react-router-dom";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";

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
                <li key={movieCast.id}>
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
