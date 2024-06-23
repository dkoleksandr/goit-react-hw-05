import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import { getSearchMoviesAPI } from "../../api/search-api";
import MovieList from "../../components/MovieList/MovieList";

const MoviesPage = () => {
  const [movieResults, setMovieResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    const getSearchMovies = async () => {
      try {
        setError(false);
        setIsLoading(true);
        const data = await getSearchMoviesAPI(searchParams.get("query"));
        setMovieResults(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getSearchMovies();
  }, [searchParams]);

  const handleChange = ({ target: { value } }) => {
    setSearchParams({ query: value });
  };

  return (
    <>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      <input
        type="text"
        id="filter"
        value={searchParams.get("query") ?? ""}
        onChange={handleChange}
      />
      {movieResults.length > 0 && (
        <MovieList movieResults={movieResults} location={location} />
      )}
    </>
  );
};

export default MoviesPage;
