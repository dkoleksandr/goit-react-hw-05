import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/";

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMDMxZmIzMDBmYjVmYWRlMmM3Yzc2OWNjZjUxYzZmMiIsInN1YiI6IjYxZTY3MmI4OTA0ZjZkMDA2NmU0MDAzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4VWIw9pXoVOQfnLkDjx99Gpf4XTtjt_8VrmWzUCoC7w";

export const getTrendingMoviesAPi = async () => {
  const { data } = await axios.get("3/trending/movie/day", {
    params: {
      language: "en-US",
    },
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return data.results;
};

export const getMovieDetailsAPI = async (movie_id) => {
  const { data } = await axios.get(`3/movie/${movie_id}`, {
    params: {
      language: "en-US",
    },
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return data;
};

export const getCastAndReviewsAPI = async (movie_id, additionalInfo) => {
  const { data } = await axios.get(`3/movie/${movie_id}/${additionalInfo}`, {
    params: {
      language: "en-US",
    },
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return data;
};

export const getSearchMoviesAPI = async (query) => {
  const { data } = await axios.get(`3/search/movie`, {
    params: {
      query,
      language: "en-US",
    },
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return data.results;
};
