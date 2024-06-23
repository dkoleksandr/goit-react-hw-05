import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCastAndReviewsAPI } from "../../api/search-api";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const MovieReviews = () => {
  const [movieReviews, setMovieReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    const getMovieReviews = async () => {
      try {
        setIsLoading(true);
        const data = await getCastAndReviewsAPI(movieId, "reviews");
        setMovieReviews(data.results);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieReviews();
  }, [movieId]);

  return (
    <>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      <div>
        {movieReviews.length
          ? movieReviews.map((movieReview) => {
              return (
                <li key={movieReview.id}>
                  <h4>Author: {movieReview.author}</h4>
                  <div>Content: {movieReview.content}</div>
                </li>
              );
            })
          : "No reviews"}
      </div>
    </>
  );
};

export default MovieReviews;
