import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getTrendingMoviesAPi } from "../../api/search-api";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const getTrending = async () => {
      try {
        setIsLoading(true);
        const data = await getTrendingMoviesAPi();

        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getTrending();
  }, []);

  return (
    <div>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {movies.length > 0 && (
        <MovieList movieResults={movies} location={location} />
      )}
    </div>
  );
};

export default HomePage;
